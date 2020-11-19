let emp_data = [];
function drawFirstMap(type) {
    $("#map-target").empty();
    var width = 720,
        height = 500;

    var projection = d3.geoAlbers()
        .scale(500)
        .translate([width / 2, height / 2]);

    var path = d3.geoPath()
        .projection(projection);

    var svg = d3.select("#map-target")
        .attr("width", width)
        .attr("height", height);


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
        .attr("spreadMethod", "pad");
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
        .attr("transform", "translate(0,10)");

    var y = d3.scaleLinear()
        .range([300, 0])
        .domain([50, 1]);

    var yAxis = d3.axisBottom()
        .scale(y)
        .ticks(5);

    key.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(0,30)")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("axis title");
    let l = ""
    if (type == 'costIndex') {
        l = 'Cost Index Cheapest to most Expensive';
    }
    else if (type == 'totalJobCount') {
        l = 'Total Jobs Available Lowest to Highest';
    }
    else if (type == 'uePercSept2020Percentile') {
        l = 'Unemployment Lowest to Highest';
    }
    else if (type == 'laborForceSept2020Percentile') {
        l = 'Total labor force Lowest to Highest';
    }
    else if (type == 'topEmployerJobs') {
        l = 'Top Employer available jobs Lowest to Highest';
    }
    key.append("text")
        .attr("transform",
            "translate(150 ,75)")
        .style("text-anchor", "middle")
        .style("font-size", 12)
        .attr("id", "label2");
    document.getElementById('label2').innerHTML = l;

    var path = d3.geoPath();
    var toolTip = d3.select("body")
        .append("div")
        .attr("class", "tooltip-donut")
        .style("opacity", 0);
    d3.json("https://d3js.org/us-10m.v1.json", function (error, us) {
        if (error) throw error;



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
                d3.select(this).style('fill', '#000000');
                let value = ""
                for (var i in emp_data) {
                    if (type == 'costIndex' && parseInt(emp_data[i].id) == parseInt(d.id)) {
                        value = parseFloat(emp_data[i].costIndexPercentile);
                        toolTip.html( emp_data[i].state + '<br> Cost rank: ' + emp_data[i].costRank +
                            '</br>Cost index percentile: ' + parseFloat(emp_data[i].costIndexPercentile * 100).toFixed(2))
                            .style("left", (d3.event.pageX + 20) + "px")
                            .style("top", (d3.event.pageY - 30) + "px");
                    }
                    else if (type == 'totalJobCount' && parseInt(emp_data[i].id) == parseInt(d.id)) {
                        value = parseFloat(emp_data[i].totalJobCountPercentile);
                        toolTip.html(emp_data[i].state + '<br> Total job count: ' + emp_data[i].totalJobCount +
                            '</br>Cost index percentile: ' + parseFloat(emp_data[i].totalJobCountPercentile * 100).toFixed(2))
                            .style("left", (d3.event.pageX + 20) + "px")
                            .style("top", (d3.event.pageY - 30) + "px");
                    }
                    else if (type == 'uePercSept2020Percentile' && parseInt(emp_data[i].id) == parseInt(d.id)) {
                        value = parseFloat(emp_data[i].uePercSept2020Percentile);
                        toolTip.html(emp_data[i].state + '<br> Unemployment: ' + emp_data[i].ueSept2020 +
                            '</br>Unemployment percentile: ' + parseFloat(emp_data[i].uePercSept2020Percentile * 100).toFixed(2))
                            .style("left", (d3.event.pageX + 20) + "px")
                            .style("top", (d3.event.pageY - 30) + "px");
                    }
                    else if (type == 'laborForceSept2020Percentile' && parseInt(emp_data[i].id) == parseInt(d.id)) {
                        value = parseFloat(emp_data[i].laborForceSept2020Percentile);
                        toolTip.html(emp_data[i].state + '<br> Labor Force: ' + emp_data[i].laborForceSept2020 +
                            '</br>Labor force percentile: ' + parseFloat(emp_data[i].laborForceSept2020Percentile * 100).toFixed(2))
                            .style("left", (d3.event.pageX + 20) + "px")
                            .style("top", (d3.event.pageY - 30) + "px");
                    }
                    else if (type == 'topEmployerJobs' && parseInt(emp_data[i].id) == parseInt(d.id)) {
                        value = parseFloat(emp_data[i].topEmployerJobsPercentile);
                        toolTip.html(emp_data[i].state + '<br> Top Employer job count: ' + emp_data[i].topEmployerJobs +
                            '</br>Top Employer: ' + emp_data[i].topEmployer +
                            '</br>Top Employer percentile: ' + parseFloat(emp_data[i].topEmployerJobsPercentile * 100).toFixed(2))
                            .style("left", (d3.event.pageX + 20) + "px")
                            .style("top", (d3.event.pageY - 30) + "px");
                    }
                }
                fillCompareChart(d.id)
                toolTip.transition()
                    .duration(50)
                    .style("opacity", 1);
            })
            .on('mouseout', function (d, i) {
                let value = 0;
                d3.select(this).style('fill', '#de0404');
                toolTip.transition()
                    .duration('50')
                    .style("opacity", 0);
            });;
    });
};

function fillCompareChart(stateId) {
    $("#CompareChart").empty();
    let svg = d3.select("#CompareChart");


     let xScale = d3.scaleBand().range([0, 100]).padding(.5);
     let yScale = d3.scaleLinear().range([300, 0]);

    xScale.domain(['Cost Index', 'Total Job Count', 'Unemployment', 'Labor Force', 'Top Employee Jobs']);
    yScale.domain([0,100]);
    let g = svg.append("g")
        .attr("transform", "translate(" + 100 + "," + 100 + ")");


    g.append("g")
        .attr("transform", "translate(0," + 300 + ")")
        .call(d3.axisBottom(xScale));

    let data = []
    for (var i in emp_data) {
        if (parseInt(emp_data[i].id) == parseInt(stateId)) {
            data.push({ text: 'Cost Index', value: parseFloat(emp_data[i].costIndexPercentile)*100,column:1 });
            data.push({ text: 'Total Job Count', value: parseFloat(emp_data[i].totalJobCountPercentile)*100,column: 2 });
            data.push({ text: 'Unemployment', value: parseFloat(emp_data[i].uePercSept2020Percentile) * 100,column: 3 });
            data.push({ text: 'Labor Force', value: parseFloat(emp_data[i].laborForceSept2020Percentile) * 100,column: 4 });
            data.push({ text: 'Top Employee Jobs', value: parseFloat(emp_data[i].topEmployerJobsPercentile) * 100,column: 5 });
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

function fillRankings(type) {

}
d3.csv("Project 2 Employment Data.csv", function (data) {
        for (let counter = 0; counter < data.length;counter++) {

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
            let uePercSept2019 = data[counter].UEPercSept2019;
            let uePercJuly2020 = data[counter].UEPercJuly2020;
            let uePercAug2020 = data[counter].UEPercAug2020;
            let uePercSept2020 = data[counter].UEPercSept2020;
            let uePercSept2019Percentile = data[counter].UEPercSept2019Percentile;
            let uePercJuly2020Percentile = data[counter].UEPercJuly2020Percentile;
            let uePercAug2020Percentile = data[counter].UEPercAug2020Percentile;
            let uePercSept2020Percentile = data[counter].UEPercSept2020Percentile;
            let topEmployer = data[counter].TopEmployer;
            let topEmployerJobs = data[counter].TopEmployerJobs;
            let totalJobCount = data[counter].TotalJobCount;
            let topEmployerJobsPercentile = data[counter].TopEmployerJobsPercentile;
            let totalJobCountPercentile = data[counter].TotalJobCountPercentile;
            let laborForceSept2020Percentile = data[counter].LaborForceSept2020Percentile;
            let id = data[counter].id;



            emp_data.push({
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
                id: id
            });
        };
        console.log(emp_data);
        drawFirstMap('costIndex');
    });
$('input[type=radio][name=costType]').change(function () {
    fillRankings(this.value);
    drawFirstMap(this.value);
});
