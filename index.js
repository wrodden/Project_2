let emp_data = [];

var global_type = ""

var key = d3.select("#legend1")
    .append("svg")
    .attr("width", width)
    .attr("height", 50);
var width = 520,
    height = 340;
var toolTip = d3.select("body")
    .append("div")
    .attr("class", "tooltip-donut")
    .style("opacity", 0);
function drawFirstMap(type) {
    global_type = type
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
    var clickId = '99';
    d3.json("https://d3js.org/us-10m.v1.json", function (error, us) {
        if (error) throw error;

        var featureCollection = topojson.feature(us, us.objects.states);

        var projection = d3.geoIdentity()
            .fitExtent([[1, 1], [580 - 60, 400 - 60]], featureCollection)

        var path = d3.geoPath().projection(projection)
        fillLegend();

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
                        $('#dist').html("Distribution - Cost Index Percentile");
                        return parseFloat(emp_data[i].costIndexPercentile);
                    }
                    else if (type == 'totalJobCount' && parseInt(emp_data[i].id) == parseInt(d.id)) {
                        $('#dist').html("Distribution - Total Job Count Percentile");
                        return parseFloat(emp_data[i].totalJobCountPercentile);
                    }
                    else if (type == 'uePerc2020Percentile' && parseInt(emp_data[i].id) == parseInt(d.id)) {
                        $('#dist').html("Distribution - Unemployment Percentile");
                        return parseFloat(emp_data[i].uePerc2020Percentile);
                    }
                    else if (type == 'laborForceSept2020Percentile' && parseInt(emp_data[i].id) == parseInt(d.id)) {
                        return parseFloat(emp_data[i].laborForceSept2020Percentile);
                    }
                    else if (type == 'topEmployerJobs' && parseInt(emp_data[i].id) == parseInt(d.id)) {
                        return parseFloat(emp_data[i].topEmployerJobsPercentile);
                    }
                    else if (type == 'utilitiesCostPercentile' && parseInt(emp_data[i].id) == parseInt(d.id)) {
                        $('#dist').html("Distribution - Utilities Cost Percentile");
                        return parseFloat(emp_data[i].utilitiesCostPercentile);
                    }
                    else if (type == 'groceryCostPercentile' && parseInt(emp_data[i].id) == parseInt(d.id)) {
                        $('#dist').html("Distribution - Grocery Cost Percentile");
                        return parseFloat(emp_data[i].groceryCostPercentile);
                    }
                    else if (type == 'transportationCostPercentile' && parseInt(emp_data[i].id) == parseInt(d.id)) {
                        $('#dist').html("Distribution - Transportation Cost Percentile");
                        return parseFloat(emp_data[i].transportationCostPercentile);
                    }
                    else if (type == 'miscCostPercentile' && parseInt(emp_data[i].id) == parseInt(d.id)) {
                        $('#dist').html("Distribution - Misc. Cost Percentile");
                        return parseFloat(emp_data[i].miscCostPercentile);
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

                    else if (type == 'uePerc2020Percentile' && parseInt(emp_data[i].id) == parseInt(d.id)) {
                        value = parseFloat(emp_data[i].uePerc2020Percentile);
                        toolTip.html(emp_data[i].state + '<br> Unemployment Rate: ' + emp_data[i].uePerc2020 + "%"+
                            '</br> Unemployment Rate Percentile: ' + parseFloat(emp_data[i].uePerc2020Percentile * 100).toFixed(2))
                            .style("left", (d3.event.pageX + 20) + "px")
                            .style("top", (d3.event.pageY - 30) + "px");
                    }
                    else if (type == 'utilitiesCostPercentile' && parseInt(emp_data[i].id) == parseInt(d.id)) {
                        value = parseFloat(emp_data[i].utilitiesCostPercentile);
                        toolTip.html(emp_data[i].state + '<br> Utilities Cost Rate: ' + emp_data[i].utilitiesCost +
                            '</br> Utilities Cost Rate Percentile: ' + parseFloat(emp_data[i].utilitiesCostPercentile * 100).toFixed(2))
                            .style("left", (d3.event.pageX + 20) + "px")
                            .style("top", (d3.event.pageY - 30) + "px");
                    }
                    else if (type == 'groceryCostPercentile' && parseInt(emp_data[i].id) == parseInt(d.id)) {
                        value = parseFloat(emp_data[i].groceryCostPercentile);
                        toolTip.html(emp_data[i].state + '<br> Grocery Cost Rate: ' + emp_data[i].groceryCost +
                            '</br> Grocery Cost Rate Percentile: ' + parseFloat(emp_data[i].groceryCostPercentile * 100).toFixed(2))
                            .style("left", (d3.event.pageX + 20) + "px")
                            .style("top", (d3.event.pageY - 30) + "px");
                    }
                    else if (type == 'transportationCostPercentile' && parseInt(emp_data[i].id) == parseInt(d.id)) {
                        value = parseFloat(emp_data[i].transportationCostPercentile);
                        toolTip.html(emp_data[i].state + '<br> Transportaion Cost Rate: ' + emp_data[i].transportationCost +
                            '</br> Transportaions Cost Rate Percentile: ' + parseFloat(emp_data[i].transportationCostPercentile * 100).toFixed(2))
                            .style("left", (d3.event.pageX + 20) + "px")
                            .style("top", (d3.event.pageY - 30) + "px");
                    }
                    else if (type == 'miscCostPercentile' && parseInt(emp_data[i].id) == parseInt(d.id)) {
                        value = parseFloat(emp_data[i].miscCostPercentile);
                        toolTip.html(emp_data[i].state + '<br> Misc Cost Rate: ' + emp_data[i].miscCost +
                            '</br> Misc Cost Rate Percentile: ' + parseFloat(emp_data[i].miscCostPercentile * 100).toFixed(2))
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
                        else if (type == 'uePerc2020Percentile' && parseInt(emp_data[i].id) == parseInt(d.id)) {
                            return parseFloat(emp_data[i].uePerc2020Percentile);
                        }
                        else if (type == 'laborForceSept2020Percentile' && parseInt(emp_data[i].id) == parseInt(d.id)) {
                            return parseFloat(emp_data[i].laborForceSept2020Percentile);
                        }
                        else if (type == 'topEmployerJobs' && parseInt(emp_data[i].id) == parseInt(d.id)) {
                            return parseFloat(emp_data[i].topEmployerJobsPercentile);
                        }
                        else if (type == 'utilitiesCostPercentile' && parseInt(emp_data[i].id) == parseInt(d.id)) {
                            return parseFloat(emp_data[i].utilitiesCostPercentile);
                        }
                        else if (type == 'groceryCostPercentile' && parseInt(emp_data[i].id) == parseInt(d.id)) {
                            return parseFloat(emp_data[i].groceryCostPercentile);
                        }
                        else if (type == 'transportationCostPercentile' && parseInt(emp_data[i].id) == parseInt(d.id)) {
                            return parseFloat(emp_data[i].transportationCostPercentile);
                        }
                        else if (type == 'miscCostPercentile' && parseInt(emp_data[i].id) == parseInt(d.id)) {
                            return parseFloat(emp_data[i].miscCostPercentile);
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
                        else if (type == 'uePerc2020Percentile' && parseInt(emp_data[i].id) == parseInt(x.id)) {
                            return parseFloat(emp_data[i].uePerc2020Percentile);
                        }
                        else if (type == 'laborForceSept2020Percentile' && parseInt(emp_data[i].id) == parseInt(x.id)) {
                            return parseFloat(emp_data[i].laborForceSept2020Percentile);
                        }
                        else if (type == 'topEmployerJobs' && parseInt(emp_data[i].id) == parseInt(x.id)) {
                            return parseFloat(emp_data[i].topEmployerJobsPercentile);
                        }
                        else if (type == 'utilitiesCostPercentile' && parseInt(emp_data[i].id) == parseInt(x.id)) {
                            return parseFloat(emp_data[i].utilitiesCostPercentile);
                        }
                        else if (type == 'groceryCostPercentile' && parseInt(emp_data[i].id) == parseInt(x.id)) {
                            return parseFloat(emp_data[i].groceryCostPercentile);
                        }
                        else if (type == 'transportationCostPercentile' && parseInt(emp_data[i].id) == parseInt(x.id)) {
                            return parseFloat(emp_data[i].transportationCostPercentile);
                        }
                        else if (type == 'miscCostPercentile' && parseInt(emp_data[i].id) == parseInt(x.id)) {
                            return parseFloat(emp_data[i].miscCostPercentile);
                        }
                    }
                    d3.select(self).style('fill', 'orange');
                });
                for (var i in emp_data) {

                    if (parseInt(emp_data[i].id) == parseInt(d.id)) {
                        $('#top-emp').html(emp_data[i].topEmployer + "<br>Salary Range: <br>" + emp_data[i].TEMinSalary + " - " + emp_data[i].TEMaxSalary + "<br>Job Count: " + parseInt(emp_data[i].topEmployerJobs) + "<br>Rating: " + emp_data[i].TERating);
                        $('#median-sal').html("Salary Range: <br>" + emp_data[i].MedianMinSalary + " - " + emp_data[i].MedianMaxSalary + "<br>Job Count: " + parseInt(emp_data[i].totalJobCount) + "<br>Unemployment: " + emp_data[i].uePerc2020 + "%" + "<br>Cost Index: " + emp_data[i].costIndex);
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

                    else if (type == 'uePerc2020Percentile' && parseInt(emp_data[i].id) == parseInt(d.id)) {
                        value = parseFloat(emp_data[i].uePerc2020Percentile);
                        toolTip.html(emp_data[i].state + '<br> Unemployment Rate: ' + emp_data[i].uePerc2020 + "%" +
                            '</br> Unemployment Rate Percentile: ' + parseFloat(emp_data[i].uePerc2020Percentile * 100).toFixed(2))
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
                        $('#dual-heading').html('Unemployment Trends (2008 to 2020) <br> ' + emp_data[i].state);
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
            data.push({ text: 'Unemployment', value: parseFloat(emp_data[i].uePerc2020Percentile) * 100, column: 3 });
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
    $("#legend2").empty();
    var key = d3.select("#legend2")
        .append("svg")
        .attr("width", width)
        .attr("height", 52);
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

function drawDual(_id) {
    // set the dimensions and margins of the graph
    var margin = { top: 30, right: 40, bottom: 30, left: 80 },
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
        .x(function (d) { return xLine(d.year); })
        .y(function (d) { return yLine(d.line1); });

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
    specialLine = null;
    _id = parseInt(_id, 10)
    for (let index = 0; index < emp_data.length; index++) {
        line = []; 
        let bold = emp_data[index].id == _id;
        line.push({
            "year": "2008",
            "line1": parseFloat(emp_data[index].uePerc2008)
        })
        line.push({
            "year": "2009",
            "line1": parseFloat(emp_data[index].uePerc2009)
        })
        line.push({
            "year": "2010",
            "line1": parseFloat(emp_data[index].uePerc2010),
            "state": emp_data[index].state
        })
        line.push({
            "year": "2011",
            "line1": parseFloat(emp_data[index].uePerc2011)
        })
        line.push({
            "year": "2012",
            "line1": parseFloat(emp_data[index].uePerc2012)
        })
        line.push({
            "year": "2013",
            "line1": parseFloat(emp_data[index].uePerc2013)
        })
        line.push({
            "year": "2014",
            "line1": parseFloat(emp_data[index].uePerc2014)
        })
        line.push({
            "year": "2015",
            "line1": parseFloat(emp_data[index].uePerc2015)
        })
        line.push({
            "year": "2016",
            "line1": parseFloat(emp_data[index].uePerc2016)
        })
        line.push({
            "year": "2017",
            "line1": parseFloat(emp_data[index].uePerc2017)
        })
        line.push({
            "year": "2018",
            "line1": parseFloat(emp_data[index].uePerc2018)
        })
        line.push({
            "year": "2019",
            "line1": parseFloat(emp_data[index].uePerc2019)
        })
        line.push({
            "year": "2020",
            "line1": parseFloat(emp_data[index].uePerc2020)
        })
        if (!bold) {
            data.push(line);
        }
        else {
            specialLine = line;
        }
    }

    // data = [{year: "last year", bar: 106, line1: 1.18},{year: 4, bar: 146, line1: 5.18}]

    // Scale the range of the data
    xLine.domain([2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018, 2019,2020]);
    yLine.domain([0,15]).nice();

    // Add the valueline path.
    for (var i in data) {
        svg.append("path")
            .data([data[i]])
            .attr("class", "line")
            .style("stroke", "steelblue")
            .style("opacity",".1")
            .attr("d", valueline);
        var points1 = svg.selectAll("circle.point1")
            .data(data[i])

    }

    svg.append("path")
        .data([specialLine])
        .attr("class", "line")
        .style("stroke", "steelblue")
        .style("opacity", "1")
        .attr("d", valueline);
    var points1 = svg.selectAll("circle.point1")
        .data(specialLine)

    points1.enter().append("circle")
        .merge(points1)
        .attr("class", "point1")
        .style("stroke", "steelblue")
        .style("fill", "steelblue")
        .attr("cx", function (d) { return xLine(d.year); })
        .attr("cy", function (d) { return yLine(d.line1); })
        .attr("r", function (d) { return 5; })
        .on('mouseover', function (d, i) {

            var currentState = this;
            d3.select(this).style('fill', 'orange');
            d3.select(this).style('opacity', 1);
            value = parseFloat(d.line1);
                    toolTip.html('Uneployment Rate: %' +value)
                        .style("left", (d3.event.pageX + 20) + "px")
                        .style("top", (d3.event.pageY - 30) + "px");
                
            toolTip.transition()
                .duration(50)
                .style("opacity", 1);
        })
        .on('mouseout', function (d, i) {

            d3.select(this).style('fill', 'steelblue');

            toolTip.transition()
                .duration('50')
                .style("opacity", 0);
        });

    // Add the X Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xLine));

    // Add the Y0 Axis
    svg.append("g")
        .attr("class", "axisSteelBlue")
        .call(d3.axisLeft(yLine));

    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
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
            //data.push({ "key": "Cost Index", "value": emp_data[index].costIndex })
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
     x.domain([0, 200])
     y.domain(data.map(function (d) { return d.key; }));

    // append the rectangles for the bar chart
    svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        //.attr("x", function(d) { return x(d.value); })
        .attr("width", function (d) { return x(d.value); })
        .attr("y", function (d) { return y(d.key); })
        .attr("height", y.bandwidth())
        .style("fill", function (d) { 
            if (global_type == "utilitiesCostPercentile" && d.key == "Utilities Cost"){
                return "orange"
            }
            else if (global_type == "groceryCostPercentile" && d.key == "Grocery Cost"){
                return "orange"
            }
            else if (global_type == "transportationCostPercentile" && d.key == "Transportation Cost"){
                return "orange"
            }
            else if (global_type == "miscCostPercentile" && d.key == "Misc. Cost"){
                return "orange"
            }
            else if (global_type == "To" && d.key == "Misc. Cost"){
                return "orange"
            }


         })
        .on('click', function (d, i) {
            d3.selectAll("rect").style('fill', '#de0404');
            d3.selectAll("rect").style('opacity', '0.7');
            d3.select(this).style('fill', 'orange');
            $("#other").prop("checked", true);
            $("#other").prop("disabled", false);
            if(d.key == "Utilities Cost"){
                drawFirstMap("utilitiesCostPercentile")
            }
            else if(d.key == "Grocery Cost"){
                drawFirstMap("groceryCostPercentile")
            }
            else if(d.key == "Transportation Cost"){
                drawFirstMap("transportationCostPercentile")
            }
            else if(d.key == "Misc. Cost"){
                drawFirstMap("miscCostPercentile")
            }
        });

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
		let uePerc2008 = data[counter].ue2008
		let uePerc2009 = data[counter].ue2009
		let uePerc2010 = data[counter].ue2010
		let uePerc2011 = data[counter].ue2011
		let uePerc2012 = data[counter].ue2012
		let uePerc2013 = data[counter].ue2013
		let uePerc2014 = data[counter].ue2014
		let uePerc2015 = data[counter].ue2015
		let uePerc2016 = data[counter].ue2016
		let uePerc2017 = data[counter].ue2017
		let uePerc2018 = data[counter].ue2018
        let uePerc2019 = data[counter].ue2019;
        let uePercJuly2020 = data[counter].UEPercJuly2020;
        let uePercAug2020 = data[counter].UEPercAug2020;
        let uePerc2020 = data[counter].ue2020;
		let ue2007Percentile = data[counter].ue2007Percentile;
		let uePerc2008Percentile = data[counter].ue2008Percentile;
		let uePerc2009Percentile = data[counter].ue2009Percentile;
		let uePerc2010Percentile = data[counter].ue2010Percentile;
		let uePerc2011Percentile = data[counter].ue2011Percentile;
		let uePerc2012Percentile = data[counter].ue2012Percentile;
		let uePerc2013Percentile = data[counter].ue2013Percentile;
		let uePerc2014Percentile = data[counter].ue2014Percentile;
		let uePerc2015Percentile = data[counter].ue2015Percentile;
		let uePerc2016Percentile = data[counter].ue2016Percentile;
		let uePerc2017Percentile = data[counter].ue2017Percentile;
		let uePerc2018Percentile = data[counter].ue2018Percentile;
        let uePerc2019Percentile = data[counter].ue2019Percentile;
        let uePercJuly2020Percentile = data[counter].UEPercJuly2020Percentile;
        let uePercAug2020Percentile = data[counter].UEPercAug2020Percentile;
        let uePerc2020Percentile = data[counter].ue2020Percentile;
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
        let utilitiesCostPercentile = data[counter].utilitiesCostPercentile
        let groceryCostPercentile = data[counter].groceryCostPercentile
        let transportationCostPercentile = data[counter].transportationCostPercentile
        let miscCostPercentile = data[counter].miscCostPercentile

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
			uePerc2008: uePerc2008,
			uePerc2009: uePerc2009,
			uePerc2010: uePerc2010,
			uePerc2011: uePerc2011,
			uePerc2012: uePerc2012,
			uePerc2013: uePerc2013,
			uePerc2014: uePerc2014,
			uePerc2015: uePerc2015,
			uePerc2016: uePerc2016,
			uePerc2017: uePerc2017,
			uePerc2018: uePerc2018,
            uePerc2019: uePerc2019,
            uePercJuly2020: uePercJuly2020,
            uePercAug2020: uePercAug2020,
            uePerc2020: uePerc2020,
			uePerc2008Percentile : uePerc2008Percentile,
			uePerc2009Percentile : uePerc2009Percentile,
			uePerc2010Percentile : uePerc2010Percentile,
			uePerc2011Percentile : uePerc2011Percentile,
			uePerc2012Percentile : uePerc2012Percentile,
			uePerc2013Percentile : uePerc2013Percentile,
			uePerc2014Percentile : uePerc2014Percentile,
			uePerc2015Percentile : uePerc2015Percentile,
			uePerc2016Percentile : uePerc2016Percentile,
			uePerc2017Percentile : uePerc2017Percentile,
			uePerc2018Percentile : uePerc2018Percentile,
            uePerc2019Percentile: uePerc2019Percentile,
            uePercJuly2020Percentile: uePercJuly2020Percentile,
            uePercAug2020Percentile: uePercAug2020Percentile,
            uePerc2020Percentile: uePerc2020Percentile,
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
            Top3: Top3,
            utilitiesCostPercentile: utilitiesCostPercentile,
            groceryCostPercentile: groceryCostPercentile,
            transportationCostPercentile: transportationCostPercentile,
            miscCostPercentile: miscCostPercentile

        });
    };
    //console.log(emp_data);
    drawFirstMap('uePerc2020Percentile');
    drawBarChart(18);
    drawDual(18);
    fillLegend();
});
$('input[type=radio][name=costType]').change(function () {
    $("#other").prop("disabled", true);
    d3.selectAll("rect").style('fill', '#de0404');
    d3.selectAll("rect").style('opacity', '0.7');
    drawFirstMap(this.value);
});
