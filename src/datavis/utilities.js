import * as d3 from 'd3';
import { updateLegend } from './legend';

function getQueryFor(searchWord) {
	return `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX dc: <http://purl.org/dc/elements/1.1/>
    PREFIX dct: <http://purl.org/dc/terms/>
    PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
    PREFIX edm: <http://www.europeana.eu/schemas/edm/>
    PREFIX foaf: <http://xmlns.com/foaf/0.1/>
    PREFIX hdlh: <https://hdl.handle.net/20.500.11840/termmaster>
    PREFIX wgs84: <http://www.w3.org/2003/01/geo/wgs84_pos#>
    PREFIX geo: <http://www.opengis.net/ont/geosparql#>
    PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
    PREFIX gn: <http://www.geonames.org/ontology#>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    SELECT (SAMPLE(?identifier) AS ?identifierSample) ?title ?placeName ?imageLink ?extent ?lat ?long WHERE {
    <https://hdl.handle.net/20.500.11840/termmaster7745> skos:narrower* ?place .
    ?place 	skos:prefLabel ?placeName .
    VALUES 	?type {"${searchWord.toLowerCase()}"}
    ?cho    dct:spatial   ?place ;
            dc:title      ?title ;
            dc:type       ?type ;
            dc:identifier ?identifier ;
            dct:extent    ?extent ;
            edm:isShownBy ?imageLink .
    ?place  skos:exactMatch/wgs84:lat   ?lat .
    ?place  skos:exactMatch/wgs84:long  ?long .
    }
    GROUP BY ?identifier ?title ?place ?placeName ?type ?imageLink ?lat ?long ?extent
    `;
}

function generateButtonIn(target, id, text) {
	return target
		.append('button')
		.attr('id', id)
		.text(text);
}

function generateDivIn(target, className) {
	return target.append('div').attr('class', className);
}

function getExtentFrom(data) {
	let currentHighest = 0;
	data.forEach(d => {
		currentHighest = d3.max([d.amount, currentHighest]);
	});
	return [1, currentHighest];
}

// This nests given data on location and adds an 'amount' property per location.
function transformData(source, settings) {
	const transformed = d3
		.nest()
		.key(d => d.placeName.value)
		.entries(source);
	transformed.forEach(element => {
		element.amount = element.values.length;
		element.placeName = element.values[0].placeName.value;
		element.long = element.values[0].long.value;
		element.lat = element.values[0].lat.value;
	});

	// side effect to obtain data-extent and update settings accordingly
	settings.render.dataExtent = getExtentFrom(transformed);
	updateLegend(d3.select('.legend-svg'), settings);
	return transformed;
}

export {
	getQueryFor,
	getExtentFrom,
	transformData,
	generateDivIn,
	generateButtonIn,
};
