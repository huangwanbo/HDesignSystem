module.exports = {
    install(_,_,functions) {
        functions.add('color-palette', (color, index) => {
            console.log('color-palette');
        })
    }
}