<?php include('header.php') ?>
<?php include('menu.php') ?>
    <div id="page-breadcrumb-wrapper">
        <div id="page-breadcrumb">
            <a href="javascript:;">
                <i class="glyph-icon icon-money"></i>
                Оценка
            </a>
            <span class="current">
                Редактирование
            </span>
        </div>
    </div>
<div id="page-content">
    <form action="" id="print-form" class="col-md-12" method="">

            <div class="form-row col-md-12">
                <div class="form-label">
                    <label for="">
                        Контрагент:
                    </label>
                </div>
                <div class="form-input">
                    <span role="status" aria-live="polite" class="ui-helper-hidden-accessible"></span><input type="text"
                                                                                                             class="col-md-12 autocomplete-input ui-autocomplete-input"
                                                                                                             autocomplete="off">
                </div>
            </div>
        <div class="divider"></div>
            <div class="form-row col-md-12">
            <div class="form-input">
                <span class="ui-helper-hidden-accessible"></span><input type="text" placeholder="Номенклатура с автоподстановкой" class="col-md-8 autocomplete-input ui-autocomplete-input" autocomplete="off">
                <a href="#" class="btn medium primary-bg" title="">
                    <span class="button-content">Добавить</span>
                </a>
            </div>
            </div>

            <table class="table text-center">
                <thead>
                <tr>
                    <th style="width:40px"></th>
                    <th>Наименование</th>
                    <th>Количество</th>
                    <th>Цена поставщика</th>
                    <th>Коэффициент</th>
                    <th>Итоговая цена</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr class="expanded">
                    <td>
                        <a href="javascript:;" class="btn small primary-bg tooltip-button" data-placement="top" title=""
                           data-original-title="Скрыть историю цен">
                            <i class="glyph-icon icon-minus-square"></i>
                        </a>
                    </td>
                    <td class="font-bold text-left">Тест тест тест</td>
                    <td><input type="number" value="1" class="input-small"/></td>
                    <td><input type="number" value="100.0" class="input-medium"/></td>
                    <td><input type="number" value="1.5" class="input-small"/></td>
                    <td><input type="number" value="150.0" class="input-medium"/></td>
                    <td>
                        <a href="javascript:;" class="btn small bg-red tooltip-button" data-placement="top" title=""
                           data-original-title="Удалить">
                            <i class="glyph-icon icon-remove"></i>
                        </a>
                    </td>
                </tr>
                <tr>
                    <td colspan="7" class="pad0A">
                        <h3>История цен</h3>
                        <table class="table table-inset table-condensed">
                            <thead>
                            <tr>
                                <th>Дата</th>
                                <th>Контрагент</th>
                                <th>Количество</th>
                                <th>Цена</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td class="font-bold">01.01.2013</td>
                                <td><a href="javascript:;">ООО "Тест 1"</a></td>
                                <td>3</td>
                                <td>
                                    <div class="label bg-green">300.0</div>
                                </td>
                            </tr>
                            <tr>
                                <td class="font-bold">01.01.2013</td>
                                <td><a href="javascript:;">ООО "Тест 1"</a></td>
                                <td>3</td>
                                <td>200.0</td>
                            </tr>
                            <tr>
                                <td class="font-bold">01.01.2013</td>
                                <td><a href="javascript:;">ООО "Тест 1"</a></td>
                                <td>1</td>
                                <td>
                                    <div class="label bg-orange">120.0</div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <h3>История тендеров</h3>
                        <table class="table table-inset table-condensed">
                            <thead>
                            <tr>
                                <th>Дата</th>
                                <th>Контрагент</th>
                                <th>Количество</th>
                                <th>Цена поставщика</th>
                                <th>Наценка</th>
                                <th>Цена</th>
                                <th>Результат</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td class="font-bold">01.01.2013</td>
                                <td><a href="javascript:;">ООО "Тест 1"</a></td>
                                <td>3</td>
                                <td>100.0</td>
                                <td>3</td>
                                <td>300.0</td>
                                <td>Проигран</td>
                            </tr>
                            <tr>
                                <td class="font-bold">01.01.2013</td>
                                <td><a href="javascript:;">ООО "Тест 1"</a></td>
                                <td>3</td>
                                <td>100.0</td>
                                <td>2</td>
                                <td>200.0</td>
                                <td><div class="label bg-green">Успешен</div></td>
                            </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <?php
                $i = 0;
                while ($i < 5) {
                    $i++;
                    ?>
                    <tr>
                        <td>
                            <a href="javascript:;" class="btn small primary-bg tooltip-button" data-placement="top" title=""
                               data-original-title="Показать историю цен">
                                <i class="glyph-icon icon-plus-square"></i>
                            </a>
                        </td>
                        <td class="font-bold text-left">Тест тест тест</td>
                        <td><input type="number" value="1" class="input-small"/></td>
                        <td><input type="number" value="100.0" class="input-medium"/></td>
                        <td><input type="number" value="1.5" class="input-small"/></td>
                        <td><input type="number" value="150.0" class="input-medium"/></td>
                        <td>
                            <a href="javascript:;" class="btn small bg-red tooltip-button" data-placement="top" title=""
                               data-original-title="Удалить">
                                <i class="glyph-icon icon-remove"></i>
                            </a>
                        </td>
                    </tr>
                <?php
                }
                ?>
                <tr>
                    <td class="font-bold text-left" colspan="3">Итого</td>
                    <td>700.0</td>
                    <td>1.5</td>
                    <td>1050.0</td>
                    <td></td>
                </tr>
                </tbody>
            </table>

        <div class="divider"></div>
        <div class="form-row">
            <input type="hidden" name="superhidden" id="superhidden">

            <div class="form-input col-md-12">
                <a href="javascript:;" class="btn medium ui-state-default radius-all-4 primary-bg"
                   id="tender-form-valid"
                   onclick="javascript:$(&apos;#tender-form&apos;).parsley( &apos;validate&apos; );">
                    <span class="button-content">
                        Сохранить
                    </span>
                </a>
                <a href="javascript:;" class="btn medium ui-state-default radius-all-4">
                    <span class="button-content">
                        Печать
                    </span>
                </a>
            </div>
        </div>

    </form>
    <script type="text/javascript">
        $(function () {

            var availableTags = [
                "ActionScript",
                "AppleScript",
                "Asp",
                "BASIC",
                "C",
                "C++",
                "Clojure",
                "COBOL",
                "ColdFusion",
                "Erlang",
                "Fortran",
                "Groovy",
                "Haskell",
                "Java",
                "JavaScript",
                "Lisp",
                "Perl",
                "PHP",
                "Python",
                "Ruby",
                "Scala",
                "Scheme"
            ];
            $(".autocomplete-input").autocomplete({
                source: availableTags
            });

            $(".spinner-input").spinner();

        });

    </script>

<?php include('footer.php') ?>