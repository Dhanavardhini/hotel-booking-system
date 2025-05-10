<?php
include_once '../../../../config/database.php';

class Post
{
    public $conn;
    public $response;

    function __construct()
    {
        $db = new Database();
        $this->conn = $db->connect();
    }

    public function Register($email,$password)
    {
        $insert = "INSERT INTO register(email, password) VALUES ( ?, ?)";
        $stmt = mysqli_prepare($this->conn, $insert);
    
        if (!$stmt) {
            return ["message" => "Query preparation error: " . mysqli_error($this->conn)];
        }
    
        mysqli_stmt_bind_param($stmt, "ss", $email,$password);
        $result = mysqli_stmt_execute($stmt);
    
        if ($result) {
            return ["message" => "Plan Added successful"];
        } else {
            return ["message" => "Plan Added failed: " . mysqli_error($this->conn)];
        }
    }
    public function A_InsertPlans2($name,$password)
    {
        $insert = "INSERT INTO admin(name, password) VALUES ( ?, ?)";
        $stmt = mysqli_prepare($this->conn, $insert);
    
        if (!$stmt) {
            return ["message" => "Query preparation error: " . mysqli_error($this->conn)];
        }
    
        mysqli_stmt_bind_param($stmt, "ss", $name,$password);
        $result = mysqli_stmt_execute($stmt);
    
        if ($result) {
            return ["message" => "Plan Added successful"];
        } else {
            return ["message" => "Plan Added failed: " . mysqli_error($this->conn)];
        }
    }
    public function Booking($name, $email, $phone, $number_of_days,  $from_date, $to_date,$price,$status)
{
    $insert = "INSERT INTO book (name, email, phone, number_of_days, from_date, to_date,price,status) VALUES (?, ?, ?, ?,  ?, ?,?,?)";
    $stmt = mysqli_prepare($this->conn, $insert);

    if (!$stmt) {
        return ["message" => "Query preparation error: " . mysqli_error($this->conn)];
    }

    // Correcting type specifiers based on expected data types
    mysqli_stmt_bind_param($stmt, "sssissss", $name, $email, $phone, $number_of_days, $from_date, $to_date,$price,$status);
    $result = mysqli_stmt_execute($stmt);

    if ($result) {
        return ["message" => "Plan Added successfully"];
    } else {
        return ["message" => "Plan Added failed: " . mysqli_error($this->conn)];
    }
}


public function staff($id, $name, $phone, $email)
{
    $insert = "INSERT INTO staff (id,name,phone,email) VALUES (?, ?,?,?)";
    $stmt = mysqli_prepare($this->conn, $insert);

    if (!$stmt) {
        return ["message" => "Query preparation error: " . mysqli_error($this->conn)];
    }

    // Correcting type specifiers based on expected data types
    mysqli_stmt_bind_param($stmt, "isss", $id, $name, $phone, $email);
    $result = mysqli_stmt_execute($stmt);

    if ($result) {
        return ["message" => "Plan Added successfully"];
    } else {
        return ["message" => "Plan Added failed: " . mysqli_error($this->conn)];
    }
}
public function images($name, $price, $max, $file)
{
    $advertisementQuery = "INSERT INTO image (name, price, max, file) VALUES (?, ?, ?, ?)";
    $stmtadvertisement = mysqli_prepare($this->conn, $advertisementQuery);

    if (!$stmtadvertisement) {
        return "Failed to prepare SQL statement: " . mysqli_error($this->conn);
    }

    mysqli_stmt_bind_param($stmtadvertisement, 'ssss', $name, $price, $max, $file);
    $advertisementExec = mysqli_stmt_execute($stmtadvertisement);

    if ($advertisementExec) {
        return "Room added successfully";
    } else {
        return "Failed to insert data into database: " . mysqli_error($this->conn);
    }
}

}
?> 
