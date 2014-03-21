var now_showing = 1;
var now_offering = 1;
var now_coloring = 0;
var now_clustering = 8;
var demo1;
var demo2;
var data1;
var data2;
var cluster1_1;
var cluster1_2;
var cluster1_4;
var cluster1_8;
var cluster2_1;
var cluster2_2;
var cluster2_4;
var cluster2_8;



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
//give non-submissions timestamps too
function defaulttimestamps(hw, off){
    if (off == 1 ){
	    switch (hw) {
	    case 5: return 1358895453;
	    case 6: return 1359640173;
	    case 11: return 1360529471;
	    case 13: return 1361748191;
	    case 15: return 1362428898;
	    case 17: return 1362882328;}
	}
    else {
	    switch (hw) {
	    case 5: return 1381054271;
	    case 6: return 1382423851;
	    case 11: return 1382807403;
	    case 13: return 1383402021;
	    case 15: return 1384777587;
	    case 17: return 1384587218;}
    }
}
function filltime(timestamp,hw, off){
    if (timestamp == 0){
	return defaulttimestamps(hw, off);
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
		
		d.TIMESTAMP = filltime(d.TIMESTAMP, d.HW, 1);
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
		
		d.TIMESTAMP = filltime(d.TIMESTAMP, d.HW, 2);
	    });
	data2 = alldata;
    });
d3.csv("data/cluster_1_offering1.csv",  function(error, alldata) {
	alldata.forEach(function(d) {
		d.ROWID = +d.ROWID;
		d.HW = +d.HW;
		d.STUDENTID= +d.STUDENTID;
		d.TIMESTAMP= +d.TIMESTAMP;
		d.SUBMISSION= +d.SUBMISSION;
		d.SCORE = +d.SCORE;
		
		d.TIMESTAMP = filltime(d.TIMESTAMP, d.HW, 1);
	    });
	cluster1_1 = alldata;
    });
d3.csv("data/cluster_2_offering1.csv",  function(error, alldata) {
	alldata.forEach(function(d) {
		d.ROWID = +d.ROWID;
		d.HW = +d.HW;
		d.STUDENTID= +d.STUDENTID;
		d.TIMESTAMP= +d.TIMESTAMP;
		d.SUBMISSION= +d.SUBMISSION;
		d.SCORE = +d.SCORE;
		
		d.TIMESTAMP = filltime(d.TIMESTAMP, d.HW, 1);
	    });
	cluster1_2 = alldata;
    });
d3.csv("data/cluster_4_offering1.csv",  function(error, alldata) {
	alldata.forEach(function(d) {
		d.ROWID = +d.ROWID;
		d.HW = +d.HW;
		d.STUDENTID= +d.STUDENTID;
		d.TIMESTAMP= +d.TIMESTAMP;
		d.SUBMISSION= +d.SUBMISSION;
		d.SCORE = +d.SCORE;
		
		d.TIMESTAMP = filltime(d.TIMESTAMP, d.HW, 1);
	    });
	cluster1_4 = alldata;
    });
d3.csv("data/cluster_8_offering1.csv",  function(error, alldata) {
	alldata.forEach(function(d) {
		d.ROWID = +d.ROWID;
		d.HW = +d.HW;
		d.STUDENTID= +d.STUDENTID;
		d.TIMESTAMP= +d.TIMESTAMP;
		d.SUBMISSION= +d.SUBMISSION;
		d.SCORE = +d.SCORE;
		
		d.TIMESTAMP = filltime(d.TIMESTAMP, d.HW, 1);
	    });
	cluster1_8 = alldata;
    });
d3.csv("data/cluster_1_offering2.csv",  function(error, alldata) {
	alldata.forEach(function(d) {
		d.ROWID = +d.ROWID;
		d.HW = +d.HW;
		d.STUDENTID= +d.STUDENTID;
		d.TIMESTAMP= +d.TIMESTAMP;
		d.SUBMISSION= +d.SUBMISSION;
		d.SCORE = +d.SCORE;
		
		d.TIMESTAMP = filltime(d.TIMESTAMP, d.HW, 2);
	    });
	cluster2_1 = alldata;
    });
d3.csv("data/cluster_2_offering2.csv",  function(error, alldata) {
	alldata.forEach(function(d) {
		d.ROWID = +d.ROWID;
		d.HW = +d.HW;
		d.STUDENTID= +d.STUDENTID;
		d.TIMESTAMP= +d.TIMESTAMP;
		d.SUBMISSION= +d.SUBMISSION;
		d.SCORE = +d.SCORE;
		
		d.TIMESTAMP = filltime(d.TIMESTAMP, d.HW, 2);
	    });
	cluster2_2 = alldata;
    });
d3.csv("data/cluster_4_offering2.csv",  function(error, alldata) {
	alldata.forEach(function(d) {
		d.ROWID = +d.ROWID;
		d.HW = +d.HW;
		d.STUDENTID= +d.STUDENTID;
		d.TIMESTAMP= +d.TIMESTAMP;
		d.SUBMISSION= +d.SUBMISSION;
		d.SCORE = +d.SCORE;
		
		d.TIMESTAMP = filltime(d.TIMESTAMP, d.HW, 2);
	    });
	cluster2_4 = alldata;
    });
d3.csv("data/cluster_8_offering2.csv",  function(error, alldata) {
	alldata.forEach(function(d) {
		d.ROWID = +d.ROWID;
		d.HW = +d.HW;
		d.STUDENTID= +d.STUDENTID;
		d.TIMESTAMP= +d.TIMESTAMP;
		d.SUBMISSION= +d.SUBMISSION;
		d.SCORE = +d.SCORE;
		
		d.TIMESTAMP = filltime(d.TIMESTAMP, d.HW, 2);
	    });
	cluster2_8 = alldata;
    });
	  

function switchassign(foo){
    now_showing = foo;
    window[currentView](false);
}
function switchclusters(foo){
    now_clustering = foo;
    console.log(foo);
    console.log(now_clustering);
    window[currentView](false);
}

function switchoffer(foo){
    now_offering = foo;
    window[currentView](false);
}

function switchcolor(foo){
    now_coloring = foo;
    window[currentView](false);
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


function aggregate(change_bar) //grade timeline
{
    currentView = 'aggregate';
  show_loading();

  if(change_bar){
    document.getElementById("sidebar").innerHTML = document.getElementById("allgrades").innerHTML;
    document.getElementById("sidebar2").innerHTML = document.getElementById("emptybar").innerHTML;
    fill_instruction("clustered_instruction");
  }

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
      if( now_clustering == 0)
	  data = data1;
      if( now_clustering == 1)
	  data = cluster1_1;
      if( now_clustering == 2)
	  data = cluster1_2;
      if( now_clustering == 4)
	  data = cluster1_4;
      if( now_clustering == 8)
	  data = cluster1_8;
  }  else{
      demodata = demo2;
      if( now_clustering == 0)
	  data = data2;
      if( now_clustering == 1)
	  data = cluster2_1;
      if( now_clustering == 2)
	  data = cluster2_2;
      if( now_clustering == 4)
	  data = cluster2_4;
      if( now_clustering == 8)
	  data = cluster2_8;
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
    if(now_clustering != 0){
	return id;
    }
    switch (now_coloring){
    case 0: return 0; //no category
    case 1: return d_entry.gender;
    case 2: return d_entry.agegroup;
    case 3: return d_entry.background;
    case 4: return d_entry.continent;
    }
    }

    
    //six entries per student, and in sorted order. Take advantage of that
    var num_assign = 0;
    if (box1)
	num_assign++;
    if (box2)
	num_assign++;
    if (box3)
	num_assign++;
    if (box4)
	num_assign++;
    if (box5)
	num_assign++;
    if (box6)
	num_assign++;

    var student_count = (stripped_data.length/num_assign);
    var pointer = 0;
    var student = 0;
    for (student = 0;  student < student_count; student++){
	pointer = student*num_assign;
	var student_array = [];
	for (var i = 0; i < num_assign; i++){
	    student_array.push(stripped_data[pointer+i]);
	}
    	svg.append("path")
	    .attr("class", "line")
	    .attr("d", lineview(student_array))
	    .style("stroke", function(d) {return color (id_to_category(student));});
    }

    svg.selectAll(".dot")
        .data(stripped_data)
      .enter()
      .append("circle")
        .attr("class", "dot")
        .attr("r", 5.5)
        .attr("cx", function(d) { return x(hw_id_to_num(d.HW));       })
        .attr("cy", function(d) { return y(d.SCORE);    })
	.style("fill", function(d) {return color (id_to_category(d.STUDENTID)); } );

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


