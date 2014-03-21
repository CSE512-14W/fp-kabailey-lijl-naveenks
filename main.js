var currentView = 'view1';
var samplesize = 10;
var box1 = true;
var box2 = true;
var box3 = true;
var box4 = true;
var box5 = true;
var box6 = true;

function sampleSize() {
    var d = document.getElementById("sampleSize");
    samplesize = d.options[d.selectedIndex].value;
    window[currentView]();
}
    
function show_loading()
{
  var load_str = "<div id=loadimage><img src=loading.gif width=150 height=150></div>";
  document.getElementById('canvas').innerHTML = load_str;
}

function hide_loading()
{
  element = document.getElementById('loadimage');
  element.parentNode.removeChild(element);
}

function data_filter(d)
{
    if (box1) {
	return d.frequency > 0.05;
    }

    return true;
}

function checkbox1(checked)
{
    box1 = checked;
    window[currentView]();
}
function checkbox2(checked)
{
    box2 = checked;
    window[currentView]();
}
function checkbox3(checked)
{
    box3 = checked;
    window[currentView]();
}
function checkbox4(checked)
{
    box4 = checked;
    window[currentView]();
}
function checkbox5(checked)
{
    box5 = checked;
    window[currentView]();
}
function checkbox6(checked)
{
    box6 = checked;
    window[currentView]();
}

function view1()
{
    currentView = 'view1';
  show_loading();

  var map = new Datamap({
    scope: 'world',
    element: document.getElementById('canvas'),
    projection: 'mercator',
    
    fills: {
      defaultFill: '#f0af0a',
      lt50: 'rgba(0,244,244,0.9)',
      gt50: 'red'
    },
    
    data: {
      USA: {fillKey: 'lt50' },
      RUS: {fillKey: 'lt50' },
      CAN: {fillKey: 'lt50' },
      BRA: {fillKey: 'gt50' },
      ARG: {fillKey: 'gt50'},
      COL: {fillKey: 'gt50' },
      AUS: {fillKey: 'gt50' },
      ZAF: {fillKey: 'gt50' },
      MAD: {fillKey: 'gt50' }       
    }
  });

  hide_loading();
}


function view3()
{
    currentView = 'view3';
  show_loading();

  var margin = {top: 20, right: 20, bottom: 30, left: 40},
      width = 900 - margin.left - margin.right,
      height = 600 - margin.top - margin.bottom;

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
      .ticks(10, "%");

  var svg = d3.select("#canvas").append("svg")
      .attr("class", "view3")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  function type(d) {
    d.frequency = +d.frequency;
    return d;
  }

  d3.tsv("data/view3.tsv", type, function(error, data) {
    x.domain(data.map(function(d) { return d.letter; }));
    y.domain([0, d3.max(data, function(d) { return d.frequency; })]);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Frequency");

    svg.selectAll(".bar")
          .data(data.filter(function(d){return data_filter(d);}))
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.letter); })
        .attr("width", x.rangeBand())
        .attr("y", function(d) { return y(d.frequency); })
        .attr("height", function(d) { return height - y(d.frequency); });

  });

  hide_loading();
}

function view5()
{
    currentView = 'view5';
  show_loading();

  var margin = {top: 20, right: 20, bottom: 30, left: 40},
      width = 900 - margin.left - margin.right,
      height = 600 - margin.top - margin.bottom;

  var x = d3.scale.linear()
      .range([0, width]);

  var y = d3.scale.linear()
      .range([height, 0]);

  var color = d3.scale.category10();

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

  var svg = d3.select("#canvas").append("svg")
      .attr("class", "view5")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  d3.tsv("data/view5.tsv", function(error, data) {
    data.forEach(function(d) {
      d.sepalLength = +d.sepalLength;
      d.sepalWidth = +d.sepalWidth;
      d.petalLength = +d.petalLength;
      d.petalWidth = +d.petalWidth;
    });
    
    /* Get the axes from select dropdown menu. */
    var select1 = document.getElementById("variable1");
    var var1 = select1.options[select1.selectedIndex].value;
    var var1t = select1.options[select1.selectedIndex].text;

    var select2 = document.getElementById("variable2");
    var var2 = select2.options[select2.selectedIndex].value;
    var var2t = select2.options[select2.selectedIndex].text;

    switch (var1) {
      case "op1":
        x.domain(d3.extent(data, function(d) { return d.sepalLength; })).nice();
        break;
      case "op2":
        x.domain(d3.extent(data, function(d) { return d.sepalWidth; })).nice();
        break;
      case "op3":
        x.domain(d3.extent(data, function(d) { return d.petalLength; })).nice();
        break;
      case "op4":
        x.domain(d3.extent(data, function(d) { return d.petalWidth; })).nice();
        break;
    }

    switch (var2) {
      case "op1":
        y.domain(d3.extent(data, function(d) { return d.sepalLength; })).nice();
        break;
      case "op2":
        y.domain(d3.extent(data, function(d) { return d.sepalWidth; })).nice();
        break;
      case "op3":
        y.domain(d3.extent(data, function(d) { return d.petalLength; })).nice();
        break;
      case "op4":
        y.domain(d3.extent(data, function(d) { return d.petalWidth; })).nice();
        break;
    }

    //x.domain(d3.extent(data, function(d) { return d.sepalWidth; })).nice();
    //y.domain(d3.extent(data, function(d) { return d.sepalLength; })).nice();

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
      .append("text")
        .attr("class", "label")
        .attr("x", width)
        .attr("y", -6)
        .style("text-anchor", "end")
        .text(var1t);
        //.text("Sepal Width (cm)");

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text(var2t);
        //.text("Sepal Length (cm)")

    svg.selectAll(".dot")
        .data(data)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 3.5)
        .attr("cx", function(d) { 
                      switch (var1) {
                        case "op1": return x(d.sepalLength);
                        case "op2": return x(d.sepalWidth);
                        case "op3": return x(d.petalLength);
                        case "op4": return x(d.petalWidth);
                      }
                      //return x(d.sepalWidth);
                    })
        .attr("cy", function(d) {
                      switch (var2) {
                        case "op1": return y(d.sepalLength);
                        case "op2": return y(d.sepalWidth);
                        case "op3": return y(d.petalLength);
                        case "op4": return y(d.petalWidth);
                      }
                      //return y(d.sepalLength);
                    })
        .style("fill", function(d) { return color(d.species); });

    var legend = svg.selectAll(".legend")
        .data(color.domain())
      .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    legend.append("rect")
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", color);

    legend.append("text")
        .attr("x", width - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d) { return d; });

  });

  hide_loading();
}
