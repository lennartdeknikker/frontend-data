import * as d3 from 'd3';

// changes the radius of the datapoint circles according to zoomlevel.
function changeCircleRadius(g, factor, minRadius, maxRadius) {
	g.selectAll('circle')
		.transition()
		.duration(500)
		.attr('r', d => {
			if (d.amount * factor < minRadius) {
				return minRadius;
			}
			if (d.amount * factor > maxRadius) {
				return maxRadius;
			}
			return d.amount * factor;
		});
}

// changes the opacity of the datapoint circles according to zoomlevel.
function changeCircleOpacity(g, zoomLevel, maxZoomLevel) {
	if (zoomLevel < maxZoomLevel / 2) {
		g.selectAll('.datapoint').attr('fill-opacity', 0.3 + 0.7 / zoomLevel);
	} else {
		g.selectAll('.datapoint').attr('fill-opacity', 1);
	}
}

// calculates the factor on which to transform the size of the circles.
function calculateFactor(minRadius, maxRadius, settings) {
	return (
		(maxRadius - minRadius) /
		(settings.render.dataExtent[1] - settings.render.dataExtent[0])
	);
}

// calculates the extent of the circle radius.
function calculateRadiusExtent(zoomLevel) {
	const min = zoomLevel / 3 < 2 ? 3 - zoomLevel / 3 : 1;
	const max = zoomLevel * 7 < 37.5 ? 40 - zoomLevel * 7 : 2.5;
	return [min, max];
}

// adjusts the shown datapoints to the zoomlevel using the functions above.
function adjustCirclesToZoomLevel(zoomLevel, g, settings) {
	const [minRadius, maxRadius] = calculateRadiusExtent(zoomLevel);
	const maxZoomLevel = settings.render.scaleExtent[1];
	const factor = calculateFactor(minRadius, maxRadius, settings);

	changeCircleRadius(g, factor, minRadius, maxRadius);
	changeCircleOpacity(g, zoomLevel, maxZoomLevel);
}

// creates a zoom object using the settings defined in main.js
async function createZoomObject(settings) {
	const zoom = d3.zoom().scaleExtent(settings.render.scaleExtent);
	return zoom;
}

// adds zooming handlers to input.
function addZoomHandlers(zoom, g, settings, svg) {
	function zoomHandler() {
		g.attr('transform', d3.event.transform);
		adjustCirclesToZoomLevel(d3.event.transform.k, g, settings);
	}

	function clickToZoom(zoomStep) {
		svg
			.transition()
			.duration(500)
			.call(zoom.scaleBy, zoomStep);
	}

	function resetProjection() {
		svg
			.transition()
			.duration(500)
			.call(zoom.transform, d3.zoomIdentity);
	}

	zoom.on('zoom', zoomHandler);

	// makes it possible to zoom on click with adjustable steps,
	// and resets the projection when search input is changed.
	d3.select('#btn-zoom--in').on('click', () => clickToZoom(2));
	d3.select('#btn-zoom--out').on('click', () => clickToZoom(0.5));
	d3.select('#search_input').on('select', () => resetProjection());
	d3.select('#search_input').on('click', () => resetProjection());
	return g;
}

// adds zoom functionality to the svg using the functions above.
async function addZoomToSvg(settings, svg) {
	const svgWithZoom = createZoomObject(settings).then(zoom => {
		const zoomGroup = svg.call(zoom).append('g');
		const zoomGroupWithHandlers = addZoomHandlers(
			zoom,
			zoomGroup,
			settings,
			svg
		);
		return zoomGroupWithHandlers;
	});
	return svgWithZoom;
}

export { addZoomToSvg, adjustCirclesToZoomLevel };
