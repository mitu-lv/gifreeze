const fs = require('fs');

const fetch = require('node-fetch');
const {parseGIF, decompressFrames} = require('gifuct-js');
const GIFEncoder = require('gifencoder');
const {createCanvas} = require('canvas');

function dataBufferFromFrame(frame) {
    const {width, height} = frame.dims;
    const encoder = new GIFEncoder(width, height);

    encoder.start();
    encoder.setRepeat(-1);   // 0 for repeat, -1 for no-repeat
    encoder.setDelay(0);    // frame delay in ms
    encoder.setQuality(10); // image quality. 10 is default.

    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    const frameImageData = ctx.createImageData(width, height);

    frameImageData.data.set(frame.patch);

    ctx.putImageData(frameImageData, 0, 0);

    encoder.addFrame(ctx);
    encoder.finish();

    return encoder.out.getData();
}

async function gifreezeUrl(url, frameIndex = 0) {
    const frames = await fetch(url)
        .then(resp => resp.arrayBuffer())
        .then(buff => parseGIF(buff))
        .then(gif => decompressFrames(gif, true));

    const frame = frames[frameIndex] || frames[0];

    return dataBufferFromFrame(frame);
}

function gifreezeFile(path, frameIndex = 0) {
    const buff = fs.readFileSync(path);
    const gif = parseGIF(buff);
    const frames = decompressFrames(gif, true);

    const frame = frames[frameIndex] || frames[0];

    return dataBufferFromFrame(frame);
}

module.exports = {
    gifreezeFile,
    gifreezeUrl,
};
