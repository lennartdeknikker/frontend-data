async function loadMap(geoJson, g, projection) {
    d3.json(geoJson)
    .then(mapData => renderMap(mapData, g, projection))
}

// renders the map from a given geoJson
function renderMap(geoJson, g, projection) {
    const path = d3.geoPath().projection(projection);
    g
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
        .on('mouseout', mouseOutHandler)
        .on('click', areaClickHandler);
}

// changes fill color of areas on mouse over and mouse out
function mouseOverHandler(d, i) {
    let element = d3.select(this);
    if (element.attr('fill') !== '#00aaa0') {
        element.attr('fill', '#9aeae6')
    }
}

function mouseOutHandler(d, i) {
    let element = d3.select(this);
    if (element.attr('fill') !== '#00aaa0') {
        element.attr('fill', 'white')
    }
}

// updates the selected area on click an changes it's fill color
function areaClickHandler(d) {
    d3.select('#map_text').text(`You've selected ${d.properties.NAME_1}`)
    d3.selectAll('.area').attr('fill', 'white');
    d3.select(this).attr('fill', '#00aaa0')
}

export {loadMap};