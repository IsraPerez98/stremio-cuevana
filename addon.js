const { addonBuilder } = require("stremio-addon-sdk")
const cuevana3 = require("cuevana3")
const axios = require("axios");

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

async function getTitleFromId(type,id) {
	try{
		const response = await axios.get('https://v3-cinemeta.strem.io/meta/' + type + '/' + id + '.json');
		
		//console.log(response)
		if (response && response.data && response.data.meta) {
			//console.log(body.meta);
			console.log("title: ", response.data.meta.name);
			return response.data.meta.name;
		}
	} catch(error) {
		console.log("Error looking up title of movie", error);
	}
}

async function getTitleSpanish(englishtitle) {
	try{
		const response = await axios.get('https://v3-cinemeta.strem.io/meta/' + type + '/' + id + '.json');
		
		//console.log(response)
		if (response && response.data && response.data.meta) {
			//console.log(body.meta);
			console.log("title: ", response.data.meta.name);
			return response.data.meta.name;
		}
	} catch(error) {
		console.log("Error looking up title of movie", error);
	}
}

async function getMovieStreams(movie) {
	try {
		const id = movie.id;
		const links = await cuevana3.getLinks(id);
		console.log("links: ", links);
	} catch(error) {
//		console.log("Error getting links", error);
	}
}

async function searchMovieStreams(type, id) {

	//we first get the title
	const title = await getTitleFromId(type, id)

	//we have to find the title in spanish to search in cuevana3

	//we look for the movie in cuevana

	try {
		const results = await cuevana3.getSearch(title,1);
		console.log(results);
		if (results && results.length > 0) {
			const movie = results[0];
			console.log("movie: ", movie);
			console.log("movie id: ", movie.id);
			return await getMovieStreams(movie);
		} else {
			console.log("No results found");
		}

	} catch(error) {
		console.log("Error getting info from the cuevana API", error);
	}

	
}

builder.defineStreamHandler(({type, id}) => {
	console.log("request for streams: "+type+" "+id+" ");
	// Docs: https://github.com/Stremio/stremio-addon-sdk/blob/master/docs/api/requests/defineStreamHandler.md

	if (type === "movie") {
		cuevana3.getMovies(0)
  			.then((res) => console.log(res));
		searchMovieStreams(type,id);
	}

	// otherwise return no streams
	return Promise.resolve({ streams: [] })
});

module.exports = builder.getInterface()