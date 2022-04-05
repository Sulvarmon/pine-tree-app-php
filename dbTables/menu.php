<?php
include ('../dbConnection.php');

$sql = "SELECT * FROM menu";
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
  $array = array();
  while($row = mysqli_fetch_assoc($result)) {
    array_push($array, $row);
  }
  echo json_encode($array);
} else {
  echo "0 results";
}

mysqli_close($conn);