import { adjustCirclesToZoomLevel } from './zoom';
import { drawLegend } from './legend';
import { GenerateHtmlListFor } from './utilities';

// loads a list of selected objects
function objectClickHandler(d) {
	d3.selectAll('.datapoint').attr('stroke', 'none');
	d3.select(this)
		.transition()
		.duration(100)
		.attr('fill', 'white')
		.transition()
		.duration(200)
		.attr('stroke', '#00aaa0')
		.attr('stroke-alignment', 'outer')
		.attr('stroke-width', '2pt')
		.attr('fill', '#00827b');

	document.querySelector('.info').innerHTML = GenerateHtmlListFor(d);
	document.querySelector('.info').scrollIntoView({ behavior: 'smooth' });
}

function objectMouseoverHandler(d) {
	if (d3.select(this).attr('stroke') != '#00aaa0')
		d3.select(this).attr('fill', '#00aaa0');
}

function objectMouseoutHandler(d) {
	if (d3.select(this).attr('stroke') != '#00aaa0')
		d3.select(this).attr('fill', '#00827b');
}

function transformData(source, settings) {
	let transformed = d3
		.nest()
		.key(d => {
			return d.placeName.value;
		})
		.entries(source);
	transformed.forEach(element => {
		element.amount = element.values.length;
		element.placeName = element.values[0].placeName.value;
		element.long = element.values[0].long.value;
		element.lat = element.values[0].lat.value;
	});

	// side effect to obtain data-extent and update settings
	settings.render.dataExtent = getExtent(transformed);
	drawLegend(d3.select('.legend-svg'), settings);
	return transformed;
}

function getExtent(data) {
	let currentHighest = 0;
	data.forEach(d => {
		currentHighest = d3.max([d.amount, currentHighest]);
	});
	return [1, currentHighest];
}

function updateDataPointsAndDataExtent(
	endpoint,
	query,
	g,
	projection,
	settings
) {
	if (!document.querySelector('.g-datapoints')) {
		g.append('g').attr('class', 'g-datapoints');
	}

	d3.json(
		endpoint + '?query=' + encodeURIComponent(query) + '&format=json'
	).then(objects => {
		renderDataPoints(
			transformData(objects.results.bindings, settings),
			g,
			projection,
			settings
		);
	});
}

function renderDataPoints(objects, g, projection, settings) {
	const datapoints = d3
		.select('.g-datapoints')
		.selectAll('.datapoint')
		.data(objects)
		.attr('r', 0);

	datapoints
		.enter()
		.append('circle')
		.merge(datapoints)
		.attr('class', 'datapoint')
		.attr('data-place', d => d.placeName)
		.attr('data-long', d => d.long)
		.attr('data-lat', d => d.lat)
		.attr('cx', d => projection([d.long, d.lat])[0])
		.attr('cy', d => projection([d.long, d.lat])[1])
		.attr('fill', '#00827b')
		.on('mouseover', objectMouseoverHandler)
		.on('mouseout', objectMouseoutHandler)
		.on('click', objectClickHandler);

	datapoints.exit().remove();

	adjustCirclesToZoomLevel(1, g, settings);
}

export { updateDataPointsAndDataExtent };
