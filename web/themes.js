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
darkTheme.font = '20px Blinker';

themes = {
    'classic': classicTheme, 
    'dark': darkTheme
};