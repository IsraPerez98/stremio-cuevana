const axios = require('axios');

//pls don't steal
const apikey = "af3ef9949108c67d7f2bc1604ee7959d";


async function ObtenerTitulos(type, meta_id) {
    /**Obtiene el titulo de una pelicula en spanish_es spanish_mx y english */
    
    const promises = [
        ObtenerTituloIngles(type, meta_id),
        ObtenerTitulosSpanish(type, meta_id),
    ];

    const resultados = await Promise.all(promises);

    const titulos = resultados.reduce((acc, resultado) => {
        Object.keys(resultado).forEach(idioma => {
            acc[idioma] = resultado[idioma];
        });
        return acc;
    }, {});

    return titulos;
}

async function ObtenerTitulosSpanish(type, meta_id) {
    /**Obtiene el titulo de una pelicula en spanish_es spanish_mx */
    try {

        type === "movie" ? meta_id = meta_id : meta_id = meta_id.split(':')[0];

        const url = type === "movie" ? `https://api.themoviedb.org/3/movie/${meta_id}/translations?api_key=${apikey}` : `https://api.themoviedb.org/3/tv/${meta_id}/translations?api_key=${apikey}`;
    
        const response = await axios.get(url);

        const response_mx = response.data.translations.find(translation => translation.iso_3166_1 === "MX");
    
        const response_es = response.data.translations.find(translation => translation.iso_3166_1 === "ES");

        const spanish_mx = (response_mx && response_mx.data && response_mx.data.title) ? response_mx.data.title : "";

        const spanish_es = (response_es && response_es.data && response_es.data.title) ? response_es.data.title : "";
    
        return {
            spanish_mx: spanish_mx,
            spanish_es: spanish_es,
        };
    } catch (error) {
        //404
        if (error.response && error.response.status === 404) {
            console.log("No se encontro el id en themoviedb");
            return {
                spanish_mx: "",
                spanish_es: "",
            };
        }
    }
}

async function ObtenerTituloIngles(type, meta_id) {
    try {

        type === "movie" ? meta_id = meta_id : meta_id = meta_id.split(':')[0];

        const response = await axios.get(`https://v3-cinemeta.strem.io/meta/${type}/${meta_id}.json`);

	    return {
            english: response.data.meta.name,
        };
    } catch (error) {
        //404
        if (error.response && error.response.status === 404) {
            console.log("No se encontro el id en cinemeta");
            return {
                english: "",
            };
        }
    }
}

module.exports = {
    ObtenerTitulos
}