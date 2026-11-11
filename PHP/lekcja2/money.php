<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Money money money</title>
    <style>
        body {
            background: rgb(248,248,248);
        }
        .flag {
            width: 30px;
            margin: auto;
        }
        table, td, th {
            border: 1px solid black;
            border-collapse: collapse;
        }
        td {
            padding: 2px 4px;
        }
        /* .center {
            width: 100%;
        } */

    </style>
</head>
<body>
    <?php
        include("connection.php");

        if (isset($_GET['nr_kat']) && isset($_GET['stop']) && isset($_GET['rok']) && !isset($_GET['edit'])) {
            $stop_id = mysqli_fetch_assoc($mysqli->query("SELECT * FROM `stopy` WHERE `stop` = '$_GET[stop]'"));
            $kraj_id = mysqli_fetch_assoc($mysqli->query("SELECT * FROM `kraje` WHERE `nazwa` = '$_GET[kraj]'"));
            $stmt = $mysqli->prepare("INSERT INTO main (`kraj_id`, `nominal`, `nr_kat`, `stop_id`, `rok`) VALUES ('$kraj_id[id]', '$_GET[nominal]', '$_GET[nr_kat]', '$stop_id[id]', '$_GET[rok]')");
            $stmt->execute();
        }
        else if (isset($_GET['del'])) {
            $stmt = $mysqli->prepare("DELETE FROM `main` WHERE id = '$_GET[del]';");
            $stmt->execute();
        }
        else if (isset($_GET['edit']) && $_GET['edit']=="true") {
            $stop_id = mysqli_fetch_assoc($mysqli->query("SELECT * FROM `stopy` WHERE `stop` = '$_GET[stop]'"));
            $kraj_id = mysqli_fetch_assoc($mysqli->query("SELECT * FROM `kraje` WHERE `nazwa` = '$_GET[kraj]'"));
            $stmt = $mysqli->prepare("UPDATE `main` SET `kraj_id` = ?, `nominal` = ?, `nr_kat` = ?, `stop_id` = ?, `rok` = ? WHERE `id` = ?");
            $stmt->bind_param("issiii", $kraj_id['id'], $_GET['nominal'], $_GET['nr_kat'], $stop_id['id'], $_GET['rok'], $_GET['editId']);
            $stmt->execute();
        };
    ?>
    <table>
        <tr>
            <th></th>
            <th>nominał</th>
            <th>nr kat.</th>
            <th>stop</th>
            <th>rok</th>
            <th></th>
        </tr>
        <?php 
            include("connection.php");

            $result = $mysqli->query("SELECT main.id, kraje.nazwa, kraje.filename, main.nominal, main.nr_kat, stopy.stop, main.rok FROM main INNER JOIN kraje ON kraje.id = main.kraj_id INNER JOIN stopy ON stopy.id = main.stop_id ORDER BY kraje.nazwa, main.rok ASC;");

            while ($row = mysqli_fetch_assoc($result)) {
                if (isset($_GET['edit_id']) && $row['id'] == $_GET['edit_id']) {
                    $kraje = $mysqli->query("SELECT * FROM kraje");
                    $stopy = $mysqli->query("SELECT * FROM stopy");
                    echo("<form action=\"money.php\" method=\"get\">");
                    echo("<input type=\"hidden\"name=\"edit\" value=\"true\">");
                    echo("<input type=\"hidden\"name=\"editId\" value=\"$row[id]\">");
                    echo("<tr>");
                    echo("<td><select name=\"kraj\">");
                    while ($kraj = mysqli_fetch_assoc($kraje)) {
                        $sel = ($kraj['nazwa'] === $row['nazwa']) ? " selected" : "";
                        echo("<option$sel>".$kraj['nazwa']."</option>");
                    };
                    echo("</select></td>");
                    echo("<td><input type=\"text\" name=\"nominal\" size=\"8\" value=\"$row[nominal]\" required></td>");
                    echo("<td><input type=\"text\" name=\"nr_kat\" size=\"8\" value=\"$row[nr_kat]\" required></td>");
                    echo("<td><select name=\"stop\">");
                    while ($stop = mysqli_fetch_assoc($stopy)) {
                        $sel = ($stop['stop'] === $row['stop']) ? " selected" : "";
                        echo("<option$sel>".$stop['stop']."</option>");
                    };
                    echo("</select></td>");
                    echo("<td><input type=\"text\" name=\"rok\" size=\"4\" value=\"$row[rok]\" required></td>");
                    echo("<td><input type=\"image\" src=\"gfx/faja.png\" alt=\"Alter\" width=\"20\" height=\"20\"></td>");
                    echo("</tr>");
                    echo ("</form>");
                }
                else {
                    echo("<tr><td><div class=\"center\"><a href=\"?edit_id=$row[id]\"><img class=\"flag\" src=\"gfx/$row[filename]\"><div></td>");
                    echo("<td>$row[nominal]</td>");
                    echo("<td>$row[nr_kat]</td>");
                    echo("<td>$row[stop]</td>");
                    echo("<td>$row[rok]</td>");
                    echo("<td><a href=\"?del=$row[id]\"><img src=\"gfx/u.gif\" alt=\"Delete\" width=\"20\" height=\"20\"></a></td>");
                    echo("</tr>");
                };
            };
        ?>
        <tr> <!-- nominal row -->
            <td colspan="6" style="text-align: center; font-weight: bold;">Dodawanie nominału</td>
        </tr>
        <form action="money.php" method="get"><tr> <!-- adding entries -->
            <td>
                <select name="kraj">
                    <?php
                        include("connection.php");

                        $result = $mysqli->query("SELECT * FROM kraje");

                        while ($row = mysqli_fetch_assoc($result)) {
                            echo("<option>".$row['nazwa']."</option>");
                        };
                    ?>
                </select>
            </td>
            <td><input type="text" name="nominal" size="8" required></td>
            <td><input type="text" name="nr_kat" size="8" required></td>
            <td>
                <select name="stop">
                    <?php
                        include("connection.php");

                        $result = $mysqli->query("SELECT * FROM stopy");

                        while ($row = mysqli_fetch_assoc($result)) {
                            echo("<option>".$row['stop']."</option>");
                        };
                    ?>
                </select>
            </td>
            <td><input type="text" name="rok" size="4" required></td>
            <td class="center"><input type="image" src="gfx/faja.png" alt="Submit" width="20" height="20"></td>
        </tr></form>
    </table>
</body>
</html>