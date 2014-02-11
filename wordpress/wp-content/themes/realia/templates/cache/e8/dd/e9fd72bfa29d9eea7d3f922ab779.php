<?php

/* properties/filter.twig */
class __TwigTemplate_e8dde9fd72bfa29d9eea7d3f922ab779 extends Twig_Template
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
        if ((isset($context["title"]) ? $context["title"] : null)) {
            // line 2
            echo "    ";
            echo (isset($context["before_title"]) ? $context["before_title"] : null);
            echo twig_escape_filter($this->env, (isset($context["title"]) ? $context["title"] : null), "html", null, true);
            echo (isset($context["after_title"]) ? $context["after_title"] : null);
            echo "
";
        }
        // line 4
        echo "
<div class=\"property-filter widget\">
    <div class=\"content\">
        <form method=\"get\" action=\"";
        // line 7
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "aviators_get_home_url", array(), "method"), "html", null, true);
        echo "/";
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "__", array(0 => "properties", 1 => "aviators"), "method"), "html", null, true);
        echo "/\">
            ";
        // line 8
        if (($this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "aviators_settings_get_value", array(0 => "properties", 1 => "filter_visibility", 2 => "hide_location"), "method") != "on")) {
            // line 9
            echo "                <div class=\"location control-group\">
                    <label class=\"control-label\" for=\"inputLocation-";
            // line 10
            echo twig_escape_filter($this->env, (isset($context["id"]) ? $context["id"] : null), "html", null, true);
            echo "\">
                        ";
            // line 11
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "__", array(0 => "Location", 1 => "aviators"), "method"), "html", null, true);
            echo "
                    </label>

                    <div class=\"controls\">
                        <select name=\"filter_location\" id=\"inputLocation-";
            // line 15
            echo twig_escape_filter($this->env, (isset($context["id"]) ? $context["id"] : null), "html", null, true);
            echo "\">
                            <option value=\"\">-</option>
                            ";
            // line 17
            $context['_parent'] = (array) $context;
            $context['_seq'] = twig_ensure_traversable($this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_terms", array(0 => "locations"), "method"));
            foreach ($context['_seq'] as $context["_key"] => $context["location"]) {
                // line 18
                echo "                                <option value=\"";
                echo twig_escape_filter($this->env, $this->getAttribute((isset($context["location"]) ? $context["location"] : null), "term_id"), "html", null, true);
                echo "\" ";
                if (($this->getAttribute((isset($context["q"]) ? $context["q"] : null), "filter_location") == $this->getAttribute((isset($context["location"]) ? $context["location"] : null), "term_id"))) {
                    echo "selected=\"selected\"";
                }
                echo ">";
                echo twig_escape_filter($this->env, $this->getAttribute((isset($context["location"]) ? $context["location"] : null), "name"), "html", null, true);
                echo "</option>
                            ";
            }
            $_parent = $context['_parent'];
            unset($context['_seq'], $context['_iterated'], $context['_key'], $context['location'], $context['_parent'], $context['loop']);
            $context = array_merge($_parent, array_intersect_key($context, $_parent));
            // line 20
            echo "                        </select>
                    </div>
                    <!-- /.controls -->
                </div><!-- /.control-group -->
            ";
        }
        // line 25
        echo "
            ";
        // line 26
        if (($this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "aviators_settings_get_value", array(0 => "properties", 1 => "filter_visibility", 2 => "hide_type"), "method") != "on")) {
            // line 27
            echo "                <div class=\"type control-group\">
                    <label class=\"control-label\" for=\"inputType-";
            // line 28
            echo twig_escape_filter($this->env, (isset($context["id"]) ? $context["id"] : null), "html", null, true);
            echo "\">
                        ";
            // line 29
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "__", array(0 => "Type", 1 => "aviators"), "method"), "html", null, true);
            echo "
                    </label>

                    <div class=\"controls\">
                        <select name=\"filter_type\" id=\"inputType-";
            // line 33
            echo twig_escape_filter($this->env, (isset($context["id"]) ? $context["id"] : null), "html", null, true);
            echo "\">
                            <option value=\"\">-</option>
                            ";
            // line 35
            $context['_parent'] = (array) $context;
            $context['_seq'] = twig_ensure_traversable($this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_terms", array(0 => "property_types"), "method"));
            foreach ($context['_seq'] as $context["_key"] => $context["type"]) {
                // line 36
                echo "                                <option value=\"";
                echo twig_escape_filter($this->env, $this->getAttribute((isset($context["type"]) ? $context["type"] : null), "term_id"), "html", null, true);
                echo "\" ";
                if (($this->getAttribute((isset($context["q"]) ? $context["q"] : null), "filter_type") == $this->getAttribute((isset($context["type"]) ? $context["type"] : null), "term_id"))) {
                    echo "selected=\"selected\"";
                }
                echo ">";
                echo twig_escape_filter($this->env, $this->getAttribute((isset($context["type"]) ? $context["type"] : null), "name"), "html", null, true);
                echo "</option>
                            ";
            }
            $_parent = $context['_parent'];
            unset($context['_seq'], $context['_iterated'], $context['_key'], $context['type'], $context['_parent'], $context['loop']);
            $context = array_merge($_parent, array_intersect_key($context, $_parent));
            // line 38
            echo "                        </select>
                    </div>
                    <!-- /.controls -->
                </div>
                <!-- /.control-group -->
            ";
        }
        // line 44
        echo "
            ";
        // line 45
        if (($this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "aviators_settings_get_value", array(0 => "properties", 1 => "filter_visibility", 2 => "hide_beds"), "method") != "on")) {
            // line 46
            echo "                <div class=\"beds control-group\">
                    <label class=\"control-label\" for=\"inputBeds-";
            // line 47
            echo twig_escape_filter($this->env, (isset($context["id"]) ? $context["id"] : null), "html", null, true);
            echo "\">
                        ";
            // line 48
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "__", array(0 => "Beds", 1 => "aviators"), "method"), "html", null, true);
            echo "
                    </label>

                    <div class=\"controls\">
                        <select name=\"filter_bedrooms\" id=\"inputBeds-";
            // line 52
            echo twig_escape_filter($this->env, (isset($context["id"]) ? $context["id"] : null), "html", null, true);
            echo "\">
                            <option value=\"\">-</option>
                            ";
            // line 54
            $context['_parent'] = (array) $context;
            $context['_seq'] = twig_ensure_traversable(range(1, 10));
            foreach ($context['_seq'] as $context["_key"] => $context["i"]) {
                // line 55
                echo "                                <option value=\"";
                echo twig_escape_filter($this->env, (isset($context["i"]) ? $context["i"] : null), "html", null, true);
                echo "\" ";
                if (($this->getAttribute((isset($context["q"]) ? $context["q"] : null), "filter_bedrooms") == (isset($context["i"]) ? $context["i"] : null))) {
                    echo "selected=\"selected=\"";
                }
                echo ">";
                echo twig_escape_filter($this->env, (isset($context["i"]) ? $context["i"] : null), "html", null, true);
                echo "</option>
                            ";
            }
            $_parent = $context['_parent'];
            unset($context['_seq'], $context['_iterated'], $context['_key'], $context['i'], $context['_parent'], $context['loop']);
            $context = array_merge($_parent, array_intersect_key($context, $_parent));
            // line 57
            echo "                        </select>
                    </div>
                    <!-- /.controls -->
                </div>
                <!-- /.control-group -->
            ";
        }
        // line 63
        echo "
            ";
        // line 64
        if (($this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "aviators_settings_get_value", array(0 => "properties", 1 => "filter_visibility", 2 => "hide_baths"), "method") != "on")) {
            // line 65
            echo "            <div class=\"baths control-group\">
                <label class=\"control-label\" for=\"inputBaths-";
            // line 66
            echo twig_escape_filter($this->env, (isset($context["id"]) ? $context["id"] : null), "html", null, true);
            echo "\">
                    ";
            // line 67
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "__", array(0 => "Baths", 1 => "aviators"), "method"), "html", null, true);
            echo "
                </label>

                <div class=\"controls\">
                    <select name=\"filter_bathrooms\" id=\"inputBaths-";
            // line 71
            echo twig_escape_filter($this->env, (isset($context["id"]) ? $context["id"] : null), "html", null, true);
            echo "\">
                        <option value=\"\">-</option>
                        ";
            // line 73
            $context['_parent'] = (array) $context;
            $context['_seq'] = twig_ensure_traversable(range(1, 10));
            foreach ($context['_seq'] as $context["_key"] => $context["i"]) {
                // line 74
                echo "                            <option value=\"";
                echo twig_escape_filter($this->env, (isset($context["i"]) ? $context["i"] : null), "html", null, true);
                echo "\" ";
                if (($this->getAttribute((isset($context["q"]) ? $context["q"] : null), "filter_bathrooms") == (isset($context["i"]) ? $context["i"] : null))) {
                    echo "selected=\"selected=\"";
                }
                echo ">";
                echo twig_escape_filter($this->env, (isset($context["i"]) ? $context["i"] : null), "html", null, true);
                echo "</option>
                        ";
            }
            $_parent = $context['_parent'];
            unset($context['_seq'], $context['_iterated'], $context['_key'], $context['i'], $context['_parent'], $context['loop']);
            $context = array_merge($_parent, array_intersect_key($context, $_parent));
            // line 76
            echo "                    </select>
                </div>
                <!-- /.controls -->
            </div>
            <!-- /.control-group -->
            ";
        }
        // line 82
        echo "
            ";
        // line 83
        if (($this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "aviators_settings_get_value", array(0 => "properties", 1 => "filter_visibility", 2 => "hide_contract"), "method") != "on")) {
            // line 84
            echo "                <div class=\"contract control-group\">
                    <label class=\"control-label\" for=\"inputType-";
            // line 85
            echo twig_escape_filter($this->env, (isset($context["id"]) ? $context["id"] : null), "html", null, true);
            echo "\">
                        ";
            // line 86
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "__", array(0 => "Contract", 1 => "aviators"), "method"), "html", null, true);
            echo "
                    </label>

                    <div class=\"controls\">
                        <select name=\"filter_contract_type\" id=\"inputContract-";
            // line 90
            echo twig_escape_filter($this->env, (isset($context["id"]) ? $context["id"] : null), "html", null, true);
            echo "\">
                            <option value=\"\">-</option>
                            ";
            // line 92
            $context['_parent'] = (array) $context;
            $context['_seq'] = twig_ensure_traversable($this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_terms", array(0 => "property_contracts"), "method"));
            foreach ($context['_seq'] as $context["_key"] => $context["contract"]) {
                // line 93
                echo "                                <option value=\"";
                echo twig_escape_filter($this->env, $this->getAttribute((isset($context["contract"]) ? $context["contract"] : null), "term_id"), "html", null, true);
                echo "\" ";
                if (($this->getAttribute((isset($context["q"]) ? $context["q"] : null), "filter_contract_type") == $this->getAttribute((isset($context["contract"]) ? $context["contract"] : null), "term_id"))) {
                    echo "selected=\"selected\"";
                }
                echo ">";
                echo twig_escape_filter($this->env, $this->getAttribute((isset($context["contract"]) ? $context["contract"] : null), "name"), "html", null, true);
                echo "</option>
                            ";
            }
            $_parent = $context['_parent'];
            unset($context['_seq'], $context['_iterated'], $context['_key'], $context['contract'], $context['_parent'], $context['loop']);
            $context = array_merge($_parent, array_intersect_key($context, $_parent));
            // line 95
            echo "                        </select>
                    </div>
                    <!-- /.controls -->
                </div>
                <!-- /.control-group -->
            ";
        }
        // line 101
        echo "
            ";
        // line 102
        if (($this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "aviators_settings_get_value", array(0 => "properties", 1 => "filter_visibility", 2 => "hide_price_from"), "method") != "on")) {
            // line 103
            echo "                <div class=\"price-from control-group\">
                    <label class=\"control-label\" for=\"inputPriceFrom-";
            // line 104
            echo twig_escape_filter($this->env, (isset($context["id"]) ? $context["id"] : null), "html", null, true);
            echo "\">
                        ";
            // line 105
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "__", array(0 => "Price From", 1 => "aviators"), "method"), "html", null, true);
            echo "
                    </label>

                    <div class=\"controls\">
                        <select name=\"filter_price_from\" id=\"inputPriceFrom-";
            // line 109
            echo twig_escape_filter($this->env, (isset($context["id"]) ? $context["id"] : null), "html", null, true);
            echo "\">
                            <option value=\"\">-</option>
                            ";
            // line 111
            $context['_parent'] = (array) $context;
            $context['_seq'] = twig_ensure_traversable((isset($context["price_from"]) ? $context["price_from"] : null));
            foreach ($context['_seq'] as $context["_key"] => $context["i"]) {
                // line 112
                echo "                                <option value=\"";
                echo twig_escape_filter($this->env, (isset($context["i"]) ? $context["i"] : null), "html", null, true);
                echo "\" ";
                if (($this->getAttribute((isset($context["q"]) ? $context["q"] : null), "filter_price_from") == (isset($context["i"]) ? $context["i"] : null))) {
                    echo "selected=\"selected\"";
                }
                echo ">";
                echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "aviators_price_format", array(0 => (isset($context["i"]) ? $context["i"] : null)), "method"), "html", null, true);
                echo "</option>
                            ";
            }
            $_parent = $context['_parent'];
            unset($context['_seq'], $context['_iterated'], $context['_key'], $context['i'], $context['_parent'], $context['loop']);
            $context = array_merge($_parent, array_intersect_key($context, $_parent));
            // line 114
            echo "                        </select>
                    </div>
                    <!-- /.controls -->
                </div>
                <!-- /.control-group -->
            ";
        }
        // line 120
        echo "
            ";
        // line 121
        if (($this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "aviators_settings_get_value", array(0 => "properties", 1 => "filter_visibility", 2 => "hide_price_to"), "method") != "on")) {
            // line 122
            echo "                <div class=\"price-to control-group\">
                    <label class=\"control-label\" for=\"inputPriceTo-";
            // line 123
            echo twig_escape_filter($this->env, (isset($context["id"]) ? $context["id"] : null), "html", null, true);
            echo "\">
                        ";
            // line 124
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "__", array(0 => "Price To", 1 => "aviators"), "method"), "html", null, true);
            echo "
                    </label>

                    <div class=\"controls\">
                        <select name=\"filter_price_to\" id=\"inputPriceTo-";
            // line 128
            echo twig_escape_filter($this->env, (isset($context["id"]) ? $context["id"] : null), "html", null, true);
            echo "\">
                            <option value=\"\">-</option>
                            ";
            // line 130
            $context['_parent'] = (array) $context;
            $context['_seq'] = twig_ensure_traversable((isset($context["price_to"]) ? $context["price_to"] : null));
            foreach ($context['_seq'] as $context["_key"] => $context["i"]) {
                // line 131
                echo "                                <option value=\"";
                echo twig_escape_filter($this->env, (isset($context["i"]) ? $context["i"] : null), "html", null, true);
                echo "\" ";
                if (($this->getAttribute((isset($context["q"]) ? $context["q"] : null), "filter_price_to") == (isset($context["i"]) ? $context["i"] : null))) {
                    echo "selected=\"selected\"";
                }
                echo ">";
                echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "aviators_price_format", array(0 => (isset($context["i"]) ? $context["i"] : null)), "method"), "html", null, true);
                echo "</option>
                            ";
            }
            $_parent = $context['_parent'];
            unset($context['_seq'], $context['_iterated'], $context['_key'], $context['i'], $context['_parent'], $context['loop']);
            $context = array_merge($_parent, array_intersect_key($context, $_parent));
            // line 133
            echo "                        </select>
                    </div>
                    <!-- /.controls -->
                </div>
                <!-- /.control-group -->
            ";
        }
        // line 139
        echo "
            ";
        // line 140
        if (($this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "aviators_settings_get_value", array(0 => "properties", 1 => "filter_visibility", 2 => "hide_area_from"), "method") != "on")) {
            // line 141
            echo "                <div class=\"area-from control-group\">
                    <label class=\"control-label\" for=\"inputAreaFrom-";
            // line 142
            echo twig_escape_filter($this->env, (isset($context["id"]) ? $context["id"] : null), "html", null, true);
            echo "\">
                        ";
            // line 143
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "__", array(0 => "Area From", 1 => "aviators"), "method"), "html", null, true);
            echo "
                    </label>

                    <div class=\"controls\">
                        <input type=\"text\" value=\"";
            // line 147
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["q"]) ? $context["q"] : null), "filter_area_from"), "html", null, true);
            echo "\" name=\"filter_area_from\" id=\"inputAreaFrom-";
            echo twig_escape_filter($this->env, (isset($context["id"]) ? $context["id"] : null), "html", null, true);
            echo "\">
                    </div><!-- /.controls -->
                </div><!-- /.control-group -->
            ";
        }
        // line 151
        echo "
            ";
        // line 152
        if (($this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "aviators_settings_get_value", array(0 => "properties", 1 => "filter_visibility", 2 => "hide_area_to"), "method") != "on")) {
            // line 153
            echo "                <div class=\"area-to control-group\">
                    <label class=\"control-label\" for=\"inputAreaTo-";
            // line 154
            echo twig_escape_filter($this->env, (isset($context["id"]) ? $context["id"] : null), "html", null, true);
            echo "\">
                        ";
            // line 155
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "__", array(0 => "Area To", 1 => "aviators"), "method"), "html", null, true);
            echo "
                    </label>

                    <div class=\"controls\">
                        <input type=\"text\" value=\"";
            // line 159
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["q"]) ? $context["q"] : null), "filter_area_to"), "html", null, true);
            echo "\" name=\"filter_area_to\" id=\"inputAreaTo-";
            echo twig_escape_filter($this->env, (isset($context["id"]) ? $context["id"] : null), "html", null, true);
            echo "\">
                    </div><!-- /.controls -->
                </div><!-- /.control-group -->
            ";
        }
        // line 163
        echo "
            <div class=\"form-actions\">
                <button class=\"btn btn-primary btn-large\">";
        // line 165
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "__", array(0 => "Filter now!", 1 => "aviators"), "method"), "html", null, true);
        echo "</button>
            </div>
            <!-- /.form-actions -->
        </form>
    </div>
    <!-- /.content -->
</div><!-- /.property-filter -->
";
    }

    public function getTemplateName()
    {
        return "properties/filter.twig";
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
