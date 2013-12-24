<?php include('header.php')?>
<?php include('menu.php')?>
    <div id="page-breadcrumb-wrapper">
        <div id="page-breadcrumb">
            <a href="javascript:;">
                <i class="glyph-icon icon-envelope"></i>
                Рассылка
            </a>
            <span class="current">
                Создать рассылку
            </span>
        </div>
    </div>
<div id="page-content">
    <script type="text/javascript" src="assets/ckeditor/ckeditor.js"></script>
    <div id="form-wizard" class="form-wizard">
        <ul>
            <li>
                <a href="#step-1">
                    <label class="wizard-step">1</label>
          <span class="wizard-description">
             Текст рассылки
          </span>
                </a>
            </li>
            <li>
                <a href="#step-2">
                    <label class="wizard-step">2</label>
          <span class="wizard-description">
             Параметры
             <small>Интервал отправки</small>
          </span>
                </a>
            </li>
        </ul>
        <div id="step-1">

            <div class="form-row">
                <div class="form-label col-md-12">
                    <label for="">
                        Тема:
                    </label>
                </div>
                <div class="form-input col-md-12">
                    <input type="text" name="" id="">
                </div>
            </div>
            <div class="form-row">
                <div class="form-label col-md-12">
                    <label for="">
                        Текст:
                    </label>
                </div>
                <div class="form-input col-md-12">
                    <textarea class="ckeditor" cols="80" id="editor1" name="editor1" rows="10" style="height:400px"></textarea>
                </div>
            </div>

            <div class="form-row">
                <div class="form-label col-md-12">
                    <label for="">
                        Подвал (контакты):
                    </label>
                </div>
                <div class="form-input col-md-12">
                    <textarea rows="3"></textarea>
                </div>
            </div>

        </div>
        <div id="step-2">
            <form action="" class="col-md-10 center-margin" method="">
                <div class="form-row">
                    <div class="form-label col-md-12">
                        <label for="">
                            Периодичность:
                        </label>
                    </div>
                    <div class="form-input col-md-5">
                        <select name="" class="custom-select" style="">
                            <option>Один раз</option>
                            <option>Каждый день</option>
                            <option>Раз в 7 дней</option>
                            <option>Раз в 14 дней</option>
                            <option>Раз в 30 дней</option>
                        </select>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-label col-md-12">
                        <label for="">
                            Активность рассылки:
                        </label>
                    </div>
                    <div class="form-input col-md-10">
                        <div class="form-row col-lg-3 float-left form-vertical">
                            <div class="form-label">
                                <label for="from">с:</label>
                            </div>
                            <div class="form-input">
                                <input type="text" size="10" class="fromDate" name="from">
                            </div>
                        </div>

                        <div class="form-row col-lg-3 float-left form-vertical">
                            <div class="form-label">
                                <label for="to">по:</label>
                            </div>
                            <div class="form-input">
                                <input type="text" size="10" class="toDate" name="to">
                            </div>
                        </div>

                        <script type="text/javascript">

                            $(function() {

                                $( ".fromDate" ).datepicker({
                                    changeMonth: true,
                                    numberOfMonths: 2,
                                    onClose: function( selectedDate ) {
                                        $( ".toDate" ).datepicker( "option", "minDate", selectedDate );
                                    }
                                });
                                $( ".toDate" ).datepicker({
                                    defaultDate: "+1w",
                                    changeMonth: true,
                                    numberOfMonths: 2,
                                    onClose: function( selectedDate ) {
                                        $( ".fromDate" ).datepicker( "option", "maxDate", selectedDate );
                                    }
                                });


                            });

                        </script>
                    </div>
                </div>
            </form>

        </div>
    </div>

<?php include('footer.php')?>