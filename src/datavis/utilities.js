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
      ?place skos:prefLabel ?placeName .
      VALUES ?type {"${searchWord}"}
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

function generateHtmlListFor(objects, view) {
	let newHtml = '';
	if (view == 'list') {
		newHtml = `
		<h3>List of ${objects.amount} objects found at ${objects.placeName}</h3>
		<button id="image-button">images</button><button id="list-button" class="selected">details</button>
    <ol class="item-list list-view">
    `;

		objects.values.forEach(value => {
			newHtml += `
						<li class="list-item">${value.title.value}
							<ul class="sub-item-list">
									<li>Identifier: ${value.identifierSample.value}</li>
									<li>Extent: ${value.extent.value}</li>
									<li>Origin location: ${value.placeName.value} (${value.lat.value}, ${value.long.value})</li>
							</ul>
							<a href="${value.imageLink.value}"><img src="${value.imageLink.value}" class="object-image-list" /></a>
            </li>
        `;
		});
		newHtml += '</ol>';
	} else {
		newHtml = `
				<h3>List of ${objects.amount} objects found at ${objects.placeName}</h3>
				<button id="image-button" class="selected">images</button><button id="list-button">details</button>
				<div class="object-list image-view">
			`;
		objects.values.forEach(object => {
			newHtml += `
				<div class="object" data-object="${object.title.value}">
				<img class="object-image" src="${object.imageLink.value}" />
				</div>
			`;
		});
		newHtml += `</div>`;
	}
	return newHtml;
}

export { getQueryFor, generateHtmlListFor };
