<?php

/* layout-left.twig */
class __TwigTemplate_58459f7428fd10918527f2d9f37b208d extends Twig_Template
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
            ";
        // line 16
        if (($this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "is_active_sidebar", array(0 => "sidebar-primary"), "method") || $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "is_active_sidebar", array(0 => "property-detail"), "method"))) {
            // line 17
            echo "                <div class=\"sidebar span3\">
                    ";
            // line 18
            if ($this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "is_singular", array(0 => "property"), "method")) {
                // line 19
                echo "                        ";
                if ((!$this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "dynamic_sidebar", array(0 => "property-detail"), "method"))) {
                }
                // line 20
                echo "                    ";
            }
            // line 21
            echo "
                    ";
            // line 22
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_sidebar", array(0 => "sidebar-primary"), "method"), "html", null, true);
            echo "
                </div><!-- /#sidebar -->
            ";
        }
        // line 25
        echo "            
            <div id=\"main\" class=\"";
        // line 26
        if ($this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "is_active_sidebar", array(0 => "sidebar-primary"), "method")) {
            echo "span9";
        } else {
            echo "span12";
        }
        echo "\">
                ";
        // line 27
        $this->displayBlock('content', $context, $blocks);
        // line 28
        echo "            </div><!-- /#main -->
        </div><!-- /.row -->

        ";
        // line 31
        if ($this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "is_active_sidebar", array(0 => "content-bottom"), "method")) {
            echo "        
    
                ";
            // line 33
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_sidebar", array(0 => "content-bottom"), "method"), "html", null, true);
            echo "
        ";
        }
        // line 35
        echo "    </div><!-- /.container -->

    ";
        // line 37
        if ($this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "is_active_sidebar", array(0 => "bottom"), "method")) {
            echo "    
        ";
            // line 38
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_sidebar", array(0 => "bottom"), "method"), "html", null, true);
            echo "
    ";
        }
        // line 40
        echo "</div><!-- /#content -->

";
        // line 42
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_footer", array(), "method"), "html", null, true);
    }

    // line 27
    public function block_content($context, array $blocks = array())
    {
    }

    public function getTemplateName()
    {
        return "layout-left.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  127 => 27,  123 => 42,  119 => 40,  114 => 38,  110 => 37,  106 => 35,  101 => 33,  96 => 31,  91 => 28,  89 => 27,  81 => 26,  78 => 25,  72 => 22,  69 => 21,  66 => 20,  62 => 19,  60 => 18,  57 => 17,  55 => 16,  52 => 15,  46 => 13,  44 => 12,  41 => 11,  39 => 10,  34 => 7,  26 => 4,  20 => 1,  31 => 4,  28 => 5,);
    }
}
