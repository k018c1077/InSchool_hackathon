<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>書籍検索サイト</title>
</head>
<body>
    <h1>書籍検索サイト</h1>
    <form action="./index.php" method="post">
    <input type="text" name="ISBN">
    <input type="submit" value="検索">
    </form>
    <?php
    if(!isset($_POST['ISBN'])){
        echo "<h2>検索結果</h3>";
        $url = "https://www.googleapis.com/books/v1/volumes?q=isbn:" + $_POST['ISBN'];
        $data = file_get_contents(url);
        $data = json_decode($data);
        echo $data;
    }
    ?>
</body>
</html>