<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cwiczenie_1a - GET, POST, if, switch</title>
    <style>
        h1 {
            text-align: center;
        }
        .cols {
            display: flex;
            width: 100%;
            align-content: center;
        }
        .grid {
            display: grid;
            grid-template-columns: auto auto;
        }
    </style>
</head>
<body>
    <h1>Pobieranie wartości z formularza, instrukcja warunkowa</h1>
    <div class="grid">
        <div>
            <!-- PIERWSZY -->
            <h2>1</h2>
            <form action="cwiczenie.php" method="post">
                <input name="1" type="text" ></input>
                <input type="submit" value="OK"></input>
            </form><br>
            Wpisano: <?php if (isset($_POST['1'])) echo $_POST['1'] . "<br/>"; ?>
        </div>
        <div>
            <!-- DRUGI -->
            <h2>2</h2>
            Ile masz lat?
            <form action="wynik.php" method="post">
                <input type="text" name="age">
                <input type="submit" value="OK"></input>
            </form>
        </div>
        <div>
            <!-- TRZECI -->
            <h2>3</h2>
            <form action="cwiczenie.php" method="get">
                <select name="3">
                    <option value="y">TAK</option>
                    <option value="n">NIE</option>
                </select>
                <input type="submit" value="OK"></input>
            </form><br>
            <?php 
                if (isset($_GET['3'])) { 
                    if ($_GET['3'] == "y") { 
                        echo "ja tez"; 
                    } 
                    else {
                        echo "szkoda :(";
                    } 
                }?>
        </div>
        <div></div>
        <div>
            <!-- CZWARTY A -->
            <h2>4a</h2>
            <form action="cwiczenie.php" method="post">
                <input name="4a_a" type="text" size="5"></input>
                <select name="4a_comp">
                    <option><</option>
                    <option><=</option>
                    <option>=</option>
                    <option>></option>
                    <option>>=</option>
                </select>
                <input name="4a_b" type="text" size="5">?</input>
                <input type="submit" value="OK"></input>
            </form><br>
            <?php 
                if (isset($_POST['4a_a']) && isset($_POST['4a_b'])) {
                    $a = $_POST['4a_a'];
                    $b = $_POST['4a_b'];
                    switch ($_POST['4a_comp']) {
                        case ">": $result = $a > $b; break;
                        case ">=": $result = $a >= $b; break;
                        case "=": $result = $a == $b; break;
                        case "<": $result = $a < $b; break;
                        case "<=": $result = $a <= $b; break;
                        default: $result = false;
                    }
                    if ($result) {
                        echo "TAK";
                    }
                    else {
                        echo "NIE";
                    }
                }
                else {
                    echo "";
                }
            ?>
        </div>
        <div>
            <!-- CZWARTY B -->
            <h2>4b</h2>
            <form action="cwiczenie.php" method="post">
                <input name="4b_a" type="text" size="5"></input>
                <select name="4b_comp">
                    <option><</option>
                    <option><=</option>
                    <option>=</option>
                    <option>></option>
                    <option>>=</option>
                </select>
                <input name="4b_b" type="text" size="5">?</input>
                <input type="image" src="okejka.jpg" style="width: 40px; position: relative; top: 15px;">
            </form><br>
            <?php 
                if (isset($_POST['4b_a']) && isset($_POST['4b_b'])) {
                    $a = $_POST['4b_a'];
                    $b = $_POST['4b_b'];
                    switch ($_POST['4b_comp']) {
                        case ">": $result = $a > $b; break;
                        case ">=": $result = $a >= $b; break;
                        case "=": $result = $a == $b; break;
                        case "<": $result = $a < $b; break;
                        case "<=": $result = $a <= $b; break;
                        default: $result = false;
                    }
                    if ($result) {
                        echo "TAK";
                    }
                    else {
                        echo "NIE";
                    }
                }
                else {
                    echo "";
                }
            ?>
        </div>
        <div>
            <!-- PIATY A -->
            <h2>5a</h2>
            <form action="cwiczenie.php" method="post">
                Wpisz współczynniki równania kwadratowego:<br>
                <input name="5a_a" type="text" size="1"> x<sup>2</sup> +</input>
                <input name="5a_b" type="text" size="1"> x +</input>
                <input name="5a_c" type="text" size="1"> = 0</input>
                <input type="submit" value="OK"></input>
            </form><br>
            <?php 

                if (isset($_POST['5a_a']) && isset($_POST['5a_b']) && isset($_POST['5a_c'])) {
                    $a = $_POST['5a_a'];
                    $b = $_POST['5a_b'];  
                    $c = $_POST['5a_c'];
                    $delta = $b**2 - 4*$a*$c;
                    echo "Delta = ".$delta."<br>";
                    if ($delta < 0) {
                        echo 'BRAK ROZWIĄZAŃ';
                    }
                    else if ($delta == 0) {
                        echo "x<sub>0</sub> = ".(-$b*2*$a);
                    }
                    else {
                        echo "x<sub>1</sub> = ".(-$b-sqrt($delta))/(2*$a)."<br>";
                        echo "x<sub>2</sub> = ".(-$b+sqrt($delta))/(2*$a)."<br>";
                    }
                }
            ?>
        </div>
        <div>
            <!-- PIATY B -->
            <h2>5b</h2>
            <form action="cwiczenie.php" method="post">
                Wpisz współczynniki równania kwadratowego:<br>
                <input name="5b_a" type="text" size="1"> x<sup>2</sup> +</input>
                <input name="5b_b" type="text" size="1"> x +</input>
                <input name="5b_c" type="text" size="1"> = 0</input>
                <input type="submit" value="oblicz pierwiastki"></input>
            </form><br>
            <?php 

                if (isset($_POST['5b_a']) && isset($_POST['5b_b']) && isset($_POST['5b_c'])) {
                    $a = $_POST['5b_a'];
                    $b = $_POST['5b_b'];  
                    $c = $_POST['5b_c'];
                    $delta = $b**2 - 4*$a*$c;
                    echo "&#916 = "."<input style='color:red;' size='2' disabled value=".$delta."> ";
                    if ($delta < 0) {
                        echo 'BRAK ROZWIĄZAŃ';
                    }
                    else if ($delta == 0) {
                        echo " x<sub>0</sub>= "."<input style='color:green;' disabled value=".(-$b*2*$a).">";
                    }
                    else {
                        echo " x<sub>1</sub>= "."<input style='color:green;' disabled value=".(-$b-sqrt($delta))/(2*$a).">";
                        echo " x<sub>2</sub>= "."<input style='color:green;' disabled value=".(-$b+sqrt($delta))/(2*$a).">";
                    }
                }
            ?>
        </div>
    </div>
</body>
</html>