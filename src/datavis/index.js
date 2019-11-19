import { loadMap } from "./map";
import { loadData } from "./data"
import { addZoomToSvg } from "./zoom"
import { getQueryFor } from './utilities'

function AddDataVisualisation(settings) {
    document.querySelector(settings.init.targetDiv).innerHTML = "";
    const svg = d3
        .select(settings.init.targetDiv)
        .append('svg')
        .attr('width', settings.init.svgSize[0])
        .attr('height', settings.init.svgSize[1])
    
    // map and datapoint projection settings
    const projection = d3
        .geoMercator()
        .center(settings.projection.center)
        .scale(settings.projection.scale)
        .translate(settings.projection.translation);
    
    // add zoom functionality to svg, then load the map, then load the datapoints
    addZoomToSvg(settings, svg)
    .then( g => loadMap(settings.init.mapJson, g, projection)
        .then( loadData(settings.init.endpoint, getQueryFor(settings.init.keyWord), g, projection, settings) ))
}

export { AddDataVisualisation };