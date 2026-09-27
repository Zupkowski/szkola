<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php
        $age = $_POST['age'];
        if ($age < 18) {
            echo "Jesteś nastolatkiem.";
        }
        else if ($age > 18 && $age < 30) {
            echo "Trzydziestka na karku :(";
        }
        else {
            echo "Starość nie radość.";
        }
    ?>
</body>
</html>