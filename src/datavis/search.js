import * as d3 from 'd3';
import { updateDataPointsAndDataExtent } from './data';
import { getQueryFor } from './utilities';

function onSearch(g, projection, settings) {
	if (d3.event.keyCode === 13) {
		const keyWord = d3.select('#search_input').property('value');
		updateDataPointsAndDataExtent(
			settings.init.endpoint,
			getQueryFor(keyWord),
			g,
			projection,
			settings
		);
	}
}

async function addSearch(g, projection, settings, endpoint) {
	const searchInput = d3.select('#search_input');
	searchInput.on('keydown', () => {
		onSearch(g, projection, settings, endpoint);
	});
}

export { addSearch };
