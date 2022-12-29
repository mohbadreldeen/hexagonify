const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light';
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);

    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
    }
}


function switchTheme(e) {
    
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.getElementById("theme-name").innerHTML = "Dark";
    }
    else {
        document.documentElement.setAttribute('data-theme', 'light');
        document.getElementById("theme-name").innerHTML = "Light";
    }    

    localStorage.setItem('theme', document.documentElement.getAttribute('data-theme'));
}

toggleSwitch.addEventListener('change', switchTheme, false);
