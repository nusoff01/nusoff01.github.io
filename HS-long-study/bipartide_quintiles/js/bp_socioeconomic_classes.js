// const HEIGHT = 650;
// const WIDTH = 700;

var chartDiv = document.getElementById("bipartide-socioeconomic-classes");
var WIDTH = Math.min(Math.max(chartDiv.clientWidth, 300), 900);
var HEIGHT = Math.min(Math.max(chartDiv.clientHeight, 300), 800);

var svg = d3.select('#bipartide-socioeconomic-classes')
    .append('svg:svg')
    .attr('width', WIDTH)
    .attr('height', HEIGHT)
    .attr('class', 'chart');

var svgObj = {svg : svg, height : HEIGHT, width : WIDTH};

var colors = {
	"1st" : "#2F345F",
	"2nd" : "#2D5172",
	"3rd" : "#288085",
	"4th" : "#1E986C",
	"5th-highest" : "#11AB32"
}

// var rawScores = {"1st_5th-highest": 51624.66458700002, "1st_4th": 104737.22770200005, "1st_3rd": 160365.8939390002, "1st_2nd": 202113.05618199994, "1st_1st": 288292.4418539997, "3rd_1st": 153224.11213199992, "3rd_3rd": 186027.2838149999, "3rd_2nd": 195737.30589600015, "3rd_5th-highest": 119161.1005509999, "3rd_4th": 167548.21242999996, "2nd_1st": 246041.08546700008, "2nd_2nd": 194072.89434399997, "2nd_3rd": 160865.64125100014, "2nd_4th": 127339.20699300006, "2nd_5th-highest": 89348.17939000005, "5th-highest_3rd": 129599.09212600006, "5th-highest_2nd": 85765.12365500005, "5th-highest_1st": 45970.494910000016, "5th-highest_5th-highest": 360228.6716899996, "5th-highest_4th": 213664.58702700006, "4th_2nd": 145109.5736979999, "4th_3rd": 186200.14304099983, "4th_1st": 89691.86615399996, "4th_4th": 209879.009154, "4th_5th-highest": 202353.03413299983}

var rawScores = {"3rd_attending": 413243.45243299956, "3rd_notAttending": 143036.0559360001, "2nd_attending": 353394.4730409994, "2nd_notAttending": 169620.62520700018, "5th-highest_notAttending": 47877.622519, "5th-highest_attending": 676331.7825009978, "1st_notAttending": 170456.18981900014, "1st_attending": 305041.35588899977, "4th_notAttending": 105093.5274199999, "4th_attending": 519330.37887500075}
var data = []

var total = 0
for (var label in rawScores) {
	total += rawScores[label];
}

for( var label in rawScores){
	splitScores = label.split("_");
	data.push({"Socio-Economic Quintile" : splitScores[0], "Taking Classes?" : splitScores[1], 
		       "val" : (rawScores[label] / total)})
}



var formatSelectedString = function(rawVal, d) {
	var retString = (Math.round(rawVal * 1000) / 10) + "% "
	if(d.side == "A"){
		retString +=  "of the " + this.formatVarVal(d.varA) + " " + this.a + 
                     " is " + ((this.formatVarVal(d.varB) == "attending") ?
                      				("attending post-secondary classes") :
                      				("not attending post-secondary classes"));
	} else {
		retString += "of those " + ((this.formatVarVal(d.varB) == "attending") ?
                      				("attending post-secondary classes") :
                      				("not attending post-secondary classes")) +
								" are in the " + this.formatVarVal(d.varA) +" " + this.a
	}
    return retString;
}

var stringFormat = {
	selectedString : formatSelectedString,
	varValue : function(varVal) {
        varVal = varVal.replace("-highest", " (highest)")
        if(varVal == "notAttending") {
        	return "not attending";
        }
        return varVal
    }
}


var bp = new BipartideGraph(data, "Socio-Economic Quintile", "Taking Classes?", svgObj, 
			[ "5th-highest", "4th", "3rd", "2nd", "1st"], 
			[ "attending", "notAttending"], colors, stringFormat);