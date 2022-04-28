const axios = require('axios');
//const puppeteer = require('puppeteer');

async function ObtenerStream(browser, url) {
    /**Convierte la URL de tomatomatela en un stream HTML5 utilizable por stremio */
    
    //aveces la url contiene un boton de play, asi que lo saltamos
    url = url.replace("player.php", "goto.php");

    let urlStream = await cargarPaginaStream(browser, url);

    if(!urlStream) {
        return "";
    }

    //Esto esta sacado directo del javascript del sitio
    //Se utiliza para general el stream

    if (urlStream.slice(-2) !== "?r") {
        urlStream = urlStream + "&r";
    }

    const file = urlStream.split('#').pop();

    checkUrl = "https://tomatomatela.com/details.php?v=" + file;

    const response = await axios.get(checkUrl);

    const stream = response.data.file;


    return stream;
}

async function cargarPaginaStream(browser, url) {
    /** Carga la pagina con el player y returna la url del player */

    //const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
        
    await page.goto(url, {waitUntil: 'networkidle2'});

    const timeout = 5000;

    //wait for the player to load
    await page.waitForSelector('#player', {timeout: timeout});

    const urlStream = page.url();

    page.close();

    return urlStream;
}

module.exports = {
    ObtenerStream,
}