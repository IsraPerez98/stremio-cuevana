const { addonBuilder } = require("stremio-addon-sdk");
const scrapping = require("./scrapping");
const cuevanaapi = require("./cuevanaapi");

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


builder.defineStreamHandler( async ({type, id}) => {
	console.log("request for streams: "+type+" "+id+" ");
	// Docs: https://github.com/Stremio/stremio-addon-sdk/blob/master/docs/api/requests/defineStreamHandler.md

	if (type === "movie") {
		//const url = "https://api.cuevana3.me/ir/goto_ddh.php?h=cHdlSGU2VjczUUVPODNNUXI0UWVpTEk3SGFLbjZaWUNQdStvVGEzUGc4N1ZUN3ErYUhaV1IxYjBjcDI5MjRlWGo5OG1lb1JpZ0FWWFU1RFNyUEkvcDRDTDZOWGJhMUEzWTBRaUt6VmhuSTMrbUYvVG05b01rZFNkNEZiaGFnL3NtZlEyMDB5QUl0WnM2TXpibmJ4dWh3PT0";

		const movieURLs = await cuevanaapi.getMovieURLs(type,id);

		let streams = [];

		//console.log(movieURLs[0]);

		for(const language in movieURLs[0]) {
			for (const source of movieURLs[0][language]) {
				const stream = await scrapping.getStreamFromCuevana(source.url);
				console.log({stream});
				streams.push({
					"url": stream,
					"name": language,
					"description": language,
					behaviorHints: {
						notWebReady: true,
					}
				})
			}
		} 

		return {streams: streams};
		
	}


	// otherwise return no streams
	return { streams: [] };
});

module.exports = builder.getInterface();