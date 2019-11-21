async function addZoomToSvg(settings, svg) {

    async function addZoom(settings) {
        const zoom = d3
            .zoom()
            .scaleExtent(settings.render.scaleExtent)
        return zoom;
    }

    function addZoomHandlers(zoom, g, settings) {
        const group = g;
        zoom.on('zoom', zoomHandler);
        
        function zoomHandler() {
            group.attr('transform', d3.event.transform);
            adjustCirclesToZoomLevel(d3.event.transform.k, g, settings);
        }
        
        function clickToZoom(zoomStep) {
            svg
            .transition()
            .duration(500)
            .call(zoom.scaleBy, zoomStep);
        }

        function resetProjection() {
            svg.transition()
            .duration(500)
            .call(zoom.transform, d3.zoomIdentity);
        }
        
        // makes it possible to zoom on click with adjustable steps
        d3.select('#btn-zoom--in').on('click', () => clickToZoom(2));
        d3.select('#btn-zoom--out').on('click', () => clickToZoom(.5));
        d3.select('#search_input').on('click', () => resetProjection());
        return group;
    }

    const g = addZoom(settings).then( zoom => {      
        const g = svg.call(zoom).append('g');
        const group = addZoomHandlers(zoom, g, settings);
        return group;
    })
    
    return g;
}

// adjusts the circles to the zoomlevel
function adjustCirclesToZoomLevel(zoomLevel, g, settings) {
    const minRadius = (zoomLevel/3 < 2) ? 3 - (zoomLevel/3) : 1;
    const maxRadius = (zoomLevel*7 < 37.5) ? 40 - (zoomLevel*7) : 2.5;
    const maxZoomLevel = settings.render.scaleExtent[1];
    const factor = (maxRadius-minRadius) / (settings.render.dataExtent[1]-settings.render.dataExtent[0]);

    g.selectAll('circle')    
    .transition()
    .duration(500)
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

export { addZoomToSvg, adjustCirclesToZoomLevel };