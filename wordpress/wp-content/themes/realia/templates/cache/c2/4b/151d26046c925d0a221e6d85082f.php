<?php

/* helpers/searchform.twig */
class __TwigTemplate_c24b151d26046c925d0a221e6d85082f extends Twig_Template
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
        echo "<form method=\"get\" class=\"site-search\" action=\"";
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_bloginfo", array(0 => "wpurl"), "method"), "html", null, true);
        echo "\">
    <div class=\"input-append\">
        <input class=\"search-query form-text\" placeholder=";
        // line 3
        echo "\"";
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "__", array(0 => "Search", 1 => "aviators"), "method"), "html", null, true);
        echo "\"";
        echo " type=\"text\" name=\"s\" id=\"s\" value=\"";
        if ($this->getAttribute((isset($context["q"]) ? $context["q"] : null), "s")) {
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["q"]) ? $context["q"] : null), "s"), "html", null, true);
        }
        echo "\">
        <button type=\"submit\" class=\"btn\"><i class=\"icon-search\"></i></button>
    </div><!-- /.input-append -->
</form><!-- /.site-search -->";
    }

    public function getTemplateName()
    {
        return "helpers/searchform.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  25 => 3,  19 => 1,);
    }
}
