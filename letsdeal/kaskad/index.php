<!-- AUI Framework -->
<!DOCTYPE html>
    <html>
    <head>

        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>Администрирование</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">

        <!-- Favicons -->

        <link rel="apple-touch-icon-precomposed" sizes="144x144" href="assets/images/icons/apple-touch-icon-144-precomposed.png">
        <link rel="apple-touch-icon-precomposed" sizes="114x114" href="assets/images/icons/apple-touch-icon-114-precomposed.png">
        <link rel="apple-touch-icon-precomposed" sizes="72x72" href="assets/images/icons/apple-touch-icon-72-precomposed.png">
        <link rel="apple-touch-icon-precomposed" href="assets/images/icons/apple-touch-icon-57-precomposed.png">
        <link rel="shortcut icon" href="assets/images/icons/favicon.png">

        <!--[if lt IE 9]>
          <script src="assets/js/minified/core/html5shiv.min.js"></script>
          <script src="assets/js/minified/core/respond.min.js"></script>
        <![endif]-->

        <!-- AgileUI CSS Core -->

        <link rel="stylesheet" type="text/css" href="assets/css/minified/aui-production.min.css">

        <!-- <link rel="stylesheet" type="text/css" href="../_assets/css/widgets/theme-switcher.css"> -->

        <!-- Theme UI -->

        <link id="layout-theme" rel="stylesheet" type="text/css" href="assets/themes/minified/agileui/color-schemes/layouts/default.min.css">
        <link id="elements-theme" rel="stylesheet" type="text/css" href="assets/themes/minified/agileui/color-schemes/elements/default.min.css">

        <link rel="stylesheet" type="text/css" href="assets/themes/minified/agileui/responsive.min.css">
        <link rel="stylesheet" type="text/css" href="assets/themes/minified/agileui/animations.min.css">
        <script type="text/javascript" src="assets/js/minified/aui-production.min.js"></script>

    </head>
    <body>

        <!--[if lt IE 7]>
            <p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
        <![endif]-->

        <div id="login-page" class="mrg25B">

            <div id="page-header" class="clearfix">
                <div id="page-header-wrapper" class="clearfix">
                    <div id="header-logo">
                        Администрирование
                    </div>

                </div>
            </div><!-- #page-header -->

        </div>
        <div class="pad20A">

            <div class="row">
                <div class="clear"></div>
                <form action="main.php" id="login-validation" class="col-md-5 center-margin form-vertical mrg25T" method="">
                    <div id="login-form" class="content-box drop-shadow">
                        <h3 class="content-box-header ui-state-default">
                            <div class="glyph-icon icon-separator">
                                <i class="glyph-icon icon-user"></i>
                            </div>
                            <span>Вход в систему</span>
                        </h3>
                        <div class="content-box-wrapper pad20A pad0B">
                            <div class="form-row">
                                <div class="form-label col-md-2">
                                    <label for="login_email">
                                        Логин:
                                        <span class="required">*</span>
                                    </label>
                                </div>
                                <div class="form-input col-md-10">
                                    <div class="form-input-icon">
                                        <i class="glyph-icon icon-user ui-state-default"></i>
                                        <input placeholder="Логин" data-type="email" data-trigger="change" data-required="true" type="text" name="login_email" id="login_email">
                                    </div>
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="form-label col-md-2">
                                    <label for="login_pass">
                                        Пароль:
                                    </label>
                                </div>
                                <div class="form-input col-md-10">
                                    <div class="form-input-icon">
                                        <i class="glyph-icon icon-unlock-alt ui-state-default"></i>
                                        <input placeholder="Пароль" data-trigger="keyup" data-rangelength="[3,25]" type="password" name="login_pass" id="login_pass">
                                    </div>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-checkbox-radio col-md-6">
                                    <input type="checkbox" class="custom-checkbox" name="remember-password" id="remember-password">
                                    <label for="remember-password" class="pad5L">Запомнить пароль</label>
                                </div>
                                <div class="form-checkbox-radio text-right col-md-6">
                                    <a href="#" class="switch-button" switch-target="#login-forgot" switch-parent="#login-form" title="Recover password">Забыли пароль?</a>
                                </div>
                            </div>
                        </div>
                        <div class="button-pane">
                            <button type="submit" class="btn large primary-bg text-transform-upr font-bold font-size-11 radius-all-4" id="demo-form-valid">
                                <span class="button-content">
                                    Войти
                                </span>
                            </button>
                        </div>
                    </div>

                    <div class="ui-dialog mrg5T hide" id="login-forgot" style="position: relative !important;">
                        <div class="ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix">
                            <span class="ui-dialog-title">Восстановление пароля</span>
                        </div>
                        <div class="pad20A ui-dialog-content ui-widget-content">
                            <div class="form-row">
                                <div class="form-label col-md-2">
                                    <label for="">
                                        E-mail:
                                    </label>
                                </div>
                                <div class="form-input col-md-10">
                                    <div class="form-input-icon">
                                        <i class="glyph-icon icon-envelope-o ui-state-default"></i>
                                        <input placeholder="Email address" type="text" name="" id="">
                                    </div>
                                </div>
                            </div>


                        </div>
                        <div class="ui-dialog-buttonpane text-center">
                            <button type="submit" class="btn large primary-bg radius-all-4" id="demo-form-valid">
                                <span class="button-content">
                                    Выслать пароль
                                </span>
                            </button>
                            <a href="javascript:;" class="btn switch-button" switch-target="#login-form" switch-parent="#login-forgot" id="login-form-valid">
                                <span class="button-content">
                                    Отмена
                                </span>
                            </a>
                        </div>
                    </div>
                </form>

            </div>

        </div>


        <div id="page-footer-wrapper" class="login-footer">
            <div id="page-footer">
        	    Copyright &copy; 2013
            </div>
        </div><!-- #page-footer-wrapper -->

    </body>
</html>
