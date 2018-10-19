const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];

fetch(endpoint)
	.then(blob =>blob.json())
	.then(data => cities.push(...data));

function findMatches(wordToMatch, cities) {
	return cities.filter(place =>  {
		//Here we need to figure out if the city or state matches what was searched
		//set regex to a regular expression equal to the word that were using to match and make sure that it matching globally and not using case sensativity
		const regex = new RegExp(wordToMatch, 'gi');
		return place.city.match(regex) || place.state.match(regex);
	});
}

function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function displayMatches() {
	//set matchArray equal to the value returned from the findMatches function when the input is the value returned from the input field
	const matchArray = findMatches(this.value, cities);
	const html = matchArray.map(place => {
		//look at the value the user entered and do not apply case sensitivity
		const regex = new RegExp(this.value, 'gi');
		//take the place.city and replace whatever value matches the regular expression with the value entered in a span tag with the hl class being applied to highlight the text
		const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
		const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
		return `
						<li>
							<span class="name">${cityName}, ${stateName}</span>
							<span class="growth">${place.growth_from_2000_to_2013}</span>
							<span class="population">${numberWithCommas(place.population)}</span>
						</li>
					`;
	}).join('');
	suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);

