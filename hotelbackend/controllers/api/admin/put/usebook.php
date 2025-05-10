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
if (!isset($data->id) || !isset($data->name) || !isset($data->phone) || !isset($data->email) || !isset($data->number_of_days) || !isset($data->from_date) || !isset($data->to_date) || !isset($data->price) || !isset($data->status)) {
    handleResponse(400, 'All required fields (id, name, phone, email, number_of_days, from_date, to_date, price, status) are required');
}

$obj = new Put();

// Call the `usebook` method with the correct parameters
if (isset($data->id, $data->name, $data->phone, $data->email, $data->number_of_days, $data->from_date, $data->to_date, $data->price, $data->status)) {
    $result = $obj->usebook(
        $data->id, 
        $data->name, 
        $data->email, 
        $data->phone, 
        $data->number_of_days, 
        $data->from_date, 
        $data->to_date, 
        $data->price, 
        $data->status
    );
    echo json_encode($result);
} else {
    http_response_code(400);
    echo json_encode(["error" => "Invalid input"]);
}
?>
