<?php

/* properties/amenities.twig */
class __TwigTemplate_315645bbd197a613f9ec521b4ce0a311 extends Twig_Template
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
        if ((isset($context["amenities"]) ? $context["amenities"] : null)) {
            // line 2
            echo "    <div class=\"row\">
        <div class=\"span12\">
            <h2>";
            // line 4
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "__", array(0 => "General amenities", 1 => "aviators"), "method"), "html", null, true);
            echo "</h2>

            <div class=\"row\">
                ";
            // line 7
            $context['_parent'] = (array) $context;
            $context['_seq'] = twig_ensure_traversable((isset($context["amenities"]) ? $context["amenities"] : null));
            foreach ($context['_seq'] as $context["_key"] => $context["column"]) {
                // line 8
                echo "                    <ul class=\"span2\">
                        ";
                // line 9
                $context['_parent'] = (array) $context;
                $context['_seq'] = twig_ensure_traversable((isset($context["column"]) ? $context["column"] : null));
                foreach ($context['_seq'] as $context["_key"] => $context["amenity"]) {
                    // line 10
                    echo "                            <li class=\"";
                    if ($this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "has_term", array(0 => $this->getAttribute((isset($context["amenity"]) ? $context["amenity"] : null), "term_id"), 1 => "amenities", 2 => $this->getAttribute((isset($context["post"]) ? $context["post"] : null), "ID")), "method")) {
                        echo "checked";
                    } else {
                        echo "plain";
                    }
                    echo "\">";
                    echo twig_escape_filter($this->env, $this->getAttribute((isset($context["amenity"]) ? $context["amenity"] : null), "name"), "html", null, true);
                    echo "</li>
                        ";
                }
                $_parent = $context['_parent'];
                unset($context['_seq'], $context['_iterated'], $context['_key'], $context['amenity'], $context['_parent'], $context['loop']);
                $context = array_merge($_parent, array_intersect_key($context, $_parent));
                // line 12
                echo "                    </ul><!-- /.span2 -->
                ";
            }
            $_parent = $context['_parent'];
            unset($context['_seq'], $context['_iterated'], $context['_key'], $context['column'], $context['_parent'], $context['loop']);
            $context = array_merge($_parent, array_intersect_key($context, $_parent));
            // line 14
            echo "            </div>
            <!-- /.row -->
        </div>
        <!-- /.span12 -->
    </div><!-- /.row -->
";
        }
    }

    public function getTemplateName()
    {
        return "properties/amenities.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  64 => 14,  57 => 12,  42 => 10,  38 => 9,  35 => 8,  195 => 73,  188 => 70,  184 => 69,  181 => 68,  179 => 67,  176 => 66,  173 => 65,  167 => 62,  163 => 61,  160 => 60,  157 => 59,  155 => 58,  152 => 57,  149 => 56,  143 => 53,  139 => 52,  136 => 51,  133 => 50,  131 => 49,  111 => 40,  107 => 39,  102 => 37,  88 => 31,  72 => 24,  66 => 22,  50 => 16,  32 => 9,  24 => 4,  93 => 24,  89 => 23,  85 => 21,  67 => 18,  59 => 14,  56 => 13,  29 => 5,  25 => 4,  21 => 2,  19 => 1,  125 => 46,  121 => 45,  117 => 43,  112 => 37,  108 => 36,  104 => 38,  98 => 32,  96 => 34,  92 => 33,  86 => 26,  83 => 28,  80 => 27,  76 => 23,  74 => 25,  71 => 21,  69 => 20,  65 => 18,  63 => 16,  52 => 15,  46 => 13,  44 => 12,  41 => 11,  34 => 7,  26 => 4,  20 => 1,  60 => 20,  58 => 19,  55 => 16,  53 => 17,  48 => 15,  45 => 10,  43 => 9,  39 => 12,  37 => 11,  31 => 7,  28 => 5,);
    }
}
