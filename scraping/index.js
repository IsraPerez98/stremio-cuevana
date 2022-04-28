const tomatomatela = require("./tomatomatela");

async function ObtenerStream(browser, url) {
    if(url.includes('tomatomatela')) {
        return tomatomatela.ObtenerStream(browser, url);
    } else {
        console.log("URL no disponible: "+url);
        return "";
    }
}

module.exports = {
    ObtenerStream,
}