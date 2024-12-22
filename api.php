<?php
// phpinfo();
if (function_exists('curl_init')) {
    echo 'cURL đã được kích hoạt!';
} else {
    echo 'cURL vẫn chưa được kích hoạt!';
}
// phpinfo();
// Token Bot Telegram
$botToken = '7919345658:AAGVy4jwPdSyRKp6VDJ8a5gsq2DTNn-M4Bs'; // Thay bằng token thật của bạn

// ID người nhận (Chat ID)
$chatId = '6580233045'; // Thay bằng chat ID của người nhận hoặc nhóm

// Kiểm tra tham số message
$message = isset($_REQUEST['msg']) ? $_REQUEST['msg'] : '';

if (empty($message)) {
    die('Vui lòng cung cấp tham số "msg". Ví dụ: ?msg=Hello');
}

// URL API Telegram
$apiUrl = "https://api.telegram.org/bot$botToken/sendMessage";

// Dữ liệu gửi đi
$data = [
    'chat_id' => $chatId,
    'text' => $message
];

// Sử dụng cURL để gửi yêu cầu POST
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $apiUrl);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);

if (curl_errno($ch)) {
    echo 'Lỗi: ' . curl_error($ch);
} else {
    echo 'Tin nhắn đã được gửi thành công!';
}

curl_close($ch);
?>
