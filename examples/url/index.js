const {gifreezeUrl} = require('../../index');
const fs = require('fs');

(async () => {
    const imageBuffer = await gifreezeUrl('https://upload.wikimedia.org/wikipedia/commons/f/fe/Horse_gif.gif');

    fs.writeFileSync('./result.gif', imageBuffer)
})();
