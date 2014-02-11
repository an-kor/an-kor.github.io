<?php

global $wp_query;

echo View::render('archive-property.twig', array(
    'title' => $wp_query->queried_object->name,
    'wp_query' => $wp_query,
    'properties' => _aviators_properties_prepare($wp_query),
));
