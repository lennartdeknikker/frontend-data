import { d3 } from 'd3';

// changes fill color of areas on mouse over and mouse out
function mouseOverHandler(d) {
	d3.select('#map_text').text(d.properties.NAME_1);
	d3.select(this).attr('fill', '#9aeae6');
}

function mouseOutHandler() {
	d3.select('#map_text').text('');
	const element = d3.select(this);
	if (element.attr('fill') !== '#00aaa0') {
		element.attr('fill', 'white');
	}
}
// renders the map from a given geoJson
async function renderMap(geoJson, g, projection) {
	const path = d3.geoPath().projection(projection);
	g.attr('class', 'g-map-container')
		.append('g')
		.attr('class', 'g-map')
		.selectAll('path')
		.data(geoJson.features)
		.enter()
		.append('path')
		.attr('class', 'area')
		.attr('d', path)
		.attr('fill', 'white')
		.attr('stroke', '#c1eae8')
		.attr('stroke-width', 0.5)
		.on('mouseover', mouseOverHandler)
		.on('mouseout', mouseOutHandler);
}

async function loadMap(geoJson, g, projection) {
	await d3.json(geoJson).then(mapData => renderMap(mapData, g, projection));
}

export { loadMap };
