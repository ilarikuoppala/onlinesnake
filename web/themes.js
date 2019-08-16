class Theme {
    constructor(name = 'classic',
        css = 'classic.css',
        background = 'white',
        textColor = 'black',
        treatColor = 'blue',
        headColor = 'red',
        bodyColor = 'lightred',
        otherColor = 'blue',
        otherHead = 'lightblue') {
        this.name = name;
        this.css = css;
        this.background = background;
        this.textColor = textColor;
        this.treatColor = treatColor;
        this.headColor = headColor;
        this.bodyColor = bodyColor;
        this.otherColor = otherColor;
        this.otherHead = otherHead;
    }
}

classicTheme = new Theme();
darkTheme = new Theme('dark', 'dark.css', '#1D1F26', 'white', '#86ADE1');
themesAvailable = ["classic", "dark"];