import * as d3 from 'd3';
import { loadMap } from './map';
import { addZoomToSvg } from './zoom';
import { addSearch } from './search';
import { addLegend } from './legend';

function AddDataVisualisation(settings) {
	document.querySelector(settings.init.targetDiv).innerHTML = '';
	const svg = d3
		.select(settings.init.targetDiv)
		.append('svg')
		.attr('width', settings.init.svgSize[0])
		.attr('height', settings.init.svgSize[1]);

	// map and datapoint projection settings
	const projection = d3
		.geoMercator()
		.center(settings.projection.center)
		.scale(settings.projection.scale)
		.translate(settings.projection.translation);

	// add zoom functionality to svg, then load the map, then load the datapoints
	addZoomToSvg(settings, svg).then(g =>
		loadMap(settings.init.mapJson, g, projection).then(
			addSearch(g, projection, settings, settings.init.endpoint).then(
				addLegend(settings)
			)
		)
	);
}

export { AddDataVisualisation };
