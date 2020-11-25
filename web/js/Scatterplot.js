function drawScatterplot(data, x_attr, y_attr) {
    let div = d3.select('#left_panel')
    let svgWidth = $('#left_panel').width() * 0.8
    let svgHeight = $('#left_panel').height() * 0.5
    let padding = {
        'left': 0.15 * svgWidth,
        'right': 0.1 * svgWidth,
        'top': 0.1 * svgHeight,
        'bottom': 0.1 * svgHeight
    }
    let svg = div.append('svg')
        .attr('width', svgWidth)
        .attr('height', svgHeight)

    // let x_attr = "male_life"
    // let y_attr = "male_height"
    let x = d3.scaleLinear()
        .domain(get_min_max(data, x_attr))
        .range([padding.left, svgWidth - padding.right]);


    let con_color = {
        "亚洲": '#CC0099',
        "欧洲": '#33FF66',
        "非洲": '#66FFFF',
        "北美洲": '#FF9900',
        "南美洲": '#FFFF33',
        "大洋洲": '#33CCFF',
    }

    let axis_x = d3.axisBottom()
        .scale(x)
        .ticks(10)
        .tickFormat(d => d);

    let y = d3.scaleLinear()
        .domain(get_min_max(data, y_attr))
        .range([svgHeight - padding.bottom, padding.top]);
    let axis_y = d3.axisLeft()
        .scale(y)
        .ticks(10)
        .tickFormat(d => d);

    svg.append('g')
        .attr('transform', `translate(${0}, ${svgHeight-padding.bottom})`)
        .call(axis_x)
        .attr('font-size', '0.5rem')

    svg.append('g')
        .attr('transform', `translate(${padding.left+(svgWidth-padding.left-padding.right)/2}, ${svgHeight-padding.bottom})`)
        .append('text')
        .attr('class', 'axis_label')
        .attr('dx', '-0.4rem')
        .attr('dy', 0.08 * svgHeight)
        .text(x_attr);

    svg.append('g')
        .attr('transform', `translate(${padding.left}, ${0})`)
        .call(axis_y)
        .attr('font-size', '0.5rem')
    svg.append('g')
        .attr('transform', `
            translate(${padding.left}, ${svgHeight/2})
            rotate(-90)    
        `)
        .append('text')
        .attr('class', 'axis_label')
        .attr('dy', -svgHeight * 0.07)
        .text(y_attr);

    let box = svg.append('rect')
        .attr('id', 'box')
        .attr('width', 0)
        .attr('opacity', 0)

    svg.append('g')
        .selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('class', function(d) {
            return 'point ' + x_attr.split('_')[0] + " " + d['continent'] + " " + d['country'] 
        })
        .attr('fill', (d, i) =>{
            return con_color[d['continent']];
        })
        .attr('cx', (d, i) => {
            // console.log(x(parseFloat(d[x_attr])));
            return x(parseFloat(d[x_attr]));
        })
        .attr('cy', (d, i) => {
            return y(parseFloat(d[y_attr]));
        })
        .attr('r', 5)
        .attr('stroke', 'none')
        .attr('stroke-width', 1.5)
        .attr('opacity', 1)
        .on('mouseover', function(d) {
            d3.select(this)
                .attr('stroke', '#ff6a33')
            // d3.select('#' + x_attr)
            //     .attr('fill', '#000000')
            // console.log(d['continent'])
            linkingHover('.rect',  '.' + x_attr.split('_')[0], '.' + d['continent'], x_attr)
            linkingHover('.rect',  '.' + y_attr.split('_')[0], '.' + d['continent'], y_attr)
        })
        .on('mouseout', function(d) {
            d3.select(this)
                .attr('stroke', 'none')
            Renew();
            // d3.select
            linkingHover('.renew',  '.' + x_attr.split('_')[0], '.' + d['continent'], x_attr)
            linkingHover('.renew',  '.' + y_attr.split('_')[0], '.' + d['continent'], y_attr)
        })

    let start = { x: 0, y: 0 }

    let drag = d3.drag()
        .on('start', function() {
            start.x = d3.event.x
            start.y = d3.event.y
            box.attr('x', 0)
                .attr('y', 0)
                .attr('width', 0)
                .attr('height', 0)
                .attr('opacity', 0)
        })
        .on('drag', function() {
            box.attr('x', d3.min([d3.event.x, start.x]))
                .attr('y', d3.min([d3.event.y, start.y]))
                .attr('width', Math.abs(d3.event.x - start.x))
                .attr('height', Math.abs(d3.event.y - start.y))
                .attr('opacity', 0.3)
                .attr('fill', '#a4b1bb')
                .style('visibility', 'visible')
        })
        .on('end', function() {
            if (Math.abs(d3.event.x - start.x) < 3 && Math.abs(d3.event.y - start.y) <3) {
                box.attr('x', 0)
                    .attr('y', 0)
                    .attr('width', 0)
                    .attr('height', 0)
                    .attr('opacity', 0)
            }
            linkingSelect("")
        })
    svg.call(drag)
}



function get_min_max(data, attr) {
    let min = 1e9;
    let max = 0;
    data.forEach(d => {
        let v = parseFloat(d[attr]);
        if (v > max)
            max = v;
        if (v < min)
            min = v;
    });
    return [min, max];
}