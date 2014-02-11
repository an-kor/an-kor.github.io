<?php
/**
 * Template Name: Properties Grid Template
 */
global $wp_query;

$rows = aviators_settings_get_value('properties', 'homepage', 'rows');
$cols = aviators_settings_get_value('properties', 'homepage', 'cols');
$type = aviators_settings_get_value('properties', 'homepage', 'type');
$shuffle = aviators_settings_get_value('properties', 'homepage', 'shuffle_results');

$do_shuffle = FALSE;
if ($shuffle == 'on') {
    $do_shuffle = TRUE;
}

switch ($type) {
    case 'reduced':
        $posts = aviators_properties_get_reduced($rows * $cols, $do_shuffle);
        break;
    case 'featured':
        $posts = aviators_properties_get_featured($rows * $cols, $do_shuffle);
        break;
    default:
        $posts = aviators_properties_get_most_recent($rows * $cols, $do_shuffle);
        break;
}



echo View::render('page-properties-grid.twig', array(
     'wp_query' => $wp_query,
     'posts' => $posts,
));