const {gifreezeFile} = require('../../index');
const fs = require('fs');

(async () => {
    const imageBuffer = await gifreezeFile('./horse.gif');

    fs.writeFileSync('./result.gif', imageBuffer)
})();
