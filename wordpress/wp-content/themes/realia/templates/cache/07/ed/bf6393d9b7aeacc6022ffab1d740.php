<?php

/* settings/fields/boolean.twig */
class __TwigTemplate_07edbf6393d9b7aeacc6022ffab1d740 extends Twig_Template
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
        echo "<input type=\"checkbox\" ";
        if ((isset($context["value"]) ? $context["value"] : null)) {
            echo "checked=\"checked\"";
        }
        echo " name=\"";
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["args"]) ? $context["args"] : null), "id"), "html", null, true);
        echo "\" id=\"";
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["args"]) ? $context["args"] : null), "id"), "html", null, true);
        echo "\">

";
        // line 3
        if ($this->getAttribute((isset($context["option"]) ? $context["option"] : null), "description")) {
            // line 4
            echo "    <p class=\"description\">";
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["option"]) ? $context["option"] : null), "description"), "html", null, true);
            echo "</p>
";
        }
    }

    public function getTemplateName()
    {
        return "settings/fields/boolean.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  33 => 4,  31 => 3,  19 => 1,);
    }
}
