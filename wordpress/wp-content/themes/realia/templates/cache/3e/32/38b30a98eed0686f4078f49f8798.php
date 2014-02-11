<?php

/* properties/property-map.twig */
class __TwigTemplate_3e3238b30a98eed0686f4078f49f8798 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        // line 1
        if (($this->getAttribute($this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_post_meta", array(0 => $this->getAttribute((isset($context["post"]) ? $context["post"] : null), "ID"), 1 => "_property_latitude"), "method"), 0) && $this->getAttribute($this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_post_meta", array(0 => $this->getAttribute((isset($context["post"]) ? $context["post"] : null), "ID"), 1 => "_property_longitude"), "method"), 0))) {
            // line 2
            echo "    <h2>";
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "__", array(0 => "Map", 1 => "aviators"), "method"), "html", null, true);
            echo "</h2>

    <div id=\"property-map\"></div>

    <script type=\"text/javascript\">
        jQuery(document).ready(function (\$) {
            function LoadMapProperty() {
                var locations = new Array(
                        [";
            // line 10
            echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_post_meta", array(0 => $this->getAttribute((isset($context["post"]) ? $context["post"] : null), "ID"), 1 => "_property_latitude"), "method"), 0), "html", null, true);
            echo ", ";
            echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_post_meta", array(0 => $this->getAttribute((isset($context["post"]) ? $context["post"] : null), "ID"), 1 => "_property_longitude"), "method"), 0), "html", null, true);
            echo "]
                );
                var types = new Array(
                        '";
            // line 13
            echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute($this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "wp_get_object_terms", array(0 => $this->getAttribute((isset($context["post"]) ? $context["post"] : null), "ID"), 1 => "property_types"), "method"), 0), "slug"), "html", null, true);
            echo "'
                );
                var markers = new Array();
                var plainMarkers = new Array();

                var mapOptions = {
                    center     : new google.maps.LatLng(";
            // line 19
            echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_post_meta", array(0 => $this->getAttribute((isset($context["post"]) ? $context["post"] : null), "ID"), 1 => "_property_latitude"), "method"), 0), "html", null, true);
            echo ", ";
            echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_post_meta", array(0 => $this->getAttribute((isset($context["post"]) ? $context["post"] : null), "ID"), 1 => "_property_longitude"), "method"), 0), "html", null, true);
            echo "),
                    zoom       : 14,
                    mapTypeId  : google.maps.MapTypeId.ROADMAP,
                    scrollwheel: false
                };

                var map = new google.maps.Map(document.getElementById('property-map'), mapOptions);

                \$.each(locations, function (index, location) {
                    var marker = new google.maps.Marker({
                        position: new google.maps.LatLng(location[0], location[1]),
                        map     : map,
                        icon    : '";
            // line 31
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_template_directory_uri", array(), "method"), "html", null, true);
            echo "/assets/img/marker-transparent.png'
                    });

                    var myOptions = {
                        draggable             : true,
                        content               : '<div class=\"marker ' + types[index] + '\"><div class=\"marker-inner\"></div></div>',
                        disableAutoPan        : true,
                        pixelOffset           : new google.maps.Size(-21, -58),
                        position              : new google.maps.LatLng(location[0], location[1]),
                        closeBoxURL           : \"\",
                        isHidden              : false,
                        // pane: \"mapPane\",
                        enableEventPropagation: true
                    };
                    marker.marker = new InfoBox(myOptions);
                    marker.marker.isHidden = false;
                    marker.marker.open(map, marker);
                    markers.push(marker);
                });

                google.maps.event.addListener(map, 'zoom_changed', function () {
                    \$.each(markers, function (index, marker) {
                        marker.infobox.close();
                    });
                });
            }

            google.maps.event.addDomListener(window, 'load', LoadMapProperty);

            var dragFlag = false;
            var start = 0, end = 0;

            function thisTouchStart(e) {
                dragFlag = true;
                start = e.touches[0].pageY;
            }

            function thisTouchEnd() {
                dragFlag = false;
            }

            function thisTouchMove(e) {
                if (!dragFlag) return;
                end = e.touches[0].pageY;
                window.scrollBy(0, ( start - end ));
            }

            document.getElementById(\"property-map\").addEventListener(\"touchstart\", thisTouchStart, true);
            document.getElementById(\"property-map\").addEventListener(\"touchend\", thisTouchEnd, true);
            document.getElementById(\"property-map\").addEventListener(\"touchmove\", thisTouchMove, true);
        });

    </script>
";
        }
    }

    public function getTemplateName()
    {
        return "properties/property-map.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  33 => 10,  64 => 14,  57 => 12,  42 => 10,  38 => 9,  35 => 8,  195 => 73,  188 => 70,  184 => 69,  181 => 68,  179 => 67,  176 => 66,  173 => 65,  167 => 62,  163 => 61,  160 => 60,  157 => 59,  155 => 58,  152 => 57,  149 => 56,  143 => 53,  139 => 52,  136 => 51,  133 => 50,  131 => 49,  111 => 40,  107 => 39,  102 => 37,  88 => 31,  72 => 24,  66 => 22,  50 => 19,  32 => 9,  24 => 4,  93 => 24,  89 => 23,  85 => 21,  67 => 31,  59 => 14,  56 => 13,  29 => 5,  25 => 4,  21 => 2,  19 => 1,  125 => 46,  121 => 45,  117 => 43,  112 => 37,  108 => 36,  104 => 38,  98 => 32,  96 => 34,  92 => 33,  86 => 26,  83 => 28,  80 => 27,  76 => 23,  74 => 25,  71 => 21,  69 => 20,  65 => 18,  63 => 16,  52 => 15,  46 => 13,  44 => 12,  41 => 13,  34 => 7,  26 => 4,  20 => 1,  60 => 20,  58 => 19,  55 => 16,  53 => 17,  48 => 15,  45 => 10,  43 => 9,  39 => 12,  37 => 11,  31 => 7,  28 => 5,);
    }
}
