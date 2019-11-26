import * as d3 from 'd3';
import { updateDataPoints } from './datapoints';
import { getQueryFor } from './utilities';

// Updates the shown data points when a new keyword is entered.
function onSearch(g, projection, settings) {
	if (d3.event.keyCode === 13) {
		const keyWord = d3.select('#search_input').property('value');
		updateDataPoints(
			settings.init.endpoint,
			getQueryFor(keyWord),
			g,
			projection,
			settings
		);
	}
}

// adds an event listener to the search input.
async function addSearch(g, projection, settings, endpoint) {
	const searchInput = d3.select('#search_input');
	searchInput.on('keydown', () => {
		onSearch(g, projection, settings, endpoint);
	});
}

export { addSearch };
