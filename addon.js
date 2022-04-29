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
		"series",
	],
	"name": "Cuevana3",
	"description": "Cuevana3 provides the latest of movies and tv shows in Spanish, Latin Spanish or Subtitled [Unofficial]. Cuevana3 provee la ultima actualidad de peliculas y series en Español, Español Latino o Subtituladas [No oficial].",
	"idPrefixes": [
		"tt"
	]
};
const builder = new addonBuilder(manifest);

builder.defineStreamHandler( async ({type, id}) => {
	console.log("request for streams: "+type+" "+id+" ");
	// Docs: https://github.com/Stremio/stremio-addon-sdk/blob/master/docs/api/requests/defineStreamHandler.md

	if (type === "movie" || type === "series") {
		const streamsDisponibles = await streams.ObtenerStreams(type, id);
		return {streams : streamsDisponibles};
	}

	// otherwise return no streams
	return { streams: [] };
});

module.exports = builder.getInterface();