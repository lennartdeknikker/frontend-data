function addLegend(settings) {
    document.querySelector(settings.legend.targetDiv).innerHTML = "";
    const svg = d3
        .select(settings.legend.targetDiv)
        .append('svg')
        .attr('width', settings.legend.width)
        .attr('height', settings.legend.height);
    drawLegend(svg, settings);
}

function drawLegend(svg, settings) {
    if (!document.querySelector('.g-legend')) { 
        svg
        .append('g')
        .attr('class', 'g-legend')
        .attr('height', settings.legend.height)
        .attr('width', settings.legend.width);
    }
    console.log(settings.render.dataExtent)
    const legendGroup = d3.select('.g-legend')
        .selectAll('text')
        .data(settings.render.dataExtent)
        .enter()
        .append('g');
    
    legendGroup
        .append('circle')
        .attr('cx', (d,i) => {return 40+100*i})
        .attr('cy', (d,i) => (i == 0) ? 67 : 40)
        .attr('r', (d,i) => (i == 0) ? 3 : 30)
        .attr('fill', '#00827b');

    legendGroup
        .append('text')
        .attr('x', (d,i) => {return 40+100*i})
        .attr('y', 90)
        .attr('class', 'legend_text')
        .attr("text-anchor", "middle")
        .text(d => {return d});
}

export { addLegend, drawLegend };