var hit = localStorage.getItem("hit") || 0;
const updateBanner = document.getElementById("update-banner");

if (hit < 5) {
    // Update variables
    hit++;
    localStorage.setItem("hit", hit);
}

else if (localStorage.getItem("banner") !== "false") {
    // Update variables
    hit = 0;
    localStorage.setItem("hit", hit);

    // Show banner
    updateBanner.classList.remove("hidden");
}

function neverShow() {
    localStorage.setItem("banner", "false");
    updateBanner.remove();
}