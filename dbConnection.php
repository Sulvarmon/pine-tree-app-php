<?php

/**for localhost */
$servername = "localhost";
$username = "shota";
$password = "qsdwef098.C";
$dbname = "pineTreeDb";

/**for 000webhost */
// $servername = "localhost";
// $username = "id18807681_shota";
// $password = "pineTreeApp123.";
// $dbname = "id18807681_pinetreedb";

$conn = mysqli_connect($servername, $username, $password, $dbname);
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}

?>