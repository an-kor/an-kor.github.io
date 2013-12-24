<?include('header.php')?>
<?include('menu.php')?>
<script type="text/javascript" src="assets/ckeditor/ckeditor.js"></script>
<script type="text/javascript" src="assets/ckeditor/config.js"></script>
<script type="text/javascript" src="assets/ckeditor/contents.css"></script>
<script type="text/javascript" src="assets/ckeditor/styles.js"></script>
<div class="row">
    <table class="table">
        <thead>
        <tr>
            <th></th>
            <th width="40%">Название</th>
            <th>Дата начала</th>
            <th>Активность</th>
            <th>Кем создана</th>
            <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        <?
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
        <?
        }
        ?>
        </tbody>
    </table>
</div>

<?include('footer.php')?>