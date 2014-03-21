var now_showing = 1;
var now_offering = 1;
var now_coloring = 0;
var demo1;
var demo2;
var data1;
var data2;

d3.csv("data/demographics_offering1.csv", function(error, data){
	data.forEach(function(d) {
		d.studentid = +d.studentid;
	    });
	demo1 = data;
    });

d3.csv("data/demographics_offering2.csv", function(error, data){
	data.forEach(function(d) {
		d.studentid = +d.studentid;
	    });
	demo2 = data;
    });
function filltime(timestamp,hw){
    if (timestamp == 0){
	return defaulttimestamps(hw);
    }
    else{
	return timestamp;
    }
   
}

d3.csv("data/aggregate_grades_offering1.csv",  function(error, alldata) {
	alldata.forEach(function(d) {
		d.ROWID = +d.ROWID;
		d.HW = +d.HW;
		d.STUDENTID= +d.STUDENTID;
		d.TIMESTAMP= +d.TIMESTAMP;
		d.SUBMISSION= +d.SUBMISSION;
		d.SCORE = +d.SCORE;
		
		d.TIMESTAMP = filltime(d.TIMESTAMP, d.HW);
	    });
	data1 = alldata;
    });
d3.csv("data/aggregate_grades_offering2.csv",  function(error, alldata) {
	alldata.forEach(function(d) {
		d.ROWID = +d.ROWID;
		d.HW = +d.HW;
		d.STUDENTID= +d.STUDENTID;
		d.TIMESTAMP= +d.TIMESTAMP;
		d.SUBMISSION= +d.SUBMISSION;
		d.SCORE = +d.SCORE;
		
		d.TIMESTAMP = filltime(d.TIMESTAMP, d.HW);
	    });
	data2 = alldata;
    });
	  

function switchassign(foo){
    now_showing = foo;
    window[currentView]();
}

function switchoffer(foo){
    now_offering = foo;
    window[currentView]();
}

function switchcolor(foo){
    now_coloring = foo;
    window[currentView]();
}

function hw_id_to_num(hw){
	    switch (hw) {
	    case 5: return 1;
	    case 6: return 2;
	    case 11: return 3;
	    case 13: return 5;
	    case 15: return 6;
	    case 17: return 7;}
}


function aggregate() //grade timeline
{
    currentView = 'aggregate';
  show_loading();

    document.getElementById("sidebar").innerHTML = document.getElementById("allgrades").innerHTML;

  var margin = {top: 20, right: 80, bottom: 30, left: 50},
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
      .x(function(d) {return x(hw_id_to_num(d.HW)); })
      .y(function(d) {return y(d.SCORE);  });

  var svg = d3.select("#canvas").append("svg")
      .attr("class", "view4")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  if(now_offering == 1){
      demodata = demo1;
      data = data1;
  }  else{
      demodata = demo2;
      data = data2;
  }

	  x.domain([0,8]);
	  y.domain([0,110]); //Cap at reasonable height, ignore massive extra credit
	  
	  svg.append("g")
	      .attr("class", "x axis")
	      .attr("transform", "translate(0," + height + ")")
	      .call(xAxis)
	      .append("text")
	      .attr("class", "label")
	      .attr("x", width)
	      .attr("y", -6)
	      .style("text-anchor", "end")
	      .text("Assignment");

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
   
    var stripped_data = data.filter(function(d){ 
	    var sub2 = d.SUBMISSION==1;
	    switch (d.HW) {
	    case 5: return sub2 && box1;
	    case 6: return sub2 && box2;
	    case 11: return sub2 && box3;
	    case 13: return sub2 && box4;
	    case 15: return sub2 && box5;
	    case 17: return sub2 && box6;		       
	    }});

    function id_to_category(id){
    var d_entry = (demodata.filter(function(d){
		return d.studentid == id; }))[0];
    
    switch (now_coloring){
    case 0: return 0; //no category
    case 1: return d_entry.gender;
    case 2: return d_entry.agegroup;
    case 3: return d_entry.background;
    case 4: return d_entry.continent;
    }
    }

    
    console.log(stripped_data.length/6);
    //six entries per student, and in sorted order. Take advantage of that
    var student_count = (stripped_data.length/6);
    var pointer = 0;
    var student = 0;
    for (student = 0;  student < student_count; student++){
	pointer = student*6;
	var student_array = [];
	for (var i = 0; i < 6; i++){
	    student_array.push(stripped_data[pointer+i]);
	}
    	svg.append("path")
	    .attr("class", "line")
	    .attr("d", lineview(student_array))
	    .style("stroke", "grey");
    }

    svg.selectAll(".dot")
        .data(stripped_data)
      .enter()
      .append("circle")
        .attr("class", "dot")
        .attr("r", 3.5)
        .attr("cx", function(d) { return x(hw_id_to_num(d.HW));       })
        .attr("cy", function(d) { return y(d.SCORE);    })
	.style("fill", function(d) {return color (id_to_category(d.STUDENTID)); } );


  hide_loading();
}


