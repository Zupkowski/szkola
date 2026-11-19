<u><b>ZAD1</b></u><br>
<?php
date_default_timezone_set('Europe/Warsaw');
echo date_default_timezone_get();
?><br>
<u><b>ZAD2</b></u><br>
<?php
date_default_timezone_set('Europe/Warsaw');
$time = time();
echo $time;
?><br>
<u><b>ZAD3</b></u><br>
<?php
date_default_timezone_set('Europe/Warsaw');
$time = time();
echo $time;
echo "<br>";
echo date('Y-m-d H:i:s', $time);
?><br>
<u><b>ZAD4</b></u><br>
<?php
date_default_timezone_set('Europe/Warsaw');
$time = time();
echo date('Y-m-d', $time);
echo "<br>";
echo date('H:i:s', $time);
?><br>
<u><b>ZAD5</b></u><br>
<?php
date_default_timezone_set('Europe/Warsaw');
$time = time();
echo "Dzis mamy: " . date('j F Y', $time);
echo "<br>";
echo "dzien: " . date('l', $time);
echo "<br>";
echo "godzina: " . date('H', $time);
echo "<br>";
echo "minuta: " . date('i', $time);
echo "<br>";
echo "sekunda: " . date('s', $time);
echo "<br>";
echo "czas: " . date('H:i:s', $time);
?><br>
<u><b>ZAD6</b></u><br>
<?php
date_default_timezone_set('Europe/Warsaw');
$time = time();
echo "dzien: " . date('l', $time);
echo "<br>";
echo "numer: " . date('w', $time);
echo "<br>";
echo "dzien_roku: " . date('z', $time);
echo "<br>";
echo "dni_w_miesiacu: " . date('t', $time);
echo "<br>";
echo "przestepny: " . date('L', $time);
?><br>
<u><b>ZAD7</b></u><br>
<?php
date_default_timezone_set('Europe/Warsaw');
$time = time();
echo "dzien: " . date('l', $time);
echo "<br>";
echo "numer: " . date('w', $time);
echo "<br>";
echo "dzien_roku: " . date('z', $time);
echo "<br>";
echo "dni_w_miesiacu: " . date('t', $time);
echo "<br>";
echo "przestepny: " . date('L', $time);
?><br>
<u><b>ZAD9</b></u><br>
<?php
date_default_timezone_set('Europe/Warsaw');
echo strtotime("7 october 2026 21:15:42");
?><br>
<u><b>ZAD10</b></u><br>
<?php
date_default_timezone_set('Europe/Warsaw');
$data = new DateTime('2026-10-07 21:15:42');
$data->setDate(2026, 11, 20);
echo $data->format('Y-m-d H:i:s');
?><br>
<u><b>ZAD11</b></u><br>
<?php
date_default_timezone_set('Europe/Warsaw');
$time1 = new DateTime('2026-10-07 21:15:42');
$time2 = new DateTime('2026-10-07 21:15:42');
$time1->setTime(00, 00, 00);
$time2->setTime(23,59,59);
echo $time1->format('Y-m-d H:i:s');
echo "<br>";
echo $time2->format('Y-m-d H:i:s');
?><br>
<u><b>ZAD12</b></u><br>
<?php
date_default_timezone_set('Europe/Warsaw');
$data1 = DateTime::createFromFormat('!m/d/Y', '10/07/2026')->format('Y-m-d');
$data2 = DateTime::createFromFormat('!d/m/Y', '10/07/2026')->format('Y-m-d');
$data3 = DateTime::createFromFormat('!Y-m-d', '07.10.2026');
echo $data1;
echo "<br>";
echo $data2;
echo "<br>";
echo var_dump($data3);
?><br>
<u><b>ZAD13</b></u><br>
<?php
date_default_timezone_set('Europe/Warsaw');
$data = new DateTime('2026-10-07 21:15:42');
echo $data->getTimestamp();
?><br>
<u><b>ZAD14</b></u><br>
<?php
date_default_timezone_set('Europe/Warsaw');
$data = new DateTime('2020-01-01');
$data->setTimestamp(1791400542);
echo $data->format('Y-m-d H:i:s');
?><br>

