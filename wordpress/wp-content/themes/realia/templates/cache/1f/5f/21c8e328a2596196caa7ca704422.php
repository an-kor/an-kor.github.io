<?php

/* layout-login-register.twig */
class __TwigTemplate_1f5f21c8e328a2596196caa7ca704422 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = $this->env->loadTemplate("layout-fullwidth.twig");

        $this->blocks = array(
            'content' => array($this, 'block_content'),
            'body' => array($this, 'block_body'),
        );
    }

    protected function doGetParent(array $context)
    {
        return "layout-fullwidth.twig";
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        $this->parent->display($context, array_merge($this->blocks, $blocks));
    }

    // line 3
    public function block_content($context, array $blocks = array())
    {
        // line 4
        echo "    <div class=\"login-register\">
        <div class=\"row\">
            <div class=\"span4\">
                <ul class=\"tabs nav nav-tabs\">
                    <li ";
        // line 8
        if (((isset($context["active"]) ? $context["active"] : null) == "login")) {
            echo "class=\"active\"";
        }
        echo "><a href=\"#login\" data-toggle=\"tab\">";
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "__", array(0 => "Login", 1 => "aviators"), "method"), "html", null, true);
        echo "</a></li>
                    <li ";
        // line 9
        if (((isset($context["active"]) ? $context["active"] : null) == "register")) {
            echo "class=\"active\"";
        }
        echo "><a href=\"#register\" data-toggle=\"tab\">";
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "__", array(0 => "Register", 1 => "aviators"), "method"), "html", null, true);
        echo "</a></li>
                </ul><!-- /.nav -->

                <div class=\"tab-content\">
                    <div class=\"tab-pane ";
        // line 13
        if (((isset($context["active"]) ? $context["active"] : null) == "login")) {
            echo "active";
        }
        echo "\" id=\"login\">
                        <form method=\"post\" action=\"";
        // line 14
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_bloginfo", array(0 => "wpurl"), "method"), "html", null, true);
        echo "/wp-login.php\">
                            <input type=\"hidden\" name=\"redirect_to\" value=\"";
        // line 15
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_bloginfo", array(0 => "wpurl"), "method"), "html", null, true);
        echo "\">
                            <div class=\"control-group\">
                                <label class=\"control-label\" for=\"inputLoginLogin\">
                                    ";
        // line 18
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "__", array(0 => "Login", 1 => "aviators"), "method"), "html", null, true);
        echo "
                                    <span class=\"form-required\">*</span>
                                </label>

                                <div class=\"controls\">
                                    <input type=\"text\" id=\"inputLoginLogin\" name=\"log\" required=\"required\">
                                </div>
                                <!-- /.controls -->
                            </div>
                            <!-- /.control-group -->

                            <div class=\"control-group\">
                                <label class=\"control-label\" for=\"inputLoginPassword\">
                                    ";
        // line 31
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "__", array(0 => "Password", 1 => "aviators"), "method"), "html", null, true);
        echo "
                                    <span class=\"form-required\">*</span>
                                </label>

                                <div class=\"controls\">
                                    <input type=\"password\" id=\"inputLoginPassword\" name=\"pwd\" required=\"required\">
                                </div><!-- /.controls -->
                            </div><!-- /.control-group -->

                            <div class=\"form-actions\">
                                <input type=\"submit\" value=\"";
        // line 41
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "__", array(0 => "Login", 1 => "aviators"), "method"), "html", null, true);
        echo "\" class=\"btn btn-primary arrow-right\">
                            </div><!-- /.form-actions -->
                        </form>
                    </div><!-- /.tab-pane -->

                    <div class=\"tab-pane ";
        // line 46
        if (((isset($context["active"]) ? $context["active"] : null) == "register")) {
            echo "active";
        }
        echo "\" id=\"register\">
                        <form method=\"post\" action=\"";
        // line 47
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_bloginfo", array(0 => "wpurl"), "method"), "html", null, true);
        echo "/wp-login.php?action=register\">
                            <input type=\"hidden\" name=\"redirect_to\" value=\"";
        // line 48
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "get_bloginfo", array(0 => "wpurl"), "method"), "html", null, true);
        echo "?action=register\">

                            <div class=\"control-group\">
                                <label class=\"control-label\" for=\"inputRegisterEmail\">
                                    ";
        // line 52
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "__", array(0 => "Username", 1 => "aviators"), "method"), "html", null, true);
        echo "
                                    <span class=\"form-required\" title=\"This field is required.\">*</span>
                                </label>

                                <div class=\"controls\">
                                    <input type=\"text\" id=\"inputRegisterEmail\" required=\"required\" name=\"user_login\">
                                </div><!-- /.controls -->
                            </div><!-- /.control-group -->

                            <div class=\"control-group\">
                                <label class=\"control-label\" for=\"inputRegisterPassword\">
                                    ";
        // line 63
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "__", array(0 => "E-mail", 1 => "aviators"), "method"), "html", null, true);
        echo "
                                    <span class=\"form-required\" title=\"This field is required.\">*</span>
                                </label>

                                <div class=\"controls\">
                                    <input type=\"email\" id=\"inputRegisterPassword\" required=\"required\" name=\"user_email\">
                                </div><!-- /.controls -->
                            </div><!-- /.control-group -->

                            <div class=\"form-actions\">
                                <input type=\"submit\" value=\"";
        // line 73
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["wp"]) ? $context["wp"] : null), "__", array(0 => "Register", 1 => "aviators"), "method"), "html", null, true);
        echo "\" class=\"btn btn-primary arrow-right\">
                            </div><!-- /.form-actions -->
                        </form>
                    </div><!-- /.tab-pane -->
                </div><!-- /.tab-content -->
            </div><!-- /.span4-->

            <div class=\"span8\">
                ";
        // line 81
        $this->displayBlock('body', $context, $blocks);
        // line 82
        echo "            </div>
        </div><!-- /.row -->
    </div><!-- /.login-register -->
";
    }

    // line 81
    public function block_body($context, array $blocks = array())
    {
    }

    public function getTemplateName()
    {
        return "layout-login-register.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  174 => 81,  167 => 82,  165 => 81,  154 => 73,  141 => 63,  127 => 52,  120 => 48,  116 => 47,  110 => 46,  102 => 41,  89 => 31,  73 => 18,  67 => 15,  63 => 14,  57 => 13,  46 => 9,  38 => 8,  32 => 4,  29 => 3,  31 => 4,  28 => 3,);
    }
}
