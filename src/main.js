// imports
import "babel-polyfill";
import { AddDataVisualisation } from './datavis/index.js'

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
    targetDiv: '#map_container',
    endpoint: "https://api.data.netwerkdigitaalerfgoed.nl/datasets/ivo/NMVW/services/NMVW-29/sparql",
    query: queryAncestorStatues,
    mapJson: 'https://raw.githubusercontent.com/rifani/geojson-political-indonesia/master/IDN_adm_1_province.json',
    svgSize: ['100%', '100%']
  },
  render: {
    scaleExtent: [.5, 20],
    minValueInData: 3,
    maxValueInData: 200
  },
  projection: {
    center: [120,-5],
    scale: 1600,
    translation: [window.innerWidth / 1.8, window.innerHeight/2.3]
  }
}

AddDataVisualisation(settings);
