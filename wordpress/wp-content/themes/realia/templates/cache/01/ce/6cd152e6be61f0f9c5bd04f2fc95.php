<?php

/* settings/wrapper.twig */
class __TwigTemplate_01ce6cd152e6be61f0f9c5bd04f2fc95 extends Twig_Template
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
        echo "<form method=\"post\" action=\"options.php\" enctype=\"multipart/form-data\">
    <div class=\"aviators\">
        <div class=\"aviators-wrapper clear\">
            <h2 class=\"page-title\">
                ";
        // line 5
        echo twig_escape_filter($this->env, (isset($context["title"]) ? $context["title"] : null), "html", null, true);
        echo "

                ";
        // line 7
        if ((isset($context["page_title"]) ? $context["page_title"] : null)) {
            // line 8
            echo "                    / ";
            echo twig_escape_filter($this->env, (isset($context["page_title"]) ? $context["page_title"] : null), "html", null, true);
            echo "
                ";
        }
        // line 10
        echo "
                ";
        // line 11
        if ((isset($context["active_tab_title"]) ? $context["active_tab_title"] : null)) {
            // line 12
            echo "                    / ";
            echo twig_escape_filter($this->env, (isset($context["active_tab_title"]) ? $context["active_tab_title"] : null), "html", null, true);
            echo "
                ";
        }
        // line 14
        echo "            </h2>

            <div class=\"aviators-actions\">
                ";
        // line 17
        echo (isset($context["submit"]) ? $context["submit"] : null);
        echo "
            </div>

            <div class=\"aviators-main\">
                <div class=\"aviators-inner\">
                    ";
        // line 22
        if ((isset($context["tabs"]) ? $context["tabs"] : null)) {
            // line 23
            echo "                        <div class=\"aviators-sidebar\">
                            ";
            // line 24
            echo twig_escape_filter($this->env, (isset($context["settings_tabs"]) ? $context["settings_tabs"] : null), "html", null, true);
            echo "
                            ";
            // line 25
            echo (isset($context["tabs"]) ? $context["tabs"] : null);
            echo "
                        </div><!-- /.aviators-tabs -->
                    ";
        }
        // line 28
        echo "
                    <div class=\"aviators-content\">
                        ";
        // line 30
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "settings_errors"), "html", null, true);
        echo "

                        ";
        // line 32
        $context['_parent'] = (array) $context;
        $context['_seq'] = twig_ensure_traversable((isset($context["forms"]) ? $context["forms"] : null));
        foreach ($context['_seq'] as $context["_key"] => $context["form"]) {
            // line 33
            echo "                            ";
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "settings_fields", array(0 => (isset($context["form"]) ? $context["form"] : null)), "method"), "html", null, true);
            echo "
                            ";
            // line 34
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "do_settings_sections", array(0 => (isset($context["form"]) ? $context["form"] : null)), "method"), "html", null, true);
            echo "
                        ";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['_key'], $context['form'], $context['_parent'], $context['loop']);
        $context = array_merge($_parent, array_intersect_key($context, $_parent));
        // line 36
        echo "
                    </div>
                    <!-- /.aviators-content -->
                </div>
                <!-- /.aviators-inner -->
            </div>
            <!-- /.aviators-main -->

            <div class=\"aviators-actions bottom\">
                ";
        // line 45
        echo (isset($context["submit"]) ? $context["submit"] : null);
        echo "
            </div>

        </div>
        <!-- /.aviators-wrapper -->
    </div>
    <!-- /.aviators -->
</form>";
    }

    public function getTemplateName()
    {
        return "settings/wrapper.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  114 => 45,  103 => 36,  95 => 34,  90 => 33,  86 => 32,  81 => 30,  77 => 28,  71 => 25,  67 => 24,  64 => 23,  62 => 22,  54 => 17,  49 => 14,  43 => 12,  41 => 11,  38 => 10,  32 => 8,  30 => 7,  25 => 5,  19 => 1,);
    }
}
