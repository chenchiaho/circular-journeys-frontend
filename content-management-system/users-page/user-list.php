<?php
require 'admin-required.php';
require '../parts/connect_db.php';
$pageName = 'list';
$title = "資料列表";

$sql = "SELECT * FROM users_information ORDER BY id ASC ";
$rows = $pdo->query($sql)->fetchAll();


$pdo = null;

?>

<?php include '../parts/html-head.php' ?>
<?php include '../parts/navbar.php' ?>


<body>
  <h5 class="text-center" style="margin-top: 150px;">會員資料列表</h5>
  <div class="table-responsive container">
    <table id="myTable"
      class="table table-hover table-secondary display table-bordered align-middle text-center text-nowrap ">
      <thead class="align-middle">
        <tr>
          <th scope="col">操作</th>
          <th scope="col">ID</th>
          <th scope="col">會員編號</th>
          <th scope="col">註冊日期</th>
          <th scope="col">使用狀態</th>
          <th scope="col">姓</th>
          <th scope="col">名</th>
          <th scope="col">生日</th>
          <th scope="col">性別</th>
          <th scope="col">密碼</th>
          <th scope="col">驗證碼</th>
          <th scope="col">信箱</th>
          <th scope="col">電話</th>
          <th scope="col">國家</th>
          <th scope="col">城市</th>
          <th scope="col">郵遞區號</th>
          <th scope="col">地址</th>
          <th scope="col">付款種類</th>
          <th scope="col">供應商</th>
          <th scope="col">卡號</th>
          <th scope="col">到期日</th>
        </tr>
      </thead>
      <tbody class="table-light ">
        <?php foreach ($rows as $r): ?>
        <tr>
          <td scope="row">
            <a class="text-decoration-none" href="./user-edit.php?id=<?= $r['id'] ?>">
              <i class="fa-regular fa-pen-to-square"></i>
            </a>
            <a class="text-decoration-none" href="javascript: delete_it(<?= $r['id'] ?>)">
              <i class="fa-regular fa-trash-can"></i>
            </a>
          </td>
          <td><?= $r['id'] ?></td>
          <td><?= $r['member_id'] ?></td>
          <td><?= $r['created_at'] ?></td>
          <td><?= $r['active_status'] == 1 ? '啟用' : '停用' ?></td>
          <td><?= $r['first_name'] ?></td>
          <td><?= $r['last_name'] ?></td>
          <td><?= $r['birthday'] ?></td>
          <td><?= $r['sex'] == 'm' ? '男' : ($r['sex'] == 'f' ? '女' : '其他') ?></td>
          <td><?= sha1($r['password']) ?></td>
          <td><?= sha1($r['token']) ?></td>
          <td><?= $r['email'] ?></td>
          <td><?= $r['telephone'] ?></td>
          <td><?= $r['country'] ?></td>
          <td><?= $r['city'] ?></td>
          <td><?= $r['postal_code'] ?></td>
          <td><?= $r['address'] ?></td>
          <td><?= $r['payment_type'] ?></td>
          <td><?= $r['provider'] ?></td>
          <td><?= $r['account_no'] ?></td>
          <td><?= $r['expiry'] ?></td>
        </tr>
        <?php endforeach ?>
      </tbody>
    </table>
  </div>
</body>
<script>
  function delete_it(id) {
    if (confirm(`確認是否刪除 ID: ${id} 的會員資料嗎?`)) {
      location.href = `user-delete.php?id=${id}`;
    }
  };
</script>
<?php include '../parts/scripts.php' ?>
<?php include '../parts/html-foot.php' ?>