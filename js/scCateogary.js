var margin = { top: 40, right: 20, bottom: 200, left: 60 },
    width = 1200 - margin.left - margin.right,
    height = 850 - margin.top - margin.bottom;

var formatPercent = d3.format("");

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(formatPercent);

var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
        return "<strong> cateogarySum: </strong> <span style='color:red'>" + d.cateogarySum + "</span>";
    })

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.call(tip);

d3.json("../json/sceducationCateogary.json", function(error, data) {
    x.domain(data.map(function(d) { return d.cateogary; }));
    y.domain([0, d3.max(data, function(d) { return d.v > 18000000 ? d.v : 18000000; })]);
    //y.domain([0, d3.max(data, function(d) { return d.cateogarySum; })]);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", "-.55em")
        .attr("transform", "rotate(-90)");


    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("cateogarySum");

    svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.cateogary); })
        .attr("width", x.rangeBand())
        .attr("y", function(d) { return y(d.cateogarySum); })
        .attr("height", function(d) { return height - y(d.cateogarySum); })
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide)

});