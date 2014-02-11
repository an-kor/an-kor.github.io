<?php

/* settings/tabs.twig */
class __TwigTemplate_01b6f50920d05b44ee0d01ee09efb877 extends Twig_Template
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
        if ((isset($context["tabs"]) ? $context["tabs"] : null)) {
            if ((twig_length_filter($this->env, (isset($context["tabs"]) ? $context["tabs"] : null)) > 1)) {
                // line 2
                echo "    <h2 class=\"nav-tab-wrapper\">
        ";
                // line 3
                $context['_parent'] = (array) $context;
                $context['_seq'] = twig_ensure_traversable((isset($context["tabs"]) ? $context["tabs"] : null));
                foreach ($context['_seq'] as $context["_key"] => $context["tab"]) {
                    // line 4
                    echo "            <a href=\"?page=";
                    echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute((isset($context["tab"]) ? $context["tab"] : null), "settings"), "subpage_slug"), "html", null, true);
                    echo "&tab=";
                    echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute((isset($context["tab"]) ? $context["tab"] : null), "settings"), "slug"), "html", null, true);
                    echo "\" class=\"nav-tab ";
                    if (((isset($context["active_tab"]) ? $context["active_tab"] : null) == $this->getAttribute($this->getAttribute((isset($context["tab"]) ? $context["tab"] : null), "settings"), "slug"))) {
                        echo "nav-tab-active";
                    }
                    echo "\">
                ";
                    // line 5
                    echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute((isset($context["tab"]) ? $context["tab"] : null), "settings"), "title"), "html", null, true);
                    echo "
            </a>
        ";
                }
                $_parent = $context['_parent'];
                unset($context['_seq'], $context['_iterated'], $context['_key'], $context['tab'], $context['_parent'], $context['loop']);
                $context = array_merge($_parent, array_intersect_key($context, $_parent));
                // line 8
                echo "    </h2>
";
            }
        }
    }

    public function getTemplateName()
    {
        return "settings/tabs.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  49 => 8,  40 => 5,  29 => 4,  25 => 3,  22 => 2,  19 => 1,);
    }
}
