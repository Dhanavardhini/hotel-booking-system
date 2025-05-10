<?php
include_once '../../../../config/database.php';

class Put
{
    public $conn;
    public $response;

    function __construct()
    {
        $db = new Database();
        $this->conn = $db->connect();
    }

  

    public function staff($id, $name, $phone, $email)
{
    $id = (int)$id; 
    
    $checkUserQuery = "SELECT * FROM staff WHERE id = ?";
    $checkUserStmt = mysqli_prepare($this->conn, $checkUserQuery);
    mysqli_stmt_bind_param($checkUserStmt, "i", $id); 
    mysqli_stmt_execute($checkUserStmt);
    $checkUserResult = mysqli_stmt_get_result($checkUserStmt);

    if (mysqli_num_rows($checkUserResult) == 1) {
        // User exists, proceed with update
        $updateQuery = "
            UPDATE staff
            SET 
                name = ?, 
                phone = ?, 
                email = ?
            WHERE 
                id = ?
        "; // Removed the trailing comma here
        $updateStmt = mysqli_prepare($this->conn, $updateQuery);

        // Bind the parameters correctly
        mysqli_stmt_bind_param(
            $updateStmt, 
            "sssi", // Correct parameter types: 3 strings + 1 integer
            $name, 
            $phone, 
            $email,
            $id
        );

        if (mysqli_stmt_execute($updateStmt)) {
            http_response_code(200);
            return ["message" => "User details updated successfully"];
        } else {
            http_response_code(500);
            return ["error" => "Error updating user details"];
        }
    } else {
        http_response_code(404);
        return ["error" => "User not found"];
    }
}

public function usebook($id, $name, $email, $phone, $number_of_days, $from_date, $to_date, $price, $status)
{
    $id = (int)$id; // Ensure $id is treated as an integer
    
    $checkUserQuery = "SELECT * FROM book WHERE id = ?";
    $checkUserStmt = mysqli_prepare($this->conn, $checkUserQuery);
    mysqli_stmt_bind_param($checkUserStmt, "i", $id);  // ID should be bound as an integer
    mysqli_stmt_execute($checkUserStmt);
    $checkUserResult = mysqli_stmt_get_result($checkUserStmt);

    if (mysqli_num_rows($checkUserResult) == 1) {
        // User exists, proceed with update
        $updateQuery = "
            UPDATE book
            SET 
                name = ?, 
                email = ?, 
                phone = ?, 
                number_of_days = ?, 
                from_date = ?, 
                to_date = ?, 
                price = ?, 
                status = ? 
            WHERE id = ?
        ";
        $updateStmt = mysqli_prepare($this->conn, $updateQuery);

        // Bind the parameters correctly
        mysqli_stmt_bind_param(
            $updateStmt, 
            "sssissssi",  // Correct parameter types: 3 strings + 1 integer + 4 strings + 1 integer
            $name, 
            $email, 
            $phone,
            $number_of_days,
            $from_date,
            $to_date,
            $price,
            $status,
            $id
        );

        if (mysqli_stmt_execute($updateStmt)) {
            http_response_code(200);
            return ["message" => "User details updated successfully"];
        } else {
            http_response_code(500);
            return ["error" => "Error updating user details"];
        }
    } else {
        http_response_code(404);
        return ["error" => "User not found"];
    }
}

     
}
?>