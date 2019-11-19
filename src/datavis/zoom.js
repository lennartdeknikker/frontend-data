import { adjustCirclesToZoomLevel } from "./data"

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
        
        // makes it possible to zoom on click with adjustable steps
        d3.select('#btn-zoom--in').on('click', () => clickToZoom(2));
        d3.select('#btn-zoom--out').on('click', () => clickToZoom(.5));
        return group;
    }

const g = addZoom(settings).then( zoom => {      
        const g = svg.call(zoom).append('g');
        const group = addZoomHandlers(zoom, g, settings);
        return group;
    })
    
return g;
}

export { addZoomToSvg };