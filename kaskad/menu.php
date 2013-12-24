<?php
$url = $_SERVER['REQUEST_URI'];
?><div id="sidebar-menu" class="scrollable-content">
    <ul>
        <li <?=strpos($url, 'main')>-1?'class="active"':''?>>
            <a href="main.php">
                <i class="glyph-icon icon-dashboard"></i>
                Главная
            </a>
        </li>
        <li <?=strpos($url, 'mail')>-1?'class="active"':''?>>
            <a href="javascript:;">
                <i class="glyph-icon icon-envelope"></i>
                Рассылка
            </a>
            <ul>
                <li>
                    <a href="mail-new.php" <?=strpos($url, 'mail-new')>-1?'class="current-page"':''?>>
                        <i class="glyph-icon icon-chevron-right"></i>
                        Создать рассылку
                    </a>
                </li>
                <li>
                    <a href="mail-list.php" <?=strpos($url, 'mail-list')>-1?'class="current-page"':''?>>
                        <i class="glyph-icon icon-chevron-right"></i>
                        Список рассылок
                    </a>
                </li>
            </ul>
        </li>
        <li <?=strpos($url, 'print')>-1?'class="active"':''?>>
            <a href="javascript:;">
                <i class="glyph-icon icon-file"></i>
                Печать
            </a>
            <ul>
                <li>
                    <a href="print-new.php" <?=strpos($url, 'print-new')>-1?'class="current-page"':''?>>
                        <i class="glyph-icon icon-chevron-right"></i>
                        Создать документ
                    </a>
                </li>
                <li>
                    <a href="print-templates.php" <?=strpos($url, 'print-templates')>-1?'class="current-page"':''?>>
                        <i class="glyph-icon icon-chevron-right"></i>
                        Список шаблонов
                    </a>
                </li>
                <li>
                    <a href="print-documents.php" <?=strpos($url, 'print-documents')>-1?'class="current-page"':''?>>
                        <i class="glyph-icon icon-chevron-right"></i>
                        Архив файлов
                    </a>
                </li>
            </ul>
        </li>
        <li <?=strpos($url, 'tender')>-1?'class="active"':''?>>
            <a href="javascript:;">
                <i class="glyph-icon icon-gavel"></i>
                Тендеры
            </a>
            <ul>
                <li>
                    <a href="tender-new.php" <?=strpos($url, 'tender-new')>-1?'class="current-page"':''?>>
                        <i class="glyph-icon icon-chevron-right"></i>
                        Создать новый
                    </a>
                </li>
                <li>
                    <a href="helper_classes.html">
                        <i class="glyph-icon icon-chevron-right"></i>
                        Необработанные сообщения
                    </a>
                </li>
                <li>
                    <a href="helper_classes.html">
                        <i class="glyph-icon icon-chevron-right"></i>
                        Архив тендеров
                    </a>
                </li>
            </ul>
        </li>
        <li <?=strpos($url, 'price')>-1?'class="active"':''?>>
            <a href="javascript:;">
                <i class="glyph-icon icon-money"></i>
                Оценка
            </a>
            <ul>
                <li>
                    <a href="grid.html">
                        <i class="glyph-icon icon-chevron-right"></i>
                        Создать документ
                    </a>
                </li>
                <li>
                    <a href="helper_classes.html">
                        <i class="glyph-icon icon-chevron-right"></i>
                        Архив оценок
                    </a>
                </li>
            </ul>
        </li>
    </ul>
</div>

</div><!-- #page-sidebar -->

<div id="page-main">

    <div id="page-main-wrapper">

        <div id="page-header" class="clearfix">
            <div id="page-header-wrapper">

                <div class="top-icon-bar dropdown">
                    <a href="javascript:;" title="" class="user-ico clearfix" data-toggle="dropdown">
                        <span>Тестовый пользователь</span>
                        <i class="glyph-icon icon-chevron-down"></i>
                    </a>
                    <ul class="dropdown-menu float-right">
                        <li>
                            <a href="javascript:;" title="">
                                <i class="glyph-icon icon-user mrg5R"></i>
                                Аккаунт
                            </a>
                        </li>
                        <li>
                            <a href="javascript:;" title="">
                                <i class="glyph-icon icon-power-off font-size-13 mrg5R"></i>
                                <span class="font-bold">Выход</span>
                            </a>
                        </li>

                    </ul>
                </div>
            </div>
        </div><!-- #page-header -->