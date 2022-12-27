const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light';

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);

    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
    }
}

const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');

function switchTheme(e) {
    console.log("change theme");
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.getElementById("theme-name").innerHTML = "Dark";
    }
    else {
        document.documentElement.setAttribute('data-theme', 'light');
        document.getElementById("theme-name").innerHTML = "Light";
    }    
}

toggleSwitch.addEventListener('change', switchTheme, false);
