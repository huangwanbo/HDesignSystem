const fs = require('fs');
const path = require('path');
const { svgDataPure } = require('./getSvgData');

const data = {}

data.icons = svgDataPure

fs.writeFile(path.resolve(__dirname, '../icons.json'),  JSON.stringify(data, null, 2), (err, data) => {
    if (err) return ;

    console.log('generate success!');
})