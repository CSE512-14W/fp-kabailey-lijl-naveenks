d3.selection.prototype.moveToFront = function() {
    return this.each(function() {
	this.parentNode.appendChild(this);
    });
};

function midterm()
{
    currentView = 'midterm';
    show_loading();

    document.getElementById("sidebar").innerHTML = document.getElementById("midterm_sidebar").innerHTML;

    var margin = {top: 20, right: 20, bottom: 150, left: 50},
    margin2 = {top: 480, right: 10, bottom: 20, left: 50},
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
	.on("brush", brushed);

    var line = d3.svg.line()
	.x(function(d) { return x(d.question); })
	.y(function(d) { return y(d.score); });

    var area = d3.svg.area()
	.x(function(d) {return x(d.question); })
	.y0(function(d) {return y(d.low); })
	.y1(function(d) {return y(d.high); });

    var area2 = d3.svg.area()
	.x(function(d) {return x2(d.question); })
	.y0(function(d) {return y2(d.low); })
	.y1(function(d) {return y2(d.high); });

    var svg = d3.select("#canvas").append("svg")
	.attr("class", "view2")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom);
	//.append("g")
	//.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

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

    var q_scores = [8,8,8,8,12,12,12,12,12,12,31,31,31,31,31,31,31,31,31,31,31,31,31,8,8,8,8,12,12,12,1,1,1,1,1,1,1,1,1,5,5,5,5,5,13,13,13,13,13,15,15,15,1,1,1,1,1,1,1,1,1,1,1,1];

    var percentiles = [0, 0.33, 0.66, 1];

    var styles = ["area a1", "area a2", "area a3", "area a4"];
    
    var Areas = new Array();

    d3.csv("data/midterm_data.csv", function(error, data) {
	var keys = d3.keys(data[0]).filter(function(key) {return key != "question";});
	var students = keys.map(function(name) {
	    var sum = 0;
	    var index = 0;
	    return {
		name: name,
		values: data.map(function(d) {
		    var score = +d[name];
		    score = score * q_scores[index] + sum;
		    sum = score;
		    index += 1;
		    return {
			question: +d.question,
			score: score
		    };
		})
	    };
	});

	var num_questions = students[0].values.length;
	students.sort(function(a, b) {return a.values[num_questions-1].score - b.values[num_questions-1].score});

	var index, i, k;
	var bands = new Array();
	
	for (k = 0; k < percentiles.length - 1; k++) {
	    
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

	    for (i = Math.floor(students.length * percentiles[k]); i < Math.floor(students.length * percentiles[k+1]); i++) {
		index = 0;
		students[i].values.forEach(function(d) {
		    if (d.score < bands[k].values[index].low)
			bands[k].values[index].low = d.score;
		    
		    if (d.score > bands[k].values[index].high)
			bands[k].values[index].high = d.score;

		    if (bands[k].values[index].low == bands[k].values[index].high)
			bands[k].values[index].high += 1;

		    index += 1;
		});
	    }
	}

	x.domain([1, 64]);
	y.domain([0, 500]);

	x2.domain([1, 64]);
	y2.domain([0, 500]);
	
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
    });

    function brushed() {
	x.domain(brush.empty() ? x2.domain() : brush.extent());
	focus.selectAll(".area").attr("d", area);
	focus.select(".x.axis").call(xAxis);
    }
    
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

    hide_loading();
}

function midterm_question()
{
    currentView = 'midterm_question';
    show_loading();
    
    document.getElementById("sidebar").innerHTML = document.getElementById("midterm_sidebar").innerHTML;

    var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 900 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

    var x = d3.scale.linear()
	.range([0, width]),
    y = d3.scale.linear()
	.range([height, 0]);

    var xAxis = d3.svg.axis()
	.scale(x)
	.orient("bottom"),
    yAxis = d3.svg.axis()
	.scale(y)
	.orient("left");

    var svg = d3.select("#canvas").append("svg")
	.attr("class", "view2")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var percentiles = [0, 0.33, 0.66, 1];

    var styles = ["area a1", "area a2", "area a3", "area a4"];

    var q_scores = [8,8,8,8,12,12,12,12,12,12,31,31,31,31,31,31,31,31,31,31,31,31,31,8,8,8,8,12,12,12,1,1,1,1,1,1,1,1,1,5,5,5,5,5,13,13,13,13,13,15,15,15,1,1,1,1,1,1,1,1,1,1,1,1];
    
    var Bars = new Array();

    d3.csv("data/midterm_data.csv", function(error, data) {
	var keys = d3.keys(data[0]).filter(function(key) {return key != "question";});
	var students = keys.map(function(name) {
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
		})
	    };
	});

	var num_questions = students[0].values.length;
	students.sort(function(a, b) {return a.values[num_questions-1].score - b.values[num_questions-1].score});

	var index, i, k;
	var bands = new Array();

	for (k = 0; k < percentiles.length - 1; k++) {	    
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

	    for (i = Math.floor(students.length * percentiles[k]); i < Math.floor(students.length * percentiles[k+1]); i++) {
		index = 0;
		students[i].values.forEach(function(d) {
		    bands[k].values[index].y1 += d.q_score;
		    index += 1;
		});
	    }
	}

	x.domain([1, 64]);
	y.domain([0, 30]);

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
	    .text("Num answered correct ");

	var bar_width = Math.round(width / 64) - 1;
	for (i = 0; i < bands.length; i++) {
	    svg.selectAll(".bar")
		.data(bands[i].values)
		.enter().append("rect")
		.attr("class", styles[i])
		.attr("x", function(d) {return x(d.question);})
		.attr("width", bar_width)
		.attr("y", function(d) {return y(d.y1);})
		.attr("height", function(d) {return y(d.y0) - y(d.y1); });
	}

	var legend = svg.selectAll(".legend")
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

    });


    hide_loading();
}
