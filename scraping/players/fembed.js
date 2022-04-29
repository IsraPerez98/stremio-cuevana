async function ObtenerStream(browser, playerURL) {
    /** Carga la pagina con el player y retorna el stream de HTML5 */
    
    const page = await browser.newPage();
    
    await page.setViewport({ width: 800, height: 600 })

    await page.goto(playerURL, {waitUntil: 'networkidle2'});

    const timeout = 5000;

    try {

        //esperar que el video cargue
        await page.waitForSelector('svg', {timeout: timeout});

        //await page.screenshot({path: 'screenshot.png'});

        //click en play
        await page.mouse.click(400, 300, {button: 'left'});

        //we wait for the video to load

        //await page.screenshot({path: 'screenshot1.png'});
    
        await page.waitForSelector('.jw-video', {timeout: timeout});

        const videoSrc = await page.evaluate(() => {
            return document.querySelector('.jw-video').src;
        });

        page.close();

        return videoSrc;
    } catch (error) {
        //timeout error de puppeteer
        if(error.name === 'TimeoutError') {
            console.log("TimeoutError, probablemente el link este caido");
            return "";
        }
    }
    
}



module.exports = {
    ObtenerStream,
}