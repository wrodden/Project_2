
    let emp_data = [];

function drawFirstMap(type) {
    $("#map-target").empty();
        var width = 720,
            height = 500;

        var projection = d3.geoAlbers()
            .scale(1000)
            .translate([width / 2, height / 2]);

        var path = d3.geoPath()
            .projection(projection);

        var svg = d3.select("#map-target")
            .attr("width", width)
            .attr("height", height);

        var color = d3.scaleThreshold()
            .domain([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
            .range(["#5b3ec9", "#6e55cf", "#806bcf", "#9081c9", "#9c8fcc", "#cf6969", "#d45353", "#d94343", "#d92727", "#de0404"]);
        var key = d3.select("#legend1")
            .append("svg")
            .attr("width", 300)
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
            l = 'Total Jobs Available Highest to Lowest';
        }
        else if (type == 'uePercSept2020Percentile') {
            l = 'Unemployment Lowest to Highest';
        }
        else if (type == 'laborForceSept2020') {
            l = 'Total labor force Lowest to Highest';
        }
        else if (type == 'topEmployerJobs') {
            l = 'Top Employer available jobs Highest to Lowest';
        }
        key.append("text")
            .attr("transform",
                "translate(150 ,75)")
            .style("text-anchor", "middle")
            .style("font-size", 12)
            .attr("id", "label2")
        document.getElementById('label2').innerHTML = l;

        var path = d3.geoPath();
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
                        else if (type == 'laborForceSept2020' && parseInt(emp_data[i].id) == parseInt(d.id)) {
                            return parseFloat(emp_data[i].laborForceSept2020);
                        }
                        else if (type == 'topEmployerJobs' && parseInt(emp_data[i].id) == parseInt(d.id)) {
                            return parseFloat(emp_data[i].topEmployerJobsPercentile);
                        }
                    }
                });
		});
    };
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
                id: id
            });
        };
        console.log(emp_data);
        drawFirstMap('costIndex');
    });
$('input[type=radio][name=costType]').change(function () {
    drawFirstMap(this.value);
});
