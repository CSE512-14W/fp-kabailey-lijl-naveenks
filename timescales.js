var t_now_showing = 1;
var t_now_offering = 1;
var t_now_coloring = 0;

function tswitchassign(foo){
    t_now_showing = foo;
    window[currentView](false);
}
function tswitchoffer(foo){
    t_now_offering = foo;
    window[currentView](false);
}

function tswitchcolor(foo){
    t_now_coloring = foo;
    window[currentView](false);
}





function hwtimescales(change_bar) //grade timeline
{
    currentView = 'hwtimescales';
  show_loading();

  if(change_bar){
    document.getElementById("sidebar").innerHTML = document.getElementById("timestamps").innerHTML;
    document.getElementById("sidebar2").innerHTML = document.getElementById("emptybar").innerHTML;
    fill_instruction("timestamps_instruction");
  }
  var margin = {top: 20, right: 80, bottom: 80, left: 50},
      width = 900 - margin.left - margin.right,
      height = 600 - margin.top - margin.bottom;

  var x = d3.scale.linear()
      .range([0, width]);

  var y = d3.scale.linear()
      .range([height, 0]);

  //change based on coloring schema
  var color = d3.scale.category10();
  

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

  var lineview = d3.svg.line()
      .x(function(d) {return x(d.TIMESTAMP); })
      .y(function(d) {return y(d.SCORE);  });

  var svg = d3.select("#canvas").append("svg")
      .attr("class", "view4")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


  if(t_now_offering == 1){
      demodata = demo1;
      data = data1;
  }  else{
      demodata = demo2;
      data = data2;
  }

	  var stripped_data = data.filter(function(d){ 
		  var sub1 = d.SUBMISSION <= 1;
		  switch (d.HW) {
		  case 5: return (t_now_showing==1)&&sub1;
		  case 6: return (t_now_showing==2)&&sub1;
		  case 11: return (t_now_showing==3)&&sub1;
		  case 13: return (t_now_showing==5)&&sub1;
		  case 15: return (t_now_showing==6)&&sub1;
		  case 17: return (t_now_showing==7)&&sub1;		       
		  }
	      });
	  
	  function id_to_category(id){
	      var d_entry = (demodata.filter(function(d){
			  return d.studentid == id; }))[0];
	      switch (t_now_coloring){
	      case 0: return 0; //no category
	      case 1: return d_entry.gender;
	      case 2: return d_entry.agegroup;
	      case 3: return d_entry.background;
	      case 4: return d_entry.continent;
	      }
	  }
	  
	  x.domain(d3.extent(stripped_data, function(d) { return d.TIMESTAMP;})).nice();
	  y.domain([0,110]);
	  
	  svg.append("g")
		      .attr("class", "x axis")
	      .attr("transform", "translate(0," + height + ")")
	      .call(xAxis)
	      .selectAll("text")
	      .style("text-anchor", "end")
	      .attr("transform", function(d){return "rotate(-35)"});
		      
		      svg.append("g")
		      .attr("class", "x axis")
		      .attr("transform", "translate(0," + height + ")")
		      .append("text")
		      .attr("class", "label")
		      .attr("x", width)
		      .attr("y", -6)
		      .style("text-anchor", "end")
		      .text("Timestamp");
		      
		      svg.append("g")
		      .attr("class", "y axis")
		      .call(yAxis)
		      .append("text")
		      .attr("class", "label")
		      .attr("transform", "rotate(-90)")
		      .attr("y", 6)
		      .attr("dy", ".71em")
		      .style("text-anchor", "end")
		      .text("Score");
		      
		      svg.selectAll(".dot")
		      .data(stripped_data)
		      .enter()
		      .append("circle")
		      .attr("class", "dot")
		      .attr("r", 3.5)
		      .attr("cx", function(d) { return x(d.TIMESTAMP);       })
		      .attr("cy", function(d) { return y(d.SCORE);    })
		      .style("fill", function(d) {
			      return color (id_to_category(d.STUDENTID)); } );
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

  hide_loading();
}