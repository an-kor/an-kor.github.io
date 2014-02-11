<?php

/* single-agency.twig */
class __TwigTemplate_13d21ef14481433a00c45449b5b22595 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = $this->env->loadTemplate("layout.twig");

        $this->blocks = array(
            'content' => array($this, 'block_content'),
        );
    }

    protected function doGetParent(array $context)
    {
        return "layout.twig";
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        $this->parent->display($context, array_merge($this->blocks, $blocks));
    }

    // line 3
    public function block_content($context, array $blocks = array())
    {
        // line 4
        echo "    <h1 class=\"page-header\">";
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["post"]) ? $context["post"] : null), "post_title"), "html", null, true);
        echo "</h1>

    <div class=\"agency\">
        <div class=\"row\">
            <div class=\"image span3\">
                <a href=\"";
        // line 9
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_permalink", array(0 => $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_the_ID", array(), "method")), "method"), "html", null, true);
        echo "\">
                    ";
        // line 10
        if ($this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_the_post_thumbnail", array(0 => $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_the_ID", array(), "method")), "method")) {
            // line 11
            echo "                        ";
            echo $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_the_post_thumbnail", array(0 => $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_the_ID", array(), "method")), "method");
            echo "
                    ";
        } else {
            // line 13
            echo "                        <img src=\"";
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_template_directory_uri", array(), "method"), "html", null, true);
            echo "/assets/img/agency-tmp.png\" alt=\"";
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["property"]) ? $context["property"] : null), "post_title"), "html", null, true);
            echo "\">
                    ";
        }
        // line 15
        echo "                </a>
            </div><!-- /.image -->

            <div class=\"info span6\">
                <div class=\"box\">
                    <div class=\"address\">
                        ";
        // line 21
        echo nl2br(twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_post_meta", array(0 => $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_the_ID", array(), "method"), 1 => "_agency_address", 2 => true), "method"), "html", null, true));
        echo "
                    </div><!-- /.address -->

                    <div class=\"email\">
                        <a href=\"mailto:";
        // line 25
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_post_meta", array(0 => $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_the_ID", array(), "method"), 1 => "_agency_email", 2 => true), "method"), "html", null, true);
        echo "\">";
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_post_meta", array(0 => $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_the_ID", array(), "method"), 1 => "_agency_email", 2 => true), "method"), "html", null, true);
        echo "</a>
                    </div><!-- /.email -->

                    <div class=\"phone\">
                        ";
        // line 29
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_post_meta", array(0 => $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_the_ID", array(), "method"), 1 => "_agency_phone", 2 => true), "method"), "html", null, true);
        echo "
                    </div><!-- /.phone -->
                </div><!-- /.box -->
            </div><!-- /.info -->
        </div><!-- /.row -->

        <div class=\"row\">
            <div class=\"span9\">
                <h2>";
        // line 37
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "__", array(0 => "About Agency", 1 => "aviators"), "method"), "html", null, true);
        echo "</h2>

                ";
        // line 39
        echo $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "do_shortcode", array(0 => $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "apply_filters", array(0 => "the_content", 1 => $this->getAttribute((isset($context["post"]) ? $context["post"] : null), "post_content")), "method")), "method");
        echo "
            </div><!-- /.span9 -->
        </div><!-- /.row -->
    </div><!-- /.agent -->

    ";
        // line 44
        if ((isset($context["properties"]) ? $context["properties"] : null)) {
            // line 45
            echo "        <hr>

        <h2 class=\"page-header\">";
            // line 47
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "__", array(0 => "Assigned Properties", 1 => "aviators"), "method"), "html", null, true);
            echo "</h2>

        <div class=\"properties-grid\">
            <div class=\"row-fluid\">
                ";
            // line 51
            $context['_parent'] = (array) $context;
            $context['_seq'] = twig_ensure_traversable((isset($context["properties"]) ? $context["properties"] : null));
            $context['loop'] = array(
              'parent' => $context['_parent'],
              'index0' => 0,
              'index'  => 1,
              'first'  => true,
            );
            if (is_array($context['_seq']) || (is_object($context['_seq']) && $context['_seq'] instanceof Countable)) {
                $length = count($context['_seq']);
                $context['loop']['revindex0'] = $length - 1;
                $context['loop']['revindex'] = $length;
                $context['loop']['length'] = $length;
                $context['loop']['last'] = 1 === $length;
            }
            foreach ($context['_seq'] as $context["_key"] => $context["property"]) {
                // line 52
                echo "                <div class=\"span3\">
                    ";
                // line 53
                $this->env->loadTemplate("properties/property-box-small.twig")->display($context);
                // line 54
                echo "                </div>
                ";
                // line 55
                if ((($this->getAttribute((isset($context["loop"]) ? $context["loop"] : null), "index") % 4) == 0)) {
                    // line 56
                    echo "            </div>
            <div class=\"row-fluid\">
                ";
                }
                // line 59
                echo "                ";
                ++$context['loop']['index0'];
                ++$context['loop']['index'];
                $context['loop']['first'] = false;
                if (isset($context['loop']['length'])) {
                    --$context['loop']['revindex0'];
                    --$context['loop']['revindex'];
                    $context['loop']['last'] = 0 === $context['loop']['revindex0'];
                }
            }
            $_parent = $context['_parent'];
            unset($context['_seq'], $context['_iterated'], $context['_key'], $context['property'], $context['_parent'], $context['loop']);
            $context = array_merge($_parent, array_intersect_key($context, $_parent));
            // line 60
            echo "            </div><!-- /.row -->
        </div><!-- /.properties -->
    ";
        }
    }

    public function getTemplateName()
    {
        return "single-agency.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  167 => 60,  153 => 59,  148 => 56,  146 => 55,  143 => 54,  141 => 53,  138 => 52,  121 => 51,  114 => 47,  110 => 45,  108 => 44,  100 => 39,  95 => 37,  84 => 29,  75 => 25,  68 => 21,  60 => 15,  52 => 13,  46 => 11,  44 => 10,  40 => 9,  31 => 4,  28 => 3,);
    }
}
