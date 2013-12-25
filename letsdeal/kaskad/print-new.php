<?php include('header.php')?>
<?php include('menu.php')?>
    <div id="page-breadcrumb-wrapper">
        <div id="page-breadcrumb">
            <a href="javascript:;">
                <i class="glyph-icon icon-file"></i>
                Печать
            </a>
            <span class="current">
                Создать документ
            </span>
        </div>
    </div>
<div id="page-content">
    <script type="text/javascript" src="assets/ckeditor/ckeditor.js"></script>
    <div class="row">
         <form action="" id="print-form" class="col-md-12 center-margin" method="">
            <div class="form-row">
                <div class="form-label col-md-12">
                    <label for="">
                        Название:
                        <span class="required">*</span>
                    </label>
                </div>
                <div class="form-input col-md-6">
                    <input type="text" id="text" name="text" data-type="text" data-trigger="change" data-required="true" class="parsley-validated">
                </div>
            </div>
            <div class="form-row">
                <div class="form-label col-md-12">
                    <label for="">
                        Шаблон:
                    </label>
                </div>
                <div class="form-input col-md-6">
                    <select name="" class="custom-select" style="">
                        <option>ООО "Тест"</option>
                        <option>ООО "Тест 2"</option>
                    </select>
                </div>
            </div>
            <div class="form-row">
                <div class="form-label col-md-12">
                    <label for="" class="label-description">
                        Текст:
                    </label>
                </div>
                <div class="form-input col-md-12">
                    <textarea id="message" name="message" class="ckeditor" style="height:400px"></textarea>
                </div>
            </div>
            <div class="divider"></div>
            <div class="form-row">
                <input type="hidden" name="superhidden" id="superhidden">
                <div class="form-input col-md-10 col-md-offset-2">
                    <a href="javascript:;" class="btn medium ui-state-default radius-all-4" id="print-form-valid" onclick="javascript:$(&apos;#print-form&apos;).parsley( &apos;validate&apos; );">
                        <span class="button-content">
                            Скачать файл для печати
                        </span>
                    </a>
                </div>
            </div>

        </form>
    </div>

<?php include('footer.php')?>