<?php

$modelsPath = '../../../../models/get.php';
$headersPath = '../../../../config/header.php';

if (!file_exists($modelsPath) || !file_exists($headersPath)) {
    respondWithError(500, 'Required files are missing');
}

require_once $modelsPath;
require_once $headersPath;

// Decode incoming JSON data
$data = json_decode(file_get_contents('php://input'));

// Validate input data
if (empty($data->email) || empty($data->password)) {
    respondWithError(400, 'Email and password are required');
}

// Create an instance of the Get class
$obj = new Get();

// Call the Login method with email and password
$result = $obj->Login($data->email, $data->password);

if ($result === false) {
    respondWithError(500, 'Internal server error');
}

// Send the result
echo json_encode($result);

/**
 * Function to handle errors and send response.
 *
 * @param int    $statusCode HTTP status code
 * @param string $message    Error message
 */
function respondWithError($statusCode, $message) {
    http_response_code($statusCode);
    echo json_encode(['error' => $message]);
    exit();
}

?>
