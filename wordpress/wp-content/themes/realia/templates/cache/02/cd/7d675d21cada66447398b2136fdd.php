<?php

/* properties/slider.twig */
class __TwigTemplate_02cd7d675d21cada66447398b2136fdd extends Twig_Template
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
        if ($this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_post_meta", array(0 => $this->getAttribute((isset($context["post"]) ? $context["post"] : null), "ID"), 1 => "_property_slides", 2 => true), "method")) {
            // line 2
            echo "    <div class=\"carousel property\">
        <div class=\"preview\">
            <a href=\"";
            // line 4
            echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute($this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_post_meta", array(0 => $this->getAttribute((isset($context["post"]) ? $context["post"] : null), "ID"), 1 => "_property_slides", 2 => true), "method"), 0), "imgurl"), "html", null, true);
            echo "\" class=\"fancybox\">
                <img src=\"";
            // line 5
            echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute($this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_post_meta", array(0 => $this->getAttribute((isset($context["post"]) ? $context["post"] : null), "ID"), 1 => "_property_slides", 2 => true), "method"), 0), "imgurl"), "html", null, true);
            echo "\" alt=\"\">
            </a>
        </div>
        <!-- /.preview -->

        <div class=\"content\">
            <ul>
                ";
            // line 12
            $context['_parent'] = (array) $context;
            $context['_seq'] = twig_ensure_traversable($this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_post_meta", array(0 => $this->getAttribute((isset($context["post"]) ? $context["post"] : null), "ID"), 1 => "_property_slides", 2 => true), "method"));
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
            foreach ($context['_seq'] as $context["_key"] => $context["slide"]) {
                // line 13
                echo "                    ";
                if ($this->getAttribute((isset($context["loop"]) ? $context["loop"] : null), "first")) {
                    // line 14
                    echo "                        <li class=\"active\">
                    ";
                } else {
                    // line 16
                    echo "                        <li>
                    ";
                }
                // line 18
                echo "                    <img src=\"";
                echo twig_escape_filter($this->env, $this->getAttribute((isset($context["slide"]) ? $context["slide"] : null), "imgurl"), "html", null, true);
                echo "\" alt=\"\">
                    </li>
                ";
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
            unset($context['_seq'], $context['_iterated'], $context['_key'], $context['slide'], $context['_parent'], $context['loop']);
            $context = array_merge($_parent, array_intersect_key($context, $_parent));
            // line 21
            echo "            </ul>

            <a id=\"carousel-prev\" href=\"#\">";
            // line 23
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "__", array(0 => "Previous", 1 => "aviators"), "method"), "html", null, true);
            echo "</a>
            <a id=\"carousel-next\" href=\"#\">";
            // line 24
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "__", array(0 => "Next", 1 => "aviators"), "method"), "html", null, true);
            echo "</a>
        </div>
        <!-- /.content -->
    </div><!-- /.carousel -->
";
        }
    }

    public function getTemplateName()
    {
        return "properties/slider.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  93 => 24,  89 => 23,  85 => 21,  67 => 18,  59 => 14,  56 => 13,  29 => 5,  25 => 4,  21 => 2,  19 => 1,  125 => 17,  121 => 41,  117 => 39,  112 => 37,  108 => 36,  104 => 34,  98 => 32,  96 => 31,  92 => 29,  86 => 26,  83 => 25,  80 => 24,  76 => 23,  74 => 22,  71 => 21,  69 => 20,  65 => 18,  63 => 16,  52 => 15,  46 => 13,  44 => 12,  41 => 11,  34 => 7,  26 => 4,  20 => 1,  60 => 16,  58 => 15,  55 => 16,  53 => 13,  48 => 11,  45 => 10,  43 => 9,  39 => 12,  37 => 6,  31 => 4,  28 => 5,);
    }
}
