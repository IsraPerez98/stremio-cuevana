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

module.export = {
    getTitleFromId,
    getTitleSpanish,
};