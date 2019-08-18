const arial = '20px Arial';
const blinker = '20px Blinker';

class Theme {
    constructor(name = 'classic') {
        this.name = name;
        this.css = 'classic.css';
        this.background = 'white';
        this.borderColor = 'grey';
        this.textColor = 'black';
        this.treatColor = 'blue';
        this.headColor = 'red';
        this.bodyColor = 'lightred';
        this.otherColor = 'blue';
        this.otherHead = 'lightblue';
        this.font = arial;
    }
}

var classicTheme = new Theme();

var darkTheme = new Theme('dark');
darkTheme.css = 'dark.css';
darkTheme.background = '#1D1F26';
darkTheme.textColor = 'white';
darkTheme.treatColor = '#86ADE1';
darkTheme.font = blinker;

var neonTheme = new Theme('neon');
neonTheme.css = 'neon.css';
neonTheme.background = '#782FFF';
neonTheme.borderColor = '#F9FF77';
neonTheme.textColor = '#F9FF77';
neonTheme.treatColor = '#F9FF77';
neonTheme.font = '16px PressStart';
neonTheme.headColor = '#FF35A3';
neonTheme.bodyColor = '#FF4FAF';

themes = {
    'classic': classicTheme, 
    'dark': darkTheme,
    'neon': neonTheme
};