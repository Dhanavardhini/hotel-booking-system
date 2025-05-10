<?php

// Define file paths
$modelsPath = '../../../../models/put.php';
$headersPath = '../../../../config/header.php';

// Check if required files exist
if (!file_exists($modelsPath) || !file_exists($headersPath)) {
    handleResponse(500, 'Required files are missing');
}

// Include necessary files
require_once $modelsPath;
require_once $headersPath;

// Function to handle errors and send response
function handleResponse($statusCode, $message) {
    http_response_code($statusCode);
    echo json_encode(['error' => $message]);
    exit();
}

// Decode incoming JSON data
$data = json_decode(file_get_contents('php://input'));

// Check if the required fields are provided
if (!isset($data->id) || !isset($data->name) || !isset($data->phone) || !isset($data->email) ) {
    handleResponse(400, 'All required fields (id, name, phone,email) are required');
}


$obj = new Put();

$data = json_decode(file_get_contents('php://input'));
if (isset($data->id, $data->name, $data->phone, $data->email)) {
    $result = $obj->staff(
        $data->id, 
        $data->name, 
        $data->phone, 
        $data->email, 
       
    );
    echo json_encode($result);
} else {
    http_response_code(400);
    echo json_encode(["error" => "Invalid input"]);
}



echo json_encode($result);
?>
