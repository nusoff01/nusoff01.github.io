const BC_HEIGHT = 500;

totalWidth = document.documentElement.clientWidth;

const BC_WIDTH = Math.min(700, totalWidth - 60);

var BAR_BC_WIDTH = BC_WIDTH * .07;

var chart = d3.select('.bar-chart')
    .append('svg:svg')
    .attr('width', BC_WIDTH)
    .attr('height', BC_HEIGHT)
    .attr('class', 'chart');


$(window).resize(function(d){
	console.log($(window).width())
})


//Creates an array of number of students for a GPA, filtered using the 
// "popVariableFunc" which takes in a GPA population and returns some 
// subset of that population
function createGPAArray (gpaMap, popVariableFunc) {
	var scoresArray = []
	for (var d in gpaMap){
		gpa = Number(d);
		if(gpa > 0){
			if(gpa == .25){
				gpa = 0;
			}
			if(gpa == 4.75) {
				gpa = 5;
			}
			var studentNumber = popVariableFunc(gpaMap[d])
			scoresArray.push({"gpa" : gpa, "weightedStudents" : studentNumber});
		}
	}
	return scoresArray;
}

function createTitle(svg) {
	svg.append("text")
		.attr("x", BC_WIDTH/2)
		.attr("y", 20)
		.attr("class", "title-text")
		.attr("text-anchor", "middle")
		.text("Weighted GPA Distribution by Socio-Economic Quintile")
}

function createQuintileTexts(svg, data) {
	quints = ["1st [lowest]", "2nd", "3rd", "4th", "5th (highest)"]
	var currText;


	for (var i = 0; i < 5; i++) {
		currText = svg.append("text")
			.attr("x", (BC_WIDTH/6) * (i) + BC_WIDTH/6)
			.attr("y", BC_HEIGHT - 5)
			.attr("quint", i+1)
			.attr("class", "not-selected-quintile")
			.text(quints[i])
			.attr("text-anchor", "middle")
			.attr("cursor", "pointer")
			.on("click", function(d){
				d3.select(".selected-quintile").attr("class", "not-selected-quintile");
				d3.select(this).attr("class", "selected-quintile");
				setQuintile(data, svg, this.getAttribute("quint"), "A")
			})
	}
	currText.attr("class", "selected-quintile")
}

function applyData(svg, scoresArray, series) {
	var scale = createStudentScale(scoresArray);
	// create score dict
	var scoreDict = {}
	scoresArray.forEach(function(d){
		scoreDict["gpa" + (d.gpa * 100) + series] = d.weightedStudents;
	})
	var scaledTotal = d3.sum(scoresArray, function(d){return d.weightedStudents})

	svg.selectAll("." + series)
			.transition()
			.duration(500)
			.ease(d3.easeLinear)
    		.attr("y", function(d){
    			return BC_HEIGHT - 60 - scale(scoreDict[this.id] / scaledTotal);
    		})
    		.attr("height", function(d){
    			return scale(scoreDict[this.id] / scaledTotal);
    		})
    //reposition text elements 
    svg.selectAll("." + series + "ValLabel")
  			.transition()
			.duration(500)
			.ease(d3.easeLinear)
			.attr("y", function(d){
				var top = barY(scoreDict[d3.select(this).attr("barID")] / scaledTotal, scale);
				if(scale(scoreDict[d3.select(this).attr("barID")] / scaledTotal) > 15){
					return top + 13
				}
				return top - 2
    		})
    		.style("fill", function(d){
    			var top = barY(scoreDict[d3.select(this).attr("barID")] / scaledTotal, scale);
	    		if(scale(scoreDict[d3.select(this).attr("barID")] / scaledTotal) > 15){
	    			return "white"
	    		} 
	    		return "black"
	    	})
	    	.text(function(d){ return d3.format(".1%")( scoreDict[d3.select(this).attr("barID")] / scaledTotal);})
}

function barX(d, studentScale) {
       		return Number(d.gpa) * 2.5 * BAR_BC_WIDTH + BAR_BC_WIDTH/2;
}

function barY(weightedStudents, studentScale){
       		return BC_HEIGHT - 60 - studentScale(weightedStudents)
    	}

function createBars(svg, scoresArray, studentScale, series){

    var barG = svg.selectAll("bars").data(scoresArray).enter().append("g")

    var scaledTotal = d3.sum(scoresArray, function(d){return d.weightedStudents})

    barG.append("rect")
    	.attr("x", function(d){
    		return barX(d, studentScale);
    	})
    	.attr("y", function(d){
       		return barY(d.weightedStudents / scaledTotal, studentScale);
    	})
    	.attr("class", series)
    	.attr("width", BAR_BC_WIDTH)
    	.attr("height", function(d){
    		return studentScale(d.weightedStudents / scaledTotal)
    	})
    	.attr("id", function(d){return "gpa" + (d.gpa * 100) + series})
    	.style("fill", "black")
    	.style("fill-opacity", .9);
    barG.append("text")
    		.attr("class", series + "ValLabel")
    		.attr("barID", function(d){return "gpa" + (d.gpa * 100) + series})
    		.attr("x", function(d){
    		return barX(d, studentScale) + BAR_BC_WIDTH / 2;
	    	})
	    	.attr("y", function(d){
	    		if(studentScale(d.weightedStudents / scaledTotal) > 15) {
	    			return barY(d.weightedStudents / scaledTotal, studentScale) + 13;
	    		} 
	    		return barY(d.weightedStudents / scaledTotal, studentScale) - 3;
	    	})
	    	.style("fill", function(d){
	    		if(studentScale(d.weightedStudents / scaledTotal) > 15) {
	    			return "white"
	    		} 
	    		return "black"
	    	})
	    	.style("text-anchor", "middle")
	    	.style("font-size", "12px")
    		.text(function(d){
    			return d3.format(".1%")( d.weightedStudents / scaledTotal);
    		})

   	return barG;
}

function createStudentScale(scoresArray) {
	return d3.scaleLinear()
		.domain([0,.27])
        .range([0,BC_HEIGHT - 100]);
}

function createFrequencyLabel(svg, scoresArray, studentScale, series) {
	return svg.selectAll("freqLabels").data(scoresArray).enter().append("text")
    	.attr("x", function(d){
    		return Number(d.gpa) * 2.5 * BAR_BC_WIDTH + BAR_BC_WIDTH/2;
    	})
    	.attr("y", function(d){
       		return BC_HEIGHT - 60 - studentScale(d.weightedStudents)
    	})
    	.attr("class", series)
    	.attr("width", BAR_BC_WIDTH)
    	.attr("height", function(d){
    		return studentScale(d.weightedStudents)
    	})
    	.attr("id", function(d){return "gpa" + (d.gpa * 100) + series})
    	.style("fill", "black")
    	.style("fill-opacity", .9)
}

function createLabels(svg, scoresArray) {
	return svg.selectAll("gpaLabel").data(scoresArray).enter().append("text")
				.attr("x", function(d){
    				return Number(d.gpa) * 2.5 * BAR_BC_WIDTH + (BAR_BC_WIDTH);
    			})
    			.attr("y", function(d){return BC_HEIGHT - 40 })
    			.style("text-anchor", "middle")
    			.text(function(d){
    				if(d.gpa == 0){
						d.gpa = .25;
					}
					if(d.gpa == 5) {
						d.gpa = 4.75;
					}
    				return d.gpa })
}

function setQuintile(data, chart, quintile, series) {
	var newScoresArray = createGPAArray(data, (e) => {
    	return Math.round(e[String(quintile)]);
    });
    applyData(chart, newScoresArray, series);
}

d3.json("/gpa/data/gpa.json", function(data){
	var scoresArray = createGPAArray(data, (e) => {
		return Math.round(e["5"])
	});
    var studentScale = createStudentScale(scoresArray);
    var bars = createBars(chart, scoresArray, studentScale, "A");
    var labels = createLabels(chart, scoresArray);

    createTitle(chart);
    createQuintileTexts(chart, data);
});