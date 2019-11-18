import "babel-polyfill";
import { loadMap } from "./map.js";
import { loadData } from "./data.js"

// endpoint and query definitions
const queryAncestorStatues = `
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
  ?place skos:prefLabel ?placeName .
  VALUES ?type { "Voorouderbeelden" "Voorouderbeeld" "voorouderbeelden" "voorouderbeeld" }
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

// application settings
const settings = {
  init: {
    endpoint: "https://api.data.netwerkdigitaalerfgoed.nl/datasets/ivo/NMVW/services/NMVW-29/sparql",
    query: queryAncestorStatues,
    mapJson: 'https://raw.githubusercontent.com/rifani/geojson-political-indonesia/master/IDN_adm_1_province.json'
  },
  render: {
    scaleExtent: [.5, 20],
    minValueInData: 3,
    maxValueInData: 200
  }
}

// adds zoom functionality to map
const zoom = d3
  .zoom()
  .scaleExtent(settings.render.scaleExtent)
  .on('zoom', zoomHandler);

function zoomHandler() {
  g.attr('transform', d3.event.transform);
  adjustCirclesToZoomLevel(d3.event.transform.k);
}

// makes it possible to zoom on click with adjustable steps
d3.select('#btn-zoom--in').on('click', () => clickToZoom(2));
d3.select('#btn-zoom--out').on('click', () => clickToZoom(.5));

function clickToZoom(zoomStep) {
  svg
    .transition()
    .duration(500)
    .call(zoom.scaleBy, zoomStep);
}

// loads the svg in the map container
const svg = d3
  .select('#map_container')
  .append('svg')
  .attr('width', '100%')
  .attr('height', '100%')

// adds the zoom functionality to the svg
const g = svg.call(zoom).append('g');

// map projection settings
const projection = d3
  .geoMercator()
  .center([120, -5])
  .scale(1600)
  .translate([window.innerWidth / 1.8, window.innerHeight/2.3]);

// this code loads the map, then loads the data
loadMap(settings.init.mapJson, g, projection)
.then(loadData(settings.init.endpoint, settings.init.query, g, projection, settings));