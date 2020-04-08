# gifreeze

Convert animated gif to static gif image.

## Usage

An example of converting GIF file to static GIF:
```js
const {gifreezeFile} = require('gifreeze');
const fs = require('fs');

const imageBuffer = gifreezeFile('./horse.gif');

fs.writeFileSync('./result.gif', imageBuffer);
```

An example of converting GIF url to static GIF:
```js
const {gifreezeUrl} = require('gifreeze');
const fs = require('fs');

(async () => {
    const imageBuffer = await gifreezeUrl('https://upload.wikimedia.org/wikipedia/commons/f/fe/Horse_gif.gif');

    fs.writeFileSync('./result.gif', imageBuffer);
})();

```
