const midpoint = require('./midpoint');
const players = require('./players');

async function ObtenerStream(browser, url) {
    const playerURL = await midpoint.ObtenerURLPlayer(url);

    console.log({playerURL});

    return await players.ObtenerStream(browser, playerURL);
}

module.exports = {
    ObtenerStream,
}