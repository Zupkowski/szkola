<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cwiczenie_1b - Pętle</title>
    <style>
        body {
            padding: 0 5px;
        }
        h1 {
            text-align: center;
        }
        .grid {
            display: grid;
            grid-template-columns: 50% 50%;
            width: 100%;
        }
        table {
            border: 1px outset;
        }
        td {
            border: 1px inset;
        }
        .mnozenie {
            background: gray;
        }
    </style>
</head>
<body>
    <h1>Pętle</h1>
    <div class="grid">
        <div>
            <!-- 1A -->
            <h2>1a</h2>
            <form action="cwiczenie2.php" method="post">
                Ile liczb wypisać: <input type="text" name="1a">
                <input type="submit" value="OK">
            </form>
            <?php 
                if (isset($_POST['1a'])) {
                    for ($i = 1; $i <= $_POST['1a']; $i++) {
                        echo $i.' ';
                    }
                }
            ?>
        </div>
        <div>
            <!-- 1B -->
             <h2>1b</h2>
            <form action="cwiczenie2.php" method="post">
                Ile liczb wypisać: <input type="text" name="1b">
                <input type="submit" value="OK">
            </form>
            <?php 
                if (isset($_POST['1b'])) {
                    for ($i = 1; $i <= $_POST['1b']; $i++) {
                        echo $i.'<br>';
                    }
                }
            ?>   
        </div>
        <div>
            <!-- 1C -->
            <h2>1c</h2>
            <form action="cwiczenie2.php" method="post">
                Od ilu maleć: <input type="text" name="1c" size="2">
                <input type="submit" value="OK">
            </form>
            <?php 
                if (isset($_POST['1c'])) {
                    for ($i = $_POST['1c']; $i > 0; $i--) {
                        echo $i.' ';
                    }
                }
            ?>   
        </div>
        <div>
            <!-- 1D -->
            <h2>1d</h2>
            <form action="cwiczenie2.php" method="post">
                start: <input type="text" name="1d_start" size="2">
                krok: <input type="text" name="1d_step" size="2">
                koniec: <input type="text" name="1d_end" size="2">
                <input type="submit" value="OK">
            </form>
            <?php 
                if (isset($_POST['1d_start'], $_POST['1d_step'], $_POST['1d_end'])) {
                    for ($i = $_POST['1d_start']; $i <= $_POST['1d_end']; $i = $i + $_POST['1d_step']) {
                        echo $i.' ';
                    }
                }
            ?>   
        </div>
        <div>
            <!-- 2 -->
            <h2>2</h2>
            <form action="cwiczenie2.php" method="post">
                Ile masz lat?<br>
                <select name="2">
                    <?php 
                        for ($i = 1; $i <= 133; $i++) {
                            echo '<option>'.$i.'</option>';
                        }
                    ?>
                </select>
                <input type="submit" value="OK">
            </form>
            <?php 
                if (isset($_POST['2'])) {
                    echo $_POST['2'].'!'.' Jesteś w kwiecie wieku!!!';
                }
            ?>   
        </div>
        <div>
            <!-- 3 -->
            <h2>3</h2>
            <form action="cwiczenie2.php" method="get">
                Ile cyfr: <input type="text" name="3_ile"><br>
                pion/poziom <select name="3_dir">
                    <option>Poziom</option>
                    <option>Pion</option>
                </select><br>
                krok: <input type="text" name="3_step">
                <input type="submit" value="OK">
            </form>
            <?php 
                if (isset($_GET['3_ile'], $_GET['3_step'])) {
                    echo "<table style='margin-top: 10px;'>";
                    if ($_GET['3_dir'] == "Pion") {
                        for ($i = 1; $i <= $_GET['3_ile']*$_GET['3_step']; $i = $i + $_GET['3_step']) {  
                            echo "<tr><td>".$i."</td></tr>";
                        }
                    }           
                    else {
                        echo "<tr>";
                        for ($i = 1; $i <= $_GET['3_ile']*$_GET['3_step']; $i = $i + $_GET['3_step']) {  
                            echo "<td>".$i."</td>";
                        }
                        echo "</tr>";
                    }
                    echo "</table>";
                }
                else {
                    echo "";
                }
            ?>
        </div>
       <div>
            <!-- 4 -->
            <h2>4</h2>
            <form action="cwiczenie2.php" method="post">
                Wierszy: <input type="text" name="4_row" size="5">
                Kolumn: <input type="text" name="4_col" size="5">
                <input type="submit" value="OK">
            </form>
            <?php 
                if (isset($_POST['4_row'], $_POST['4_col'])) {
                    $count=1;
                    echo "<table style='margin-top: 10px;'>";
                    for ($i = 1; $i<=$_POST['4_row']; $i++) {
                        echo "<tr>";
                        for ($j = 1; $j<=$_POST['4_col']; $j++) {
                            echo '<td>'.$count.'</td>';
                            $count += 1;
                        }
                        echo "</tr>";
                    }
                    echo "</table>";
                }
                else {
                    echo "";
                }
            ?>
        </div>
       <div>
            <!-- 5 -->
            <h2>5</h2>
            <form action="cwiczenie2.php" method="post">
                SZACHOWNICA:<br>
                Wierszy: <input type="text" name="5_row" size="5">
                Kolumn: <input type="text" name="5_col" size="5">
                <input type="submit" value="OK">
            </form>
            <?php 
                if (isset($_POST['5_row'], $_POST['5_col'])) {
                    echo "<table style='margin-top: 10px;'>";
                    for ($i = 0; $i<$_POST['5_row']; $i++) {
                        echo "<tr>";
                        if ($i % 2 == 0) {
                            for ($j = 0; $j<$_POST['5_col']; $j++) {
                                if ($j % 2 == 0) {
                                    echo "<td style='background: white;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>";
                                }  
                                else {
                                    echo "<td style='background: black;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>";
                                }                  
                            }
                        }
                        else {
                            for ($j = 0; $j<$_POST['5_col']; $j++) {
                                if ($j % 2 == 0) {
                                    echo "<td style='background: black;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>";
                                }  
                                else {
                                    echo "<td style='background: white;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>";
                                }                  
                            }
                        }
                    }

                }
                else {
                    echo "";
                }
            ?>
        </div>
        <div>
            <!-- 6A -->
            <h2>6a</h2>
            <form action="cwiczenie2.php" method="post">
                Rozmiar: <input type="text" name="6_sz" size="2">
                <input type="submit" value="OK">
            </form>
            <?php
                if (isset($_POST['6_sz'])) {
                    echo "<table style='margin-top: 10px;'>";
                    for ($i = 1; $i<=$_POST['6_sz']; $i++) {
                        echo "<tr>";
                        for ($j = 1; $j<=$_POST['6_sz']; $j++) {
                            echo '<td>'.$i*$j.'</td>';
                        }
                        echo "</tr>";
                    }
                    echo "</table>";
                }
                else {
                    echo "";
                }
            ?>
        </div>
        <div>
            <!-- 6A -->
            <h2>6a</h2>
            <form action="cwiczenie2.php" method="post">
                Rozmiar: <input type="text" name="6_sz" size="2">
                <input type="submit" value="OK">
            </form>
            <?php
                if (isset($_POST['6_sz'])) {
                    echo "<table style='margin-top: 10px; border: none;'>";
                    for ($i = 0; $i<=$_POST['6_sz']; $i++) {
                        echo "<tr>";
                        if ($i == 0) {
                            echo "<td style='border: none;'>".""."</td>";
                        }
                        else {
                            echo "<td class='mnozenie' style='border: none;'>&nbsp;".$i."&nbsp;</td>";
                        }
                        for ($j = 1; $j<=$_POST['6_sz']; $j++) {
                            if ($i == 0) {
                                echo '<td class="mnozenie" style="border: none;">'.$j.'</td>';
                            }
                            else {
                                echo '<td style="border: none;">'.$i*$j.'</td>';
                            }
                        }
                        echo "</tr>";
                    }
                    echo "</table>";
                }
                else {
                    echo "";
                }
            ?>
        </div>
    </div>
</body>
</html>