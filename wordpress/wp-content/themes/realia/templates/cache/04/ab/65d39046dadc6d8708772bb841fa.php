<?php

/* layout-fullwidth.twig */
class __TwigTemplate_04ab65d39046dadc6d8708772bb841fa extends Twig_Template
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
            <div id=\"main\" class=\"span12\">
                ";
        // line 17
        $this->displayBlock('content', $context, $blocks);
        // line 18
        echo "            </div><!-- /#main -->
        </div><!-- /.row -->

        ";
        // line 21
        if ($this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "is_active_sidebar", array(0 => "content-bottom"), "method")) {
            // line 22
            echo "            ";
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_sidebar", array(0 => "content-bottom"), "method"), "html", null, true);
            echo "
        ";
        }
        // line 24
        echo "    </div><!-- /.container -->

    ";
        // line 26
        if ($this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "is_active_sidebar", array(0 => "bottom"), "method")) {
            // line 27
            echo "        ";
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_sidebar", array(0 => "bottom"), "method"), "html", null, true);
            echo "
    ";
        }
        // line 29
        echo "</div><!-- /#content -->

";
        // line 31
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_footer", array(), "method"), "html", null, true);
    }

    // line 17
    public function block_content($context, array $blocks = array())
    {
    }

    public function getTemplateName()
    {
        return "layout-fullwidth.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  91 => 17,  87 => 31,  83 => 29,  77 => 27,  75 => 26,  71 => 24,  65 => 22,  58 => 18,  56 => 17,  52 => 15,  44 => 12,  41 => 11,  39 => 10,  34 => 7,  26 => 4,  20 => 1,  174 => 81,  167 => 82,  165 => 81,  154 => 73,  141 => 63,  127 => 52,  120 => 48,  116 => 47,  110 => 46,  102 => 41,  89 => 31,  73 => 18,  67 => 15,  63 => 21,  57 => 13,  46 => 13,  38 => 8,  32 => 4,  29 => 3,  31 => 4,  28 => 5,);
    }
}
