<?php

/* helpers/content-loop.twig */
class __TwigTemplate_ca70c2560d709f9d9260e3f20dd51579 extends Twig_Template
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
        return array (  40 => 7,  26 => 3,  21 => 2,  19 => 1,  31 => 4,  28 => 3,);
    }
}
