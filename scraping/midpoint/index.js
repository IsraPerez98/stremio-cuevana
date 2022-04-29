const tomatomatela = require("./tomatomatela");
const fembed = require("./fembed");

async function ObtenerURLPlayer(url) {
    if (url.includes('tomatomatela')) {
        return tomatomatela.ObtenerURLPlayer(url);
    } else if (url.includes('fembed')) {
        return fembed.ObtenerURLPlayer(url);
    } else {
        console.log("URL no soportado: "+url);
        return "";
    }
}

module.exports = {
    ObtenerURLPlayer,
}