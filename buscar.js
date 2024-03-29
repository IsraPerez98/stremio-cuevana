const axios = require('axios');
const cheerio = require('cheerio');
const stringSimilarity = require("string-similarity");

const metadata = require("./metadata");

async function test() {
    const busqueda = await buscar("Joker");
    console.log(busqueda);
}

async function buscar(titulo) {
    /**Busca un titulo en cuevana y retorna los nombres con los id */

    if(!titulo) {
        return {}
    }

    console.log("Buscando: "+titulo);
    const busqueda = await axios.get(`https://ww3.cuevana3.me/?s=${titulo}`)

    const $ = cheerio.load(busqueda.data);

    const ul = $('main section .MovieList');

    if(!ul || !ul.children) {
        console.log("No hay resultados para: "+titulo);
        return {};
    }

    const resultados = Array.from(ul.children()).map(li => {
        const nombre = $(li).find('.Title').text();
        const link = $(li).find('a').attr('href');
        const id = link.split('/').slice(-2).join('/');
        
        return {
            nombre,
            id,
        }
    });

    return resultados;

    /*
    const busqueda = await axios.get(`https://ww3.cuevana3.me/?s=${titulo}`);
    const dom = new jsdom.JSDOM(busqueda.data);
    
    //we have to pick the ul from the dom
    const ul = dom.window.document.querySelector("main section .MovieList");
    

    if(!ul || !ul.children) {
        console.log("No hay resultados para: "+titulo);
        return {};
    }

    const resultados = Array.from(ul.children).map (li => {
        const nombre = li.querySelector(".Title").textContent;
        const link = li.querySelector("a").href;
        const id = link.split('/').slice(-2).join('/');

        return{
            nombre,
            //link,
            id
        }

    });

    //console.log(resultados);

    return resultados;
    */
}

async function ObtenerIDCuevana(type, meta_id){
    /**Obtiene el id de una pelicula de cuevana a partir de un Meta ID  */

    //el buscador de cuevana es bastante malo asi que necesitamos buscar el titulo en español, español latino e ingles
    const titulos = await metadata.ObtenerTitulos(type, meta_id);

    const titulosSinRepetir = [...new Set(Object.values(titulos))];


    console.log({titulosSinRepetir});

    //buscamos en cuevana con cada titulo en paralelo
    const promises = titulosSinRepetir.map((titulo) => {
        //console.log({titulo})
        return buscar(titulo);
    });

    const resultados = await Promise.all(promises);

    //el resultado es un array de arrays, por lo que hay que reducir a un array unico
    const candidatos = resultados.reduce((acc, resultado) => {
        if(!resultado || !resultado.length) {
            return acc;
        }

        resultado.forEach(candidato => {
            acc.push(candidato);
        });
        return acc;
    }, []);

    if(!candidatos.length) {
        console.log("No hay resultados para: "+meta_id);
        return "";
    }

    //el buscador de cuevana es muy malo asi que comparamos los resultados con la similaridad de cada titulo para obtener el resultado correcto

    const bestMatches = titulosSinRepetir.map((titulo) => {
        return stringSimilarity.findBestMatch(titulo, candidatos.map(candidato => candidato.nombre)).bestMatch;
    });

    //ahora debemos seleccionar el mejor resultado
    const mejorResultado = bestMatches.reduce((acc, resultado) => {
        if(resultado.rating > acc.rating) {
            return resultado;
        }
        return acc;
    }, {rating: 0});

    return candidatos.find(o => o.nombre === mejorResultado.target).id;
}

module.exports = {
    ObtenerIDCuevana
}