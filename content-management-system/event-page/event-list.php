<?php
require '../parts/connect_db.php';
$pageName = 'list';
$title = "活動專區";

$perPage = 20;
$page = isset($_GET['page']) ? intval($_GET['page']) : 1;
if ($page < 1) {
    header('Location: ?page=1');
    exit;
}

$t_sql = "SELECT COUNT(1) FROM events_menu";
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
        "SELECT * FROM events_menu ORDER BY id DESC LIMIT %s, %s",
        ($page - 1) * $perPage,
        $perPage
    );
    $rows = $pdo->query($sql)->fetchAll();
}


?>
<?php include '../parts/html-head.php' ?>
<?php include '../parts/navbar.php'  ?>
<br>
<br>
<br>
<div class="container">
    <div class="row"></div>
    <div class="col ">
        <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-center">
                <a class="btn btn-dark" href="../event-page/add.php" role="button">Create</a>

                <li class="page-item <?= $page == 1 ? 'disabled' : '' ?>">
                    <a class="page-link" href="?page=<?= $page - 1 ?>"><i class="fa-solid fa-circle-arrow-left"></i></a>
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
                    <a class="page-link" href="?page=<?= $page + 1 ?>"><i class="fa-solid fa-circle-arrow-right"></i></a>
                </li>
            </ul>
        </nav>
    </div>
</div>

<div class="row justify-content-center">
    <div class="col-9">
        <table class="table table-hover table-bordered ">
            <thead class="text-nowrap  table-dark">
                <tr>
                    <th scope="col">活動代碼</th>
                    <th scope="col">活動名稱</th>
                    <th scope="col">圖片</th>
                    <th scope="col">活動簡介</th>
                    <th scope="col">創建日期</th>
                    <th scope="col">更新日期</th>
                    <th scope="col"><i class="fa-solid fa-file-pen"></i></th>
                    <th scope="col"><i class="fa-solid fa-trash-can"></i></th>
                </tr>
            </thead>
            <tbody">
                <?php foreach ($rows as $r) : ?>
                    <tr>
                        <td class="text-nowrap"><?= $r['id'] ?></td>
                        <td class="text-break"><?= $r['name'] ?></td>
                        <td class="text-break"><?= $r['image'] ?></td>
                        <td class="text-break"><?= $r['description'] ?></td>
                        <td class="text-nowrap"><?= $r['created_at'] ?></td>
                        <td class="text-nowrap"><?= $r['modified_at'] ?></td>
                        <td>
                            <a href="edit.php?id=<?= $r['id'] ?>">
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
            location.href = `delete.php?id=${id}`;
        }
    }
</script>
<?php include '../parts/html-foot.php' ?>