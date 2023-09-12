function setThemeIcon() {
  let themeIcon = document.querySelector("#theme-switch")
  document.startViewTransition(() => {
    if (document.documentElement.classList.contains("light-theme")) {
      themeIcon.setAttribute("icon", "tabler:sun-filled");
    } else {
      themeIcon.setAttribute("icon", "tabler:moon-filled");
    }
  })
  themeIcon.classList.add("bounce-animation")
  return;
}

window.addEventListener("load", () => {
  // check media query for system light/dark theme
  if (window.matchMedia("prefers-color-scheme: light").matches) {
    document.documentElement.classList.add("light-theme");
  }
  setThemeIcon();
});

// change theme on click of theme-switch button
document.querySelector("#theme-switch").addEventListener("click", () => {
  document.documentElement.classList.toggle("light-theme");
  setThemeIcon();
});