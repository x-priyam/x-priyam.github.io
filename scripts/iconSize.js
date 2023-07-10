// to circumvent limitation of CSS
// CSS doesn't allow font size to be set relative to parent width
// we set width in CSS and then copy the computed value to font size
// useful when using icons from a font as images
function iconFontSizeToWidth(fontIcons) {
  fontIcons.forEach((icon) => {
    icon.style.fontSize = getComputedStyle(icon).width;
  });
}

// event listeners
// set size of images/icons for skills on load
window.addEventListener("load", () => {
  iconFontSizeToWidth(document.querySelectorAll(".skill-img"));
});

// set size of clouds on the initial wallpaper on load
window.addEventListener("load", () => {
  iconFontSizeToWidth(document.querySelectorAll(".cloud"));
});

// set size of clouds on change of window size
// which leads to change in width of elements
window.addEventListener("resize", () => {
  iconFontSizeToWidth(document.querySelectorAll(".skill-img"));
});

// set size of images/icons for skills on change of window size
// which leads to change in width of elements
window.addEventListener("resize", () => {
  iconFontSizeToWidth(document.querySelectorAll(".cloud"));
});
