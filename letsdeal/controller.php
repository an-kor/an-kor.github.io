<?php
class MobileController {
    const LOG_FILE = 'var/log/letsdeal/ajax.log';//var/log/letsdeal
    const FEED_URL = 'http://letsdeal.se/mfeed.php';
    const DEAL_URL = 'http://letsdeal.se/deal/';
    const FEED_LIFETIME = 1800;
    const DEALINFO_LIFETIME = 72000;

    private $m;
    private $db;
    private $dbDeals;
    private $dbCities;
    private $dbSections;

    public function __construct(){
        $this->m = new MongoClient();
        $this->db = $this->m->letsdeal;
        $this->dbSettings = $this->db->settings;
        $this->dbDeals= $this->db->deals;
        $this->dbCities = $this->db->cities;
        $this->dbSections = $this->db->sections;
        $this->dbDealsInfo= $this->db->dealsinfo;
        $lastTs = $this->dbSettings->findOne(array('key' => 'lastFeedFetchTs'));
        if ($lastTs['value'] < time() - $this::FEED_LIFETIME ) {
            $this->getFeed();
        }
    }

    private function log($data){
        if (is_object($data) || is_array($data)){
            ob_start();
            print_r($data);
            $data = ob_get_contents();
            ob_end_clean();
        }
        file_put_contents($this::LOG_FILE, sprintf("[%s] %s\n",date('Y-m-d H:i:s'),$data), FILE_APPEND);
    }

    private function logException(Exception $e){
        $this->log('ERROR: ' . $e->getMessage() . "\r\n" . $e->getTraceAsString());
    }

    private function logError($errorMsg){
        $this->log('ERROR: ' . $errorMsg);
    }
    public function getPageContent($url) {
        $xml = null;
        $result = '';
        try {
            $ch = curl_init($url);
            curl_setopt($ch, CURLOPT_URL,$url);
            curl_setopt($ch, CURLOPT_FAILONERROR, 1);
            curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
            $this->log('Trying to get data from ' . $url);
            if(curl_errno($ch))
            {
                $this->logError(curl_error($ch));
            } else {
                $result = curl_exec($ch);
                $this->log('Received content from  ' . $url);
            }
            curl_close($ch);
        } catch (Exception $e){
            $this->logException($e);
        }
        return $result;
    }

    public function getDealInfo($dealId) {
        $xml = null; $record = null;
        try {
            $cursor = $this->dbDealsInfo->findone(array("id" => $dealId));

            if ($cursor && $cursor['ts'] > time() - $this::DEALINFO_LIFETIME ) {
                $record = $cursor;
            } else {
                $url = $this::DEAL_URL . $dealId;
                $result = $this->getPageContent($url);
                if ($result != '') {
                    preg_match_all('/Om dealen<\/h3>(.*?)<!-- section/s', $result, $matches);
                    $about = $matches[0][0];
                    preg_match_all('/<div class=\"cont\">(.*?)<\/div>/s', $about, $matches);
                    $about = trim($matches[1][0]);

                    preg_match_all('/Höjdpunkter<\/h3>(.*?)<\/div>/s', $result, $matches);
                    $highlights = trim($matches[1][0]);

                    preg_match_all('/Villkor<\/h3>(.*?)<\/div>/s', $result, $matches);
                    $terms = trim($matches[1][0]);

                    preg_match_all('/Dealen säljes av(.*?)<div class=\"heading/s', $result, $matches);
                    $seller = trim(strip_tags($matches[1][0]));

                    preg_match_all('/Adress(.*?)<\/div>/s', $result, $matches);
                    if (isset($matches[1][0])) {
                        $contacts = "<h5>Adress</h5>".trim(substr($matches[1][0], strpos($matches[1][0], "<p>")));
                    } else {
                        $contacts = "<p><strong><em>Uppge leveransadress när du gör din beställning på Letsdeal.se</em></strong></p>";
                    }
                    $record = array(
                        "id" => $dealId,
                        "ts" => time(),
                        "about" => $about,
                        "highlights" => $highlights,
                        "terms" => $terms,
                        "seller" => $seller,
                        "contacts" => $contacts
                    );
                    if ($cursor) {
                        $this->dbDealsInfo->update(array("id" => $cursor['id']), array('$set' => $record));
                    } else {
                        $this->dbDealsInfo->insert($record);
                    }
                }

            }
        } catch (Exception $e){
            $this->logException($e);
        }
        return $record;
    }

    public function getDealInfoForAllDeals() {
        $result = array();
        try {
            $cursor = $this->dbDeals->find();
            foreach ($cursor as $record) {
                $this->getDealInfo($record['id']);
            }
        } catch (Exception $e){
            $this->logException($e);
        }
        return $result;
    }

    public function getFeed() {
        $xml = null;
        try {
            $url = $this::FEED_URL;
            $result = $this->getPageContent($url);
            if($result != '') {
                $xml = simplexml_load_string($result, 'SimpleXMLElement', LIBXML_NOCDATA);
                $this->log('Successful XML parsing of the document from ' . $url);
                $this->saveFeedToDb($xml);
            }
        } catch (Exception $e){
            $this->logException($e);
        }
    }
    public function saveFeedToDb($xml) {
        try {
            $sections = $xml->city;
            $this->dbCities->drop();
            $this->dbSections->drop();
            $this->dbDeals->drop();
            $this->dbSettings->drop();
            foreach ($sections as $category) {
                if (floatval($category->longitude) != 0) {
                    $record = array(
                        "name" => $category->name,
                        "link" => $category->link,
                        "longitude" => $category->longitude,
                        "latitude" => $category->latitude
                    );
                    $this->dbCities->insert($record);
                } else {
                    $record = array(
                        "name" => $category->name,
                        "type" => $category->link,
                        "parent" => ''
                    );
                    $this->dbSections->insert($record);
                }
                foreach ($category->deals->item as $deal) {
                    $deal->type = $category->link;
                    $this->dbDeals->insert($deal);
                }
            }
            $this->dbSettings->insert(array('key'=> 'lastFeedFetchTs', 'value' => time()));
        } catch (Exception $e){
            $this->logException($e);
        }
    }
    public function getDeals($type, $from = 0 , $limit = 20, $sort = 'endtime', $sortDirection = 1) {

        $result = array();
        try {
            $cursor = $this->dbDeals->find(array("type" => $type))->sort(array($sort => $sortDirection))->limit($limit)->skip($from);
            foreach ($cursor as $record) {
                $result[] = array(
                    "id" => $record['id'],
                    "title" => $record['shortname'],
                    "price" => round($record['price']),
                    "origPrice" => round($record['origprice']),
                    "bulk" => $record['bulk'],
                    "imageSrc" => $record['image']['url'],
                    "shortDescription" => $record['title'],
                    "endtime" => strtotime($record['endtime']),
                    "lat" => $record['latitude'],
                    "lon" => $record['longitude']
                );
            }
        } catch (Exception $e){
            $this->logException($e);
        }
        return $result;
    }

    public function getSections() {
        $result = new stdClass();
        try {
            $result->sections = array();
            $cursor = $this->dbSections->find();
            foreach ($cursor as $section) {
                $result->sections[] = array(
                    "id" => $section['type'][0],
                    "name" => $section['name'][0],
                    "dealsCount" => $this->dbDeals->find(array("type" => $section['type'][0]))->count()
                );
            }
            $cursor = $this->dbCities->find();
            $result->cities = array();
            foreach ($cursor as $city) {
                $result->cities[] = array(
                    "id" => $city['link'][0],
                    "name" => $city['name'][0],
                    "longitude" => floatval($city['longitude'][0]),
                    "latitude" => floatval($city['latitude'][0]),
                    "dealsCount" => $this->dbDeals->find(array("type" => $city['link'][0]))->count()
                );
            }
        } catch (Exception $e){
            $this->logException($e);
        }
        return $result;
    }
}

$app = new MobileController();
if (isset($_REQUEST['action'])){
    if (!isset($_REQUEST['apikey'])){
        exit();
    }
    foreach ($_REQUEST as $key=>$value) {
        $_REQUEST[$key] = (string) $value;
    }
    switch ($_REQUEST['action']) {
        case "checkalldeals":
            $app->getDealInfoForAllDeals();
            break;
        case 'deals':
            if (!isset($_REQUEST['from'])) {
                $_REQUEST['from'] = 0;
            }
            if (!isset($_REQUEST['limit'])) {
                $_REQUEST['limit'] = 20;
            }
            if (!isset($_REQUEST['sort'])) {
                $_REQUEST['sort'] = 'expiration';
            }
            if (!isset($_REQUEST['sortDirection'])) {
                $_REQUEST['sortDirection'] = 1;
            }
            echo json_encode($app->getDeals($_REQUEST['section'], $_REQUEST['from'], $_REQUEST['limit'], $_REQUEST['sort'], $_REQUEST['sortDirection']));
            break;
        case 'sections':
            echo json_encode($app->getSections());
            break;
        case 'dealinfo':
            if (!isset($_REQUEST['dealId'])) {
                $_REQUEST['dealId'] = "0";
            }
            echo json_encode($app->getDealInfo($_REQUEST['dealId']));
            break;
    }
}