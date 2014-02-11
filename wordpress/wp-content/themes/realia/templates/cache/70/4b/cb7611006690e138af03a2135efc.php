<?php

/* properties/property-row.twig */
class __TwigTemplate_704bcb7611006690e138af03a2135efc extends Twig_Template
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
        echo "<div class=\"property span9\">
    <div class=\"row\">
        <div class=\"image span3\">
            <div class=\"content\">
                <a href=\"";
        // line 5
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_permalink", array(0 => $this->getAttribute((isset($context["property"]) ? $context["property"] : null), "ID")), "method"), "html", null, true);
        echo "\"></a>
                ";
        // line 6
        if ($this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_the_post_thumbnail", array(0 => $this->getAttribute((isset($context["property"]) ? $context["property"] : null), "ID")), "method")) {
            // line 7
            echo "                    <img src=\"";
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "aq_resize", array(0 => $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "wp_get_attachment_url", array(0 => $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_post_thumbnail_id", array(0 => $this->getAttribute((isset($context["property"]) ? $context["property"] : null), "ID")), "method"), 1 => "full"), "method"), 1 => 270, 2 => 200, 3 => "true"), "method"), "html", null, true);
            echo "\" alt=\"";
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["property"]) ? $context["property"] : null), "post_title"), "html", null, true);
            echo "\">
                ";
        } else {
            // line 9
            echo "                    <img src=\"";
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_template_directory_uri", array(), "method"), "html", null, true);
            echo "/assets/img/property-tmp-small.png\" alt=\"";
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["property"]) ? $context["property"] : null), "post_title"), "html", null, true);
            echo "\">
                ";
        }
        // line 11
        echo "            </div>
            <!-- /.content -->
        </div>
        <!-- /.image -->

        <div class=\"body span6\">
            <div class=\"title-price row\">
                <div class=\"title span4\">
                    <h2><a href=\"";
        // line 19
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_permalink", array(0 => $this->getAttribute((isset($context["property"]) ? $context["property"] : null), "ID")), "method"), "html", null, true);
        echo "\">";
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["property"]) ? $context["property"] : null), "post_title"), "html", null, true);
        echo "</a></h2>
                </div>
                <!-- /.title -->

                <div class=\"price\">";
        // line 23
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "aviators_price_format", array(0 => $this->getAttribute($this->getAttribute($this->getAttribute((isset($context["property"]) ? $context["property"] : null), "meta"), "_property_price"), 0)), "method"), "html", null, true);
        if ($this->getAttribute($this->getAttribute($this->getAttribute((isset($context["property"]) ? $context["property"] : null), "meta"), "_property_price_suffix"), 0)) {
            // line 24
            echo "                        <span class=\"suffix\">";
            echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute($this->getAttribute((isset($context["property"]) ? $context["property"] : null), "meta"), "_property_price_suffix"), 0), "html", null, true);
            echo "</span>";
        }
        echo "</div>
                <!-- /.price -->
            </div>
            <!-- /.title -->

            <div class=\"location\">";
        // line 29
        echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute($this->getAttribute((isset($context["property"]) ? $context["property"] : null), "location"), 0), "name"), "html", null, true);
        echo "</div>
            <!-- /.location -->

            <div class=\"body\">
                ";
        // line 33
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "aviators_core_get_post_teaser", array(0 => $this->getAttribute((isset($context["property"]) ? $context["property"] : null), "ID")), "method"), "html", null, true);
        echo "
            </div>
            <!-- /.body -->

            <div class=\"info clearfix\">
                ";
        // line 38
        if ($this->getAttribute($this->getAttribute($this->getAttribute((isset($context["property"]) ? $context["property"] : null), "meta"), "_property_area"), 0)) {
            // line 39
            echo "                    <div class=\"area\">
                        <span class=\"key\">";
            // line 40
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "__", array(0 => "Area", 1 => "aviators"), "method"), "html", null, true);
            echo ":</span><!-- /.key -->
                        <span class=\"value\">";
            // line 41
            echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute($this->getAttribute((isset($context["property"]) ? $context["property"] : null), "meta"), "_property_area"), 0), "html", null, true);
            echo $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "aviators_settings_get_value", array(0 => "properties", 1 => "units", 2 => "area"), "method");
            echo "</span><!-- /.value -->
                    </div><!-- /.area -->
                ";
        }
        // line 44
        echo "
                ";
        // line 45
        if ($this->getAttribute($this->getAttribute($this->getAttribute((isset($context["property"]) ? $context["property"] : null), "meta"), "_property_bedrooms"), 0)) {
            // line 46
            echo "                    <div class=\"bedrooms\" title=\"";
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "__", array(0 => "Bedrooms", 1 => "aviators"), "method"), "html", null, true);
            echo "\">
                        <div class=\"content\">";
            // line 47
            echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute($this->getAttribute((isset($context["property"]) ? $context["property"] : null), "meta"), "_property_bedrooms"), 0), "html", null, true);
            echo "</div>
                    </div><!-- /.bedrooms -->
                ";
        }
        // line 50
        echo "
                ";
        // line 51
        if ($this->getAttribute($this->getAttribute($this->getAttribute((isset($context["property"]) ? $context["property"] : null), "meta"), "_property_bathrooms"), 0)) {
            // line 52
            echo "                    <div class=\"bathrooms\" title=\"";
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "__", array(0 => "Bathrooms", 1 => "aviators"), "method"), "html", null, true);
            echo "\">
                        <div class=\"content\">";
            // line 53
            echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute($this->getAttribute((isset($context["property"]) ? $context["property"] : null), "meta"), "_property_bathrooms"), 0), "html", null, true);
            echo "</div>
                    </div><!-- /.bathrooms -->
                ";
        }
        // line 56
        echo "            </div>
            <!-- /.info -->
        </div>
        <!-- /.body -->
    </div>
    <!-- /.row -->
</div><!-- /.property -->
";
    }

    public function getTemplateName()
    {
        return "properties/property-row.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  143 => 56,  137 => 53,  132 => 52,  130 => 51,  127 => 50,  121 => 47,  114 => 45,  111 => 44,  104 => 41,  100 => 40,  97 => 39,  95 => 38,  87 => 33,  80 => 29,  69 => 24,  57 => 19,  47 => 11,  39 => 9,  29 => 6,  25 => 5,  19 => 1,  150 => 51,  136 => 50,  133 => 49,  116 => 46,  109 => 44,  105 => 42,  103 => 41,  92 => 33,  88 => 32,  81 => 28,  75 => 25,  66 => 23,  60 => 15,  52 => 13,  46 => 11,  44 => 10,  40 => 9,  31 => 7,  28 => 3,);
    }
}
