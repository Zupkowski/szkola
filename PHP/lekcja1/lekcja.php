<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <form action="zzz.php?id=323" method="post">
        <input type="text" name="imie">
        <select name="gender">
            <option>MENNNNIO</option>
            <option value="W">KOBIETA</option>
        </select>
        Hobby: <input type="radio" name="hobby" value="fi">Wedka
        <input name="hobby" type="radio" value="ch">Szachy
        <input name="hobby" type="radio" value="dance">Shuffle
        <input type="checkbox" name="czek">
        <input type="submit" value="Send ME">
    </form>
    <?php
    echo "Ala jazda!!"; // srednik wymagany!!!

    ?>
    <?
    // short open tag
    echo "lool";
    ?>
    <?= "67" ?>

    <?php
    /*

*/
    $zmienna = "test"; // domyslnie typy dynamiczne
    echo $zmienna;
    define("IMIE", "Maciej");
    echo "<br>" . IMIE; // ''
    $wiek = 33;
    echo "Mam $wiek lata<br/>\"\"";
    echo 'Mam $wiek lata<br/>';
    ?>
</body>

</html>

----------- zzz.php
<pre>
<?php
$_GET['b'] = true;
print_r($_GET);
print_r($_POST);
print_r($_REQUEST);
//var_dump($_GET);
echo $_POST['gender'];

<body>
    <form method="post">
        <input name="data" />
        <input type="submit" value="ok" />
    </form><br />
    Wpisano: <?php echo $_POST['data'] . "<br/>"; ?>
    Wpisano: <?php if (isset($_POST['data'])) echo $_POST['data'] . "<br/>"; ?>
    Wpisano: <?php echo @$_POST['data'] . "<br/>"; ?>

</body>