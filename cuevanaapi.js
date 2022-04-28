const cuevana3 = require('cuevana3');
const puppeteer = require('puppeteer');
const stringSimilarity = require("string-similarity");

//this code is a mess, but it works

async function searchMovie(browser, title) {
	//API machine broke, make my own

	console.log("Searching for movie: ", title);

	const url = `https://ww3.cuevana3.me/?s=${title}`;

	const page = await browser.newPage();
	
	await page.goto(url, {waitUntil: 'networkidle2'});
	await page.waitForSelector('.MovieList');

	const movieTitlesList = await page.$$eval('main > section > ul > li > div > a > h2', (el) => el.map(e => e.innerText));

	if(movieTitlesList.length === 0) {
		console.log("No results found");
		return {};
	}
	
	const movieURLList = await page.$$eval('main > section > ul > li > div > a', (el) => el.map(e => e.href));

	const moviesObject = Object.assign(...movieTitlesList.map((k, i) => ({[k]: movieURLList[i]})));

	return moviesObject;
	/*

	//we have to pick the most similar one since the search engine kinda sucks
	const match = stringSimilarity.findBestMatch(title, movieTitlesList);

	const movieURL = moviesObject[match.bestMatch.target];

	return movieURL.split('/').slice(-2).join('/');
	*/
}

async function getMovieID(browser, titles) {

	let promises = [];

	for(const language in titles) {
		if(titles[language]){
			promises.push(searchMovie(browser, titles[language]));
		}
	}

	const allMovies = await Promise.all(promises);

	let allMoviesObject = {};

	for (const query of allMovies) {
		for(const movie in query) {
			allMoviesObject[movie] = query[movie];
		}
	}

	console.log({allMoviesObject});


	//we have to pick the most similar one since the search engine kinda sucks
	const bestMatches = [];

	for(const language in titles) {
		if(titles[language]){
			const bestMatch = stringSimilarity.findBestMatch(titles[language], Object.keys(allMoviesObject)).bestMatch;
			//console.log({bestMatch});
			bestMatches.push(bestMatch);
		}
	}
	
	//now we have the best matches, we need to pick the best one
	const bestMatch = bestMatches.reduce((a, b) => a.rating > b.rating ? a : b);

	console.log(bestMatch);
	
	const movieURL = allMoviesObject[bestMatch.target];

	return movieURL.split('/').slice(-2).join('/');
}


async function getMovieURLs(browser, titles) {

	const id = await getMovieID(browser, titles);
	console.log({id});
	return await cuevana3.getLinks(id);
}

module.exports = {
    getMovieURLs,
}