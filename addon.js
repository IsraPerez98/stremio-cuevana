const { addonBuilder } = require("stremio-addon-sdk");
const streams = require("./streams");

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
	],
	"name": "Cuevana3",
	"description": "Cuevana3 provides the latest in the world of movies and tv shows in Latin Spanish dub or subtitled [Unofficial]. Cuevana3 provee la ultima actualidad en el mundo de peliculas y series en español latino subtituladas o en dub [No oficial].",
	"idPrefixes": [
		"tt"
	]
};
const builder = new addonBuilder(manifest);

builder.defineStreamHandler( async ({type, id}) => {
	console.log("request for streams: "+type+" "+id+" ");
	// Docs: https://github.com/Stremio/stremio-addon-sdk/blob/master/docs/api/requests/defineStreamHandler.md

	if (type === "movie") {
		const streamsDisponibles = await streams.ObtenerStreams(id);
		return {streams : streamsDisponibles};
	}

	// otherwise return no streams
	return { streams: [] };
});

module.exports = builder.getInterface();