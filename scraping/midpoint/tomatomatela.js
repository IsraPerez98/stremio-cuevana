const axios = require('axios');
const FormData = require('form-data');
const jsdom = require("jsdom");

async function ObtenerURLPlayer(url) {
    //obtenemos el id del video
    const url_object = new URL(url);
    const id = url_object.searchParams.get("h");

    //console.log({id});

    //al cargar el video se hace un llamado a esta api con una formdata incluyendo el id como url
    let bodyFormData = new FormData();
    bodyFormData.append('url', id);

    try {
    
        const apiResponse = await axios({
            method: 'post',
            url: 'https://apialfa.tomatomatela.com/ir/rd.php',
            data: bodyFormData,
        });

    
        const urlRespuesta = apiResponse.request.res.responseUrl;

        //console.log({urlRespuesta});

        //puede que esto retorne un video de otro sitio de forma directa
        if(!((urlRespuesta).includes('api.cuevana3.me')) && !((urlRespuesta).includes('apialfa.tomatomatela.com'))) {

            //en ese caso se retorna
            return urlRespuesta;
        }

        //La api retorna un codigo HTML con otro ID de video y otro endpoint
        //Parseamos el HTML para obtener ID
        const dom = new jsdom.JSDOM(apiResponse.data);

        const nuevoID = dom.window.document.querySelector("input").getAttribute("value");

        //console.log({nuevoID});

        let body2FormData = new FormData();
        body2FormData.append('url', nuevoID);

        const apiResponse2 = await axios({
            method: 'post',
            url: 'https://apialfa.tomatomatela.com/ir/redirect_ddh.php',
            data: body2FormData,
        });

        //esta api responde desde otra pagina que contiene el reproductor u otro redirect

        const urlRespuesta2 = apiResponse2.request.res.responseUrl;

        if(urlRespuesta2.includes('embed.html')) {
            return urlRespuesta2;
        }

        //TODO: encontrar una forma de obtener el stream a pesar de los redirects
        console.log("Demasiados redirects");
        return "";
        
    } catch (error) {
        //error 404 with axios
        if (error && error.response && error.response.status === 404) {
            console.log("Video eliminado");
            return "";
        }
        //error ECONNREFUSED with axios
        if (error && error.code === 'ECONNREFUSED') {
            console.log("Error conexion, probablemente el host este muerto");
            return "";
        }

        console.log({url, error});
        return "";
    }
}


module.exports = {
    ObtenerURLPlayer,
}