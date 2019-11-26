# 学内ハッカソン　準備授業

## はじめに

この準備授業では下記環境を使用します。
これ以外の環境についてはサポートいたしかねますから、予めご承知ください・

- Windows 10
- Visual Studio Code
- XAMPP

---
## 今日確認する内容

- PHPによる動的ページ生成
- JSONとは？
- WEB APIの作り方


---
## 1.PHPによる動的ページ生成

今回の開発はWEBアプリケーション開発がテーマですので  
全員統一で
PHPを使用することになります。

PHPのみを使用する場合はアクセスするごとに更新されるページを作る事ができます。  
まずはそこからおさらいしましょう。

![完成形１](./img/1.png "完成形")

今回は`Google books APIs`を使用します。  
このAPIは
```
https://www.googleapis.com/books/v1/volumes?q=isbn:検索したい書籍のISBN
```
のようにGETリクエストを送ると  
JSONという形式で書籍のデータを返します。  

JSONについては後ほど説明しますから、ひとまず聞き流しておいてください。

```
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
</body>
</html>
```
まずはこの素のコードを見てみましょう。  
formタグに記載がありますが、このフォームは自分自身に対してPOSTでデータを送信します。  
それでは具体的なコードを書いていきましょう。

```
    <?php
    if(isset($_POST['ISBN'])){
        echo "<h2>検索結果</h3>";
        $url = "https://www.googleapis.com/books/v1/volumes?q=isbn:" . $_POST['ISBN'];
        $data = file_get_contents($url);
        $data = json_decode($data,true);
        print_r($data);
    }
    ?>
```
これは Form の下に貼り付けて使用します。  
するとこのようなデータが画面に表示されます。

![データデバッグ](./img/2.png "データデバッグ")

このコードではまず`$url`の中にデータを取得するURLが格納されます。
もともと用意していたURLの最後にISBNをくっつけているだけですね。  
そしてPHPに用意されている`file_get_contents`関数を用い、データを取得します。  
この状態ではまだ中身はただの文字列ですので、使いやすいように配列に戻します。
次行
```
$data = json_decode($data,true);
```
このコードによってJSONテキストとして格納されているデータが連想配列になります。  
便利ですね。
そして
print_rによって配列の内容がそのまま表示されております。  
右クリックして`ページのソースを表示`を押下してみましょう。  

![データデバッグ](./img/3.png "データデバッグ")

ご覧のように配列が見やすく表示されました。  
階層が深くなるとそれは配列の中に配列が入っていることを意味します。  
つまり、例えばこの本のタイトルを取得するのであれば
```
echo $data['items'][0]['volumeInfo']['title'];
```
このようなコードで直感的にデータを取得することができます。

```
    <?php
    if(isset($_POST['ISBN'])){
        echo "<h2>検索結果</h3>";
        $url = "https://www.googleapis.com/books/v1/volumes?q=isbn:" . $_POST['ISBN'];
        $data = file_get_contents($url);
        $data = json_decode($data,true);
        echo $data['items'][0]['volumeInfo']['title'];
        echo "<br>";
        echo $data['items'][0]['volumeInfo']['authors'][0];
    }
```

試しにこのコードにしてみましょう。
タイトルと著者が表示されるはずです。

---
## 2.JSONとは？

JSONは、`JavaScript Object Notation`の略語で、人間にも機械にも親和性の高い形でデータを共有することのできるフォーマットです。

何も難しいことはなく、先程連想配列でデータを取得、表示したあれこそがJSONです。  
JSONでは下記６種類のデータをやりとりすることができます。

- String
- Number
- Boolean
- Null
- array
- object

実際には次のような形でデータが格納されます。

```
{
  "foo": [ 1, null ],
  "baz": {
    "foo": [ true, "bar" ],
    "baz": "qux"
  }
}
```
思っていたよりかはわかりやすいのではないかと思います。

この後WEBAPIの作り方について説明しますが、実際やっていることはデータを取得、加工してJSONで吐き出すだけです。  
PHPの連想配列をそのままJSONに変換することができますから何も怖いことはありません。

---
## 3.WEBAPIの作り方

次に今回の肝、画面に表示されるプログラムではなく、ほかのプログラムから呼び出せる  
**API**
を作ってみましょう。　　

まずは先程のコードを書き換えていきます。
画面表示などは邪魔なだけですから削除します。
```
<?php
    if(isset($_GET['ISBN'])){
        $url = "https://www.googleapis.com/books/v1/volumes?q=isbn:" . $_POST['ISBN'];
        $data = file_get_contents($url);
        $data = json_decode($data,true);
        $title = $data['items'][0]['volumeInfo']['title'];
        $author = $data['items'][0]['volumeInfo']['authors'][0];
    }
?>
```
代わりに、表示していたタイトル、著者をそれぞれ変数に格納しました。
また、今回はテストをしやすいよう、POSTからGETに変更をしています。
PHPからJSONで値を返すには下記の手順をとります。
1. データを連想配列として格納する。
2. json_encode関数を用いてjsonテキストに変換する。
3. printを使って吐き出す。

以上の３点、とっても単純です。
今回はこのコードで出力します。
```
$ret_data = array("title" => $title,"author" => $author);

$ret_data = json_encode($ret_data);

$print $ret_data;
```
コードが追記できたら以下のURLにアクセスしてみましょう。
```
view-source:http://localhost/Sample_code/Pre-1/API.php?ISBN=4774176982
```
するとこのように表示されます。


![WEBAPI](./img/4.png "WEBAPI")
これはJSONの生のデータです。
このデータを加工することによって先程のように配列に戻すことができます。
このような方法を用いて今回はESP32とWEBシステムをつなげていきます。