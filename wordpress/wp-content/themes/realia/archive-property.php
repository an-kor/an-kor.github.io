<?php

global $wp_query;

echo View::render('archive-property.twig', array(
    'wp_query' => aviators_properties_filter(TRUE),
    'properties' => aviators_properties_filter(FALSE),
));

