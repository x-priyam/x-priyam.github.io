// check media query for system light/dark theme
function loadMqTheme() {
  const lightThemeMq = window.matchMedia("(prefers-color-scheme: light)");
  if (lightThemeMq.matches) {
    setTheme("light");
  } else {
    setTheme("dark");
  }
  lightThemeMq.addEventListener("change", (event) => {
    if (event.matches) {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  });
}

// checks current theme and switches it
function switchTheme() {
  var themeElementClass = document.documentElement.classList;
  if (themeElementClass.contains("light-theme")) {
    setTheme("dark");
  } else {
    setTheme("light");
  }
}

// takes name of theme as a string ("light"/"dark")
// adds a class to the document root
// which changes css variables
// thus changing the color theme
function setTheme(theme) {
  var themeElementClass = document.documentElement.classList;

  if (theme == "light") {
    themeElementClass.remove("dark-theme");
    themeElementClass.add("light-theme");
  } else if (theme == "dark") {
    themeElementClass.remove("light-theme");
    themeElementClass.add("dark-theme");
  } else {
    console.log("error in setting theme");
  }
}

// event listners

// change theme on click of theme-switch button
document.querySelector("#theme-switch").addEventListener("click", switchTheme);
// set theme on load of webpage
window.addEventListener("load", loadMqTheme);
