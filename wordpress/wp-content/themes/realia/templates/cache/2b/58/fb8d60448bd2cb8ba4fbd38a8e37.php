<?php

/* properties/map-infobox.twig */
class __TwigTemplate_2b58fb8d60448bd2cb8ba4fbd38a8e37 extends Twig_Template
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
        ob_start();
        // line 2
        echo "    <div class=\"infobox\">
        <div class=\"close\">
            <img src=\"";
        // line 4
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_template_directory_uri", array(), "method"), "html", null, true);
        echo "/assets/img/close.png\" alt=\"\">
        </div>

        <div class=\"image\">
            <a href=\"";
        // line 8
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_permalink", array(0 => $this->getAttribute((isset($context["property"]) ? $context["property"] : null), "ID")), "method"), "html", null, true);
        echo "\">";
        if ($this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_the_post_thumbnail", array(0 => $this->getAttribute((isset($context["property"]) ? $context["property"] : null), "ID")), "method")) {
            echo $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_the_post_thumbnail", array(0 => $this->getAttribute((isset($context["property"]) ? $context["property"] : null), "ID"), 1 => "admin-thumb"), "method");
        } else {
            // line 9
            echo "                    <img src=\"";
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_template_directory_uri", array(), "method"), "html", null, true);
            echo "/assets/img/property-tmp-small.png\" alt=\"";
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["property"]) ? $context["property"] : null), "post_title"), "html", null, true);
            echo "\" width=\"80\">";
        }
        // line 10
        echo "            </a>
        </div>

        <div class=\"title\">
            <a href=\"";
        // line 14
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_permalink", array(0 => $this->getAttribute((isset($context["property"]) ? $context["property"] : null), "ID")), "method"), "html", null, true);
        echo "\">";
        if ($this->getAttribute($this->getAttribute($this->getAttribute((isset($context["property"]) ? $context["property"] : null), "meta"), "_property_title"), 0)) {
            echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute($this->getAttribute((isset($context["property"]) ? $context["property"] : null), "meta"), "_property_title"), 0), "html", null, true);
        } else {
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["property"]) ? $context["property"] : null), "post_title"), "html", null, true);
        }
        echo "</a>
        </div>

        <div class=\"area\">
            <span class=\"key\">";
        // line 18
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "__", array(0 => "Area", 1 => "aviators"), "method"), "html", null, true);
        echo ":</span>
            <span class=\"value\">";
        // line 19
        echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute($this->getAttribute((isset($context["property"]) ? $context["property"] : null), "meta"), "_property_area"), 0), "html", null, true);
        echo $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "aviators_settings_get_value", array(0 => "properties", 1 => "units", 2 => "area"), "method");
        echo "</span>
        </div>

        <div class=\"price\">";
        // line 22
        if ($this->getAttribute($this->getAttribute($this->getAttribute((isset($context["property"]) ? $context["property"] : null), "meta"), "_property_custom_text"), 0)) {
            echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute($this->getAttribute((isset($context["property"]) ? $context["property"] : null), "meta"), "_property_custom_text"), 0), "html", null, true);
        } else {
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "aviators_price_format", array(0 => $this->getAttribute($this->getAttribute($this->getAttribute((isset($context["property"]) ? $context["property"] : null), "meta"), "_property_price"), 0)), "method"), "html", null, true);
            if ($this->getAttribute($this->getAttribute($this->getAttribute((isset($context["property"]) ? $context["property"] : null), "meta"), "_property_price_suffix"), 0)) {
                // line 23
                echo "                <span class=\"suffix\">";
                echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute($this->getAttribute((isset($context["property"]) ? $context["property"] : null), "meta"), "_property_price_suffix"), 0), "html", null, true);
                echo "</span>";
            }
        }
        echo "</div>

        <div class=\"link\">
            <a href=\"";
        // line 26
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_permalink", array(0 => $this->getAttribute((isset($context["property"]) ? $context["property"] : null), "ID")), "method"), "html", null, true);
        echo "\">";
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "__", array(0 => "View more", 1 => "aviators"), "method"), "html", null, true);
        echo "</a>
        </div>
    </div>
";
        echo trim(preg_replace('/>\s+</', '><', ob_get_clean()));
    }

    public function getTemplateName()
    {
        return "properties/map-infobox.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  91 => 26,  81 => 23,  75 => 22,  68 => 19,  64 => 18,  51 => 14,  38 => 9,  25 => 4,  453 => 165,  449 => 163,  440 => 159,  433 => 155,  429 => 154,  426 => 153,  424 => 152,  421 => 151,  412 => 147,  405 => 143,  401 => 142,  398 => 141,  396 => 140,  393 => 139,  385 => 133,  370 => 131,  366 => 130,  361 => 128,  354 => 124,  350 => 123,  347 => 122,  345 => 121,  342 => 120,  334 => 114,  319 => 112,  315 => 111,  310 => 109,  303 => 105,  299 => 104,  296 => 103,  294 => 102,  291 => 101,  283 => 95,  268 => 93,  264 => 92,  259 => 90,  252 => 86,  248 => 85,  245 => 84,  243 => 83,  240 => 82,  232 => 76,  217 => 74,  213 => 73,  208 => 71,  201 => 67,  197 => 66,  194 => 65,  192 => 64,  189 => 63,  181 => 57,  166 => 55,  162 => 54,  157 => 52,  150 => 48,  146 => 47,  143 => 46,  141 => 45,  138 => 44,  130 => 38,  115 => 36,  111 => 35,  106 => 33,  99 => 29,  95 => 28,  92 => 27,  90 => 26,  87 => 25,  80 => 20,  56 => 15,  49 => 11,  40 => 8,  29 => 4,  21 => 2,  125 => 53,  122 => 52,  114 => 46,  112 => 45,  107 => 42,  104 => 41,  102 => 40,  96 => 37,  88 => 32,  82 => 29,  78 => 28,  73 => 26,  69 => 25,  65 => 18,  61 => 17,  57 => 22,  53 => 21,  45 => 10,  42 => 9,  34 => 7,  32 => 8,  27 => 4,  24 => 3,  22 => 2,  19 => 1,);
    }
}
