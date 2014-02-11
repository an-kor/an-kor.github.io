<?php

/* properties/overview.twig */
class __TwigTemplate_4c6b7a63f81ea8c45e02150555f40fbc extends Twig_Template
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
        echo "<div class=\"pull-left overview\">
    <div class=\"row\">
        <div class=\"span3\">
            <h2>";
        // line 4
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "__", array(0 => "Overview", 1 => "aviators"), "method"), "html", null, true);
        echo "</h2>

            <table>
                <tbody>
                <tr>
                    <th>";
        // line 9
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "__", array(0 => "ID", 1 => "aviators"), "method"), "html", null, true);
        echo ":</th>
                    <td>
                        <strong>#";
        // line 11
        if ($this->getAttribute($this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_post_meta", array(0 => $this->getAttribute((isset($context["post"]) ? $context["post"] : null), "ID"), 1 => "_property_id"), "method"), 0)) {
            echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_post_meta", array(0 => $this->getAttribute((isset($context["post"]) ? $context["post"] : null), "ID"), 1 => "_property_id"), "method"), 0), "html", null, true);
        } else {
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["post"]) ? $context["post"] : null), "ID"), "html", null, true);
        }
        echo "</strong
                    </td>
                </tr>

                ";
        // line 15
        if ($this->getAttribute($this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_post_meta", array(0 => $this->getAttribute((isset($context["post"]) ? $context["post"] : null), "ID"), 1 => "_property_price"), "method"), 0)) {
            // line 16
            echo "                    <tr>
                        <th>";
            // line 17
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "__", array(0 => "Price", 1 => "aviators"), "method"), "html", null, true);
            echo ":</th>
                        <td>
                            ";
            // line 19
            if ($this->getAttribute($this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_post_meta", array(0 => $this->getAttribute((isset($context["post"]) ? $context["post"] : null), "ID"), 1 => "_property_custom_text"), "method"), 0)) {
                // line 20
                echo "                                ";
                echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_post_meta", array(0 => $this->getAttribute((isset($context["post"]) ? $context["post"] : null), "ID"), 1 => "_property_custom_text"), "method"), 0), "html", null, true);
                echo "
                            ";
            } else {
                // line 22
                echo "                                ";
                echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "aviators_price_format", array(0 => $this->getAttribute($this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_post_meta", array(0 => $this->getAttribute((isset($context["post"]) ? $context["post"] : null), "ID"), 1 => "_property_price"), "method"), 0)), "method"), "html", null, true);
                echo "

                                ";
                // line 24
                if ($this->getAttribute($this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_post_meta", array(0 => $this->getAttribute((isset($context["post"]) ? $context["post"] : null), "ID"), 1 => "_property_price_suffix"), "method"), 0)) {
                    // line 25
                    echo "                                    <span class=\"suffix\">";
                    echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_post_meta", array(0 => $this->getAttribute((isset($context["post"]) ? $context["post"] : null), "ID"), 1 => "_property_price_suffix"), "method"), 0), "html", null, true);
                    echo "</span>
                                ";
                }
                // line 27
                echo "                            ";
            }
            // line 28
            echo "                        </td>
                    </tr>
                ";
        }
        // line 31
        echo "
                <tr>
                    <th>";
        // line 33
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "__", array(0 => "Type", 1 => "aviators"), "method"), "html", null, true);
        echo ":</th>
                    <td>";
        // line 34
        echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute($this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "wp_get_post_terms", array(0 => $this->getAttribute((isset($context["post"]) ? $context["post"] : null), "ID"), 1 => "property_types"), "method"), 0), "name"), "html", null, true);
        echo "</td>
                </tr>

                ";
        // line 37
        if ($this->getAttribute($this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "wp_get_post_terms", array(0 => $this->getAttribute((isset($context["post"]) ? $context["post"] : null), "ID"), 1 => "property_contracts"), "method"), 0)) {
            // line 38
            echo "                    <tr>
                        <th>";
            // line 39
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "__", array(0 => "Contract", 1 => "aviators"), "method"), "html", null, true);
            echo ":</th>
                        <td>";
            // line 40
            echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute($this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "wp_get_post_terms", array(0 => $this->getAttribute((isset($context["post"]) ? $context["post"] : null), "ID"), 1 => "property_contracts"), "method"), 0), "name"), "html", null, true);
            echo "</td>
                    </tr>
                ";
        }
        // line 43
        echo "
                <tr>
                    <th>";
        // line 45
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "__", array(0 => "Location", 1 => "aviators"), "method"), "html", null, true);
        echo ":</th>
                    <td>";
        // line 46
        echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute($this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "wp_get_post_terms", array(0 => $this->getAttribute((isset($context["post"]) ? $context["post"] : null), "ID"), 1 => "locations"), "method"), 0), "name"), "html", null, true);
        echo "</td>
                </tr>

                ";
        // line 49
        if (($this->getAttribute($this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_post_meta", array(0 => $this->getAttribute((isset($context["post"]) ? $context["post"] : null), "ID"), 1 => "_property_hide_baths"), "method"), 0) != "1")) {
            // line 50
            echo "                    ";
            if ($this->getAttribute($this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_post_meta", array(0 => $this->getAttribute((isset($context["post"]) ? $context["post"] : null), "ID"), 1 => "_property_bathrooms"), "method"), 0)) {
                // line 51
                echo "                        <tr>
                            <th>";
                // line 52
                echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "__", array(0 => "Bathrooms", 1 => "aviators"), "method"), "html", null, true);
                echo ":</th>
                            <td>";
                // line 53
                echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_post_meta", array(0 => $this->getAttribute((isset($context["post"]) ? $context["post"] : null), "ID"), 1 => "_property_bathrooms"), "method"), 0), "html", null, true);
                echo "</td>
                        </tr>
                    ";
            }
            // line 56
            echo "                ";
        }
        // line 57
        echo "
                ";
        // line 58
        if (($this->getAttribute($this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_post_meta", array(0 => $this->getAttribute((isset($context["post"]) ? $context["post"] : null), "ID"), 1 => "_property_hide_beds"), "method"), 0) != "1")) {
            // line 59
            echo "                    ";
            if ($this->getAttribute($this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_post_meta", array(0 => $this->getAttribute((isset($context["post"]) ? $context["post"] : null), "ID"), 1 => "_property_bedrooms"), "method"), 0)) {
                // line 60
                echo "                        <tr>
                            <th>";
                // line 61
                echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "__", array(0 => "Bedrooms", 1 => "aviators"), "method"), "html", null, true);
                echo ":</th>
                            <td>";
                // line 62
                echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_post_meta", array(0 => $this->getAttribute((isset($context["post"]) ? $context["post"] : null), "ID"), 1 => "_property_bedrooms"), "method"), 0), "html", null, true);
                echo "</td>
                        </tr>
                    ";
            }
            // line 65
            echo "                ";
        }
        // line 66
        echo "
                ";
        // line 67
        if ($this->getAttribute($this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_post_meta", array(0 => $this->getAttribute((isset($context["post"]) ? $context["post"] : null), "ID"), 1 => "_property_area"), "method"), 0)) {
            // line 68
            echo "                    <tr>
                        <th>";
            // line 69
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "__", array(0 => "Area", 1 => "aviators"), "method"), "html", null, true);
            echo ":</th>
                        <td>";
            // line 70
            echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_post_meta", array(0 => $this->getAttribute((isset($context["post"]) ? $context["post"] : null), "ID"), 1 => "_property_area"), "method"), 0), "html", null, true);
            echo $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "aviators_settings_get_value", array(0 => "properties", 1 => "units", 2 => "area"), "method");
            echo "</td>
                    </tr>
                ";
        }
        // line 73
        echo "                </tbody>
            </table>
        </div>
        <!-- /.span2 -->
    </div>
    <!-- /.row -->
</div><!-- /.overview -->";
    }

    public function getTemplateName()
    {
        return "properties/overview.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  195 => 73,  188 => 70,  184 => 69,  181 => 68,  179 => 67,  176 => 66,  173 => 65,  167 => 62,  163 => 61,  160 => 60,  157 => 59,  155 => 58,  152 => 57,  149 => 56,  143 => 53,  139 => 52,  136 => 51,  133 => 50,  131 => 49,  125 => 46,  121 => 45,  117 => 43,  111 => 40,  107 => 39,  104 => 38,  102 => 37,  96 => 34,  92 => 33,  88 => 31,  83 => 28,  80 => 27,  74 => 25,  72 => 24,  66 => 22,  50 => 16,  32 => 9,  24 => 4,  93 => 24,  89 => 23,  85 => 21,  67 => 18,  63 => 16,  59 => 14,  56 => 13,  29 => 5,  25 => 4,  21 => 2,  19 => 1,  60 => 20,  58 => 19,  55 => 14,  53 => 17,  48 => 15,  45 => 10,  43 => 9,  39 => 12,  37 => 11,  31 => 4,  28 => 3,);
    }
}
