const { addonBuilder } = require("stremio-addon-sdk");
const metadata = require("./metadata");
const scrapping = require("./scrapping");
const cuevanaapi = require("./cuevanaapi");
const puppeteer = require('puppeteer');

// Docs: https://github.com/Stremio/stremio-addon-sdk/blob/master/docs/api/responses/manifest.md
const manifest = {
	"id": "community.Cuevana3",
	"version": "0.0.1",
	"catalogs": [],
	"resources": [
		"stream"
	],
	"types": [
		"movie",
		"series"
	],
	"name": "Cuevana3",
	"description": "Cuevana3 provides the latest in the world of movies and tv shows in Latin Spanish dub or subtitled [Unofficial]",
	"idPrefixes": [
		"tt"
	]
};
const builder = new addonBuilder(manifest);

async function getStreamObject(browser, url, language){
	try {
		const stream = await scrapping.getStreamFromCuevana(browser, url);
		const streamObject = {
			"url": stream,
			"description": language,
			behaviorHints: {
				notWebReady: true,
			}
		}

		return streamObject;
	}
	catch(error) {
		console.log(error);
		return {"url": ""};
	}

}


builder.defineStreamHandler( async ({type, id}) => {
	console.log("request for streams: "+type+" "+id+" ");
	// Docs: https://github.com/Stremio/stremio-addon-sdk/blob/master/docs/api/requests/defineStreamHandler.md

	if (type === "movie") {
		const titles = await metadata.getTitles(id);

		console.log({titles});

		//we need a puppeteer browser to handle some redirects and stuff from cuevana
		const browser = await puppeteer.launch({ headless: true });

		const movieURLs = await cuevanaapi.getMovieURLs(browser, titles);

		let promises = [];

		for(const language in movieURLs[0]) {
			for (const source of movieURLs[0][language]) {
				promises.push(getStreamObject(browser, source.url, language));
			}
		}
		
		const streams = await Promise.all(promises);

		browser.close();

		return {streams: streams};
		
	}


	// otherwise return no streams
	return { streams: [] };
});

module.exports = builder.getInterface();