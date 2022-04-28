const puppeteer = require('puppeteer');
const axios = require('axios');

async function getStreamPage(browser,url) {

	try {
        //const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        
        await page.goto(url, {waitUntil: 'networkidle2'});

        //wait for the player to load
        await page.waitForSelector('#player', {timeout: 5000});

        //console.log(page.url());

        
        //browser.close();

        return page.url();

    } catch(error) {
        if (error instanceof puppeteer.errors.TimeoutError) {
            //console.log("Timeout error");
            return "";
        }
        console.log(error);
    }
}

async function getStreamFromTomatomatela(browser, url) {

    //console.log("Converting from Tomatomatela");
    
    //sometimes the url contains player.php with a play button in the middle
    url = url.replace("player.php", "goto.php");

    //console.log("url: ", url);

    let streamPage = await getStreamPage(browser, url);

    if ( streamPage === "" ) {
        return "";
    }

    //this is what the site uses to get the file from the url

    if (streamPage.slice(-2) !== "?r") {
        streamPage = streamPage + "&r";
    }

    //const file = streamPage.hash.split('#')[1];
    const file = streamPage.split('#').pop();


    checkUrl = "https://tomatomatela.com/details.php?v=" + file;

    //console.log(checkUrl);

    const response = await axios.get(checkUrl);

    const stream = response.data.file;

    console.log({
        "url": url,
        "stream": stream,
    });


    return stream;


}

async function getStreamFromCuevana(browser, url) {
    //gets a url from cuevana3 and converts it to a usable stream for Stremio
    //i hope there was a better way of doing this

    //console.log("Converting url to stream: ", url);

    if(url.includes("tomatomatela")) {
        return await getStreamFromTomatomatela(browser, url);
    } else {
        console.log("unknown url", url);
        return "";
    }
}



module.exports = {
    getStreamFromCuevana,
}