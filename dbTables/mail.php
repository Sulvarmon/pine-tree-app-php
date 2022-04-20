<?php
include ('../dbConnection.php');

$name = $_POST['name'];
$mail = $_POST['mail'];
$message = $_POST['message'];

$query = "INSERT INTO mail (name, mail, message, time) VALUES ('$name', '$mail', '$message', NOW())";

if (mysqli_query($conn, $query)) {
        echo "New record has been added successfully !";
     } else {
        echo "Error: " . $query . ":-" . mysqli_error($conn);
     }

mysqli_close($conn);