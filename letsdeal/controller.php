<?php
class MobileController {
    const LOG_FILE = 'logs/ajax.log';//var/log/letsdeal
    const FEED_URL = 'http://letsdeal.se/mfeed.php';
    const FEED_LIFETIME = 1800;

    private $m;
    private $db;
    private $dbDeals;
    private $dbCities;
    private $dbCategories;

    public function __construct(){
        $this->m = new MongoClient();
        $this->db = $this->m->letsdeal;
        $this->dbSettings = $this->db->settings;
        $this->dbDeals= $this->db->deals;
        $this->dbCities = $this->db->cities;
        $this->dbCategories = $this->db->categories;
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

    public function getFeed() {
        $xml = null;
        try {
            $url = $this::FEED_URL;
            $ch = curl_init($url);
            curl_setopt($ch, CURLOPT_URL,$url);
            curl_setopt($ch, CURLOPT_FAILONERROR, 1);
            curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
            $this->log('Trying to get data from ' . $url);
            $result = curl_exec($ch);
            if(curl_errno($ch))
            {
                $this->logError(curl_error($ch));
            } else {
                $xml = simplexml_load_string($result, 'SimpleXMLElement', LIBXML_NOCDATA);
                $this->log('Successful XML parsing of the document from ' . $url);
                $this->saveFeedToDb($xml);
            }
            curl_close($ch);
        } catch (Exception $e){
            $this->logException($e);
        }
    }
    public function saveFeedToDb($xml) {
        try {
            $categories = $xml->city;
            $this->dbCities->drop();
            $this->dbCategories->drop();
            $this->dbDeals->drop();
            $this->dbSettings->drop();
            foreach ($categories as $category) {
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
                    $this->dbCategories->insert($record);
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
    public function getDeals($type, $from = 0 , $limit = 20, $sort = 'expiration', $sortDirection = 1) {

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
                    "imageSrc" => $record['image']['url']
                );
            }
        } catch (Exception $e){
            $this->logException($e);
        }
        return json_encode($result);
    }

    public function getCategories() {
        $result = new stdClass();
        try {
            $result->categories = array();
            $cursor = $this->dbCategories->find();
            foreach ($cursor as $category) {
                $result->categories[] = array(
                    "id" => $category['type'][0],
                    "name" => $category['name'][0],
                    "dealsCount" => $this->dbDeals->find(array("type" => $category['type'][0]))->count()
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
            return json_encode($result);
        } catch (Exception $e){
            $this->logException($e);
        }
        return json_encode($result);
    }
}

$app = new MobileController();
if (isset($_REQUEST['action'])){
    foreach ($_REQUEST as $key=>$value) {
        $_REQUEST[$key] = (string) $value;
    }
    switch ($_REQUEST['action']) {
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
            echo $app->getDeals($_REQUEST['type'], $_REQUEST['from'], $_REQUEST['limit'], $_REQUEST['sort'], $_REQUEST['sortDirection']);
            break;
        case 'categories':
            echo $app->getCategories();
            break;
    }
}