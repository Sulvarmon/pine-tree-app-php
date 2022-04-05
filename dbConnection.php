<?php

$servername = "localhost";
$username = "shota";
$password = "qsdwef098.C";
$dbname = "pineTreeDb";

$conn = mysqli_connect($servername, $username, $password, $dbname);
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}

?>