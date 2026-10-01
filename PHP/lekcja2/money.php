<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Money money money</title>
</head>
<body>
    <?php 
        $address = "localhost";
        $user = "root";
        $pass = "ServBay.dev";
        $db = "zurekFlagi";
        $mysqli = mysqli_connect($address, $user, $pass, $db);

        // if (mysqli_connect_()) {
        //     printf("", mysqli_connect_error());
        //     exit(1);
        // };
        $result = $mysqli->query("SELECT * FROM kraje");
        echo($result);

    ?>
</body>
</html>