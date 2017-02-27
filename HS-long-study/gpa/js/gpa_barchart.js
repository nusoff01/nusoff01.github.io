// gpa_barchart.js


var chartDiv = document.getElementById("bar-chart");
var chart = d3.select(chartDiv).append("svg")
                .attr("class", "chart")

var t = d3.transition().duration(500);



function redraw(){
    var width = Math.min(Math.max(chartDiv.clientWidth, 300), 900);
    var height = Math.min(Math.max(chartDiv.clientHeight, 300), 800);
    //TODO make sure this ratio isn't too extreme

    chart
      .attr("width", width)
      .attr("height", height);

    chart.selectAll(".titleText")
    .transition().duration(500)
            .attr("x", width / 2)
            .attr("font-size", function(d){
                return Math.min(chart.attr("width") / 30, 28)
            });

    chart.selectAll(".quints")
    .transition().duration(500)
            .attr("x", function(d, i) {
                return (i + 1) * (chart.attr("width") / 6) 
            })
            .attr("y", function(){
                return chart.attr("height") - 30
            })
            .attr("font-size", function() {
                return Math.min(Math.max(chart.attr("width") / 50, 10), 20)
            })

    //Width numbers
    var dataLength = d3.selectAll(".gpa-bars").size();
    var midpoint_i = dataLength / 2;
    var midpoint_position = chart.attr("width") / 2;
    var barWidth = calcBarWidth(dataLength, chart.attr("width"));
    var spacing = barWidth / 4;

    //Height Numbers
    var dataSetIndex = d3.select(".selected-quintile").attr("quintileNumber")
    var sum = 0;
    d3.selectAll(".gpa-bars").each(function(d){
        sum += d.quintCounts[dataSetIndex]
    });

    chart.selectAll(".gpa-bars")
            .transition().duration(500)
            .attr("x", function(d, i){
                return barX(midpoint_position, midpoint_i, spacing, barWidth, i);
            })
            .attr("y", function(d){
                return height - 80 - calcBarHeight(chart, d.quintCounts[dataSetIndex] / sum, height)
            })
            .attr("width", barWidth)
            .attr("height", function(d){
                return calcBarHeight(chart, d.quintCounts[dataSetIndex] / sum, height)
            })

    chart.selectAll(".gpa-bar-names")
        .transition().duration(500)
        .attr("x", function(d, i){
            return barX(midpoint_position, midpoint_i, spacing, barWidth, i) + (barWidth / 2);
        })
        .attr("text-anchor", "middle")
        .attr("y", function(d){
            return height - 65
        })
        .attr("font-size", function(d) {
            return Math.min(Math.max(chart.attr("width") / 50, 10), 20)
        });

    chart.selectAll(".gpa-val-text")
        .transition().duration(500)
        .attr("x", function(d, i) {
            return barX(midpoint_position, midpoint_i, spacing, barWidth, i) + (barWidth / 2);
        })
        .attr("y", function(d,i) {
            var barHeight = calcBarHeight(chart, d.quintCounts[dataSetIndex] / sum, height);
            var yPos = height - 80 - barHeight;
            if(barHeight > (fontSizeVal(barWidth) + 10)){
                yPos += fontSizeVal(barWidth) + 10
            }
            return yPos - 5;
        })
        .attr("fill", function(d) {
            var barHeight = calcBarHeight(chart, d.quintCounts[dataSetIndex] / sum, height);
            return (barHeight > (fontSizeVal(barWidth) + 10)) ? "white" : "black"
        })
        .attr("font-size", function(d){
            return (barWidth / 3);
        })
        .text(function(d){
            return d3.format(".1%")( d.quintCounts[dataSetIndex] / sum);
        });
}

function fontSizeVal (barWidth) {
    return (barWidth / 3.7);
}

function barX(mp_pos, mp_i, spacing, barWidth, i) {
    return mp_pos + ((i - mp_i) * (barWidth + spacing)) + (spacing/2)
}

function calcBarWidth (dataLength, width) {
    var uncheckedWidth = width / (dataLength + 3);
    return Math.min(uncheckedWidth, 55);
} 

function calcBarHeight (svg, yVal, height) {
    var bottom = height - 50;
    var titleOffset = svg.select(".titleText").node().getBBox().height;
    var top = Number(svg.select(".titleText").attr("y")) + titleOffset
    return (bottom - top) * yVal / .3
}


// TEXT

function createTitle(svg) {
    svg.append("text")
        .attr("y", 30)
        .attr("class", "titleText")
        .attr("text-anchor", "middle")
        .text("Weighted GPA Distribution by Socio-Economic Quintile")
}

function createQuintileSelectors(svg) {
    quints = ["1st [lowest]", "2nd", "3rd", "4th", "5th (highest)"]

    svg.selectAll("quints").data(quints).enter().append("text")
            .attr("x", 100)
            .attr("y", 100)
            .attr("class", "not-selected-quintile quints")
            .attr("quintileNumber", function(d, i){return i+1})
            .attr("text-anchor", "middle")
            .attr("id", function(d, i){return "quint"+ (i + 1);})
            .attr("cursor", "pointer")
            .text(function(d) {
                return d
            });
    svg.select("#quint5").attr("class", "selected-quintile quints");

    svg.selectAll(".quints")
        .on("click", function(d) {
                svg.selectAll(".quints").attr("class", "not-selected-quintile quints");
                d3.select(this).attr("class", "selected-quintile quints")
                redraw();
            });
}

function createBars(svg, gpaArray) {
    svg.selectAll("gpaBars").data(gpaArray).enter().append("rect")
            .attr("class", "gpa-bars")
            .attr("fill", "black")
}

function createBarLabels(svg, gpaArray) {
    svg.selectAll("gpaBarNames").data(gpaArray).enter().append("text")
            .attr("fill", "black")
            .attr("class", "gpa-bar-names")
            .text(function(d){
                return d.gpa
            });

    svg.selectAll("gpaValText").data(gpaArray).enter().append("text")
            .attr("fill", "black")
            .attr("text-anchor", "middle")
            .attr("class", "gpa-val-text")
}

createTitle(chart);
createQuintileSelectors(chart);
d3.json("/gpa/data/gpa.json", function(data){
    var gpaArray = [];
    for (var gpa in data){
        if( Number(gpa) > 0 && Number(gpa) < 5)
        gpaArray.push({"gpa" : gpa, "quintCounts" : data[gpa]});
    }
    gpaArray.sort(function(d, g){
        return Number(d.gpa) - Number(g.gpa)
    });

    createBars(chart, gpaArray);
    createBarLabels(chart, gpaArray);
    redraw();
    window.addEventListener("resize", redraw);
})


    
