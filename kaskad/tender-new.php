<?php include('header.php')?>
<?php include('menu.php')?>
    <div id="page-breadcrumb-wrapper">
        <div id="page-breadcrumb">
            <a href="javascript:;">
                <i class="glyph-icon icon-file"></i>
                Тендеры
            </a>
            <span class="current">
                Создать новый
            </span>
        </div>
    </div>
<div id="page-content">
    <script type="text/javascript" src="assets/ckeditor/ckeditor.js"></script>
        <div class="content-box">
        <h3 class="content-box-header ui-state-default"><span>Отправитель: <a href="mailto://example@example.com">example@example.com</a>. Дата: 12:23 12.23.2013 </span></h3>
        <div class="content-box-wrapper pad0A">
        <div class="scrollable-content scrollable-small pad0R" style="overflow: hidden; outline: none;">
               Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).


                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

                The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
        </div>
        </div>
    </div>
     <form action="" id="print-form" class="col-md-12 center-margin" method="">
        <div class="form-row">
            <div class="form-label col-md-12">
                <label for="">
                    Контрагент:
                </label>
            </div>
            <div class="form-input col-md-12">
                <span role="status" aria-live="polite" class="ui-helper-hidden-accessible"></span><input type="text" class="col-md-12 autocomplete-input ui-autocomplete-input" autocomplete="off">
            </div>
        </div>
        <div class="form-row">
            <div class="form-label col-md-12">
                <label for="">
                    Номенклатура:
                </label>
            </div>
            <div class="form-input col-md-12">
                <span role="status" aria-live="polite" class="ui-helper-hidden-accessible"></span><input type="text" class="col-md-8 autocomplete-input ui-autocomplete-input" autocomplete="off">
                <a href="#" class="btn medium primary-bg" title="">
                    <span class="button-content">Добавить</span>
                </a>
            </div>
        </div>
        <div class="divider"></div>
        <div class="form-row">
            <input type="hidden" name="superhidden" id="superhidden">
            <div class="form-input col-md-10 col-md-offset-2">
                <a href="javascript:;" class="btn medium ui-state-default radius-all-4" id="tender-form-valid" onclick="javascript:$(&apos;#tender-form&apos;).parsley( &apos;validate&apos; );">
                    <span class="button-content">
                        Сохранить
                    </span>
                </a>
            </div>
        </div>

    </form>
<script type="text/javascript">
    $(function() {

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
         $( ".autocomplete-input" ).autocomplete({
             source: availableTags
         });

         $(".spinner-input" ).spinner();

    });

</script>

<?php include('footer.php')?>