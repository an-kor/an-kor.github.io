<?php

/* single-agent.twig */
class __TwigTemplate_ab5f7811a793adc9fd5a0e6cb19d15c3 extends Twig_Template
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

\t<div class=\"agent\">
\t    <div class=\"row\">
\t        <div class=\"image span2\">
\t            <a href=\"";
        // line 9
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_permalink", array(0 => $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_the_ID", array(), "method")), "method"), "html", null, true);
        echo "\">
\t                ";
        // line 10
        if ($this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_the_post_thumbnail", array(0 => $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_the_ID", array(), "method")), "method")) {
            // line 11
            echo "\t                    ";
            echo $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_the_post_thumbnail", array(0 => $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_the_ID", array(), "method")), "method");
            echo "
\t                ";
        } else {
            // line 13
            echo "\t                    <img src=\"";
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_template_directory_uri", array(), "method"), "html", null, true);
            echo "/assets/img/agent-tmp.png\" alt=\"";
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["property"]) ? $context["property"] : null), "post_title"), "html", null, true);
            echo "\">
\t                ";
        }
        // line 15
        echo "\t            </a>
\t        </div><!-- /.image -->

\t        <div class=\"body span4\">
\t            ";
        // line 19
        echo $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "do_shortcode", array(0 => $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "apply_filters", array(0 => "the_content", 1 => $this->getAttribute((isset($context["post"]) ? $context["post"] : null), "post_content")), "method")), "method");
        echo "
\t        </div><!-- /.body -->

\t        <div class=\"info span3\">
\t            <div class=\"box\">
\t                <div class=\"phone\">
\t                    ";
        // line 25
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_post_meta", array(0 => $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_the_ID", array(), "method"), 1 => "_agent_mobile", 2 => true), "method"), "html", null, true);
        echo "
\t                </div><!-- /.phone -->
\t                <div class=\"office\">
\t                    ";
        // line 28
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_post_meta", array(0 => $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_the_ID", array(), "method"), 1 => "_agent_phone", 2 => true), "method"), "html", null, true);
        echo "
\t                </div><!-- /.office -->

\t                <div class=\"email\">
\t                    <a href=\"mailto:";
        // line 32
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_post_meta", array(0 => $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_the_ID", array(), "method"), 1 => "_agent_email", 2 => true), "method"), "html", null, true);
        echo "\">
\t                        ";
        // line 33
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_post_meta", array(0 => $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_the_ID", array(), "method"), 1 => "_agent_email", 2 => true), "method"), "html", null, true);
        echo "
\t                    </a>
\t                </div><!-- /.email -->
\t            </div><!-- /.box -->
\t        </div><!-- /.info -->
\t    </div><!-- /.row -->
\t</div><!-- /.agent -->

    ";
        // line 41
        if ((isset($context["properties"]) ? $context["properties"] : null)) {
            // line 42
            echo "        <hr>

        <h2 class=\"page-header\">";
            // line 44
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "__", array(0 => "Assigned Properties", 1 => "aviators"), "method"), "html", null, true);
            echo "</h2>

        <div class=\"properties-rows\">
            <div class=\"row\">
                ";
            // line 48
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
                // line 49
                echo "                    ";
                $this->env->loadTemplate("properties/property-row.twig")->display($context);
                // line 50
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
            // line 51
            echo "            </div><!-- /.row -->
        </div><!-- /.properties -->
    ";
        }
    }

    public function getTemplateName()
    {
        return "single-agent.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  150 => 51,  136 => 50,  133 => 49,  116 => 48,  109 => 44,  105 => 42,  103 => 41,  92 => 33,  88 => 32,  81 => 28,  75 => 25,  66 => 19,  60 => 15,  52 => 13,  46 => 11,  44 => 10,  40 => 9,  31 => 4,  28 => 3,);
    }
}
