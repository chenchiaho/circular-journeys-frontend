<?php
require 'admin-required.php';
require '../parts/connect_db.php';
$pageName = 'product list';
$title = "商品管理";

$perPage = 20;
$page = isset($_GET['page']) ? intval($_GET['page']) : 1;
if ($page < 1) {
    header('Location: ?page=1');
    exit;
}

$t_sql = "SELECT COUNT(1) FROM products";
// 總筆數
$totalRows = $pdo->query($t_sql)->fetch(PDO::FETCH_NUM)[0];

// 總頁數
$totalPages = ceil($totalRows / $perPage);

$rows = [];
// 如果有資料的話
if (!empty($totalRows)) {
    if ($page > $totalPages) {
        // 頁碼超出範圍時, 轉向到最後一頁
        header('Location: ?page=' . $totalPages);
        exit;
    }

    $sql = sprintf(
        "SELECT * FROM products ORDER BY id DESC LIMIT %s, %s",
        ($page - 1) * $perPage,
        $perPage
    );
    $rows = $pdo->query($sql)->fetchAll();
}


?>
<?php include '../parts/html-head.php' ?>
<?php include '../parts/navbar.php' ?>
<br>
<br>
<br>

<div class="container">
    <div class="row">
        <div class="col" style="display:flex; justify-content: space-between;">
            <nav aria-label="Page navigation example">
                <ul class="pagination">
                    <li class="page-item <?= $page == 1 ? 'disabled' : '' ?>">
                        <a class="page-link" href="?page=<?= $page - 1 ?>"><i class="fa-solid fa-angle-left"></i></a>
                    </li>

                    <?php for ($i = $page - 5; $i <= $page + 5; $i++) :
                        if ($i >= 1 and $i <= $totalPages) :
                    ?>
                            <li class="page-item <?= $i == $page ? 'active' : '' ?> ">
                                <a class="page-link" href="?page=<?= $i ?>"><?= $i ?></a>
                            </li>
                    <?php endif;
                    endfor; ?>

                    <li class="page-item <?= $page == $totalPages ? 'disabled' : '' ?>">
                        <a class="page-link" href="?page=<?= $page + 1 ?>"><i class="fa-solid fa-angle-right"></i></a>
                    </li>
                </ul>
            </nav>
            <a href="product-add.php" style="padding-right: 43px;">
                <i class="fa-solid fa-file-circle-plus fa-2x"></i>
            </a>
        </div>
    </div>
    <div class="row">
        <div class="col">
            <table class="table table-striped table-bordered">
                <thead>
                    <tr>

                        <th scope="col">ID</th>
                        <th scope="col">商品圖</th>
                        <th scope="col">商品名稱</th>
                        <th scope="col">商品敘述</th>
                        <th scope="col">價格</th>
                        <th scope="col">庫存</th>
                        <th scope="col">分類</th>
                        <th scope="col">商品狀態</th>
                        <th scope="col">創建日期</th>
                        <th scope="col">更新日期</th>

                        <th scope="col"><i class="fa-solid fa-file-pen"></i></th>
                        <th scope="col"><i class="fa-solid fa-trash-can"></i></th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($rows as $r) : ?>
                        <tr>

                            <td><?= $r['id'] ?></td>

                            <td>
                                <a href="image-edit.php?id=<?= $r['id'] ?>">
                                    <?php if (!empty($r['image'])) : ?>
                                        <img src="<?= $r['image'] ?>" height="60">
                                    <?php else : ?>
                                        <img class="fa-solid fa-image fa-4x" src="" height="60">
                                    <?php endif; ?>
                                </a>
                            </td>

                            <td><?= $r['name'] ?></td>
                            <td><?= $r['description'] ?></td>
                            <td><?= "$" . $r['price'] ?></td>
                            <td><?= $r['inventory_id'] ?></td>
                            <td><?= $r['category_id'] ?></td>
                            <td>
                                <?php if ($r['active_status'] == 1) : ?>
                                    <p>已上架</p>
                                <?php else : ?>
                                    <p>尚未上架</p>
                                <?php endif; ?>
                            </td>
                            <td><?= $r['created_at'] ?></td>
                            <td><?= $r['modified_at'] ?></td>

                            <td>
                                <a href="product-edit.php?id=<?= $r['id'] ?>">
                                    <i class="fa-solid fa-file-pen"></i>
                                </a>
                            </td>
                            <td>
                                <a href="javascript: delete_it(<?= $r['id'] ?>)">
                                    <i class="fa-solid fa-trash-can"></i>
                                </a>
                            </td>
                        </tr>
                    <?php endforeach ?>
                </tbody>

            </table>

        </div>
    </div>
</div>
<?php include '../parts/scripts.php' ?>
<script>
    function delete_it(id) {
        if (confirm(`確定要刪除編號為 ${id} 的資料嗎?`)) {
            location.href = `product-delete.php?id=${id}`;
        }
    }
</script>
<?php include '../parts/html-foot.php' ?>