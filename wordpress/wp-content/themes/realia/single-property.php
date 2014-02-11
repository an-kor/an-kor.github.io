<?php

$amenities = get_terms('amenities', array(
    'hide_empty' => FALSE,
));

$amenities_count = count($amenities);
$amenities_per_column = $amenities_count/4;
$amenities_columized = array();

foreach ($amenities as $key => $value) {
    $index = intval($key/$amenities_per_column);
    $amenities_columized[$index][] = $value;
}

echo View::render('single-property.twig', array(
    'post' => $post,
    'amenities' => $amenities_columized,
));