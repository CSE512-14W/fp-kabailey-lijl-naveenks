d3.selection.prototype.moveToFront = function() {
    return this.each(function() {
	this.parentNode.appendChild(this);
    });
};

/* Variables */
var margin, margin2, width, height, height2;
var x, s2, y, y2;
var xAxis, xAxis2, yAxis;
var students, num_questions;
var q_scores = [8,8,8,8,12,12,12,12,12,12,31,31,31,31,31,31,31,31,31,31,31,31,31,8,8,8,8,12,12,12,1,1,1,1,1,1,1,1,1,5,5,5,5,5,13,13,13,13,13,15,15,15,1,1,1,1,1,1,1,1,1,1,1,1];
var styles = ["area a1", "area a2", "area a3", "area a4", "area a5", "area a6"];
var student_dict = {};
var demo_Nfields = ["gender"];
var demo_Qfields = ["age"];
/* Filters */

var demo_filters = {Male:true,
		    Female:true,
		    A0_10:true,
		    A10_20:true,
		    A20_30:true,
		    A30_40:true,
		    A40_50:true,
		    A50_60:true
		   };

var G_demo_filters = [{Male:true,
		       Female:true,
		       A0_10:true,
		       A10_20:true,
		       A20_30:true,
		       A30_40:true,
		       A40_50:true,
		       A50_60:true
		      },
		      {Male:true,
		       Female:true,
		       A0_10:true,
		       A10_20:true,
		       A20_30:true,
		       A30_40:true,
		       A40_50:true,
		       A50_60:true
		      }
		     ];

var ranges = [{index:0,
	       visible:true,
	       low:0.3,
	       high:0.5
	      },
	      {index:1,
	       visible:true,
	       low:0.5,
	       high:0.7
	      },
	      {index:2,
	       visible:true,
	       low:0.7,
	       high:0.9
	      },
	      {index:3,
	       visible:false,
	       low:0,
	       high:0.33
	      }
	     ];

var G_ranges = [{index:0,
		 low:0,
		 high:0.5
		},
		{index:1,
		 low:0.5,
		 high:1
		}
	       ];

var age_groups = [{low:0,
		   high:10,
		   name: "A0_10"
		  },
		  {low:10,
		   high:20,
		   name: "A10_20"
		  },
		  {low:20,
		   high:30,
		   name: "A20_30"
		  },
		  {low:30,
		   high:40,
		   name: "A30_40"
		  },
		  {low:40,
		   high:50,
		   name: "A40_50"
		  },
		  {low:50,
		   high:60,
		   name: "A50_60"
		  }];

var genders = ["M", "F"];

var partitioned = "perc";

var partitioned_demo = "gender";

/* Initialize student data */
d3.csv("data/midterm_offering1.csv", function(error, data) {
    var keys = d3.keys(data[0]).filter(function(key) {return key != "question";});
    students = keys.map(function(name) {
	var sum = 0;
	var index = 0;
	return {
	    name: name,
	    values: data.map(function(d) {
		var score = +d[name];
		score = score * q_scores[index] + sum;
		sum = score;
		q_score = +d[name];
		index += 1;
		return {
		    question: +d.question,
		    score: score,
		    q_score: q_score
		};
	    }),
	    demos: {gender: "M",
		    age: 20
		   }
	};
    });

    num_questions = students[0].values.length;
    students.sort(function(a, b) {return a.values[num_questions-1].score - b.values[num_questions-1].score});

    students.forEach(function(d) {
	student_dict[d.name] = d;
    });
});

d3.csv("data/demographics.csv", function(error, data) {
    data.forEach(function(d) {
	var st = student_dict[d.id];
	st.demos = new Object();
	
	demo_Nfields.forEach(function(e) {
	    st.demos[e] = d[e];
	});
	demo_Qfields.forEach(function(e) {
	    st.demos[e] = +d[e];
	});

    });
});
	    
/* Filter functions */

function init_filters()
{
    demo_filters = {Male:true,
		    Female:true,
		    A0_10:true,
		    A10_20:true,
		    A20_30:true,
		    A30_40:true,
		    A40_50:true,
		    A50_60:true
		   };

    ranges = [{index:0,
	       visible:true,
	       low:0.3,
	       high:0.5
	      },
	      {index:1,
	       visible:true,
	       low:0.5,
	       high:0.7
	      },
	      {index:2,
	       visible:true,
	       low:0.7,
	       high:0.9
	      },
	      {index:3,
	       visible:false,
	       low:0,
	       high:0.33
	      }
	     ];

    G_ranges = [{index:0,
		 low:0,
		 high:0.5
		},
		{index:1,
		 low:0.5,
		 high:1
		}
	       ];

    G_demo_filters = [{Male:true,
		       Female:true,
		       A0_10:true,
		       A10_20:true,
		       A20_30:true,
		       A30_40:true,
		       A40_50:true,
		       A50_60:true
		      },
		      {Male:true,
		       Female:true,
		       A0_10:true,
		       A10_20:true,
		       A20_30:true,
		       A30_40:true,
		       A40_50:true,
		       A50_60:true
		      }
		     ];
    
    partitioned = "perc";
}

function G_perc_value()
{
    G_ranges[0].low = document.getElementById("range_G1_low").value;
    G_ranges[0].high = document.getElementById("range_G1_high").value;
    G_ranges[1].low = document.getElementById("range_G2_low").value;
    G_ranges[1].high = document.getElementById("range_G2_high").value;
}

function perc_cbox(value, checked)
{
    ranges[value].visible = checked;
}

function perc_value()
{
    var i;
    for (i = 0; i < ranges.length; i++) {
	ranges[i].low = document.getElementById("range_" + i + "_low").value;
	ranges[i].high = document.getElementById("range_" + i + "_high").value;
    }
}

function demog_filter()
{
    document.getElementById("sidebar2").innerHTML = document.getElementById("demofilter").innerHTML;
}

function G_demog_filter()
{
    document.getElementById("sidebar2").innerHTML = document.getElementById("G_demofilter").innerHTML;
}

function demo_cb()
{
    demo_filters.Male = document.getElementById("G_Male").checked;
    demo_filters.Female = document.getElementById("G_Female").checked;
    
    demo_filters.A0_10 = document.getElementById("AG_0_10").checked;
    demo_filters.A10_20 = document.getElementById("AG_10_20").checked;
    demo_filters.A20_30 = document.getElementById("AG_20_30").checked;
    demo_filters.A30_40 = document.getElementById("AG_30_40").checked;
    demo_filters.A40_50 = document.getElementById("AG_40_50").checked;
    demo_filters.A50_60 = document.getElementById("AG_50_60").checked;
}

function G_demo_cb()
{
    var i;
    for (i = 0; i < 2; i++) {
	G_demo_filters[i].Male = document.getElementById("G" + i + "_Male").checked;
	G_demo_filters[i].Female = document.getElementById("G" + i + "_Female").checked;
	
	G_demo_filters[i].A0_10 = document.getElementById("AG" + i + "_0_10").checked;
	G_demo_filters[i].A10_20 = document.getElementById("AG" + i + "_10_20").checked;
	G_demo_filters[i].A20_30 = document.getElementById("AG" + i + "_20_30").checked;
	G_demo_filters[i].A30_40 = document.getElementById("AG" + i + "_30_40").checked;
	G_demo_filters[i].A40_50 = document.getElementById("AG" + i + "_40_50").checked;
	G_demo_filters[i].A50_60 = document.getElementById("AG" + i + "_50_60").checked;
    }
}


function partition() {
    if (document.getElementById("partition_perc").checked) {
	partitioned = "perc";
    } else if (document.getElementById("partition_demo").checked) {
	partitioned = "demo";
    }

    switch (document.getElementById("question_demo").value) {
    case "1":
	partitioned_demo = "gender";
	break;
    case "2":
	partitioned_demo = "age";
	break;
    default:
	partitioned_demo = "gender";
    }
}

function filter_demo(student, d_filters) {
    /* Gender */
    if (student.demos.gender == "M" && d_filters.Male == false)
	return false;
    if (student.demos.gender == "F" && d_filters.Female == false)
	return false;

    /* Age group */
    var i;
    for (i = 0; i < age_groups.length; i++) {
	if (student.demos.age >= age_groups[i].low && student.demos.age < age_groups[i].high) {
	    if (d_filters[age_groups[i].name] == false)
		return false;
	}
    }
    
    return true;
}

/* View functions */

function midterm(change_bar)
{
    currentView = 'midterm';
    show_loading();

    fill_instruction("midterm_instruction");

    if (change_bar) {
	document.getElementById("sidebar").innerHTML = document.getElementById("midterm_sidebar").innerHTML;
	document.getElementById("sidebar2").innerHTML = document.getElementById("emptybar").innerHTML;

	init_filters();
    }

    margin = {top: 20, right: 20, bottom: 150, left: 40};
    margin2 = {top: 480, right: 10, bottom: 20, left: 40};
    width = 900 - margin.left - margin.right;
    height = 600 - margin.top - margin.bottom;
    height2 = 600 - margin2.top - margin2.bottom;

    x = d3.scale.linear()
	.range([0, width]);
    x2 = d3.scale.linear()
	.range([0, width]);
    y = d3.scale.linear()
	.range([height, 0]);
    y2 = d3.scale.linear()
	.range([height2, 0]);

    xAxis = d3.svg.axis()
	.scale(x)
	.orient("bottom"),
    xAxis2 = d3.svg.axis()
	.scale(x2)
	.orient("bottom"),
    yAxis = d3.svg.axis()
	.scale(y)
	.orient("left");

    var brush = d3.svg.brush()
	.x(x2)
	.on("brush", brushed);

    var area = d3.svg.area()
	.x(function(d) {return x(d.question); })
	.y0(function(d) {return y(d.low); })
	.y1(function(d) {return y(d.high); });

    var area2 = d3.svg.area()
	.x(function(d) {return x2(d.question); })
	.y0(function(d) {return y2(d.low); })
	.y1(function(d) {return y2(d.high); });

    var MouseOver = function() {
	var myArea = d3.select(this);
	myArea.style("opacity", "1");

	myArea.moveToFront();
    }

    var MouseOut = function() {
	var myArea = d3.select(this);
	myArea.style("opacity", "0.5");

	Areas.forEach(function(d) {
	    d.moveToFront();
	});
    }

    var svg = d3.select("#canvas").append("svg")
	.attr("class", "view2")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom);

    svg.append("defs").append("clipPath")
	.attr("id", "clip")
	.append("rect")
	.attr("width", width)
	.attr("height", height);

    var focus = svg.append("g")
	.attr("class", "focus")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var context = svg.append("g")
	.attr("class", "context")
	.attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");


    var Areas = new Array();

    var index, i, k;
    var bands = new Array();

    k = 0;
    var max_score = 0;
    ranges.forEach(function(d) {
	if (d.visible) {
	    bands[k]= new Object();

	    bands[k].name = "band" + k;
	    bands[k].index = k;
	    bands[k].values = new Array();

	    for (i = 0; i < num_questions; i++) {
		bands[k].values[i] = new Object();
		bands[k].values[i].question = i + 1;
		bands[k].values[i].high = 0;
		bands[k].values[i].low = Number.MAX_VALUE;
	    }

	    for (i = Math.floor(students.length * d.low); i < Math.floor(students.length * d.high); i++) {
		index = 0;
		if (filter_demo(students[i], demo_filters)) {
		    students[i].values.forEach(function(d) {
			if (d.score < bands[k].values[index].low)
			    bands[k].values[index].low = d.score;
			
			if (d.score > bands[k].values[index].high) {
			    bands[k].values[index].high = d.score;
			    if (d.score > max_score)
				max_score = d.score;
			}

			if (bands[k].values[index].low == bands[k].values[index].high)
			    bands[k].values[index].high += 1;

			index += 1;
		    });
		}
	    }
	    k += 1;
	}
    });

    x.domain([1, 64]);
    y.domain([0, max_score + 50]);

    x2.domain([1, 64]);
    y2.domain([0, max_score + 50]);
    
    focus.append("g")
	.attr("class", "x axis")
	.attr("transform", "translate(0," + height + ")")
	.call(xAxis);

    focus.append("g")
	.attr("class", "y axis")
	.call(yAxis)
	.append("text")
	.attr("transform", "rotate(-90)")
	.attr("y", 6)
	.attr("dy", ".71em")
	.style("text-anchor", "end")
	.text("Score ");

    for (i = 0; i < bands.length; i++) {
	Areas[i] = focus.append("path")
	    .datum(bands[i].values)
	    .attr("class", styles[i])
	    .attr("d", area)
	    .on("mouseover", MouseOver)
	    .on("mouseout", MouseOut);
    }

    var legend = focus.selectAll(".legend")
	.data(bands)
	.enter()
	.append("g")
	.attr("class", "legend")
	.attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    legend.append("rect")
	.attr("x", width - 18)
	.attr("width", 18)
	.attr("height", 18)
	.attr("class", function(d) { return styles[d.index];});

    legend.append("text")
	.attr("x", width - 24)
	.attr("y", 9)
	.attr("dy", ".35em")
	.style("text-anchor", "end")
	.text(function(d) { return d.name;});


    context.append("g")
	.attr("class", "x axis")
	.attr("transform", "translate(0," + height2 + ")")
	.call(xAxis);
    
    for (i = 0; i < bands.length; i++) {
	context.append("path")
	    .datum(bands[i].values)
	    .attr("class", styles[i])
	    .attr("d", area2);
    }

    context.append("g")
	.attr("class", "x brush")
	.call(brush)
	.selectAll("rect")
	.attr("y", -6)
	.attr("height", height2 + 7);

    function brushed() {
	x.domain(brush.empty() ? x2.domain() : brush.extent());
	focus.selectAll(".area").attr("d", area);
	focus.select(".x.axis").call(xAxis);
    }
    
    hide_loading();
}

function midterm_question(change_bar)
{
    currentView = 'midterm_question';
    show_loading();
    
    if (change_bar) {
	document.getElementById("sidebar").innerHTML = document.getElementById("midterm_question_sidebar").innerHTML;
	document.getElementById("sidebar2").innerHTML = document.getElementById("emptybar").innerHTML;

	init_filters();
    }

    var margin = {top: 20, right: 30, bottom: 150, left: 20},
    margin2 = {top: 460, right: 30, bottom: 40, left: 20},
    width = 900 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom,
    height2 = 600 - margin2.top - margin2.bottom;

    var x = d3.scale.linear()
	.range([0, width]),
    x2 = d3.scale.linear()
	.range([0, width]),
    y = d3.scale.linear()
	.range([height, 0]),
    y2 = d3.scale.linear()
	.range([height2, 0]);

    var xAxis = d3.svg.axis()
	.scale(x)
	.orient("bottom"),
    xAxis2 = d3.svg.axis()
	.scale(x2)
	.orient("bottom"),
    yAxis = d3.svg.axis()
	.scale(y)
	.orient("left");

    var brush = d3.svg.brush()
	.x(x2)
	.on("brush", brushing);

    var svg = d3.select("#canvas").append("svg")
	.attr("class", "view2")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.append("defs").append("clipPath")
	.attr("id", "clip")
	.append("rect")
	.attr("width", width)
	.attr("height", height);

    var focus = svg.append("g")
	.attr("class", "focus")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var context = svg.append("g")
	.attr("class", "context")
	.attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

    var rects = new Array();
    
    var Bars = new Array();

    var bands = new Array();

    var index, i, j,k;

    k = 0;
    if (partitioned == "perc") {
	ranges.forEach(function(d) {
	    if (d.visible) {
		bands[k]= new Object();

		bands[k].name = "band" + k;
		bands[k].index = k;
		bands[k].values = new Array();

		for (i = 0; i < num_questions; i++) {
		    bands[k].values[i] = new Object();
		    bands[k].values[i].question = i + 1;
		    if (k == 0) {
			bands[k].values[i].y0 = 0;
		    } else {
			bands[k].values[i].y0 = bands[k-1].values[i].y1;
		    }
		    bands[k].values[i].y1 = bands[k].values[i].y0;
		}

		for (i = Math.floor(students.length * d.low); i < Math.floor(students.length * d.high); i++) {
		    index = 0;
		    students[i].values.forEach(function(d) {
			bands[k].values[index].y1 += d.q_score;
			index += 1;
		    });
		}
		k += 1;
	    }
	});
    } else if (partitioned == "demo") {
	var demos;
	switch (partitioned_demo) {
	case "gender":
	    demos = genders;
	    break;
	case "age":
	    demos = age_groups;
	    break;
	default:
	    demos = genders;
	}

	for (i = 0; i < demos.length; i++) {
	    bands[i] = new Object();

	    bands[i].name = "band" + i;
	    bands[i].index = i;
	    bands[i].values = new Array();

	    for (j = 0; j < num_questions; j++) {
		bands[i].values[j] = new Object();
		bands[i].values[j].question = j + 1;
		bands[i].values[j].y0 = 0;
		bands[i].values[j].y1 = 0;
	    }
	}
	
	students.forEach(function(s) {
	    if (partitioned_demo == "gender") {
		if (s.demos.gender == "M")
		    k = 0;
		else if (s.demos.gender == "F")
		    k = 1;
	    } else if (partitioned_demo == "age") {
		for (j = 0; j < age_groups.length; j++) {
		    if (s.demos.age >= age_groups[j].low && s.demos.age < age_groups[j].high) {
			k = j;
			break;
		    }
		}
	    }
	    index = 0;
	    s.values.forEach(function(d) {
		bands[k].values[index].y1 += d.q_score;
		index += 1;
	    });
	});
	
	for (i = 0; i < bands.length; i++) {
	    for (j = 0; j < num_questions; j++) {
		if (i != 0) {
		    bands[i].values[j].y0 = bands[i-1].values[j].y1;
		    bands[i].values[j].y1 += bands[i].values[j].y0;
		}
	    }
	}
    }

    x.domain([1, 64]);
    y.domain([0, students.length]);

    x2.domain([1, 64]);
    y2.domain([0, students.length]);

    focus.append("g")
	.attr("class", "x axis")
	.attr("transform", "translate(0," + height + ")")
	.call(xAxis);

    focus.append("g")
	.attr("class", "y axis")
	.call(yAxis)
	.append("text")
	.attr("transform", "rotate(-90)")
	.attr("y", 6)
	.attr("dy", ".71em")
	.style("text-anchor", "end")
	.text("Num answered correct ");

    var bar_width = Math.round(width / 64) - 1;
    for (i = 0; i < bands.length; i++) {
	rects[i] = focus.selectAll(".bar")
	    .data(bands[i].values)
	    .enter().append("rect")
	    .attr("class", styles[i])
	    .attr("x", function(d) {return x(d.question);})
	    .attr("width", bar_width)
	    .attr("y", function(d) {return y(d.y1);})
	    .attr("height", function(d) {return y(d.y0) - y(d.y1); });
    }

    var legend = focus.selectAll(".legend")
	.data(bands)
	.enter()
	.append("g")
	.attr("class", "legend")
	.attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    legend.append("rect")
	.attr("x", width - 18)
	.attr("width", 18)
	.attr("height", 18)
	.attr("class", function(d) { return styles[d.index];});

    legend.append("text")
	.attr("x", width - 24)
	.attr("y", 9)
	.attr("dy", ".35em")
	.style("text-anchor", "end")
	.text(function(d) { return d.name;});

    context.append("g")
	.attr("class", "x axis")
	.attr("transform", "translate(0," + height2 + ")")
	.call(xAxis);

    for (i = 0; i < bands.length; i++) {
	context.selectAll(".bar")
	    .data(bands[i].values)
	    .enter().append("rect")
	    .attr("class", styles[i])
	    .attr("x", function(d) {return x2(d.question);})
	    .attr("width", bar_width)
	    .attr("y", function(d) {return y2(d.y1);})
	    .attr("height", function(d) {return y2(d.y0) - y2(d.y1); });
    }
    
    context.append("g")
	.attr("class", "x brush")
	.call(brush)
	.selectAll("rect")
	.attr("y", -6)
	.attr("height", height2 + 7);

    function brushing() {
	x.domain(brush.empty() ? x2.domain() : brush.extent());
	for (i = 0; i < bands.length; i++) {
	    rects[i].attr("x", function(d) {return x(d.question);})
		.attr("width", Math.round(((width - 50)/ (x.domain()[1] - x.domain()[0]))) - 1);
	}
	focus.select(".x.axis").call(xAxis);
    }

    hide_loading();
}

function midterm_sbs(change_bar)
{
    currentView = 'midterm_question';
    show_loading();
    
    if (change_bar) {
	document.getElementById("sidebar").innerHTML = document.getElementById("midterm_compare").innerHTML;
	document.getElementById("sidebar2").innerHTML = document.getElementById("emptybar").innerHTML;
	init_filters();
    }

    var margin = {top: 20, right: 30, bottom: 150, left: 20},
    margin2 = {top: 460, right: 30, bottom: 40, left: 20},
    width = 900 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom,
    height2 = 600 - margin2.top - margin2.bottom;

    var x = d3.scale.linear()
	.range([0, width]),
    x2 = d3.scale.linear()
	.range([0, width]),
    y = d3.scale.linear()
	.range([height, 0]),
    y2 = d3.scale.linear()
	.range([height2, 0]);

    var xAxis = d3.svg.axis()
	.scale(x)
	.orient("bottom"),
    xAxis2 = d3.svg.axis()
	.scale(x2)
	.orient("bottom"),
    yAxis = d3.svg.axis()
	.scale(y)
	.orient("left")
	.tickFormat(function(d) {return (d * 100) + "%";});

    var brush = d3.svg.brush()
	.x(x2)
	.on("brush", brushing);

    var svg = d3.select("#canvas").append("svg")
	.attr("class", "view2")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.append("defs").append("clipPath")
	.attr("id", "clip")
	.append("rect")
	.attr("width", width)
	.attr("height", height);

    var focus = svg.append("g")
	.attr("class", "focus")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var context = svg.append("g")
	.attr("class", "context")
	.attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

    var groupSize = 2;

    var rects = new Array();
    
    var Bars = new Array();

    var bands = new Array();

    var index, i, j, k, bar_width;

    for (i = 0; i < 2; i++) {
	bands[i]= new Object();

	bands[i].name = "band" + i;
	bands[i].index = i;
	bands[i].values = new Array();

	for (j = 0; j < num_questions; j++) {
	    bands[i].values[j] = new Object();
	    bands[i].values[j].question = j + 1;
	    bands[i].values[j].correct = 0;
	    bands[i].values[j].total = 0;
	}

	for (k = Math.floor(students.length * G_ranges[i].low); k < Math.floor(students.length * G_ranges[i].high); k++) {
	    index = 0;
	    if (filter_demo(students[k], G_demo_filters[i])) {
		students[k].values.forEach(function(d) {
		    bands[i].values[index].correct += d.q_score;
		    bands[i].values[index].total += 1;
		    index += 1;
		});
	    }
	}
    }

    x.domain([1, 64]);
    y.domain([0, 1]);

    x2.domain([1, 64]);
    y2.domain([0, 1]);

    focus.append("g")
	.attr("class", "x axis")
	.attr("transform", "translate(0," + height + ")")
	.call(xAxis);

    focus.append("g")
	.attr("class", "y axis")
	.call(yAxis)
	.append("text")
	.attr("transform", "rotate(-90)")
	.attr("y", 6)
	.attr("dy", ".71em")
	.style("text-anchor", "end")
	.text("Percentage correct");

    bar_width = Math.round((width / 64)/groupSize);

    for (i = 0; i < bands.length; i++) {
	rects[i] = focus.selectAll(".bar")
	    .data(bands[i].values)
	    .enter().append("rect")
	    .attr("class", styles[i])
	    .attr("x", function(d) {return x(d.question + i*(1/groupSize));})
	    .attr("width", bar_width)
	    .attr("y", function(d) {return y(d.correct/d.total);})
	    .attr("height", function(d) {return height - y(d.correct/d.total); });
    }

    var legend = focus.selectAll(".legend")
	.data(bands)
	.enter()
	.append("g")
	.attr("class", "legend")
	.attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    legend.append("rect")
	.attr("x", width - 18)
	.attr("width", 18)
	.attr("height", 18)
	.attr("class", function(d) { return styles[d.index];});

    legend.append("text")
	.attr("x", width - 24)
	.attr("y", 9)
	.attr("dy", ".35em")
	.style("text-anchor", "end")
	.text(function(d) { return d.name;});

    context.append("g")
	.attr("class", "x axis")
	.attr("transform", "translate(0," + height2 + ")")
	.call(xAxis);

    for (i = 0; i < bands.length; i++) {
	context.selectAll(".bar")
	    .data(bands[i].values)
	    .enter().append("rect")
	    .attr("class", styles[i])
	    .attr("x", function(d) {return x2(d.question + i*(1/groupSize));})
	    .attr("width", bar_width)
	    .attr("y", function(d) {return y2(d.correct/d.total);})
	    .attr("height", function(d) {return height2 - y2(d.correct/d.total); });
    }
    
    context.append("g")
	.attr("class", "x brush")
	.call(brush)
	.selectAll("rect")
	.attr("y", -6)
	.attr("height", height2 + 7);

    function brushing() {
	x.domain(brush.empty() ? x2.domain() : brush.extent());

	for (i = 0; i < bands.length; i++) {
	    rects[i].attr("x", function(d) {return x(d.question + i*(1/groupSize));})
		.attr("width", Math.round((width / (x.domain()[1] - x.domain()[0])) / groupSize));
	}
	focus.select(".x.axis").call(xAxis);
    }

    hide_loading();
}
