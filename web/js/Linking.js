function linkingSelect(clicktarget) {
    let list = []
    // let x1 = parseFloat(d3.select('#box')
    //     .attr('x'))
    // let x2 = x1 + parseFloat(d3.select('#box')
    //     .attr('width'))
    // let y1 = parseFloat(d3.select('#box')
    //     .attr('y'))
    // let y2 = y1 + parseFloat(d3.select('#box')
    //     .attr('height'))
    // if (d3.select('#box').attr('width') == 0) {
    //     x1 = 0
    //     x2 = 1e9
    //     y1 = 0
    //     y2 = 1e9
    //     if (clicktarget != 'rect') {
    //     	d3.selectAll('.basepart')
    //     		.classed('active', true)
    //     		.attr('opacity', 1)
    //     }
    // }

    d3.selectAll('.basepart')
        ._groups[0]
        .forEach(d => {
            if (d3.select(d).classed('active'))
                list.push(d3.select(d).attr('class').split(' ')[0])
        })

    // let constrain = ""
    // if (list.length == 2){
    // 	constrain = list[0];
    // }
    console.log(list)
    d3.selectAll('.point')
        .attr('fill-opacity', 0.3)
    for (let i = 0; i < list.length; i++) {
        d3.selectAll('.point.'  + list[i])
            .attr('fill-opacity', function(d) {
                let x = d3.select(this)
                    .attr('cx')
                let y = d3.select(this)
                    .attr('cy')
                if (checkin(x, x1, x2) && checkin(y, y1, y2)) {
                    return 1
                }
                return 0.3
            })
    }

    // let classArr = []
    // let dict = {}
    // var key
    // d3.selectAll('.rect')
    //     ._groups[0]
    //     .forEach(d => {
    //         classArr.push(d3.select(d).attr('class').slice(0, 2))
    //     })
    // for (let i =0;i<classArr.length;i++){
    // 	dict[classArr[i]] = 0
    // }
    // d3.selectAll('.point')
    //     ._groups[0]
    //     .forEach(d => {
    //         if (d3.select(d).attr('fill-opacity') == 1) {
    //             let value = parseFloat(d3.select(d)._groups[0][0].__data__.popularity)
    //             key = d3.select(d).attr('class').slice(0, 2)
    //             if (key in dict) {
    //                 dict[key] += value
    //             } else {
    //                 dict[key] = value
    //             }
    //         }
    //     })

    // var height
    // var y
    // for (key in dict) {
    //     height = parseFloat(d3.select('.rect.'+ key + '.basepart')
    //         .attr('height'))
    //     y = parseFloat(d3.select('.rect.'+ key + '.basepart')
    //         .attr('y'))
    //     d3.select('.rect.'+ key + '.basepart')
    //     	.attr('fill-opacity', 0.3)
    //     d3.select('.rect.'+key+'.highpart')
    //         .attr('height', function(d) {
    //             return height * dict[key] / d
    //         })
    //         .attr('y', function(d) {
    //             return y + (height - height * dict[key] / d)
    //         })
    //         .attr('opacity', function(d) {
    //         	if (constrain != "" && key != constrain)
    //         		return 0.3;
    //         	return 1
    //         })
    // }
}

function linkingHover(target, sex, constrain, self_name) {
    // console.log()
    if (target == '.renew')
    {
        d3.select('#' + self_name).Renew();
        return;
    }
    // console.log(rec_name)
    // console.log(d3.select(rec_name).attr('height'))
    if (target == '.point') {
        d3.selectAll(target + sex + constrain)
            .attr('stroke', '#000000')}
    let height = parseFloat(d3.select('.rect' + constrain+'.basepart')
        .attr('height'))
    let y = parseFloat(d3.select('rect' + constrain+'.basepart')
        .attr('y'))
    let width = parseFloat(d3.select('rect' + constrain+'.basepart')
        .attr('width'))
    let x = parseFloat(d3.select('rect' + constrain+'.basepart')
            .attr('x'))
    d3.select('#' + self_name)
        .append('path')
        .attr('stroke', '#000000')
        .attr('stroke-width', 2)
        .attr('fill', 'none')
        .attr('class', 'hoverline')
        .attr('d', function(){
            return "M"+x+","+y+
            "L"+(x+width)+","+y+
            "L"+(x+width)+","+(y+height)+
            "L"+(x)+","+(y+height)+
            "L"+x+","+y
        })
    
    // if (target == '.rect') {

    	
            
    // }
}

function Renew() {
    d3.selectAll('.point')
        .attr('stroke', 'none')
    d3.select('.hoverline')
    	.remove()
    d3.selectAll('.hoverpart')
    	.attr('height', 0)
    	.transition()
    	.duration(500)
}

function checkin(x, a, b) {
    return ((x - a) * (x - b) <= 0)
}