<?php include('header.php')?>
<?php include('menu.php')?>
    <div id="page-breadcrumb-wrapper">
        <div id="page-breadcrumb">
            <a href="javascript:;">
                <i class="glyph-icon icon-envelope"></i>
                Рассылка
            </a>
            <span class="current">
                Список рассылок
            </span>
        </div>
    </div>
<div id="page-content">
<div class="row">
    <table class="table">
        <thead>
        <tr>
            <th></th>
            <th width="40%">Название</th>
            <th>Дата активности</th>
            <th>Активность</th>
            <th>Кем создана</th>
            <th></th>
        </tr>
        </thead>
        <tbody>
        <?php
        for ($i=0;$i<10;$i++){
            ?>
            <tr>
                <td><?=$i?></td>
                <td><a href="javascript:;">Тест</a></td>
                <td>01.01.2013 - 01.01.2013</td>
                <td>Активна</td>
                <td><a href="javascript:;">Тест Тест</a></td>
                <td>
                    <a href="javascript:;" class="btn small bg-blue-alt tooltip-button" data-placement="top" title="" data-original-title="Редактировать">
                        <i class="glyph-icon icon-edit"></i>
                    </a>
                    <a href="javascript:;" class="btn small bg-red tooltip-button" data-placement="top" title="" data-original-title="Отключить">
                        <i class="glyph-icon icon-remove"></i>
                    </a>
                </td>
            </tr>
        <?php
        }
        ?>
        </tbody>
    </table>
</div>

<?php include('footer.php')?>