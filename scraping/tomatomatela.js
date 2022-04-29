const axios = require('axios');
const FormData = require('form-data');
const jsdom = require("jsdom");

async function ObtenerStream( url) {
    /**Convierte la URL de tomatomatela en un stream HTML5 utilizable por stremio */
    let embedURL = await obtenerEmbedPlayer(url);

    console.log({embedURL});

    //Esto esta sacado directo del javascript del sitio
    //Se utiliza para general el stream

    if (embedURL.slice(-2) !== "?r") {
        embedURL = embedURL + "&r";
    }

    const file = embedURL.split('#').pop();

    checkUrl = "https://tomatomatela.com/details.php?v=" + file;

    const response = await axios.get(checkUrl);

    const stream = response.data.file;


    return stream;
}

async function obtenerEmbedPlayer(url) {
    //obtenemos el id del video
    const url_object = new URL(url);
    const id = url_object.searchParams.get("h");

    console.log({id});

    //al cargar el video se hace un llamado a esta api con una formdata incluyendo el id como url
    let bodyFormData = new FormData();
    bodyFormData.append('url', id);
    
    const apiResponse = await axios({
        method: 'post',
        url: 'https://apialfa.tomatomatela.com/ir/rd.php',
        data: bodyFormData,
    });

    //console.log({apiResponse});

    //La api retorna un codigo HTML con otro ID de video y otro endpoint
    //Parseamos el HTML para obtener ID
    const dom = new jsdom.JSDOM(apiResponse.data);

    const nuevoID = dom.window.document.querySelector("input").getAttribute("value");

    console.log({nuevoID});

    let body2FormData = new FormData();
    body2FormData.append('url', nuevoID);

    const apiResponse2 = await axios({
        method: 'post',
        url: 'https://apialfa.tomatomatela.com/ir/redirect_ddh.php',
        data: body2FormData,
    });

    //esta api responde desde otra pagina que contiene el reproductor

    return apiResponse2.request.res.responseUrl;
}


module.exports = {
    ObtenerStream
}