function loadMqTheme() {
    const lightThemeMq = window.matchMedia('(prefers-color-scheme: light)');
    if (lightThemeMq.matches) {
        setTheme("light");
    } else {
        setTheme("dark");
    }
    lightThemeMq.addEventListener('change', (event) => {
        if (event.matches) {
            setTheme("light");
        } else {
            setTheme("dark");
        }
    });
}

function switchTheme() {
    var themeElementClass = document.documentElement.classList;
    if (themeElementClass.contains("light-theme")) {
        setTheme("dark");
    } else {
        setTheme("light");
    }
}

function setTheme(theme) {
    var themeElementClass = document.documentElement.classList;
    var themeSwitchClass = document.getElementById("theme-button")?.classList;
    if (theme == "light") {
        themeElementClass.remove("dark-theme");
        themeSwitchClass?.remove("dark-theme");
        themeElementClass.add("light-theme");
        themeSwitchClass?.add("light-theme");
    } else if (theme == "dark") {
        themeElementClass.remove("light-theme");
        themeSwitchClass?.remove("light-theme");
        themeElementClass.add("dark-theme");
        themeSwitchClass?.add("dark-theme");
    } else {
        console.log("error in setting theme");
    }
}

document.querySelector("#theme-button").addEventListener("click", switchTheme);
window.addEventListener("load", loadMqTheme);