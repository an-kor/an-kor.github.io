<?php

/* helpers/content-loop.twig */
class __TwigTemplate_a6311351920ff322880a59d22c5e61f6 extends Twig_Template
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
        if ($this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "have_posts", array(), "method")) {
            // line 2
            echo "    ";
            $context['_parent'] = (array) $context;
            $context['_seq'] = twig_ensure_traversable((isset($context["posts"]) ? $context["posts"] : null));
            foreach ($context['_seq'] as $context["_key"] => $context["post"]) {
                // line 3
                echo "        ";
                echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp_query"]) ? $context["wp_query"] : null), "the_post", array(), "method"), "html", null, true);
                echo "
        ";
                // line 4
                echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_template_part", array(0 => "content", 1 => $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_post_format", array(), "method")), "method"), "html", null, true);
                echo "
    ";
            }
            $_parent = $context['_parent'];
            unset($context['_seq'], $context['_iterated'], $context['_key'], $context['post'], $context['_parent'], $context['loop']);
            $context = array_merge($_parent, array_intersect_key($context, $_parent));
        } else {
            // line 7
            echo "    ";
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_template_part", array(0 => "content", 1 => "none"), "method"), "html", null, true);
            echo "
";
        }
    }

    public function getTemplateName()
    {
        return "helpers/content-loop.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  40 => 7,  21 => 2,  19 => 1,  91 => 17,  87 => 31,  83 => 29,  77 => 27,  75 => 26,  71 => 24,  65 => 22,  58 => 18,  56 => 17,  52 => 15,  44 => 12,  41 => 11,  39 => 10,  34 => 7,  26 => 3,  20 => 1,  174 => 81,  167 => 82,  165 => 81,  154 => 73,  141 => 63,  127 => 52,  120 => 48,  116 => 47,  110 => 46,  102 => 41,  89 => 31,  73 => 18,  67 => 15,  63 => 21,  57 => 13,  46 => 13,  38 => 8,  32 => 4,  29 => 3,  31 => 4,  28 => 5,);
    }
}
