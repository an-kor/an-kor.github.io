<?php

/* helpers/sidebar-top.twig */
class __TwigTemplate_43a881bd66928b8711fc404ff0bacac7 extends Twig_Template
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
        echo "<div class=\"top-wrapper\">
    <div class=\"top\">
        <div class=\"top-inner\">
            ";
        // line 4
        if ((!aviators_templates_helpers_dynamic_sidebar("top"))) {
        }
        // line 5
        echo "        </div><!-- /.top-inner -->
    </div><!-- /.top -->
</div><!-- /.top-wrapper -->";
    }

    public function getTemplateName()
    {
        return "helpers/sidebar-top.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  27 => 5,  24 => 4,  19 => 1,);
    }
}
