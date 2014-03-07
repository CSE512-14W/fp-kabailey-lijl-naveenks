function view1()
{
  document.getElementById('canvas').innerHTML = "";
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
}

function view2()
{
  document.getElementById('canvas').innerHTML = "";
  var map = new Datamap({
    scope: 'usa',
    element: document.getElementById('canvas'),
    
    fills: {
      defaultFill: '#f0af0a',
      lt50: 'rgba(0,244,244,0.9)',
      gt50: 'red'
    },
    
    data: {
      AZ: {fillKey: 'lt50' },
      WA: {fillKey: 'lt50' },
      CO: {fillKey: 'gt50' },
      DE: {fillKey: 'gt50' }       
    }
  });
}

function view3()
{
  document.getElementById('canvas').innerHTML = "<svg class=\"chart\"></svg>";

  var data = [4, 8, 15, 16, 23, 42];

  var width = 420, barHeight = 20;

  var x = d3.scale.linear()
      .domain([0, d3.max(data)])
      .range([0, width]);

  var chart = d3.select(".chart")
      .attr("width", width)
      .attr("height", barHeight * data.length);

  var bar = chart.selectAll("g")
      .data(data)
    .enter().append("g")
      .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });

  bar.append("rect")
      .attr("width", x)
      .attr("height", barHeight - 1);

  bar.append("text")
      .attr("x", function(d) { return x(d) - 3; })
      .attr("y", barHeight / 2)
      .attr("dy", ".35em")
      .text(function(d) { return d; });
}

function view4()
{
  alert("Nothing in view 4 yet!");
}
