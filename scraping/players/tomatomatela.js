const axios = require('axios');

async function ObtenerStream(browser, playerURL) {
    /**Convierte la URL de tomatomatela en un stream HTML5 utilizable por stremio */
    
    //console.log({embedURL});

    //Esto esta sacado directo del javascript del sitio
    //Se utiliza para general el stream

    if (playerURL.slice(-2) !== "?r") {
        playerURL = playerURL + "&r";
    }

    const file = playerURL.split('#').pop();

    checkUrl = "https://tomatomatela.com/details.php?v=" + file;

    const response = await axios.get(checkUrl);

    const stream = response.data.file;


    return stream;
}

module.exports = {
    ObtenerStream
}