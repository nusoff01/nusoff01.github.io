const HEIGHT_2 = 650;
const WIDTH_2 = 700;

var svg_2 = d3.select('.content2')
    .append('svg:svg')
    .attr('width', WIDTH_2)
    .attr('height', HEIGHT_2)
    .attr('class', 'chart');

var svgObj_2 = {svg : svg_2, height : HEIGHT_2, width : WIDTH_2};

var rawScores_2 = {"1st_5th-highest": 51624.66458700002, "1st_4th": 104737.22770200005, "1st_3rd": 160365.8939390002, "1st_2nd": 202113.05618199994, "1st_1st": 288292.4418539997, "3rd_1st": 153224.11213199992, "3rd_3rd": 186027.2838149999, "3rd_2nd": 195737.30589600015, "3rd_5th-highest": 119161.1005509999, "3rd_4th": 167548.21242999996, "2nd_1st": 246041.08546700008, "2nd_2nd": 194072.89434399997, "2nd_3rd": 160865.64125100014, "2nd_4th": 127339.20699300006, "2nd_5th-highest": 89348.17939000005, "5th-highest_3rd": 129599.09212600006, "5th-highest_2nd": 85765.12365500005, "5th-highest_1st": 45970.494910000016, "5th-highest_5th-highest": 360228.6716899996, "5th-highest_4th": 213664.58702700006, "4th_2nd": 145109.5736979999, "4th_3rd": 186200.14304099983, "4th_1st": 89691.86615399996, "4th_4th": 209879.009154, "4th_5th-highest": 202353.03413299983}

var data_2 = []

var total_2 = 0
for (var label in rawScores_2) {
	total_2 += rawScores_2[label];
}

for( var label in rawScores_2){
	splitScores = label.split("_");
	data_2.push({"Socio-Economic Quintile" : splitScores[0], "Math Performance Quintile" : splitScores[1], 
		       "val" : (rawScores_2[label] / total_2)})
}

var stringFormatters = {
	selectedString : function(rawVal, d) {
 		var retString = (Math.round(rawVal * 1000) / 10) + "% "
                      	+ "of the " + this.formatVarVal(d.varA) + " " + this.a + 
                     	" is in the " + this.formatVarVal(d.varB) +" " + this.b;
    	return retString;
	},
	varValue : function(varVal) {
        return varVal.replace("-highest", " (highest)")
    }
}

var bp = new BipartideGraph(data_2, 
	                        "Socio-Economic Quintile", 
	                        "Math Performance Quintile", 
	                        svgObj_2, 
						    [ "5th-highest", "4th", "3rd", "2nd", "1st"], 
							[ "5th-highest", "4th", "3rd", "2nd", "1st"], 
							{
								"1st" : "#2F345F",
								"2nd" : "#2D5172",
								"3rd" : "#288085",
								"4th" : "#1E986C",
								"5th-highest" : "#11AB32"
							}, 
							stringFormatters);


