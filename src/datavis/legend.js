import * as d3 from 'd3';

// Adds the legend SVG to the DOM.
function addLegendSvg(settings) {
	if (settings.legend.enabled === true) {
		document.querySelector(settings.legend.targetDiv).innerHTML = '';
		d3.select(settings.legend.targetDiv)
			.append('svg')
			.attr('class', 'legend-svg')
			.attr('width', settings.legend.width)
			.attr('height', settings.legend.height);
	}
}

// renders the circles for min and max data.
function renderLegendCircles(legendGroup) {
	legendGroup
		.append('circle')
		.attr('cx', (d, i) => {
			const svgWidth = parseInt(d3.select('.legend-svg').attr('width'));
			return svgWidth - 135 + 100 * i;
		})
		.attr('cy', (d, i) => (i === 0 ? 67 : 40))
		.transition()
		.duration(500)
		.attr('r', (d, i) => (i === 0 ? 6 : 30))
		.attr('fill', '#00827b')
		.attr('stroke', 'white');
}

// renders the text for min and max data
function renderLegendText(legendGroup) {
	legendGroup
		.append('text')
		.attr('x', (d, i) => {
			const svgWidth = parseInt(d3.select('.legend-svg').attr('width'));
			return svgWidth - 135 + 100 * i;
		})
		.attr('y', 90)
		.attr('class', 'legend_text')
		.attr('text-anchor', 'middle')
		.text(d => d)
		.attr('fill', 'white');
}

// renders the legend using the functions above.
function renderLegend(svg, settings) {
	svg
		.append('g')
		.attr('class', 'g-legend')
		.attr('height', settings.legend.height)
		.attr('width', settings.legend.width);
	const legendGroup = d3
		.select('.g-legend')
		.selectAll('text')
		.data(settings.render.dataExtent)
		.enter()
		.append('g');
	renderLegendCircles(legendGroup);
	renderLegendText(legendGroup);
}

// check for results and if a legend is enabled in the settings,
// then remove any legend that's already there and render a new legend,
// or remove the legend when there's no results.
function updateLegend(svg, settings) {
	if (
		document.querySelector('.legend-svg') &&
		settings.render.dataExtent[1] !== 0
	) {
		d3.select('.g-legend').remove();
		renderLegend(svg, settings);
	}
	if (
		document.querySelector('.g-legend') &&
		settings.render.dataExtent[1] === 0
	) {
		document.querySelector('.g-legend').remove();
	}
}

export { addLegendSvg, updateLegend };
