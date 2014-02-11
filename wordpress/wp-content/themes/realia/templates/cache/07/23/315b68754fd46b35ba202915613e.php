<?php

/* agencies/widget.twig */
class __TwigTemplate_0723315b68754fd46b35ba202915613e extends Twig_Template
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
        if ((isset($context["agencies"]) ? $context["agencies"] : null)) {
            // line 2
            echo "    ";
            echo (isset($context["before_widget"]) ? $context["before_widget"] : null);
            echo "

    ";
            // line 4
            if ((isset($context["title"]) ? $context["title"] : null)) {
                // line 5
                echo "        ";
                echo (isset($context["before_title"]) ? $context["before_title"] : null);
                echo twig_escape_filter($this->env, (isset($context["title"]) ? $context["title"] : null), "html", null, true);
                echo (isset($context["after_title"]) ? $context["after_title"] : null);
                echo "
    ";
            }
            // line 7
            echo "
    <div class=\"content\">
        ";
            // line 9
            $context['_parent'] = (array) $context;
            $context['_seq'] = twig_ensure_traversable((isset($context["agencies"]) ? $context["agencies"] : null));
            foreach ($context['_seq'] as $context["_key"] => $context["agency"]) {
                // line 10
                echo "            <div class=\"agency clearfix\">
                <div class=\"header\">
                    <div class=\"image\">
                        <a href=\"";
                // line 13
                echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_permalink", array(0 => $this->getAttribute((isset($context["agency"]) ? $context["agency"] : null), "ID")), "method"), "html", null, true);
                echo "\">
                            ";
                // line 14
                if ($this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_the_post_thumbnail", array(0 => $this->getAttribute((isset($context["agency"]) ? $context["agency"] : null), "ID")), "method")) {
                    // line 15
                    echo "                                ";
                    echo $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_the_post_thumbnail", array(0 => $this->getAttribute((isset($context["agency"]) ? $context["agency"] : null), "ID")), "method");
                    echo "
                            ";
                } else {
                    // line 17
                    echo "                                <img src=\"";
                    echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_template_directory_uri", array(), "method"), "html", null, true);
                    echo "/assets/img/agency-small-tmp.png\" alt=\"";
                    echo twig_escape_filter($this->env, $this->getAttribute((isset($context["agency"]) ? $context["agency"] : null), "post_title"), "html", null, true);
                    echo "\">
                            ";
                }
                // line 19
                echo "                        </a>
                    </div>
                    <!-- /.image -->

                    <div class=\"info\">
                        <h2>";
                // line 24
                echo twig_escape_filter($this->env, $this->getAttribute((isset($context["agency"]) ? $context["agency"] : null), "post_title"), "html", null, true);
                echo "</h2>

                        <div class=\"properties-count\">
                            <span class=\"number\">";
                // line 27
                echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "aviators_agencies_get_properties_count", array(0 => $this->getAttribute((isset($context["agency"]) ? $context["agency"] : null), "ID")), "method"), "html", null, true);
                echo "</span> ";
                echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "__", array(0 => "properties", 1 => "aviators"), "method"), "html", null, true);
                echo "
                        </div>
                        <!-- /.properties-count -->

                        <a href=\"";
                // line 31
                echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_permalink", array(0 => $this->getAttribute((isset($context["agency"]) ? $context["agency"] : null), "ID")), "method"), "html", null, true);
                echo "\" class=\"btn\">";
                echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "__", array(0 => "View profile", 1 => "aviators"), "method"), "html", null, true);
                echo "</a>
                    </div>
                    <!-- /.info -->
                </div>
                <!-- /.header -->

                ";
                // line 37
                if ($this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_post_meta", array(0 => $this->getAttribute((isset($context["agency"]) ? $context["agency"] : null), "ID"), 1 => "_agency_address", 2 => true), "method")) {
                    // line 38
                    echo "                    <div class=\"address\">
                        ";
                    // line 39
                    echo nl2br(twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_post_meta", array(0 => $this->getAttribute((isset($context["agency"]) ? $context["agency"] : null), "ID"), 1 => "_agency_address", 2 => true), "method"), "html", null, true));
                    echo "
                    </div><!-- /.address -->
                ";
                }
                // line 42
                echo "
                ";
                // line 43
                if ($this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_post_meta", array(0 => $this->getAttribute((isset($context["agency"]) ? $context["agency"] : null), "ID"), 1 => "_agency_email", 2 => true), "method")) {
                    // line 44
                    echo "                    <div class=\"email\">
                        <a href=\"mailto:";
                    // line 45
                    echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_post_meta", array(0 => $this->getAttribute((isset($context["agency"]) ? $context["agency"] : null), "ID"), 1 => "_agency_email", 2 => true), "method"), "html", null, true);
                    echo "\">";
                    echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_post_meta", array(0 => $this->getAttribute((isset($context["agency"]) ? $context["agency"] : null), "ID"), 1 => "_agency_email", 2 => true), "method"), "html", null, true);
                    echo "</a>
                    </div><!-- /.email -->
                ";
                }
                // line 48
                echo "
                ";
                // line 49
                if ($this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_post_meta", array(0 => $this->getAttribute((isset($context["agency"]) ? $context["agency"] : null), "ID"), 1 => "_agency_phone", 2 => true), "method")) {
                    // line 50
                    echo "                    <div class=\"phone\">
                        ";
                    // line 51
                    echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_post_meta", array(0 => $this->getAttribute((isset($context["agency"]) ? $context["agency"] : null), "ID"), 1 => "_agency_phone", 2 => true), "method"), "html", null, true);
                    echo "
                    </div><!-- /.phone -->
                ";
                }
                // line 54
                echo "
                ";
                // line 55
                if ($this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_post_meta", array(0 => $this->getAttribute((isset($context["agency"]) ? $context["agency"] : null), "ID"), 1 => "_agency_url", 2 => true), "method")) {
                    // line 56
                    echo "                    <div class=\"url\">
                        <a href=\"";
                    // line 57
                    echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_post_meta", array(0 => $this->getAttribute((isset($context["agency"]) ? $context["agency"] : null), "ID"), 1 => "_agency_url", 2 => true), "method"), "html", null, true);
                    echo "\">";
                    echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_post_meta", array(0 => $this->getAttribute((isset($context["agency"]) ? $context["agency"] : null), "ID"), 1 => "_agency_url", 2 => true), "method"), "html", null, true);
                    echo "</a>
                    </div>
                ";
                }
                // line 60
                echo "            </div><!-- /.agency -->
        ";
            }
            $_parent = $context['_parent'];
            unset($context['_seq'], $context['_iterated'], $context['_key'], $context['agency'], $context['_parent'], $context['loop']);
            $context = array_merge($_parent, array_intersect_key($context, $_parent));
            // line 62
            echo "    </div><!-- /.content -->

    ";
            // line 64
            echo (isset($context["after_widget"]) ? $context["after_widget"] : null);
            echo "
";
        }
    }

    public function getTemplateName()
    {
        return "agencies/widget.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  171 => 64,  167 => 62,  160 => 60,  152 => 57,  149 => 56,  147 => 55,  144 => 54,  138 => 51,  135 => 50,  133 => 49,  130 => 48,  122 => 45,  119 => 44,  117 => 43,  114 => 42,  108 => 39,  105 => 38,  103 => 37,  92 => 31,  83 => 27,  77 => 24,  70 => 19,  62 => 17,  56 => 15,  54 => 14,  50 => 13,  45 => 10,  41 => 9,  37 => 7,  29 => 5,  27 => 4,  21 => 2,  19 => 1,);
    }
}
