<?php

/* properties/property-box-small.twig */
class __TwigTemplate_039c2fb745e9a180b7df4e4a867be118 extends Twig_Template
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
        echo "<div class=\"property\">
    <div class=\"image\">
        <div class=\"content\">
            <a href=\"";
        // line 4
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_permalink", array(0 => $this->getAttribute((isset($context["property"]) ? $context["property"] : null), "ID")), "method"), "html", null, true);
        echo "\"></a>

            ";
        // line 6
        if ($this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_the_post_thumbnail", array(0 => $this->getAttribute((isset($context["property"]) ? $context["property"] : null), "ID")), "method")) {
            // line 7
            echo "                <img src=\"";
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "aq_resize", array(0 => $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "wp_get_attachment_url", array(0 => $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_post_thumbnail_id", array(0 => $this->getAttribute((isset($context["property"]) ? $context["property"] : null), "ID")), "method"), 1 => "full"), "method"), 1 => 270, 2 => 200, 3 => "true"), "method"), "html", null, true);
            echo "\" alt=\"";
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["property"]) ? $context["property"] : null), "post_title"), "html", null, true);
            echo "\">
            ";
        } else {
            // line 9
            echo "                <img src=\"";
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_template_directory_uri", array(), "method"), "html", null, true);
            echo "/assets/img/property-tmp-small.png\" alt=\"";
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["property"]) ? $context["property"] : null), "post_title"), "html", null, true);
            echo "\">
            ";
        }
        // line 11
        echo "        </div><!-- /.content -->

        ";
        // line 13
        if ($this->getAttribute($this->getAttribute((isset($context["property"]) ? $context["property"] : null), "property_contracts"), 0)) {
            // line 14
            echo "            <div class=\"rent-sale\">
                ";
            // line 15
            echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute($this->getAttribute((isset($context["property"]) ? $context["property"] : null), "property_contracts"), 0), "name"), "html", null, true);
            echo "
            </div><!-- /.rent-sale -->
        ";
        }
        // line 18
        echo "
        <div class=\"price\">
            ";
        // line 20
        if ($this->getAttribute($this->getAttribute($this->getAttribute((isset($context["property"]) ? $context["property"] : null), "meta"), "_property_custom_text"), 0)) {
            // line 21
            echo "                ";
            echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute($this->getAttribute((isset($context["property"]) ? $context["property"] : null), "meta"), "_property_custom_text"), 0), "html", null, true);
            echo "
            ";
        } else {
            // line 23
            echo "                ";
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "aviators_price_format", array(0 => $this->getAttribute($this->getAttribute($this->getAttribute((isset($context["property"]) ? $context["property"] : null), "meta"), "_property_price"), 0)), "method"), "html", null, true);
            echo "

                ";
            // line 25
            if ($this->getAttribute($this->getAttribute($this->getAttribute((isset($context["property"]) ? $context["property"] : null), "meta"), "_property_price_suffix"), 0)) {
                // line 26
                echo "                    <span class=\"suffix\">";
                echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute($this->getAttribute((isset($context["property"]) ? $context["property"] : null), "meta"), "_property_price_suffix"), 0), "html", null, true);
                echo "</span>
                ";
            }
            // line 28
            echo "            ";
        }
        // line 29
        echo "        </div><!-- /.price -->

        ";
        // line 31
        if ($this->getAttribute($this->getAttribute($this->getAttribute((isset($context["property"]) ? $context["property"] : null), "meta"), "_property_reduced"), 0)) {
            // line 32
            echo "            <div class=\"reduced\">";
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "__", array(0 => "Reduced", 1 => "aviators"), "method"), "html", null, true);
            echo "</div><!-- /.reduced -->
        ";
        }
        // line 34
        echo "    </div>
    <!-- /.image -->

    <div class=\"title\">
        <h2><a href=\"";
        // line 38
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_permalink", array(0 => $this->getAttribute((isset($context["property"]) ? $context["property"] : null), "ID")), "method"), "html", null, true);
        echo "\">
                ";
        // line 39
        if ($this->getAttribute($this->getAttribute($this->getAttribute((isset($context["property"]) ? $context["property"] : null), "meta"), "_property_title"), 0)) {
            // line 40
            echo "                    ";
            echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute($this->getAttribute((isset($context["property"]) ? $context["property"] : null), "meta"), "_property_title"), 0), "html", null, true);
            echo "
                ";
        } else {
            // line 42
            echo "                    ";
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["property"]) ? $context["property"] : null), "post_title"), "html", null, true);
            echo "
                ";
        }
        // line 44
        echo "            </a></h2>
    </div>
    <!-- /.title -->

    <div class=\"location\">";
        // line 48
        echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute($this->getAttribute((isset($context["property"]) ? $context["property"] : null), "location"), 0), "name"), "html", null, true);
        echo "</div>
    <!-- /.location -->

    ";
        // line 51
        if ($this->getAttribute($this->getAttribute($this->getAttribute((isset($context["property"]) ? $context["property"] : null), "meta"), "_property_area"), 0)) {
            // line 52
            echo "        <div class=\"area\">
            <span class=\"key\">";
            // line 53
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "__", array(0 => "Area", 1 => "aviators"), "method"), "html", null, true);
            echo ":</span><!-- /.key -->
            <span class=\"value\">";
            // line 54
            echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute($this->getAttribute((isset($context["property"]) ? $context["property"] : null), "meta"), "_property_area"), 0), "html", null, true);
            echo $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "aviators_settings_get_value", array(0 => "properties", 1 => "units", 2 => "area"), "method");
            echo "</span><!-- /.value -->
        </div><!-- /.area -->
    ";
        }
        // line 57
        echo "
    ";
        // line 58
        if (($this->getAttribute($this->getAttribute($this->getAttribute((isset($context["property"]) ? $context["property"] : null), "meta"), "_property_hide_baths"), 0) != "1")) {
            // line 59
            echo "        ";
            if ($this->getAttribute($this->getAttribute($this->getAttribute((isset($context["property"]) ? $context["property"] : null), "meta"), "_property_bathrooms"), 0)) {
                // line 60
                echo "            <div class=\"bathrooms\" title=\"";
                echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "__", array(0 => "Bathrooms", 1 => "aviators"), "method"), "html", null, true);
                echo "\">
                <div class=\"content\">";
                // line 61
                echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute($this->getAttribute((isset($context["property"]) ? $context["property"] : null), "meta"), "_property_bathrooms"), 0), "html", null, true);
                echo "</div>
            </div><!-- /.bathrooms -->
        ";
            }
            // line 64
            echo "    ";
        }
        // line 65
        echo "
    ";
        // line 66
        if (($this->getAttribute($this->getAttribute($this->getAttribute((isset($context["property"]) ? $context["property"] : null), "meta"), "_property_hide_beds"), 0) != "1")) {
            // line 67
            echo "        ";
            if ($this->getAttribute($this->getAttribute($this->getAttribute((isset($context["property"]) ? $context["property"] : null), "meta"), "_property_bedrooms"), 0)) {
                // line 68
                echo "            <div class=\"bedrooms\" title=\"";
                echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "__", array(0 => "Bedrooms", 1 => "aviators"), "method"), "html", null, true);
                echo "\">
                <div class=\"content\">";
                // line 69
                echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute($this->getAttribute((isset($context["property"]) ? $context["property"] : null), "meta"), "_property_bedrooms"), 0), "html", null, true);
                echo "</div>
            </div><!-- /.bedrooms -->
        ";
            }
            // line 72
            echo "    ";
        }
        // line 73
        echo "</div>";
    }

    public function getTemplateName()
    {
        return "properties/property-box-small.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  199 => 73,  196 => 72,  190 => 69,  185 => 68,  182 => 67,  180 => 66,  177 => 65,  174 => 64,  168 => 61,  163 => 60,  160 => 59,  158 => 58,  155 => 57,  148 => 54,  144 => 53,  141 => 52,  139 => 51,  133 => 48,  127 => 44,  121 => 42,  115 => 40,  113 => 39,  109 => 38,  103 => 34,  97 => 32,  91 => 29,  88 => 28,  80 => 25,  66 => 20,  62 => 18,  51 => 13,  47 => 11,  29 => 6,  82 => 26,  68 => 21,  61 => 13,  58 => 12,  56 => 15,  53 => 14,  21 => 2,  45 => 9,  36 => 9,  27 => 4,  24 => 4,  22 => 2,  19 => 1,  130 => 17,  126 => 43,  122 => 41,  116 => 39,  114 => 38,  110 => 36,  104 => 34,  102 => 33,  98 => 31,  95 => 31,  89 => 27,  86 => 26,  83 => 25,  79 => 24,  77 => 23,  74 => 23,  71 => 21,  69 => 20,  65 => 18,  63 => 14,  55 => 16,  52 => 15,  46 => 13,  44 => 12,  41 => 11,  39 => 9,  34 => 7,  26 => 4,  20 => 1,  31 => 7,  28 => 5,);
    }
}
