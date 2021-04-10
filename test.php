<?php

//②POSTで送られてきた値を受け取る
$AAA = $_POST['AAA'];

//③$AAAでDBから検索する
$item_AAA = search_item($AAA);

//④セットされているセッションの数を数える
$ses_num = count($_SESSION['item']);

//⑤$ses_numを使用してセッションのキーを作成
$set_ses_name = 'session_item_'.$ses_num;

//⑥$set_ses_nameを使用し検索したアイテムをセッションにセット
$_SESSION['item'][$set_ses_name] = $item_AAA;


?>

//①formで値を送る
<form>
  <input type="text" method="post" name="AAA" value="AAA">
</form>



$_SESSION['item']の中に検索したアイテムの配列ができているはず
formで値を送る度に変数はリセットされるがセッションはそのまま残る

初期状態
$_POST['AAA']は空
$_SESSION['item']は空

１回目の検索
$_POST['AAA']は１回目の値
$_SESSION['item']は空
↓
$_SESSION['item']に$_SESSION['item']['session_item_0']で１回目の検索結果をセット

２回目の検索
$_POST['AAA']は２回目の値
$_SESSION['item']は$_SESSION['item']['session_item_0']で１回目の検索結果を保持
↓
$_SESSION['item']に$_SESSION['item']['session_item_1']で２回目の検索結果をセット

３回目の検索
$_POST['AAA']は３回目の値
$_SESSION['item']は$_SESSION['item']['session_item_0']で１回目の検索結果を保持
$_SESSION['item']は$_SESSION['item']['session_item_1']で２回目の検索結果を保持
↓
$_SESSION['item']に$_SESSION['item']['session_item_2']で３回目の検索結果をセット



任意のアイテムを削除できるようにする
削除したあとcountの数が減る為セットする時のキーに工夫が必要
↓
毎回セッションを変数で受け取る
forで回して再セット
など