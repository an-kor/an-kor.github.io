<?php include('header.php')?>
<?php include('menu.php')?>
    <div id="page-breadcrumb-wrapper">
        <div id="page-breadcrumb">
            <a href="javascript:;">
                <i class="glyph-icon icon-file"></i>
                Печать
            </a>
            <span class="current">
                Архив файлов
            </span>
        </div>
    </div>
<div id="page-content">
<div class="row">
    <table class="table" id="print-templates">
        <thead>
        <tr>
            <th></th>
            <th width="40%">Название</th>
            <th>Дата изменения</th>
            <th>Кем создан</th>
            <th>Файл</th>
            <th></th>
        </tr>
        </thead>
        <tbody>
        <?php
        for ($i=0;$i<5;$i++){
            ?>
            <tr>
                <td><?=$i?></td>
                <td><a href="javascript:;">Тест</a></td>
                <td>01:12 01.01.2013</td>
                <td>Тест Тест</td>
                <td><a href="javascript:;">Скачать</a></td>
                <td>
                    <a href="javascript:;" class="btn small bg-red tooltip-button" data-placement="top" title="" data-original-title="Удалить">
                        <i class="glyph-icon icon-remove"></i>
                    </a>
                </td>
            </tr>
        <?php
        }
        ?>
        </tbody>
    </table>
    <script>

    $(function() {

      $('#print-templates').dataTable( {
          "sScrollY": window.innerHeight-280,
          "bJQueryUI": true,
          "sPaginationType": "full_numbers"
      });

      $('.dataTable .ui-icon-carat-2-n').addClass('icon-sort-up');
      $('.dataTable .ui-icon-carat-2-s').addClass('icon-sort-down');
      $('.dataTable .ui-icon-carat-2-n-s').addClass('icon-sort');

      $('.dataTables_paginate a.first').html('<i class="icon-caret-left"></i>');
      $('.dataTables_paginate a.previous').html('<i class="icon-angle-left"></i>');
      $('.dataTables_paginate a.last').html('<i class="icon-caret-right"></i>');
      $('.dataTables_paginate a.next').html('<i class="icon-angle-right"></i>');

    });
    </script>
</div>

<?php include('footer.php')?>