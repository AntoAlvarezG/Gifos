// dark theme funcionality

const DARK_BTN = document.getElementById("night_mode");

function enableDarkTheme () {
    localStorage.setItem("dark_theme", true);
    document.body.classList.add("dark");
    DARK_BTN.innerText = "LIGHT THEME";
    document.getElementById("img_link_logo").src = "/images/logo-modo-noc.svg";
    document.getElementById("search_img").src = "/images/icon-search-modo-noc.svg";
    document.getElementById("icon_fb").src = "/images/icon-fb-noc.svg";
    document.getElementById("icon_tw").src = "/images/icon-tw-noc.svg";
    document.getElementById("icon_insta").src = "/images/icon-insta-noc.svg";
}

function disableDarkTheme () {
    localStorage.setItem("dark_theme", false);
    document.body.classList.remove("dark");
    DARK_BTN.innerText = "DARK THEME";
    document.getElementById("img_link_logo").src = "/images/logo-mobile.svg";
    document.getElementById("search_img").src = "/images/icon-search.svg";
    document.getElementById("icon_fb").src = "/images/icon-fb.svg";
    document.getElementById("icon_tw").src = "/images/icon-tw.svg";
    document.getElementById("icon_insta").src = "/images/icon-insta.svg";

}

DARK_BTN.addEventListener("click", () => {
    if (document.body.classList != "dark") {
        enableDarkTheme()
    } else {
        disableDarkTheme();
    }
})

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem("dark_theme") == "false") {
        disableDarkTheme();
    } else {
        enableDarkTheme();
    }
})