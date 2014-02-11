<?php

/* shortcodes/pricing.twig */
class __TwigTemplate_b21f9524609daf9ca8779a7251f5783f extends Twig_Template
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
        echo "<div class=\"pricing boxed\">
    <div class=\"column ";
        // line 2
        if (((isset($context["promoted"]) ? $context["promoted"] : null) == "yes")) {
            echo "promoted";
        }
        echo "\">
        ";
        // line 3
        if ((isset($context["title"]) ? $context["title"] : null)) {
            // line 4
            echo "            <h2>";
            echo twig_escape_filter($this->env, (isset($context["title"]) ? $context["title"] : null), "html", null, true);
            echo "</h2>
        ";
        }
        // line 6
        echo "
        <div class=\"content\">
            ";
        // line 8
        if ((isset($context["price"]) ? $context["price"] : null)) {
            // line 9
            echo "                <h3>";
            echo twig_escape_filter($this->env, (isset($context["price"]) ? $context["price"] : null), "html", null, true);
            echo "</h3>
            ";
        }
        // line 11
        echo "
            ";
        // line 12
        if ((isset($context["subtitle"]) ? $context["subtitle"] : null)) {
            // line 13
            echo "                <h4>";
            echo twig_escape_filter($this->env, (isset($context["subtitle"]) ? $context["subtitle"] : null), "html", null, true);
            echo "</h4>
            ";
        }
        // line 15
        echo "
            ";
        // line 16
        echo $this->getAttribute((isset($context["post"]) ? $context["post"] : null), "post_content");
        echo "

            ";
        // line 18
        if (((isset($context["link"]) ? $context["link"] : null) && (isset($context["button_text"]) ? $context["button_text"] : null))) {
            // line 19
            echo "                <a href=\"";
            echo twig_escape_filter($this->env, (isset($context["link"]) ? $context["link"] : null), "html", null, true);
            echo "\" class=\"btn btn-primary btn-large\">";
            echo twig_escape_filter($this->env, (isset($context["button_text"]) ? $context["button_text"] : null), "html", null, true);
            echo "</a>
            ";
        }
        // line 21
        echo "        </div>
        <!-- /.content -->
    </div>
    <!-- /.column -->
</div><!-- /.pricing -->";
    }

    public function getTemplateName()
    {
        return "shortcodes/pricing.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  77 => 21,  69 => 19,  67 => 18,  62 => 16,  59 => 15,  53 => 13,  51 => 12,  48 => 11,  42 => 9,  40 => 8,  36 => 6,  30 => 4,  28 => 3,  22 => 2,  19 => 1,);
    }
}
