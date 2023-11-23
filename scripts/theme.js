window.onload = function() {}


function init() {
    let root = document.querySelector(':root');
    const savedTheme = localStorage.getItem('theme');
    

    if (savedTheme) {
        console.log("checking for theme")

        const isDark = savedTheme == "isDark";
        console.log("updating theme")
        if (isDark) {
            localStorage.setItem('theme', 'isDark');
            root.style.setProperty('--app-background-color', "black");
            root.style.setProperty('--text-color', "white");  
        }  
        else {
            localStorage.setItem('theme', 'isLight');
            root.style.setProperty('--app-background-color', "white");
            root.style.setProperty('--text-color', "black");  
        }
    }

}

