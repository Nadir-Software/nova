function voice() {
    var voice = localStorage.getItem("voice") || "enabled";

    if (voice == "enabled") {
        voice = "disabled";
    }

    else {
        voice = "enabled";
    }

    localStorage.setItem("voice", voice);

    console.log(voice);
}

if (localStorage.getItem("voice") == "enabled") {
    document.getElementById("voice-checkbox").checked = true;
}