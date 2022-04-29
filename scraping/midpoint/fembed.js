const { JSDOM } = require( "jsdom" ); 
//const puppeteer = require('puppeteer');

//POR ALGUNA MUY EXTRAÑA RAZON LA API RESPONDE CORRECTAMENTE SOLO CUANDO SE USA JQUERY, AXIOS NO FUNCIONA
const { window } = new JSDOM("", {
    url: "https://api.cuevana3.me/fembed/api.php",
});

const $ = require( "jquery" )( window );

async function ObtenerURLPlayer(url) {
    /** Utiliza la api de cuevana para obtener una url de fembed.com */

    //el parametro h contiene un id de pelicula
    const url_object = new URL(url);
    const id = url_object.searchParams.get("h");

    //console.log({id});

    //el cual es pasado a la api con jquery
    const apiajax = await llamarAPIAJAX(id);

    const fembedURL = apiajax.url;

    //fembed ahora es suzihaza
    return fembedURL.replace("fembed.com", "suzihaza.com");
}

async function llamarAPIAJAX(id) {

    return $.post( "https://api.cuevana3.me/fembed/api.php", { h: id }, "json");
}

module.exports = {
    ObtenerURLPlayer,
}