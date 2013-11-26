<?php
ini_set('display_errors', 1);
$url = "http://letsdeal.se/mfeed.php";
$ch = curl_init($url);
curl_setopt($ch, CURLOPT_URL,$url);
curl_setopt($ch, CURLOPT_FAILONERROR, 1);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
$result = curl_exec($ch);
curl_close($ch);
$xml= simplexml_load_string($result, 'SimpleXMLElement', LIBXML_NOCDATA);
$cities = $xml->city;

$m = new MongoClient();
$db = $m->letsdeal;
$dbDeals= $db->deals;
$dbCities = $db->cities;

$dbCities->drop();
$dbDeals->drop();
foreach ($cities as $key=>$city) {
    $cityRecord = array(
        "name" => $city->name,
        "link" => $city->link,
        "longitude" => $city->longitude,
        "latitude" => $city->latitude
    );
    $dbCities->insert($cityRecord);
    foreach ($city->deals->item as $deal) {
        $deal->type = $city->link;
        $dbDeals->insert($deal);
    }
}

$cursor = $dbDeals->find(array("type" => "shopping"));
$cursor->sort(array('expiration' => 1));

foreach ($cursor as $document) {
    print_r($document);
}