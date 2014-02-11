<?php

/* layout-homepage.twig */
class __TwigTemplate_83a680f32505696f0396bde502a5cbdb extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
            'content' => array($this, 'block_content'),
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        // line 1
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_header", array(), "method"), "html", null, true);
        echo "

<div id=\"content\" class=\"clearfix\">
    ";
        // line 4
        if ($this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "is_active_sidebar", array(0 => "top"), "method")) {
            // line 5
            echo "        ";
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_sidebar", array(0 => "top"), "method"), "html", null, true);
            echo "
    ";
        }
        // line 7
        echo "
    <div class=\"container\">
        <div class=\"row\">
            ";
        // line 10
        $this->env->loadTemplate("helpers/messages.twig")->display($context);
        // line 11
        echo "
            ";
        // line 12
        if ($this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "is_active_sidebar", array(0 => "content-top"), "method")) {
            // line 13
            echo "                ";
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_sidebar", array(0 => "content-top"), "method"), "html", null, true);
            echo "
            ";
        }
        // line 15
        echo "
            <div id=\"main\" class=\"";
        // line 16
        if (($this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "is_active_sidebar", array(0 => "sidebar-primary"), "method") && ($this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "aviators_settings_get_value", array(0 => "properties", 1 => "homepage", 2 => "hide_sidebar"), "method") != "on"))) {
            echo "span9";
        } else {
            echo "span12";
        }
        echo "\">
                ";
        // line 17
        $this->displayBlock('content', $context, $blocks);
        // line 18
        echo "            </div><!-- /#main -->

            ";
        // line 20
        if (($this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "aviators_settings_get_value", array(0 => "properties", 1 => "homepage", 2 => "hide_sidebar"), "method") != "on")) {
            // line 21
            echo "                ";
            if (($this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "is_active_sidebar", array(0 => "sidebar-primary"), "method") || $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "is_active_sidebar", array(0 => "property-detail"), "method"))) {
                // line 22
                echo "                    <div class=\"sidebar span3\">
                        ";
                // line 23
                if ($this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "is_singular", array(0 => "property"), "method")) {
                    // line 24
                    echo "                            ";
                    if ((!$this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "dynamic_sidebar", array(0 => "property-detail"), "method"))) {
                    }
                    // line 25
                    echo "                        ";
                }
                // line 26
                echo "
                        ";
                // line 27
                echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_sidebar", array(0 => "sidebar-primary"), "method"), "html", null, true);
                echo "
                    </div><!-- /#sidebar -->
                ";
            }
            // line 30
            echo "            ";
        }
        // line 31
        echo "        </div><!-- /.row -->

        ";
        // line 33
        if ($this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "is_active_sidebar", array(0 => "content-bottom"), "method")) {
            // line 34
            echo "            ";
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_sidebar", array(0 => "content-bottom"), "method"), "html", null, true);
            echo "
        ";
        }
        // line 36
        echo "    </div><!-- /.container -->

    ";
        // line 38
        if ($this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "is_active_sidebar", array(0 => "bottom"), "method")) {
            // line 39
            echo "        ";
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_sidebar", array(0 => "bottom"), "method"), "html", null, true);
            echo "
    ";
        }
        // line 41
        echo "</div><!-- /#content -->

";
        // line 43
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_footer", array(), "method"), "html", null, true);
    }

    // line 17
    public function block_content($context, array $blocks = array())
    {
    }

    public function getTemplateName()
    {
        return "layout-homepage.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  130 => 17,  126 => 43,  122 => 41,  116 => 39,  114 => 38,  110 => 36,  104 => 34,  102 => 33,  98 => 31,  95 => 30,  89 => 27,  86 => 26,  83 => 25,  79 => 24,  77 => 23,  74 => 22,  71 => 21,  69 => 20,  65 => 18,  63 => 17,  55 => 16,  52 => 15,  46 => 13,  44 => 12,  41 => 11,  39 => 10,  34 => 7,  26 => 4,  20 => 1,  31 => 4,  28 => 5,);
    }
}
