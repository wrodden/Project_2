let emp_data = [];


var width = 520,
    height = 340;
function drawFirstMap(type) {
    $("#map-target").empty();

    var projection = d3.geoAlbers()
        .scale(500)
        .translate([width / 2, height / 2]);

    var path = d3.geoPath()
        .projection(projection);

    var svg = d3.select("#map-target")
        .attr("width", width)
        .attr("height", height);

    var path = d3.geoPath();
    var toolTip = d3.select("body")
        .append("div")
        .attr("class", "tooltip-donut")
        .style("opacity", 0);
    var clickId = '99';
    d3.json("https://d3js.org/us-10m.v1.json", function (error, us) {
        if (error) throw error;

        var featureCollection = topojson.feature(us, us.objects.states);

        var projection = d3.geoIdentity()
            .fitExtent([[1, 1], [580 - 60, 400 - 60]], featureCollection)

        var path = d3.geoPath().projection(projection)

        svg.append("g")
            .attr("class", "states")
            .selectAll("path")
            .data(topojson.feature(us, us.objects.states).features)
            .enter().append("path")
            .attr("d", path)
            .style("fill", "#de0404")
            .style("opacity", function (d) {
                for (var i in emp_data) {
                    if (type == 'costIndex' && parseInt(emp_data[i].id) == parseInt(d.id)) {
                        return parseFloat(emp_data[i].costIndexPercentile);
                    }
                    else if (type == 'totalJobCount' && parseInt(emp_data[i].id) == parseInt(d.id)) {
                        return parseFloat(emp_data[i].totalJobCountPercentile);
                    }
                    else if (type == 'uePercSept2020Percentile' && parseInt(emp_data[i].id) == parseInt(d.id)) {
                        return parseFloat(emp_data[i].uePercSept2020Percentile);
                    }
                    else if (type == 'laborForceSept2020Percentile' && parseInt(emp_data[i].id) == parseInt(d.id)) {
                        return parseFloat(emp_data[i].laborForceSept2020Percentile);
                    }
                    else if (type == 'topEmployerJobs' && parseInt(emp_data[i].id) == parseInt(d.id)) {
                        return parseFloat(emp_data[i].topEmployerJobsPercentile);
                    }
                }
            }).on('mouseover', function (d, i) {

                var currentState = this;
                d3.select(this).style('fill', 'orange');
                d3.select(this).style('opacity', 1);
                let value = ""
                for (var i in emp_data) {
                    


                    if (type == 'costIndex' && parseInt(emp_data[i].id) == parseInt(d.id)) {
                        value = parseFloat(emp_data[i].costIndexPercentile);
                        toolTip.html(emp_data[i].state + '<br> Cost Rank: ' + emp_data[i].costRank +
                            '</br>Cost Index percentile: ' + parseFloat(emp_data[i].costIndexPercentile * 100).toFixed(2))
                            .style("left", (d3.event.pageX + 20) + "px")
                            .style("top", (d3.event.pageY - 30) + "px");
                    }

                    else if (type == 'totalJobCount' && parseInt(emp_data[i].id) == parseInt(d.id)) {
                        value = parseFloat(emp_data[i].totalJobCountPercentile);
                        toolTip.html(emp_data[i].state + '<br> Total job count: ' + emp_data[i].totalJobCount +
                            '</br>Total Job Count Percentile:' + parseFloat(emp_data[i].totalJobCountPercentile * 100).toFixed(2))
                            .style("left", (d3.event.pageX + 20) + "px")
                            .style("top", (d3.event.pageY - 30) + "px");
                    }

                    else if (type == 'uePercSept2020Percentile' && parseInt(emp_data[i].id) == parseInt(d.id)) {
                        value = parseFloat(emp_data[i].uePercSept2020Percentile);
                        toolTip.html(emp_data[i].state + '<br> Unemployment Rate: ' + emp_data[i].uePercSept2020 + "%"+
                            '</br> Unemployment Rate Percentile: ' + parseFloat(emp_data[i].uePercSept2020Percentile * 100).toFixed(2))
                            .style("left", (d3.event.pageX + 20) + "px")
                            .style("top", (d3.event.pageY - 30) + "px");
                    }
					

                    // else if (type == 'laborForceSept2020Percentile' && parseInt(emp_data[i].id) == parseInt(d.id)) {
                    //     value = parseFloat(emp_data[i].laborForceSept2020Percentile);
                    //     toolTip.html(emp_data[i].state + '<br> Labor Force: ' + emp_data[i].laborForceSept2020 +
                    //         '</br>Labor force percentile: ' + parseFloat(emp_data[i].laborForceSept2020Percentile * 100).toFixed(2))
                    //         .style("left", (d3.event.pageX + 20) + "px")
                    //         .style("top", (d3.event.pageY - 30) + "px");
                    // }
                    // else if (type == 'topEmployerJobs' && parseInt(emp_data[i].id) == parseInt(d.id)) {
                    //     value = parseFloat(emp_data[i].topEmployerJobsPercentile);
                    //     toolTip.html(emp_data[i].state + '<br> Top Employer job count: ' + emp_data[i].topEmployerJobs +
                    //         '</br>Top Employer: ' + emp_data[i].topEmployer +
                    //         '</br>Top Employer percentile: ' + parseFloat(emp_data[i].topEmployerJobsPercentile * 100).toFixed(2))
                    //         .style("left", (d3.event.pageX + 20) + "px")
                    //         .style("top", (d3.event.pageY - 30) + "px");
                    // }
                
                }
                toolTip.transition()
                    .duration(50)
                    .style("opacity", 1);
            })
            .on('mouseout', function (d, i) {

                d3.select(this).style("opacity", function (d) {
                    if (d.id == clickId) {
                        return 1;
                    }
                    for (var i in emp_data) {
                        if (type == 'costIndex' && parseInt(emp_data[i].id) == parseInt(d.id)) {
                            return parseFloat(emp_data[i].costIndexPercentile);
                        }
                        else if (type == 'totalJobCount' && parseInt(emp_data[i].id) == parseInt(d.id)) {
                            return parseFloat(emp_data[i].totalJobCountPercentile);
                        }
                        else if (type == 'uePercSept2020Percentile' && parseInt(emp_data[i].id) == parseInt(d.id)) {
                            return parseFloat(emp_data[i].uePercSept2020Percentile);
                        }
                        else if (type == 'laborForceSept2020Percentile' && parseInt(emp_data[i].id) == parseInt(d.id)) {
                            return parseFloat(emp_data[i].laborForceSept2020Percentile);
                        }
                        else if (type == 'topEmployerJobs' && parseInt(emp_data[i].id) == parseInt(d.id)) {
                            return parseFloat(emp_data[i].topEmployerJobsPercentile);
                        }
                    }
                })

                if (d.id == clickId) {

                    d3.select(this).style('fill', 'orange');
                }
                else {
                    d3.select(this).style('fill', '#de0404');

                }
                toolTip.transition()
                    .duration('50')
                    .style("opacity", 0);
            })
            .on('click', function (d, i) {
                clickId = d.id;
                var self = this;
                d3.selectAll('path').style('fill', function (x) {
                    if (!x) {
                        return;
                    }
                    return '#de0404'
                }).style("opacity", function (x) {
                    if (!x || x.id == clickId) {
                        return 1;
                    }
                    for (var i in emp_data) {
                        if (type == 'costIndex' && parseInt(emp_data[i].id) == parseInt(x.id)) {
                            return parseFloat(emp_data[i].costIndexPercentile);
                        }
                        else if (type == 'totalJobCount' && parseInt(emp_data[i].id) == parseInt(x.id)) {
                            return parseFloat(emp_data[i].totalJobCountPercentile);
                        }
                        else if (type == 'uePercSept2020Percentile' && parseInt(emp_data[i].id) == parseInt(x.id)) {
                            return parseFloat(emp_data[i].uePercSept2020Percentile);
                        }
                        else if (type == 'laborForceSept2020Percentile' && parseInt(emp_data[i].id) == parseInt(x.id)) {
                            return parseFloat(emp_data[i].laborForceSept2020Percentile);
                        }
                        else if (type == 'topEmployerJobs' && parseInt(emp_data[i].id) == parseInt(x.id)) {
                            return parseFloat(emp_data[i].topEmployerJobsPercentile);
                        }
                    }
                    d3.select(self).style('fill', 'orange');
                });
                for (var i in emp_data) {



                    if (parseInt(emp_data[i].id) == parseInt(d.id)) {
                        $('#top-emp').html(emp_data[i].topEmployer+"<br>Salary Range: <br>" + emp_data[i].TEMinSalary + " - " + emp_data[i].TEMaxSalary + "<br>Job Count: " + parseInt(emp_data[i].topEmployerJobs) + "<br>Rating: " + emp_data[i].TERating);
                        $('#median-sal').html("Salary Range: <br>" + emp_data[i].MedianMinSalary + " - " + emp_data[i].MedianMaxSalary + "<br>Job Count: " + parseInt(emp_data[i].totalJobCount) + "<br>Unemployment: " + emp_data[i].uePercSept2020 + "%" + "<br>Cost Index: " + emp_data[i].costIndex);
                        $('#sim-state1').html(emp_data[i].Top1);
                        $('#sim-state2').html(emp_data[i].Top2);
                        $('#sim-state3').html(emp_data[i].Top3);
                    }



                    if (type == 'costIndex' && parseInt(emp_data[i].id) == parseInt(d.id)) {
                        value = parseFloat(emp_data[i].costIndexPercentile);
                        toolTip.html(emp_data[i].state + '<br> Cost Rank: ' + emp_data[i].costRank +
                            '</br>Cost Index percentile: ' + parseFloat(emp_data[i].costIndexPercentile * 100).toFixed(2))
                            .style("left", (d3.event.pageX + 20) + "px")
                            .style("top", (d3.event.pageY - 30) + "px");
                    }

                    else if (type == 'totalJobCount' && parseInt(emp_data[i].id) == parseInt(d.id)) {
                        value = parseFloat(emp_data[i].totalJobCountPercentile);
                        toolTip.html(emp_data[i].state + '<br> Total job count: ' + emp_data[i].totalJobCount +
                            '</br>Total Job Count Percentile:' + parseFloat(emp_data[i].totalJobCountPercentile * 100).toFixed(2))
                            .style("left", (d3.event.pageX + 20) + "px")
                            .style("top", (d3.event.pageY - 30) + "px");
                    }

                    else if (type == 'uePercSept2020Percentile' && parseInt(emp_data[i].id) == parseInt(d.id)) {
                        value = parseFloat(emp_data[i].uePercSept2020Percentile);
                        toolTip.html(emp_data[i].state + '<br> Unemployment Rate: ' + emp_data[i].uePercSept2020 + "%"+
                            '</br> Unemployment Rate Percentile: ' + parseFloat(emp_data[i].uePercSept2020Percentile * 100).toFixed(2))
                            .style("left", (d3.event.pageX + 20) + "px")
                            .style("top", (d3.event.pageY - 30) + "px");
                    }

                }
                fillCompareChart(d.id)
                drawBarChart(d.id);
                drawDual(d.id)
                for (var i in emp_data) {
                    if (parseInt(emp_data[i].id) == parseInt(d.id)) {
                        $('#bar-heading').html('Cost of Living Indices <br>' + emp_data[i].state);
                        $('#dual-heading').html('Unemployment Trends (Sept 2019 to Sept 2020) <br> ' + emp_data[i].state);
                    }
                }                
            })
    });
};

function fillCompareChart(stateId) {
    $("#CompareChart").empty();
    let svg = d3.select("#CompareChart");

    let xScale = d3.scaleBand().range([0, 100]).padding(.5);
    let yScale = d3.scaleLinear().range([300, 0]);

    xScale.domain(['Cost Index', 'Total Job Count', 'Unemployment', 'Labor Force', 'Top Employee Jobs']);
    yScale.domain([0, 100]);
    let g = svg.append("g")
        .attr("transform", "translate(" + 100 + "," + 100 + ")");

    g.append("g")
        .attr("transform", "translate(0," + 300 + ")")
        .call(d3.axisBottom(xScale));

    let data = []
    for (var i in emp_data) {
        if (parseInt(emp_data[i].id) == parseInt(stateId)) {
            data.push({ text: 'Cost Index', value: parseFloat(emp_data[i].costIndexPercentile) * 100, column: 1 });
            data.push({ text: 'Total Job Count', value: parseFloat(emp_data[i].totalJobCountPercentile) * 100, column: 2 });
            data.push({ text: 'Unemployment', value: parseFloat(emp_data[i].uePercSept2020Percentile) * 100, column: 3 });
            data.push({ text: 'Labor Force', value: parseFloat(emp_data[i].laborForceSept2020Percentile) * 100, column: 4 });
            data.push({ text: 'Top Employee Jobs', value: parseFloat(emp_data[i].topEmployerJobsPercentile) * 100, column: 5 });
        }
    }

    g.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function (d) { return xScale(d.text); })
        .attr("y", function (d) { return yScale(d.value); })
        .attr("width", xScale.bandwidth())
        .attr("height", function (d) { return 300 - yScale(d.value); });

    g.selectAll("text")
        .attr("y", 0)
        .attr("x", 9)
        .attr("dy", ".3em")
        .attr("transform", "rotate(90)")
        .style("text-anchor", "start");

    g.append("g")
        .append("text")
        .attr("y", 0)
        .attr("dy", "0.75em")
        .attr("text-anchor", "end")
        .text(" percentile ")
        .attr("transform", "rotate(-90)");
    g.append("g")
        .call(d3.axisLeft(yScale).tickFormat(function (d) {
            return d + "%";
        }).ticks(10));
}

function fillLegend() {
    var key = d3.select("#legend1")
        .append("svg")
        .attr("width", width)
        .attr("height", 50);
    var legend = key.append("defs")
        .append("svg:linearGradient")
        .attr("id", "gradient")
        .attr("x1", "0%")
        .attr("y1", "100%")
        .attr("x2", "100%")
        .attr("y2", "100%")
    legend.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "#de0404")
        .attr("stop-opacity", 0);

    legend.append("stop")
        .attr("offset", "10%")
        .attr("stop-color", "#de0404")
        .attr("stop-opacity", .10);

    legend.append("stop")
        .attr("offset", "20%")
        .attr("stop-color", "#de0404")
        .attr("stop-opacity", .2);

    legend.append("stop")
        .attr("offset", "40%")
        .attr("stop-color", "#de0404")
        .attr("stop-opacity", .3);
    legend.append("stop")
        .attr("offset", "50%")
        .attr("stop-color", "#de0404")
        .attr("stop-opacity", .4);
    legend.append("stop")
        .attr("offset", "60%")
        .attr("stop-color", "#de0404")
        .attr("stop-opacity", .5);
    legend.append("stop")
        .attr("offset", "70%")
        .attr("stop-color", "#de0404")
        .attr("stop-opacity", .6);
    legend.append("stop")
        .attr("offset", "80%")
        .attr("stop-color", "#de0404")
        .attr("stop-opacity", .7);
    legend.append("stop")
        .attr("offset", "90%")
        .attr("stop-color", "#de0404")
        .attr("stop-opacity", .8);
    legend.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "#de0404")
        .attr("stop-opacity", .9);
    key.append("rect")
        .attr("width", 300)
        .attr("height", 50 - 30)
        .style("fill", "url(#gradient)")
        .attr("transform", "translate(110,10)");

    var y = d3.scaleLinear()
        .range([300, 0])
        .domain([100, 1]);

    var yAxis = d3.axisBottom()
        .scale(y)
        .ticks(5);

    key.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(110,30)")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("axis title");
}

function drawDual(_id){
    // set the dimensions and margins of the graph
var margin = {top: 30, right: 40, bottom: 30, left: 80},
width = 460 - margin.left - margin.right,
height = 257 - margin.top - margin.bottom;

// parse the date / time
var parseTime = d3.timeParse("%d-%b-%y");

// set the ranges
var xBar = d3.scaleBand().range([0, width]).paddingInner(0.5).paddingOuter(0.25);
var xLine = d3.scalePoint().range([0, width]).padding(0.5);
var yBar = d3.scaleLinear().range([height, 0]);
var yLine = d3.scaleLinear().range([height, 0]);

// define the 1st line
var valueline = d3.line()
.x(function(d) { return xLine(d.year); })
.y(function(d) { return yLine(d.line1); });

// // define the 2nd line
// var valueline2 = d3.line()
// .x(function(d) { return xLine(d.year); })
// .y(function(d) { return yLine(d.line2); });

// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
$("#dual").empty();
var svg = d3.select("#dual").append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

// Get the data
// format the data

data = []
_id = parseInt(_id, 10)
for (let index = 0; index < emp_data.length; index++) {
    if(emp_data[index].id == _id){
        data.push({
            "year": "Sept 2019",
            "bar": parseInt(emp_data[index].uePercSept2019),
            "line1": parseFloat(emp_data[index].uePercSept2019)
        })
        data.push({
            "year": "July 2020",
            "bar": parseInt(emp_data[index].uePercJuly2020),
            "line1": parseFloat(emp_data[index].uePercJuly2020)
        })
        data.push({
            "year": "Aug 2020",
            "bar": parseInt(emp_data[index].uePercAug2020),
            "line1": parseFloat(emp_data[index].uePercAug2020),
			"state" :emp_data[index].state
        })
        data.push({
            "year": "Sept 2020",
            "bar": parseInt(emp_data[index].uePercSept2020),
            "line1": parseFloat(emp_data[index].uePercSept2020)
        })
        console.log(data)
    }    
}

// data = [{year: "last year", bar: 106, line1: 1.18},{year: 4, bar: 146, line1: 5.18}]

// Scale the range of the data
xBar.domain(data.map(function(d) { return d.year; }));
xLine.domain(data.map(function(d) { return d.year; }));
yBar.domain([d3.min(data, function(d) { return d.bar; }), d3.max(data, function(d) { return d.bar; })]).nice();
yLine.domain([d3.min(data, function(d) {return Math.max(d.line1); }), d3.max(data, function(d) {return Math.max(d.line1); })]).nice();

// Add the valueline path.
svg.append("path")
  .data([data])
  .attr("class", "line")
  .style("stroke", "steelblue")
  .attr("d", valueline);

// Add the valueline2 path.
// svg.append("path")
//   .data([data])
//   .attr("class", "line")
//   .style("stroke", "crimson")
//   .attr("d", valueline2);

//var rect = svg.selectAll("rect")
//  .data(data)
      
//rect.enter().append("rect")
 // .merge(rect)
//  .attr("class", "bar")
//  .style("stroke", "none")
//  .style("fill", "#de0404")
//  .style("opacity", "0.7")
//  .attr("x", function(d){ return xBar(d.year); })
//  .attr("width", function(d){ return xBar.bandwidth(); })
 // .attr("y", function(d){ return yBar(d.bar); })
//  .attr("height", function(d){ return height - yBar(d.bar); });


var points2 = svg.selectAll("circle.point2")
  .data(data)
      
// points2.enter().append("circle")
//   .merge(points2)
//   .attr("class", "point2")
//   .style("stroke", "crimson")
//   .style("stroke-width", 3)
//       .style("fill", "none")
//   .attr("cx", function(d){ return xLine(d.year); })
//   .attr("cy", function(d){ return yLine(d.line1); })
//   .attr("r", function(d){ return 10; });

var points1 = svg.selectAll("circle.point1")
  .data(data)
      
points1.enter().append("circle")
  .merge(points1)
  .attr("class", "point1")
  .style("stroke", "steelblue")
      .style("fill", "steelblue")
  .attr("cx", function(d){ return xLine(d.year); })
  .attr("cy", function(d){ return yLine(d.line1); })
  .attr("r", function(d){ return 5; });


// Add the X Axis
svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(xLine));

// Add the Y0 Axis
svg.append("g")
  .attr("class", "axisSteelBlue")
  .call(d3.axisLeft(yBar));
  
svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Percent Unemployed"); 
	  
//svg.append("text")             
//      .attr("transform",
//            "translate(" + (width/2) + " ," + 
//                           (height + margin.top + 20) + ")")
//      .style("text-anchor", "middle")
//      .text(data.state);

// Add the Y1 Axis
//svg.append("g")
//  .attr("class", "axisSteelBlue")
//  .attr("transform", "translate( " + width + ", 0 )")
//  .call(d3.axisRight(yLine));


}

function drawBarChart(_id) {

    _id = parseInt(_id, 10)
    var data = []

    for (let index = 0; index < emp_data.length; index++) {
        if (emp_data[index].id == _id) {
            data.push({ "key": "Cost Index", "value": emp_data[index].costIndex })
            data.push({ "key": "Misc. Cost", "value": emp_data[index].miscCost })
            data.push({ "key": "Transportation Cost", "value": emp_data[index].transportationCost })
            data.push({ "key": "Grocery Cost", "value": emp_data[index].groceryCost })
            data.push({ "key": "Utilities Cost", "value": emp_data[index].utilitiesCost })
        }
    }

    // set the dimensions and margins of the graph
    var margin = { top: 20, right: 20, bottom: 30, left: 110 },
        width = 450 - margin.left - margin.right,
        height = 207 - margin.top - margin.bottom;

    // set the ranges
    var y = d3.scaleBand()
        .range([height, 0])
        .padding(0.1);

    var x = d3.scaleLinear()
        .range([0, width]);

    // append the svg object to the body of the page
    // append a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    $("#graphic").empty();
    var svg = d3.select("#graphic").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // format the data
    data.forEach(function (d) {
        d.value = +d.value;
    });

    // Scale the range of the data in the domains
    x.domain([0, 160])
    y.domain(data.map(function (d) { return d.key; }));
    //y.domain([0, d3.max(data, function(d) { return d.value; })]);

    // append the rectangles for the bar chart
    svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        //.attr("x", function(d) { return x(d.value); })
        .attr("width", function (d) { return x(d.value); })
        .attr("y", function (d) { return y(d.key); })
        .attr("height", y.bandwidth());

    // add the x Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // add the y Axis
    svg.append("g")
        .call(d3.axisLeft(y));

}

d3.csv("Project 2 Employment Data.csv", function (data) {
    for (let counter = 0; counter < data.length; counter++) {

        let state = data[counter].State;
        let costIndex = data[counter].costIndex;
        let costRank = data[counter].costRank;
        let costIndexPercentile = data[counter].costIndexPercentile;
        let laborForceSept19 = data[counter].LaborForceSept2019;
        let laborForceJuly2020 = data[counter].LaborForceJuly2020;
        let laborForceAug2020 = data[counter].LaborForceAug2020;
        let laborForceSept2020 = data[counter].LaborForceSept2020;
        let ueSept2019 = data[counter].UESept2019;
        let ueJuly2020 = data[counter].UEJuly2020;
        let ueAug2020 = data[counter].UEAug2020;
        let ueSept2020 = data[counter].UESept2020;
        let uePercSept2019 = data[counter].ue2019;
        let uePercJuly2020 = data[counter].UEPercJuly2020;
        let uePercAug2020 = data[counter].UEPercAug2020;
        let uePercSept2020 = data[counter].ue2020;
        let uePercSept2019Percentile = data[counter].ue2019Percentile;
        let uePercJuly2020Percentile = data[counter].UEPercJuly2020Percentile;
        let uePercAug2020Percentile = data[counter].UEPercAug2020Percentile;
        let uePercSept2020Percentile = data[counter].ue2020Percentile;
        let topEmployer = data[counter].TopEmployer;
        let topEmployerJobs = data[counter].TopEmployerJobs;
        let totalJobCount = data[counter].TotalJobCount;
        let topEmployerJobsPercentile = data[counter].TopEmployerJobsPercentile;
        let totalJobCountPercentile = data[counter].TotalJobCountPercentile;
        let laborForceSept2020Percentile = data[counter].LaborForceSept2020Percentile;
        let id = data[counter].id;
        let miscCost = data[counter].miscCost;
        let transportationCost = data[counter].transportationCost
        let groceryCost =  data[counter].groceryCost
        let utilitiesCost = data[counter].utilitiesCost
        let MedianMaxSalary = data[counter].MedianMaxSalary
        let MedianMinSalary = data[counter].MedianMinSalary
		let Top1 = data[counter].Top1
		let Top2 = data[counter].Top2
		let Top3 = data[counter].Top3
		let TEMaxSalary = data[counter].TESalaryRangeMaximum
		let TEMinSalary = data[counter].TESalaryRangeMinimum
		let TERating = data[counter].CompanyRating2
		let StateEmployerRating = data[counter].StateEmployerRating

		


        emp_data.push({
			TEMaxSalary:TEMaxSalary,
			TEMinSalary:TEMinSalary,
			TERating:TERating,
			StateEmployerRating:StateEmployerRating,
            state: state,
            costIndex: costIndex,
            costRank: costRank,
            costIndexPercentile: costIndexPercentile,
            laborForceSept19: laborForceSept19,
            laborForceJuly2020: laborForceJuly2020,
            laborForceAug2020: laborForceAug2020,
            laborForceSept2020: laborForceSept2020,
            ueSept2019: ueSept2019,
            ueJuly2020: ueJuly2020,
            ueAug2020: ueAug2020,
            ueSept2020: ueSept2020,
            uePercSept2019: uePercSept2019,
            uePercJuly2020: uePercJuly2020,
            uePercAug2020: uePercAug2020,
            uePercSept2020: uePercSept2020,
            uePercSept2019Percentile: uePercSept2019Percentile,
            uePercJuly2020Percentile: uePercJuly2020Percentile,
            uePercAug2020Percentile: uePercAug2020Percentile,
            uePercSept2020Percentile: uePercSept2020Percentile,
            topEmployer: topEmployer,
            topEmployerJobs: topEmployerJobs,
            totalJobCount: totalJobCount,
            topEmployerJobsPercentile: topEmployerJobsPercentile,
            totalJobCountPercentile: totalJobCountPercentile,
            laborForceSept2020Percentile: laborForceSept2020Percentile,
            id: id,
            miscCost: miscCost,
            transportationCost: transportationCost,
            groceryCost: groceryCost,
            utilitiesCost: utilitiesCost,
            MedianMaxSalary: MedianMaxSalary,
            MedianMinSalary: MedianMinSalary,
			Top1: Top1,
			Top2: Top2,
			Top3: Top3
        });
    };
    console.log(emp_data);
    drawFirstMap('uePercSept2020Percentile');
    drawBarChart(18);
    drawDual(18);
    fillLegend();
});
$('input[type=radio][name=costType]').change(function () {
    drawFirstMap(this.value);
});
