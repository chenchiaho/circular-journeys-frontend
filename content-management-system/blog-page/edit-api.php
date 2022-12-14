<?php
require '../parts/connect_db.php';
header('Content-Type: application/json');

$ouput =[
    'success' => false,
    'postData' => $_POST,
    'code' => 0,
    'errors' => []
];

if(empty($_POST['post_id'])){
    $ouput['errors']['post_id'] = '沒有文章編號';
    echo json_encode($ouput, JSON_UNESCAPED_UNICODE);
    exit;
}

if(empty($_POST['post_title']) && empty($_POST['post_content'])){
    $ouput['errors']['post_title'] = '沒有文章標題';
    $ouput['errors']['post_content'] = '沒有文章內文';
    echo json_encode($ouput, JSON_UNESCAPED_UNICODE);
    exit;
}else if(empty($_POST['post_title'])){
    $ouput['errors']['post_title'] = '沒有文章標題';
    echo json_encode($ouput, JSON_UNESCAPED_UNICODE);
    exit;
}else if(empty($_POST['post_content'])){
    $ouput['errors']['post_content'] = '沒有文章內文';
    echo json_encode($ouput, JSON_UNESCAPED_UNICODE);
    exit;
}

$isPass = true;
$post_id =intval($_POST['post_id']);


if(mb_strlen($_POST['post_title']) < 2){
    $ouput['errors']['post_title'] = '請正確輸入文章標題';
    $isPass = false;

}
if(mb_strlen($_POST['post_content']) < 2){
    $ouput['errors']['post_content'] = '請正確輸入文章內文';
    $isPass = false;
}


$sql = "UPDATE `post` SET 
        `modified_date`=NOW(),
        `post_title`=?,
        `post_content`=? WHERE `post_id`=?";

$stmt = $pdo -> prepare($sql);

if($isPass){
    $stmt -> execute([
        $_POST['post_title'],
        $_POST['post_content'],
        $post_id
    ]);
    $ouput['success'] = !! $stmt->rowCount();
}


echo json_encode($ouput, JSON_UNESCAPED_UNICODE);
