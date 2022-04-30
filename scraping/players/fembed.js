async function videoErroneo(page) {
    /**
     * Si el video no es válido, retorna un string vacío
     */

    await page.waitForSelector('p', {timeout: 100000});

    //si p contiene removed o unavailable, el video no es válido
    const p = await page.$eval('p', el => el.innerHTML);

    if(p.includes('unavailable') || p.includes('removed')) {
        console.log("Video no disponible");
        return "";
    }

    console.log("El video retorno: ", p);

    //en caso de aparecer un p con otra string
    //esperamos un tiempo largo para que la otra funcion gane el race
    //en cualquier caso esta linea de codigo no deberia correr

    const delay = ms => new Promise(res => setTimeout(res, ms));

    await delay(150000);
    return "";

 
}

async function videoValido(page) {
    /**
     * Si el video es válido, retorna un string con el stream
     */

    //esperar que el video cargue

    await page.waitForSelector('svg', {timeout: 5000});


    //click en play

    //aveces el boton play es falso asi que lo spameamos
    for(let i = 0; i < 15; i++) {
        await page.mouse.click(400, 300);
    }


    await page.waitForSelector('.jw-video', {timeout: 10000});


    //TODO: esto solo retorna un stream, pero este reproductor puede tener el video en distintas resoluciones

    const videoSrc = await page.evaluate(() => {
        return document.querySelector('.jw-video').src;
    });

    return videoSrc;
}

async function ObtenerStream(browser, playerURL) {
    /** Carga la pagina con el player y retorna el stream de HTML5 */
    
    const page = await browser.newPage();
    
    await page.setViewport({ width: 800, height: 600 })

    await page.goto(playerURL, {waitUntil: 'networkidle2'});

    try {

        const promises = [
            videoErroneo(page),
            videoValido(page)
        ];

        //comprobamos si el video carga un error o el stream
        const resultado = await Promise.race(promises);

        await page.close();

        return resultado;
    } catch (error) {
        //timeout error de puppeteer
        if(error.name === 'TimeoutError') {

            //await page.screenshot({path: 'screenshot.png'});
            await page.close();
            
            console.log("TimeoutError, probablemente el link este caido");
            return "";
        }
    }
    
}



module.exports = {
    ObtenerStream,
}