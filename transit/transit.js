/*******************GLOBAL VARIABLES*******************/
var latLoc = 0; //location of the user
var longLoc = 0; //location of the user
var lsz = 53;

var Col0 = Array([lsz]);
var Col1 = Array([lsz]);
var Col2 = Array([lsz]);
var Col3 = Array([lsz]);

Col0[0] = "Blue";
Col1[0] = "Airport";
Col2[0] = "42.374262";
Col3[0] = "-71.030395";

Col0[1] = "Blue";
Col1[1] = "Aquarium";
Col2[1] = "42.359784";
Col3[1] = "-71.051652";

Col0[2] = "Blue";
Col1[2] = "Beachmont";
Col2[2] = "42.39754234";
Col3[2] = "-70.99231944";

Col0[3] = "Blue";
Col1[3] = "Bowdoin";
Col2[3] = "42.361365";
Col3[3] = "-71.062037";

Col0[4] = "Blue";
Col1[4] = "Government Center";
Col2[4] = "42.359705";
Col3[4] = "-71.05921499999999";

Col0[5] = "Blue";
Col1[5] = "Maverick";
Col2[5] = "42.36911856";
Col3[5] = "-71.03952958000001";

Col0[6] = "Blue";
Col1[6] = "Orient Heights";
Col2[6] = "42.386867";
Col3[6] = "-71.00473599999999";

Col0[7] = "Blue";
Col1[7] = "Revere Beach";
Col2[7] = "42.40784254";
Col3[7] = "-70.99253321";

Col0[8] = "Blue";
Col1[8] = "State Street";
Col2[8] = "42.358978";
Col3[8] = "-71.057598";

Col0[9] = "Blue";
Col1[9] = "Suffolk Downs";
Col2[9] = "42.39050067";
Col3[9] = "-70.99712259";

Col0[10] = "Blue";
Col1[10] = "Wonderland";
Col2[10] = "42.41342";
Col3[10] = "-70.991648";

Col0[11] = "Blue";
Col1[11] = "Wood Island";
Col2[11] = "42.3796403";
Col3[11] = "-71.02286539000001";

Col0[12] = "Orange";
Col1[12] = "Back Bay";
Col2[12] = "42.34735";
Col3[12] = "-71.075727";

Col0[13] = "Orange";
Col1[13] = "Chinatown";
Col2[13] = "42.352547";
Col3[13] = "-71.062752";

Col0[14] = "Orange";
Col1[14] = "Community College";
Col2[14] = "42.373622";
Col3[14] = "-71.06953300000001";

Col0[15] = "Orange";
Col1[15] = "Downtown Crossing";
Col2[15] = "42.355518";
Col3[15] = "-71.060225";

Col0[16] = "Orange";
Col1[16] = "Forest Hills";
Col2[16] = "42.300523";
Col3[16] = "-71.113686";

Col0[17] = "Orange";
Col1[17] = "Green Street";
Col2[17] = "42.310525";
Col3[17] = "-71.10741400000001";

Col0[18] = "Orange";
Col1[18] = "Haymarket";
Col2[18] = "42.363021";
Col3[18] = "-71.05829";

Col0[19] = "Orange";
Col1[19] = "Jackson Square";
Col2[19] = "42.323132";
Col3[19] = "-71.099592";

Col0[20] = "Orange";
Col1[20] = "Malden Center";
Col2[20] = "42.426632";
Col3[20] = "-71.07411";

Col0[21] = "Orange";
Col1[21] = "Mass Ave";
Col2[21] = "42.341512";
Col3[21] = "-71.083423";

Col0[22] = "Orange";
Col1[22] = "North Station";
Col2[22] = "42.365577";
Col3[22] = "-71.06129";

Col0[23] = "Orange";
Col1[23] = "Oak Grove";
Col2[23] = "42.43668";
Col3[23] = "-71.07109699999999";

Col0[24] = "Orange";
Col1[24] = "Roxbury Crossing";
Col2[24] = "42.331397";
Col3[24] = "-71.095451";

Col0[25] = "Orange";
Col1[25] = "Ruggles";
Col2[25] = "42.336377";
Col3[25] = "-71.088961";

Col0[26] = "Orange";
Col1[26] = "State Street";
Col2[26] = "42.358978";
Col3[26] = "-71.057598";

Col0[27] = "Orange";
Col1[27] = "Stony Brook";
Col2[27] = "42.317062";
Col3[27] = "-71.104248";

Col0[28] = "Orange";
Col1[28] = "Sullivan";
Col2[28] = "42.383975";
Col3[28] = "-71.076994";

Col0[29] = "Orange";
Col1[29] = "Tufts Medical";
Col2[29] = "42.349662";
Col3[29] = "-71.063917";

Col0[30] = "Orange";
Col1[30] = "Wellington";
Col2[30] = "42.40237";
Col3[30] = "-71.077082";

Col0[31] = "Red";
Col1[31] = "Alewife";
Col2[31] = "42.395428";
Col3[31] = "-71.142483";

Col0[32] = "Red";
Col1[32] = "Andrew";
Col2[32] = "42.330154";
Col3[32] = "-71.057655";

Col0[33] = "Red";
Col1[33] = "Ashmont";
Col2[33] = "42.284652";
Col3[33] = "-71.06448899999999";

Col0[34] = "Red";
Col1[34] = "Braintree";
Col2[34] = "42.2078543";
Col3[34] = "-71.0011385";

Col0[35] = "Red";
Col1[35] = "Broadway";
Col2[35] = "42.342622";
Col3[35] = "-71.056967";

Col0[36] = "Red";
Col1[36] = "Central Square";
Col2[36] = "42.365486";
Col3[36] = "-71.103802";

Col0[37] = "Red";
Col1[37] = "Charles/MGH";
Col2[37] = "42.361166";
Col3[37] = "-71.070628";

Col0[38] = "Red";
Col1[38] = "Davis";
Col2[38] = "42.39674";
Col3[38] = "-71.121815";

Col0[39] = "Red";
Col1[39] = "Downtown Crossing";
Col2[39] = "42.355518";
Col3[39] = "-71.060225";

Col0[40] = "Red";
Col1[40] = "Fields Corner";
Col2[40] = "42.300093";
Col3[40] = "-71.061667";

Col0[41] = "Red";
Col1[41] = "Harvard Square";
Col2[41] = "42.373362";
Col3[41] = "-71.118956";

Col0[42] = "Red";
Col1[42] = "JFK/UMass";
Col2[42] = "42.320685";
Col3[42] = "-71.052391";

Col0[43] = "Red";
Col1[43] = "Kendall/MIT";
Col2[43] = "42.36249079";
Col3[43] = "-71.08617653";

Col0[44] = "Red";
Col1[44] = "North Quincy";
Col2[44] = "42.275275";
Col3[44] = "-71.029583";

Col0[45] = "Red";
Col1[45] = "Park Street";
Col2[45] = "42.35639457";
Col3[45] = "-71.0624242";

Col0[46] = "Red";
Col1[46] = "Porter Square";
Col2[46] = "42.3884";
Col3[46] = "-71.11914899999999";

Col0[47] = "Red";
Col1[47] = "Quincy Adams";
Col2[47] = "42.233391";
Col3[47] = "-71.007153";

Col0[48] = "Red";
Col1[48] = "Quincy Center";
Col2[48] = "42.251809";
Col3[48] = "-71.005409";

Col0[49] = "Red";
Col1[49] = "Savin Hill";
Col2[49] = "42.31129";
Col3[49] = "-71.053331";

Col0[50] = "Red";
Col1[50] = "Shawmut";
Col2[50] = "42.29312583";
Col3[50] = "-71.06573796000001";

Col0[51] = "Red";
Col1[51] = "South Station";
Col2[51] = "42.352271";
Col3[51] = "-71.05524200000001";

Col0[52] = "Red";
Col1[52] = "Wollaston";
Col2[52] = "42.2665139";
Col3[52] = "-71.0203369";
//to convert from alphabetical order to order of stations
var blueOrder = new Array(10,7,2,9,6,11,0,5,1,8,4,3);
var orangeOrder = new Array(16,17,27,19,24,25,21,12,29,13,15,26,18,22,14,28,30,20,23);
var redOrderBase = new Array(31,38,46,41,36,43,37,45,39,51,35,32,42);
var redOrderBranch1 = new Array(42,49,40,50,33);
var redOrderBranch2 = new Array(42,44,52,48,47,34);


var loc = new google.maps.LatLng(42.26, -71);
var trips = new Array();
var myOptions = {
	zoom: 13, 
	center: loc,
	mapTypeId: google.maps.MapTypeId.ROADMAP,
	streetViewControl: false
};




var scheduleData;
var map;
var marker;
var infowindow = new google.maps.InfoWindow();
var places;
var request = new XMLHttpRequest();
var line = "none";
var trainImg = {
    	url: 'trainPlain.png',
    };

//initialize the map 
function init()
{
	map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
	getMyLocation();
	
}

//get the location of the user and render the map
function getMyLocation()
{
	if (navigator.geolocation) { // the navigator.geolocation object is supported on your browser
		
		navigator.geolocation.getCurrentPosition(function(position) {
		latLoc = position.coords.latitude;
		longLoc = position.coords.longitude;
		renderMap();
		});
	}
	else {
		alert("Geolocation not supported, sorry!");
	}
}

//converts seconds to a string of minutes and seconds seperated by ':'
function secsToString(secs){
	var seconds = secs % 60;
	if(seconds < 10)
		seconds = "0" + seconds;
	var minutes = Math.floor(secs/60);
	var returnString = "" + minutes + ":" + seconds;
	return returnString;
}

//renders the map displayed to the user by loading data from the mapper API 
//and calling callback() when loaded
function renderMap()
{
	me = new google.maps.LatLng(latLoc, longLoc);
	map.panTo(me);
    request.open("GET", "http://mbtamap.herokuapp.com/mapper/rodeo.json", true);
    request.send(null);
    request.onreadystatechange = callback;
}

//creates a google maps marker out of a location, a title, an image, and text to go in the info box
function createMarker(loc,name,img,infoText)
{
	var marker = new google.maps.Marker({
		title: name,
		map: map,
		position: loc
	});
	if(img != "none"){
		marker.setIcon(img);
	}
	google.maps.event.addListener(marker, 'click', function() {
		infowindow.close();
		infowindow.setContent(infoText);
		infowindow.open(map, this);
	});
	return marker;
}

//given a location, a list of stations, and an order of those stations,
//findClosest() finds the closest station and distance to it and returns it
function findClosest(loc, stations, order){
	var closestInd = 0;
	var closestVal = 99999;
	var lat2 = loc.lat(); 
	var lon2 = loc.lng();
	for(var i = 0; i < stations.length; i++){

		var toCheck =  stations[i];
		var lat1 = toCheck.lat(); 
		var lon1 = toCheck.lng();

		var R = 6371; // km
		var x1 = lat2-lat1;
		var dLat = x1.toRad();  
		var x2 = lon2-lon1;
		var dLon = x2.toRad();  
		var a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
		                Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * 
		                Math.sin(dLon/2) * Math.sin(dLon/2);  
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
		var d = R * c;
		if(d < closestVal){
			closestInd = i;
			closestVal = d;
		}
	}
	closestObj = new Object();
	closestObj.value = closestVal;
	closestObj.name = Col1[order[closestInd]];
	return closestObj;
}

//renders the path along with the info window at each of the stops
function renderPath(order){
	var stats = new Array();
    for(i = 0; i < order.length; i++){
    	stationNum = order[i];
    	//set up train icons	
    	loc = new google.maps.LatLng(Col2[stationNum],Col3[stationNum]);
    	statName = Col1[stationNum];
    	var infoText = '<div id="content">'+
      	'<h1>' + statName + '</h1>'+'<hr/>'+'</div>';
      	infoText += '<table id="statTable" border = "2">'; 
      	infoText += "<tr id='tableHeader'><td>line</td><td>trip number</td><td>direction</td><td>ETA</td></tr>";
		for(j = 0; j < trips.length; j++){
			trip = trips[j];
			for(k = 0; k < trip["Predictions"].length; k++){
				if(trip["Predictions"][k]["Stop"] == statName){
					infoText += "<tr id='cellStyle'><td>" + line + "</td>";
					infoText += "<td>" + trip["TripID"] + "</td>";
					infoText += "<td>" + trip["Destination"] + "</td>";
					var seconds = trip["Predictions"][k]["Seconds"];
					infoText += "<td>" + secsToString(seconds) + "</td>";
					infoText += "</tr>";	
				}
				
			}
		}
		infoText += '</table>'
		stationMark = createMarker(loc,Col1[stationNum],trainImg,infoText)
		stationMark.setMap(map);
		stats[i] = loc;
	}

	var path = new google.maps.Polyline({
	    path: stats,
	    geodesic: true,
	    strokeColor: line,
	    strokeOpacity: 1.0,
	    strokeWeight: 4
	});
	path.setMap(map);
	return stats;
}

//checks the status of the response from the mbta API, renders the appropriate 
//path to display on the map
function callback() {
    if (request.readyState == 4 && request.status == 200) {
		scheduleData = JSON.parse(request.responseText);
		line = scheduleData["line"];
		for (i = 0; i < scheduleData["schedule"].length; i++){
      		trips[i] = scheduleData["schedule"][i];
      	}
		Number.prototype.toRad = function() {
   			return this * Math.PI / 180;
		}
		var closestStat = "";
		if(line == "orange"){
			stations = renderPath(orangeOrder);
			closestStat = findClosest(me, stations, orangeOrder);
		}
		else if(line == "red"){
			
			stations1 = renderPath(redOrderBase);
			stations2 = renderPath(redOrderBranch1);
			stations3 = renderPath(redOrderBranch2);
			//find closest to each of the branches, then find closest out of those
			s1 = findClosest(me, stations1, redOrderBase);
			s2 = findClosest(me, stations2, redOrderBranch1);
			s3 = findClosest(me, stations3, redOrderBranch2);
			if(Math.min(s1.value,s2.value,s3.value) == s1.value) 
				closestStat = s1;
			else if(Math.min(s1.value,s2.value,s3.value) == s2.value) 
				closestStat = s2;
			else
				closestStat = s3;
		}
		else if(line == "blue"){
			stations = renderPath(blueOrder);
			closestStat = findClosest(me, stations, blueOrder);
		}
		var locString = "closest station: " + closestStat.name;
		locString += "<br/>" + "distance there: " + closestStat.value.toFixed(2) + " miles";
		marker = createMarker(me,"your location","none",locString);
		marker.setMap(map);
	}
	else if (request.readyState == 4 && request.status == 500) {
		alert("fail");
		var locString = "could not load stations!";
		marker = createMarker(me,"your location","none",locString);
		marker.setMap(map);
	}
}