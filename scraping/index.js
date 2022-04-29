const tomatomatela = require("./tomatomatela");
const fembed = require("./fembed");

async function ObtenerStream(browser, url) {
    if(url.includes('tomatomatela')) {
        return tomatomatela.ObtenerStream(url);
    } else if(url.includes('fembed')) {
        //return fembed.ObtenerStream(browser, url);
        return "";
    } else {
        console.log("URL no disponible: "+url);
        return "";
    }
}

module.exports = {
    ObtenerStream,
}