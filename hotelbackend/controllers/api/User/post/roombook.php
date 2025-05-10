<?php
$modelsPath = '../../../../models/post.php';
$headersPath = '../../../../config/header.php';

if (!file_exists($modelsPath) || !file_exists($headersPath)) {
    handleError(500, 'Required files are missing');
}

require_once $modelsPath;
require_once $headersPath;

$data = json_decode(file_get_contents('php://input'));

function handleError($statusCode, $message) {
    http_response_code($statusCode);
    echo json_encode(['error' => $message]);
    exit();
}

if (empty($data->name) || empty($data->email)) {
    handleError(400, 'Both name and email are required.');
}

if (!filter_var($data->email, FILTER_VALIDATE_EMAIL)) {
    handleError(400, 'Invalid email format.');
}

// Set a default value for status if not provided
$data->status = isset($data->status) ? $data->status : 'pending';

$obj = new Post();
$result = $obj->Booking(
    $data->name,
    $data->email,
    $data->phone,
    $data->number_of_days,
    $data->from_date,
    $data->to_date,
    $data->price,
    $data->status
);

if ($result === false) {
    handleError(500, 'Internal server error');
}

echo json_encode($result);
?>
