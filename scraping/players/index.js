const tomatomatela = require('./tomatomatela');
const fembed = require('./fembed');

async function ObtenerStream(browser, playerURL) {
    
    if(!playerURL) {
        return {
            host: "",
            stream: "",
        };
    }

    if(playerURL.includes('tomatomatela')) {
        return {
            host: "Tomatomatela",
            stream: await tomatomatela.ObtenerStream(browser, playerURL),
        }
    } else if (playerURL.includes('suzihaza') || playerURL.includes('fembed')) {
        return {
            host: "Suzihaza",
            stream: await fembed.ObtenerStream(browser, playerURL),
        }
    } else {
        console.log("Reproductor no soportado: "+playerURL);
        return {
            host: "",
            stream: "",
        };
    }
}

module.exports = {
    ObtenerStream,
}