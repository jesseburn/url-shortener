// https://github.com/jolangker/url-shortening-api/blob/master/src/script.js


$(document).ready(function () {

    $("#form-btn").on("click", function (e) {
        //console.log('buttton clicked');
        e.preventDefault();

        let result = document.getElementById("result");
        let longUrl = $("#form-text").val();

        /* https://googlechrome.github.io/samples/fetch-api/fetch-post.html
            Fetch API post request to get information for url shortener */
        fetch(`https://api.shrtco.de/v2/shorten?url=${longUrl}`)
            .then(response => {
                // if the res if 400 the error message will display
                if (response.status == 400) {
                    $("#form-text").css("border", "3px solid hsl(0, 94%, 66%)");
                    $("#error").css("display", "block");
                    $("#form-text").focus();
                    return;
                } else {
                    $("#error").css("display", "none");
                    $("#form-text").css("border", "none");
                    $("#form-text").focus();
                    return response.json();
                }
            })
            // promises returned create output box for shortened url along with a copy btn
            .then(data => {
                if (data === undefined) {
                    return;
                }

                let output = document.createElement("div");
                const outputBox = document.createElement("input");
                const shortUrl = document.createElement("input");
                const copyBtn = document.createElement("button");

                $(copyBtn).attr({
                    "type": "button",
                    "data-clipboard-target": "#copy-target",
                    "class": "copy-btn",
                    "id": "copy-button"
                });
                $(output).attr({
                    "class": "output",
                    "readonly": true
                });
                $(outputBox).attr({
                    "class": "output-box",
                    "readonly": true
                });
                $(shortUrl).attr({
                    "class": "short-url",
                    "id": "copy-target",
                    "readonly": true
                });
                copyBtn.textContent = "Copy";

                //console.log(data);

                localStorage.setItem("data", JSON.stringify(data));
                //console.log(localStorage.getItem("data"));

                outputBox.value = `${$("#form-text").val()}`;
                shortUrl.value = `${data.result.full_short_link}`;
                output.appendChild(outputBox);
                output.appendChild(shortUrl);
                output.appendChild(copyBtn);
                result.appendChild(output);

                // console.log(shortUrl.value);
                // console.log(outputBox.value);

                // styles for output and btn

                $(".output").css({
                    "width": "86%",
                    "height": "3rem",
                    "display": "flex",
                    "justify-content": "space-between",
                    "background-color": "#ffffff",
                    "align-items": "center",
                    "position": "absolute",
                    "top": "120%",
                    "left": "7%",
                    "padding": "1%",
                    "border-radius": "9px"
                });
                $(".output-box").css({
                    "width": "50%",
                    "border": "none",
                    "font-size": "1rem"
                });
                $(".short-url").css({
                    "width": "20%",
                    "border": "none",
                    "font-size": "1rem",
                    "color": "hsl(180, 66%, 49%)"
                });
                $(".copy-btn").css({
                    "background-color": "hsl(180, 66%, 49%)",
                    "width": "7rem",
                    "height": "2.5rem",
                    "color": "#ffffff",
                    "border": "none",
                    "border-radius": "9px",
                    "font-size": "1rem"
                });
                // copy btn
                $(copyBtn).on("click", function (e) {
                    new ClipboardJS("#copy-button");
                    $(copyBtn).css("background-color", "hsl(257, 27%, 26%)");
                    e.target.innerHTML = "Copied!";
                    //console.log("you copied it!");

                    let timeout = setTimeout(function () {
                        $(copyBtn).css("background-color", "hsl(180, 66%, 49%)");
                        copyBtn.textContent = "Copy";
                        //console.log(e.target);
                    }, 300)
                     
                });

            }).catch(
                error => {
                    console.log(error);
                }
            )

    });

    // local storage

    $(window).on("load", function (e) {
        
            if (localStorage != null) {
                localStorage.getItem("data");
                $("#form-btn").click();
            } else {
                console.log("Error-You need local storage");
            }
        });




    // mobile nav
    $(".ham").click(function () {
        $("nav").children("div").toggleClass("hidden");
        $(".close").toggleClass("hidden");
        $(".ham").toggleClass("hidden");
    });

    $(".close").click(function () {
        if ($("nav").children("div").hasClass("hidden")) {

            $("nav").children("div").removeClass("hidden");
        } else {
            $(".close").toggleClass("hidden");
            $(".ham").toggleClass("hidden");
            $("nav").children("div").addClass("hidden");
        }
    });
});