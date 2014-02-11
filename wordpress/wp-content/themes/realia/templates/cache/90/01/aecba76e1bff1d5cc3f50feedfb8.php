<?php

/* properties/helpers/locations.twig */
class __TwigTemplate_9001aecba76e1bff1d5cc3f50feedfb8 extends Twig_Template
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
        echo "new Array(";
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
            echo "[";
            echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute($this->getAttribute((isset($context["property"]) ? $context["property"] : null), "meta"), "_property_latitude"), 0), "html", null, true);
            echo ", ";
            echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute($this->getAttribute((isset($context["property"]) ? $context["property"] : null), "meta"), "_property_longitude"), 0), "html", null, true);
            echo "]";
            if ((!$this->getAttribute((isset($context["loop"]) ? $context["loop"] : null), "last"))) {
                echo ",";
            }
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
        echo ")";
    }

    public function getTemplateName()
    {
        return "properties/helpers/locations.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  453 => 165,  449 => 163,  440 => 159,  433 => 155,  429 => 154,  426 => 153,  424 => 152,  421 => 151,  412 => 147,  405 => 143,  401 => 142,  398 => 141,  396 => 140,  393 => 139,  385 => 133,  370 => 131,  366 => 130,  361 => 128,  354 => 124,  350 => 123,  347 => 122,  345 => 121,  342 => 120,  334 => 114,  319 => 112,  315 => 111,  310 => 109,  303 => 105,  299 => 104,  296 => 103,  294 => 102,  291 => 101,  283 => 95,  268 => 93,  264 => 92,  259 => 90,  252 => 86,  248 => 85,  245 => 84,  243 => 83,  240 => 82,  232 => 76,  217 => 74,  213 => 73,  208 => 71,  201 => 67,  197 => 66,  194 => 65,  192 => 64,  189 => 63,  181 => 57,  166 => 55,  162 => 54,  157 => 52,  150 => 48,  146 => 47,  143 => 46,  141 => 45,  138 => 44,  130 => 38,  115 => 36,  111 => 35,  106 => 33,  99 => 29,  95 => 28,  92 => 27,  90 => 26,  87 => 25,  80 => 20,  56 => 15,  49 => 11,  40 => 8,  29 => 4,  21 => 2,  125 => 53,  122 => 52,  114 => 46,  112 => 45,  107 => 42,  104 => 41,  102 => 40,  96 => 37,  88 => 32,  82 => 29,  78 => 28,  73 => 26,  69 => 25,  65 => 18,  61 => 17,  57 => 22,  53 => 21,  45 => 10,  42 => 9,  34 => 7,  32 => 7,  27 => 4,  24 => 3,  22 => 2,  19 => 1,);
    }
}
