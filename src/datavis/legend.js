function addLegend(settings) {
    if (settings.legend.enabled == true) {
        document.querySelector(settings.legend.targetDiv).innerHTML = "";
        const svg = d3
            .select(settings.legend.targetDiv)
            .append('svg')
            .attr('class', 'legend-svg')
            .attr('width', settings.legend.width)
            .attr('height', settings.legend.height);
    }
}

function drawLegend(svg, settings) {
    if (document.querySelector('.legend-svg')) { 

        d3.select('.g-legend').remove()
        svg
        .append('g')
        .attr('class', 'g-legend')
        .attr('height', settings.legend.height)
        .attr('width', settings.legend.width);

        const legendGroup = d3.select('.g-legend')
            .selectAll('text')
            .data(settings.render.dataExtent)
            .enter()
            .append('g');
        
        legendGroup
            .append('circle')
                .attr('cx', (d,i) => {return 40+100*i})
                .attr('cy', (d,i) => (i == 0) ? 67 : 40)
                .attr('r', (d,i) => (i == 0) ? 6 : 30)
                .attr('fill', '#00827b')
                .attr('stroke', 'white' );

        legendGroup
            .append('text')
                .attr('x', (d,i) => {return 40+100*i})
                .attr('y', 90)
                .attr('class', 'legend_text')
                .attr("text-anchor", "middle")
                .text(d => {return d})
                .attr('fill', 'white');
    }
}

export { addLegend, drawLegend };