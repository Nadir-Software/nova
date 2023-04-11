function checkNetwork() {
    if (!window.navigator.onLine) {
        console.log("No Internet detected. Redirecting...");
        document.location.href = "Network/networkfail.html";
    }
}

function info() {
    var infoElement = document.getElementById("info");
    var infoButton = document.getElementById("info-btn");
    var retryButton = document.getElementById("retry-btn");
    var circle = document.getElementById("circle");
    infoElement.innerText = "window.navigator.onLine != true";

    console.error("No Internet");

    if (infoElement.classList.contains("hidden-but-takes-up-space")) {
        infoElement.classList.remove("hidden-but-takes-up-space");
        infoButton.innerText = "Close";
        infoButton.classList.remove("button-network");
        infoButton.classList.add("button-debug");
        retryButton.classList.remove("button-network");
        retryButton.classList.add("button-debug");

        infoElement.style.animation = "0.25s fade-in";
        circle.classList.remove("circle-error");
        circle.classList.add("circle-debug");


        // Save user preference
        localStorage.setItem("network-log", "true")
    }

    else {
        infoElement.classList.add("hidden-but-takes-up-space");
        infoButton.innerText = "Debug";
        infoButton.classList.remove("button-debug");
        infoButton.classList.add("button-network");
        retryButton.classList.remove("button-debug");
        retryButton.classList.add("button-network");

        infoElement.style.animation = "0.25s fade-out";
        circle.classList.remove("circle-debug");
        circle.classList.add("circle-error");

        // Save user preference
        localStorage.setItem("network-log", "false")
    }
}

var url = window.location.pathname;
var filename = url.substring(url.lastIndexOf('/')+1);

if (localStorage.getItem("network-log") == "true" && filename !== "index.html") {
    info();
}