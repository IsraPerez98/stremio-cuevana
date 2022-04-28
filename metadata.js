
const axios = require('axios');

//pls don't steal
const apikey = "af3ef9949108c67d7f2bc1604ee7959d";

async function getTitleFromId(type,id) {
	try{
		const response = await axios.get('https://v3-cinemeta.strem.io/meta/' + type + '/' + id + '.json');
		
		//console.log(response)
		if (response && response.data && response.data.meta) {
			//console.log(body.meta);
			//console.log("title: ", response.data.meta.name);
			return response.data.meta.name;
		}
	} catch(error) {
		console.log("Error looking up title of movie", error);
	}
}


async function getTitles(id) {
	//returns title in mexican spanish, spain spanish and english
	try{
		const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/translations?api_key=${apikey}`);
		
		//console.log(response)
		if (response && response.data && response.data.translations) {
			
			//find the spanish_mx translation
			const spanish_mx = response.data.translations.find(translation => translation.iso_3166_1 === "MX");

			//find the spanish_es translation
			const spanish_es = response.data.translations.find(translation => translation.iso_3166_1 === "ES");

			//find the english translation

			const english = await getTitleFromId("movie", id);

			return {
				spanish_mx: spanish_mx.data.title,
				spanish_es: spanish_es.data.title,
				english: english
			};
			
		}
	} catch(error) {
		console.log("Error looking up title of movie", error);
	}
}

module.exports = {
    getTitleFromId,
    getTitles,
};