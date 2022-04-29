const axios = require('axios');

//pls don't steal
const apikey = "af3ef9949108c67d7f2bc1604ee7959d";


async function ObtenerTitulos(meta_id) {
    /**Obtiene el titulo de una pelicula en spanish_es spanish_mx y english */
    
    const promises = [
        ObtenerTituloIngles(meta_id),
        ObtenerTitulosSpanish(meta_id),
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

async function ObtenerTitulosSpanish(meta_id) {
    /**Obtiene el titulo de una pelicula en spanish_es spanish_mx */
    
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${meta_id}/translations?api_key=${apikey}`);

    const response_mx = response.data.translations.find(translation => translation.iso_3166_1 === "MX");
 
    const response_es = response.data.translations.find(translation => translation.iso_3166_1 === "ES");

    const spanish_mx = (response_mx && response_mx.data && response_mx.data.title) ? response_mx.data.title : "";

    const spanish_es = (response_es && response_es.data && response_es.data.title) ? response_es.data.title : "";
 
    return {
        spanish_mx: spanish_mx,
        spanish_es: spanish_es,
    };
}

async function ObtenerTituloIngles(meta_id) {
    const response = await axios.get('https://v3-cinemeta.strem.io/meta/movie/' + meta_id + '.json');

	return {
        english: response.data.meta.name,
    };
}

module.exports = {
    ObtenerTitulos
}