<?php
ini_set('display_errors', 1);
class MobileController {
    const LOG_FILE = '/var/log/letsdeal/ajax.log';
    const FEED_URL = 'http://letsdeal.se/mfeed_touch_generator.php';
    const DEAL_INFO_URL = 'http://letsdeal.se/mdealinfo.php';
    const DEAL_URL = 'http://letsdeal.se/deal/';
    const FEED_LIFETIME = 3600;
    const DEALINFO_LIFETIME = 3600;

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
        $this->dbStartCities = $this->db->startcities;
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
            if (curl_errno($ch)) {
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
                    $about = "";
                    preg_match_all('/Om dealen<\/h3>(.*?)<!-- section/s', $result, $matches);
                    if ($matches[0]) {
                        $about = $matches[0][0];
                        preg_match_all('/<div class=\"cont\">(.*?)<\/div>/s', $about, $matches);
                        if ($matches[1]) {
                            $about = trim($matches[1][0]);
                        }
                    }

                    preg_match_all('/Höjdpunkter<\/h3>(.*?)<\/div>/s', $result, $matches);
                    $highlights = "";
                    if ($matches[1]) {
                        $highlights = trim($matches[1][0]);
                    }

                    preg_match_all('/Villkor<\/h3>(.*?)<\/div>/s', $result, $matches);
                    $terms = "";
                    if ($matches[1]) {
                        $terms = trim($matches[1][0]);
                    }

                    preg_match_all('/Dealen säljes av(.*?)<div class=\"heading/s', $result, $matches);
                    $seller = "";
                    if ($matches[1]) {
                        $seller = trim(strip_tags($matches[1][0]));
                    }

                    preg_match_all('/Övrigt<\/h3>(.*?)src=\"(.*?)\" alt/s', $result, $matches);
                    $otherImg = "";
                    if ($matches[2]) {
                        $otherImg = trim(strip_tags($matches[2][0]));
                    }

                    preg_match_all('/Adress(.*?)<\/div>/s', $result, $matches);
                    if (isset($matches[1][0])) {
                        $contacts = "<h5>Adress</h5>".trim(substr($matches[1][0], strpos($matches[1][0], "<p>")));
                    } else {
                        $contacts = "";//"<p><strong><em>Uppge leveransadress när du gör din beställning på Letsdeal.se</em></strong></p>";
                    }
                    $record = array(
                        "id" => $dealId,
                        "ts" => time(),
                        "about" => $about,
                        "highlights" => $highlights,
                        "terms" => $terms,
                        "seller" => $seller,
                        "contacts" => $contacts,
                        "otherImg" => $otherImg
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

    public function getDealInfoFromXmlFeed($dealId) {
        $xml = null; $record = null;
        try {
            $cursor = $this->dbDealsInfo->findone(array("id" => $dealId));

            if ($cursor && $cursor['ts'] > time() - $this::DEALINFO_LIFETIME ) {
                $record = $cursor;
            } else {
                $url = $this::DEAL_INFO_URL . '?dealid=' . $dealId;
                $result = $this->getPageContent($url);

                $xml = simplexml_load_string($result, 'SimpleXMLElement', LIBXML_NOCDATA);
                $this->log('Successful XML parsing of the document from ' . $url);
                if ($result != '') {
                    preg_match_all('/img(.*?)src=\"(.*?)\" alt/s', (string) $xml->reviews, $matches);
                    $otherImg = '';
                    if ($matches[2]) {
                        $otherImg = trim(strip_tags($matches[2][0]));
                    }
                    $record = array(
                        "id" => $xml->id,
                        "ts" => time(),
                        "about" => (string) $xml->about,
                        "highlights" => (string) $xml->highlights,
                        "terms" => (string) $xml->terms,
                        "seller" => (string) $xml->seller,
                        "contacts" => (string) $xml->contacts,
                        "otherImg" => $otherImg
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

            $this->dbDealsInfo->remove(array("ts" => array('$lt' => time() - $this::DEALINFO_LIFETIME)));

            $cursor = $this->dbDeals->find();
            foreach ($cursor as $record) {
                //$this->getDealInfo($record['id']);
                $this->getDealInfoFromXmlFeed($record['id']);
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
            $this->dbCities->drop();
            $this->dbStartCities->drop();
            $this->dbSections->drop();
            $this->dbDeals->drop();
            $this->dbSettings->drop();

            foreach ($xml->sections->section as $category) {
                if ($category->type == 'local') {
                    foreach ($category->cities->city as $city) {
                        if ((float) $city->longitude > 0) {
                            $record = array(
                                "name" => (string) $city->name,
                                "link" => (string) $city->link,
                                "longitude" => (float) $city->longitude,
                                "latitude" => (float) $city->latitude
                            );
                            if ($city->categories) {
                                $categories = (array) $city->categories;
                                $record["categories"] = $categories['category'];
                            }
                            $this->dbCities->insert($record);
                            foreach ($city[0]->deals->deal as $deal) {
                                $deal->type = (string) $city->link;
                                $deal = (array) $deal;
                                if (isset($deal["categories"])) {
                                    $deal["cats"] = array();
                                    foreach ($deal["categories"] as $catId) {
                                        $deal["cats"][] = (int) $catId;
                                    }
                                }
                                $deal['endtime'] = strtotime($deal['endtime']);
                                $this->dbDeals->insert($deal);
                            }
                        }
                    }
                } elseif ($category->type == 'start') {
                    foreach ($category->cities->city as $city) {
                        if ((float) $city->longitude > 0) {
                            $record = array(
                                "name" => (string) $category->name,
                                "link" => (string) $city->link . '_start',
                                "longitude" => (float) $city->longitude,
                                "latitude" => (float) $city->latitude
                            );
                            if ($city->categories) {
                                $categories = (array) $city->categories;
                                $record["categories"] = $categories['category'];
                            }
                            $this->dbStartCities->insert($record);
                            foreach ($city[0]->deals->deal as $deal) {
                                $deal->type = (string) $city->link . '_start';
                                $deal = (array) $deal;
                                if (isset($deal["categories"])) {
                                    $deal["cats"] = array();
                                    foreach ($deal["categories"] as $catId) {
                                        $deal["cats"][] = (int) $catId;
                                    }
                                }
                                $deal['endtime'] = strtotime($deal['endtime']);
                                $this->dbDeals->insert($deal);
                            }
                        }
                    }
                } else {
                    $record = array(
                        "name" => (string) $category->name,
                        "type" => (string) $category->type
                    );
                    if ($category->categories) {
                        $categories = (array) $category->categories;
                        $record["categories"] = $categories['category'];
                    }
                    $this->dbSections->insert($record);
                    foreach ($category->deals as $deals) {
                        foreach ($deals->deal as $deal) {
                            $deal->type = (string) $category->type;
                            $deal = (array) $deal;
                            if (isset($deal["categories"])) {
                                $deal["cats"] = array();
                                foreach ($deal["categories"] as $catId) {
                                    $deal["cats"][] = (int) $catId;
                                }
                            }
                            $deal['endtime'] = strtotime($deal['endtime']);
                            $this->dbDeals->insert($deal);
                        }
                    }
                }
            }
            $this->dbSettings->insert(array('key'=> 'lastFeedFetchTs', 'value' => time()));
        } catch (Exception $e){
            $this->logException($e);
        }
    }
    public function searchDeals($text) {
        $result = array();
        try {
            if (strpos($text,'section:')>-1) {
                $query = array("cats" => (int) substr($text,8));
            } else {
                $query = array('$or' => array(array("title" => new MongoRegex("/\b".$text."/i")), array("shortname" => new MongoRegex("/\b".$text."/i"))));
            }
            $cursor = $this->dbDeals->find($query)->limit(30);
            foreach ($cursor as $record) {
                $r = array(
                    "id" => $record['id'],
                    "title" => $record['shortname'],
                    "price" => round($record['price']),
                    "origPrice" => round($record['origprice']),
                    "isSoldOut" => $record['is_sold_out'],
                    "bulk" => $record['bulk'],
                    "imageSrc" => $record['image']['url'],
                    "info" => $record['title'],
                    "endtime" => $record['endtime'],
                    "lat" => $record['latitude'],
                    "lon" => $record['longitude'],
                    "smallimage" => $record['smallimage'],
                    "type" => $record['type']
                );
                if (isset($record['categoryId'])) {
                    $r["categoryId"] = $record['categoryId'];
                }

                $result[] = $r;
            }
        } catch (Exception $e){
            $this->logException($e);
        }
        return $result;
    }
    public function getDeals($type, $category = null, $from = 0 , $limit = 20, $sort = 'endtime', $sortDirection = 1) {
        $result = array();
        try {
            $query = array(
                "type" => $type,
                "endtime" => array('$gt' => time())
            );
            if ($category) {
                //  $query["categories"]["category"] = array('$gt' => $category);
                $query["cats"] = (int) $category;
            }
            $cursor = $this->dbDeals->find($query)->sort(array($sort => $sortDirection))->limit($limit)->skip($from);

            foreach ($cursor as $record) {
                $r = array(
                    "id" => $record['id'],
                    "title" => $record['shortname'],
                    "price" => round($record['price']),
                    "origPrice" => round($record['origprice']),
                    "isSoldOut" => $record['is_sold_out'],
                    "bulk" => $record['bulk'],
                    "imageSrc" => $record['image']['url'],
                    "info" => $record['title'],
                    "endtime" => $record['endtime'],
                    "lat" => $record['latitude'],
                    "lon" => $record['longitude']
                );
                if (isset($record['categoryId'])) {
                    $r["categoryId"] = $record['categoryId'];
                }
                $result[] = $r;
            }
        } catch (Exception $e){
            $this->logException($e);
        }
        return $result;
    }

    public function getDeal($dealId) {
        $result = array();
        try {
            $record = $this->dbDeals->findone(array("id" => $dealId));
            $r = array(
                "id" => $record['id'],
                "title" => $record['shortname'],
                "price" => round($record['price']),
                "origPrice" => round($record['origprice']),
                "isSoldOut" => $record['is_sold_out'],
                "bulk" => $record['bulk'],
                "imageSrc" => $record['image']['url'],
                "info" => $record['title'],
                "endtime" => $record['endtime'],
                "lat" => $record['latitude'],
                "lon" => $record['longitude']
            );
            if (isset($record['categoryId'])) {
                $r["categoryId"] = $record['categoryId'];
            }
            $result = $r;
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
                $query = array(
                    "type" => $section['type'],
                    "endtime" => array('$gt' => time())
                );
                $r = array(
                    "id" => $section['type'],
                    "name" => $section['name'],
                    "dealsCount" => $this->dbDeals->find($query)->count()
                );
                if (isset($section['categories'])) {
                    $r["categories"] = $section['categories'];
                }
                if ($r["dealsCount"] > 0) {
                    $result->sections[] = $r;
                }
            }
            $cursor = $this->dbCities->find();
            $result->cities = array();
            foreach ($cursor as $city) {
                $r = array(
                    "id" => $city['link'],
                    "name" => $city['name'],
                    "longitude" => floatval($city['longitude']),
                    "latitude" => floatval($city['latitude']),
                    "dealsCount" => $this->dbDeals->find(array("type" => $city['link']))->count()
                );
                if (isset($city['categories'])) {
                    $r["categories"] = $city['categories'];
                }
                $result->cities[] = $r;
            }
            $cursor = $this->dbStartCities->find();
            $result->startCities = array();
            foreach ($cursor as $city) {
                $r = array(
                    "id" => $city['link'],
                    "name" => $city['name'],
                    "longitude" => floatval($city['longitude']),
                    "latitude" => floatval($city['latitude']),
                    "dealsCount" => $this->dbDeals->find(array("type" => $city['link']))->count()
                );
                if (isset($city['categories'])) {
                    $r["categories"] = $city['categories'];
                }
                $result->startCities[] = $r;
            }
        } catch (Exception $e){
            $this->logException($e);
        }
        return $result;
    }
}


if(defined('STDIN') ) {
    $app = new MobileController();
    switch ($argv[1]) {
        case "checkalldeals":
            $app->getDealInfoForAllDeals();
        break;
        case "getfeed":
            $app->getFeed();
        break;
    }
} else {
    if (isset($_REQUEST['action'])){
        if (!isset($_REQUEST['apikey'])){
            exit();
        }
        foreach ($_REQUEST as $key=>$value) {
            $_REQUEST[$key] = (string) $value;
        }
        $app = new MobileController();
        switch ($_REQUEST['action']) {
            case "checkalldeals":
                $app->getDealInfoForAllDeals();
                echo 'success';
                break;
            case 'deals':
                if (!isset($_REQUEST['from'])) {
                    $_REQUEST['from'] = 0;
                }
                if (!isset($_REQUEST['limit'])) {
                    $_REQUEST['limit'] = 20;
                }
                if (!isset($_REQUEST['sort'])) {
                    $_REQUEST['sort'] = 'endtime';
                }
                if (!isset($_REQUEST['sortDirection'])) {
                    $_REQUEST['sortDirection'] = 1;
                }
                if (!isset($_REQUEST['category'])) {
                    $_REQUEST['category'] = null;
                }
                echo json_encode($app->getDeals($_REQUEST['section'], $_REQUEST['category'], $_REQUEST['from'], $_REQUEST['limit'], $_REQUEST['sort'], $_REQUEST['sortDirection']));
                break;
            case 'dealsearch':
                if (!isset($_REQUEST['text']) || strlen($_REQUEST['text'])<4) {
                    echo json_encode(array());
                } else {
                    echo json_encode($app->searchDeals($_REQUEST['text']));
                }
                break;
            case 'sections':
                echo json_encode($app->getSections());
                break;
            case 'getdeal':
                if (!isset($_REQUEST['dealId'])) {
                    $_REQUEST['dealId'] = "0";
                }
                echo json_encode($app->getDeal($_REQUEST['dealId']));
                break;
            case 'dealinfo':
                if (!isset($_REQUEST['dealId'])) {
                    $_REQUEST['dealId'] = "0";
                }
                //echo json_encode($app->getDealInfo($_REQUEST['dealId']));
                echo json_encode($app->getDealInfoFromXmlFeed($_REQUEST['dealId']));
                break;
        }
    }
}