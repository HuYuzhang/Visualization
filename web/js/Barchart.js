function drawBarChart(data, y_attr, y_axis_name) {
    // console.log(11)
    let div = d3.select('#right_panel')
    let svgWidth = $('#right_panel').width()*0.5
    let svgHeight = $('#right_panel').height()*0.5
    let con_color = {
        "亚洲": '#CC0099',
        "欧洲": '#33FF66',
        "非洲": '#66FFFF',
        "北美洲": '#FF9900',
        "南美洲": '#FFFF33',
        "大洋洲": '#33CCFF',
    }
    let padding = {
        'left': 0.15 * svgWidth,
        'right': 0.1 * svgWidth,
        'top': 0.1 * svgHeight,
        'bottom': 0.1 * svgHeight
    }
    let svg = div.append('svg')
        .attr('id', y_attr)
        .attr('width', svgWidth)
        .attr('height', svgHeight)
        .append('g')

    let x_attr = "continent"
    // let y_attr = "male_life"

    x_array = get_array(data, x_attr)
    build_out = buildData(data, x_attr, x_array, y_attr);
    y_array = build_out[0];
    data2con = build_out[1];
    // console.log(y_array)
    
    let max_height = d3.max(y_array);
    let low_height = d3.min(y_array) - 10;

    let x = d3.scaleBand()
        .domain(x_array)
        .range([padding.left, svgWidth - padding.right]);
    let axis_x = d3.axisBottom()
        .scale(x)
        .ticks(x_array.length)
        .tickFormat(d => d);
    // console.log(padding, svgHeight)
    let y = d3.scaleLinear()
        .domain([low_height-5, d3.max(y_array)])
        .range([svgHeight - padding.bottom, padding.top]);
        // .domain([d3.min(y_array), d3.max(y_array)])
        // .range([svgHeight - padding.bottom, padding.top]);
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
        .text(y_axis_name);


    svg.append('g')
        .selectAll('rect')
        .data(y_array)
        .enter()
        .append('rect')
        .attr('class', function(d, i) {
            return x_array[i] + ' rect ' + 'basepart'
        })
        .classed('active', true)
        .attr('x', function(d, i) {
            return x(x_array[i]) + x.bandwidth() / 4
        })
        .attr('y', function(d, i) {
            return svgHeight - (d-low_height)/(max_height - low_height)*0.8*svgHeight - padding.top;
        })
        .attr('width', x.bandwidth() / 2)
        .attr('height', d => ((d-low_height)/(max_height - low_height)*0.8*svgHeight))
        .attr('fill', (d, i)=>{            
            return con_color[data2con[d]];
        })
        .attr('stroke', 'none')
        .attr('stroke-width', 2)
        .on('mouseover', function(d, i) {
            // d3.select(this)
            //     .attr('stroke', '#ff6a33')
            linkingHover('.point',  '.' + y_attr.split('_')[0], '.' + x_array[i], y_attr)
        })
        .on('mouseout', function(d, i) {
            // d3.select(this)
            //     .attr('stroke', 'none')
            Renew();
        })
        // .on('click', function(d, i) {
        //     if (d3.selectAll('.rect.active')._groups[0].length == 1 && d3.select(this).classed('active')) {
        //         d3.selectAll('.rect.basepart')
        //             .classed('active', true)
        //     } else {
        //         d3.selectAll('.rect.basepart')
        //             .classed('active', false)
        //         d3.select('.rect.' + x_array[i] +'.basepart')
        //             .classed('active', true)
        //     }
        //     linkingSelect('rect')
        // })


    svg.append('rect')
        .attr('class', 'hoverpart')
        .attr('fill', 'transparent')
        .attr('stroke', '#ff6a33')
        .attr('stroke-width', 2)
        .style('opacity', 1)

}



function get_array(data, attr) {
    let ret = {};
    data.forEach(d => {
        let temp = d[attr]
        if (ret[temp])
            ret[temp] += 1
        ret[temp] = 1
    })
    return Object.keys(ret);
}

function buildData(data, x_attr, x_array, y_attr) {
    let ret = [];
    let temp = 0;
    let data2con = {};
    for (let i = 0; i < x_array.length; i++) {
        temp = 0;
        cnt = 0
        data.forEach(d => {
            if (d[x_attr] == x_array[i]) {
                temp += parseFloat(d[y_attr])
                cnt += 1
            }
        })
        data2con[temp / cnt] = x_array[i]
        ret.push(temp / cnt)
    }
    return [ret, data2con];
}

function checkrule() {
    let ret = 1;

    return ret;
}