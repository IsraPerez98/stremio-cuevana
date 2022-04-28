const cuevana3 = require("cuevana3");
const puppeteer = require('puppeteer');
const buscar = require("./buscar");
const scraping = require("./scraping");

async function ObtenerURLsAPI(meta_id) {
    /**Obtiene los URL disponibles para un ID especifico */

    const cuevanaID = await buscar.ObtenerIDCuevana(meta_id);
    
    console.log(cuevanaID);

    return cuevana3.getLinks(cuevanaID);
}


async function generarStreamObject(browser, idioma, url) {
    try {
        const stream = await scraping.ObtenerStream(browser, url);

        if(!stream) {
            return {
                "url": "",
            }
        }
    
        console.log({
            "url": url,
            "stream": stream,
        });

        return {
            "url": stream,
            "description": idioma,
            behaviorHints: {
            notWebReady: true,
            }
        }
    } catch (error) {
        console.log({
            "url": url,
            "error": error,
        });

        return {
            "url": "",
        }
    }
}

async function ObtenerStreams(meta_id) {
    const urls = await ObtenerURLsAPI(meta_id);

    // por alguna razon el paquete cuevana3 devuelve un array con un elemento, pero solo necesitamos el primero
    const urls_fixed = urls[0];

    //utilizamos puppeteer para obtener el stream de algunas url
    const browser = await puppeteer.launch({ headless: true });

    const promises = [];

    for (const idioma in urls_fixed) {
        const urls_idioma = urls_fixed[idioma];
        for (const url of urls_idioma) {
            promises.push(generarStreamObject(browser, idioma, url.url));
        }
    }

    const resultados = await Promise.all(promises);

    browser.close();

    return resultados;
}

module.exports = {
    ObtenerStreams,
}