class Theme {
    constructor(background = 'white',
        textColor = 'black',
        headColor = 'red',
        bodyColor = 'lightred',
        otherColor = 'blue',
        otherHead = 'lightblue') {
        this.background = background;
        this.textColor = textColor;
        this.headColor = headColor;
        this.bodyColor = bodyColor;
        this.otherColor = otherColor;
        this.otherHead = otherHead;
    }
}

classicTheme = new Theme();
darkTheme = new Theme('#1D1F26', 'white');