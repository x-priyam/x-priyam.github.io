function loadTheme() {
    var themeElementClass = document.documentElement.classList;
    const lightThemeMq = window.matchMedia('(prefers-color-scheme: light)');
    if (lightThemeMq.matches) {
        themeElementClass.remove('dark-theme');
        themeElementClass.add('light-theme');
    } else {
        themeElementClass.remove('light-theme');
        themeElementClass.add('dark-theme');
    }
    lightThemeMq.addEventListener('change', (event) => {
        if (event.matches) {
            themeElementClass.remove('dark-theme');
            themeElementClass.add('light-theme');
        } else {
            themeElementClass.remove('light-theme');
            themeElementClass.add('dark-theme');
        }
    });
}