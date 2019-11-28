import * as d3 from 'd3';
import { adjustCirclesToZoomLevel } from './zoom';
import { transformData } from './utilities';
import { showListFor } from './list';

// This adds an animation when a data point is clicked on,
function objectClickHandler(object) {
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
	// then calls the function above to load the object listing,
	showListFor(object, 'image');
	// then scrolls down to get that listing into view.
	document.querySelector('.info').scrollIntoView({ behavior: 'smooth' });
}

// These functions change datapoint colors on hover
function objectMouseoverHandler() {
	if (d3.select(this).attr('stroke') !== '#00aaa0')
		d3.select(this).attr('fill', '#00aaa0');
}
function objectMouseoutHandler() {
	if (d3.select(this).attr('stroke') !== '#00aaa0')
		d3.select(this).attr('fill', '#00827b');
}

// Renders or updates datapoints.
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

// If necessary creates a new group for drawing datapoints,
function updateDataPoints(endpoint, query, g, projection, settings) {
	if (!document.querySelector('.g-datapoints')) {
		g.append('g').attr('class', 'g-datapoints');
	}
	// then obtains new data from the server,
	d3.json(`${endpoint}?query=${encodeURIComponent(query)}&format=json`).then(
		objects => {
			// then (re)renders the datapoints.
			renderDataPoints(
				transformData(objects.results.bindings, settings),
				g,
				projection,
				settings
			);
		}
	);
}

export { updateDataPoints };
