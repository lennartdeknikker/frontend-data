function loadData(endpoint, query, g, projection, settings) {
    d3.json(endpoint + "?query=" + encodeURIComponent(query) + "&format=json")
    .then(objects => { renderObjects(transformData(objects.results.bindings), g, projection, settings) })
    }

// renders the datapoints
function renderObjects(objects, g, projection, settings) {
    g
    .append('g')
    .attr('class', 'g-datapoints')
    .selectAll('.datapoint')
    .data(objects)
    .enter()
    .append('circle')
    .attr('class', 'datapoint')
    .attr('data-place', d => d.placeName)
    .attr('data-long', d => d.long)
    .attr('data-lat', d => d.lat)
    .attr('cx', d => projection([d.long, d.lat])[0])
    .attr('cy', d => projection([d.long, d.lat])[1])
    .attr('fill', '#00827b')
    .attr('fill-opacity', .5)
    .on('click', objectClickHandler);
    adjustCirclesToZoomLevel(1, g, settings);
}

// loads a list of selected objects
function objectClickHandler(d) {
    console.log(d);
    let newHtml =`
    <h3>List of statues found at ${d.placeName}</h3>
    <ol class="item-list">
    `;

    d.values.forEach( value => {
        newHtml += `
            <li>${value.title.value}
            <ul class="sub-item-list">
                <li>Identifier: ${value.identifierSample.value}</li>
                <li>Extent: ${value.extent.value}</li>
                <li>Image Link: <a href="${value.imageLink.value}">${value.imageLink.value}</a></li>
                <li>Origin location: ${value.placeName.value} (${value.lat.value}, ${value.long.value})</li>
            </ul>
            <img src="${value.imageLink.value}" class="object-image" /> 
            </li>
        `;
    });
    newHtml += "</ol>";
    document.querySelector('.info').innerHTML = newHtml;
}

// adjusts the circles to the zoomlevel
function adjustCirclesToZoomLevel(zoomLevel, g, settings) {
    const minRadius = (zoomLevel/3 < 2) ? 3 - (zoomLevel/3) : 1;
    const maxRadius = (zoomLevel*7 < 37.5) ? 40 - (zoomLevel*7) : 2.5;
    const maxZoomLevel = settings.render.scaleExtent[1];
    const factor = (maxRadius-minRadius) / (settings.render.maxValueInData-settings.render.minValueInData);

    g.selectAll('circle')
    .attr('r', d => {
        if (d.amount*factor < minRadius) {
            return minRadius;
        }
        else if (d.amount*factor > maxRadius) {
            return maxRadius;
        }
        else {
            return d.amount*factor;
        }
    })
    if (zoomLevel < maxZoomLevel/2) {
        g.selectAll('.datapoint')
        .attr('fill-opacity', (.3 + .7/zoomLevel))
    } else {
        g.selectAll('.datapoint')
        .attr('fill-opacity', 1)
    }
}

function transformData(source) {
    let transformed = d3.nest()
    .key(function(d) { return d.placeName.value})
    .entries(source);
    transformed.forEach(element => {
        element.amount = element.values.length;
        element.placeName = element.values[0].placeName.value;
        element.long = element.values[0].long.value;
        element.lat = element.values[0].lat.value;
    });
    return transformed;
}

export { loadData, adjustCirclesToZoomLevel };