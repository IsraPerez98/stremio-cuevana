const { JSDOM } = require( "jsdom" ); 
const puppeteer = require('puppeteer');

//POR ALGUNA MUY EXTRAÑA RAZON LA API RESPONDE CORRECTAMENTE SOLO CUANDO SE USA JQUERY, AXIOS NO FUNCIONA
const { window } = new JSDOM("", {
    url: "https://api.cuevana3.me/fembed/api.php",
});

const $ = require( "jquery" )( window );

async function ObtenerStream(browser, url) {
    const fembedURL = await ObtenerLinkAPI(url);
    console.log({fembedURL});

    const stream = await generarStream(browser, fembedURL);

    return stream;
}

async function generarStream(browser, fembedURL) {
    /** Carga la pagina con el player y retorna el stream de HTML5 */
    const page = await browser.newPage();
    
    await page.setViewport({ width: 800, height: 600 })

    await page.goto(fembedURL, {waitUntil: 'networkidle2'});

    const timeout = 5000;

    //wait for the player to load
    await page.waitForSelector('svg', {timeout: timeout});

    //await page.screenshot({path: 'screenshot.png'});

    //click on play
    await page.mouse.click(400, 300, {button: 'left'});

    //we wait for the video to load

    //await page.screenshot({path: 'screenshot1.png'});
    
    await page.waitForSelector('.jw-video', {timeout: timeout});

    const videoSrc = await page.evaluate(() => {
        return document.querySelector('.jw-video').src;
     });

    return videoSrc;


}

async function ObtenerLinkAPI(url) {
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