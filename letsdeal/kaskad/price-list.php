<?php include('header.php')?>
<?php include('menu.php')?>
    <div id="page-breadcrumb-wrapper">
        <div id="page-breadcrumb">
            <a href="javascript:;">
                <i class="glyph-icon icon-money"></i>
                Оценка
            </a>
            <span class="current">
                Список
            </span>
        </div>
    </div>
<div id="page-content">
<div class="row">
    <table class="table" id="tender-list">
        <thead>
        <tr>
            <th>ID</th>
            <th>Дата создания</th>
            <th width="30%">Контрагент</th>
            <th>Кем создан</th>
            <th></th>
        </tr>
        </thead>
        <tbody>
        <?php
        for ($i=0;$i<30;$i++){
            ?>
            <tr>
                <td><?=rand()?></td>
                <td>12:34 01.01.2013</td>
                <td><a href="tender-new.php">Тест</a></td>
                <td><a href="tender-new.php">Тест Тест</a></td>
                <td>
                    <a href="tender-new.php" class="btn small bg-blue-alt tooltip-button" data-placement="top" title="" data-original-title="Редактировать">
                        <i class="glyph-icon icon-edit"></i>
                    </a>
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

            $('#tender-list').dataTable( {
                "sScrollY": window.innerHeight-280,
                "iDisplayLength": 25,
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