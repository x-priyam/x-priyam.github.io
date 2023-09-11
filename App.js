function setThemeIcon() {
  let themeIcon = document.querySelector("#theme-switch")
  if (document.documentElement.classList.contains("light-theme")) {
    themeIcon.setAttribute("icon", "tabler:sun-filled");
  } else {
    themeIcon.setAttribute("icon", "tabler:moon-filled");
  }
  return;
}

// CSS doesn't allow font size to be set relative to parent width
// we set width in CSS and then copy the computed value to font size
// useful when using icons from a font as images
function setIconSizes() {
  document.querySelectorAll("iconify-icon:not(.top-container *)").forEach((fontIcon) => {
    fontIcon.style.setProperty(
      "font-size",
      getComputedStyle(fontIcon).getPropertyValue("width")
    )
  });
  document.querySelectorAll(".top-container iconify-icon").forEach((fontIcon) => {
    let width = getComputedStyle(fontIcon).getPropertyValue("width")
    let height = getComputedStyle(fontIcon).getPropertyValue("height")

    fontIcon.style.setProperty(
      "font-size",
      (Number(width.slice(0, -2)) < Number(height.slice(0, -2))) ? width : height
    )
  });
  return;
}

window.addEventListener("load", () => {
  // check media query for system light/dark theme
  if (window.matchMedia("prefers-color-scheme: light").matches) {
    document.documentElement.classList.add("light-theme");
  }
  setThemeIcon();
  setIconSizes();
});

window.addEventListener("resize", () => {
  setIconSizes();
});

// change theme on click of theme-switch button
document.querySelector("#theme-switch").addEventListener("click", () => {
  document.documentElement.classList.toggle("light-theme");
  document.startViewTransition(() => {
    setThemeIcon();
  });
});
