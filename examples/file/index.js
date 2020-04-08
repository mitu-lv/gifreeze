const {gifreezeFile} = require('../../index');
const fs = require('fs');

const imageBuffer = gifreezeFile('./horse.gif');

fs.writeFileSync('./result.gif', imageBuffer);
