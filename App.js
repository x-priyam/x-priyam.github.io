window.addEventListener("load", () => {
  // check media query for system light/dark theme
  if (window.matchMedia("prefers-color-scheme: light").matches) {
    document.documentElement.classList.add("light-theme");
  }

  // CSS doesn't allow font size to be set relative to parent width
  // we set width in CSS and then copy the computed value to font size
  // useful when using icons from a font as images
  document.querySelectorAll("iconify-icon").forEach((fontIcon) => {
    fontIcon.style.fontSize = getComputedStyle(fontIcon).width;
  });
});

window.addEventListener("resize", () => {
  // CSS doesn't allow font size to be set relative to parent width
  // we set width in CSS and then copy the computed value to font size
  // useful when using icons from a font as images
  document.querySelectorAll("iconify-icon").forEach((fontIcon) => {
    fontIcon.style.fontSize = getComputedStyle(fontIcon).width;
  });
});

// change theme on click of theme-switch button
document.querySelector("#theme-switch").addEventListener("click", () => {
  document.documentElement.classList.toggle("light-theme");
});
