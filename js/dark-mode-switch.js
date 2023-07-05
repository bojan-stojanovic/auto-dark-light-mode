const themeSwitchElement = document.querySelector('[data-toggle-darkmode]');
const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

// Check the dark-mode checkbox if
// - The override is set to dark
// - No override is set but the system prefers dark mode
if ((colorModeOverride == 'dark') || (!hasColorModeOverride && mediaQuery.matches)) {
    themeSwitchElement.checked = true;
}

const setColorMode = (mode) => {
    // Mode was given
    if (mode) {
        // Update data-* attr on html
        document.documentElement.setAttribute('data-force-color-mode', mode);
        // Persist in local storage
        window.localStorage.setItem('color-mode', mode);
        // Make sure the checkbox is up-to-date
        themeSwitchElement.checked = (mode === 'dark');
    }

    // No mode given (e.g. reset)
    else {
        // Remove data-* attr from html
        document.documentElement.removeAttribute('data-force-color-mode');
        // Remove entry from local storage
        window.localStorage.removeItem('color-mode');
        // Make sure the checkbox is up-to-date, matching the system preferences
        themeSwitchElement.checked = mediaQuery.matches;
    }
}

themeSwitchElement.addEventListener('change', (e) => {
    setColorMode(e.target.checked ? 'dark' : 'light');
});

document.querySelector('#reset-darkmode').addEventListener('click', (e) => {
    e.preventDefault();
    setColorMode(false);
});

// Keep an eye out for System Light/Dark Mode Changes
mediaQuery.addEventListener("change", () => {
    console.log("change")
    // Ignore change if there's an override set
    if (document.documentElement.getAttribute('data-force-color-mode')) {
        return;
    }

    // Make sure the checkbox is up-to-date
    themeSwitchElement.checked = mediaQuery.matches;
});