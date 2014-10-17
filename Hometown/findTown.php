<html>
<head>
<title>Your next hometown</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" href="http://yui.yahooapis.com/pure/0.5.0/pure-min.css">
    <link rel="stylesheet" href="css/layouts/side-menu.css">
</head>


<body>
<h1>
<?php
//constants
$length = 351;

//extract XML file
if (file_exists('data.xml')) {
    $xml = simplexml_load_file('data.xml');
} else {
    exit('Failed to open data.xml.');
}

//set up data
$names = array();
$populations = array();
$prices = array();
$safety = array();
$diversity = array();
$latitudes = array();
$longitudes = array();
$schools = array();

$towns = array();

$disMatters = true; //flag for whether the distance to a town matters

for($i = 0; $i < $length; $i++){
	$towns[$i] = $xml->town[$i];
}

shuffle($towns);



for($i = 0; $i < $length; $i++){
	$names[$i] =  $towns[$i]->name;
	$populations[$i] = $towns[$i]->population;
	$crimes[$i] = $towns[$i]->crimeData;
	$latitude[$i] = $towns[$i]->latitude;
	$longitude[$i] = $towns[$i]->longitude;
	$prices[$i] = $towns[$i]->homePrice;
}


//distance calculation given coordinates of two places
function getDistanceBetweenPointsNew($latitude1, $longitude1, $latitude2, $longitude2, $unit = 'Mi') {
     $theta = $longitude1 - $longitude2;
     $distance = (sin(deg2rad($latitude1)) * sin(deg2rad($latitude2))) + (cos(deg2rad($latitude1)) * cos(deg2rad($latitude2)) * cos(deg2rad($theta)));
     $distance = acos($distance);
     $distance = rad2deg($distance);
     $distance = $distance * 60 * 1.1515; switch($unit) {
          case 'Mi': break; case 'Km' : $distance = $distance * 1.609344;
     }
     return (round($distance,2));
}

//given a town name, find the index number and return it
function findIndexFromName($name, $length, $names){
	if($name == "No Preference")
		return -1;
	for($i = 0; $i < $length; $i++){
		if (strcasecmp($name, $names[$i]) == 0)
			return $i;
	}
	return -1;
}

//given a range preference, return a range
function getRangeValue($rangeString){
	if($rangeString == "No Preference")
		return -1;
	if($rangeString == "15 miles")
		return 15;
	if($rangeString == "30 miles")
		return 30;
	if($rangeString == "50 miles")
		return 50;
	if($rangeString == "100+ miles")
		return -1;
}

//find and return all town indexes within range of the given town
function findTownsInRange($townIndex, $rangeString, $length, $latitudes, $longitudes, $names){
	$range = getRangeValue($rangeString);
	$towns = array();
	if($range == -1 || $townIndex == -1){
		for($i = 0; $i < $length; $i++){
			$towns[$i] = $i;
		}
		return $towns;
	}else{
		$latitude1 = $latitudes[$townIndex];
		settype($latitude1, 'float');
		$longitude1 = $longitudes[$townIndex];
		settype($longitude1, 'float');
		$counter = 0;
		for($i = 0; $i < $length; $i++){
			$latitude2 = $latitudes[$i];
			settype($latitude2, 'float');
			$longitude2 = $longitudes[$i];
			settype($longitude2, 'float');
			$distance = getDistanceBetweenPointsNew($latitude1, $longitude1, $latitude2, $longitude2, 'Mi');
			if($distance < $range){
				$towns[$counter] = $i;
				$counter++;
			}
		}
		return $towns;
	}
}

//calculate the average price raw score
function calcPriceScoreRaw($townIndex, $prices){
	$price = $prices[$townIndex];
	if ($price < 250000)
		return 100;
	if($price < 350000)
		return 70;
	if($price < 500000)
		return 30;
	if($price < 550000)
		return 0;
	if($price < 600000)
		return -30;
	if($price < 700000)
		return -70;
	return -100;
}

//calculate the crime raw data
function calcSafetyScoreRaw($townIndex, $safety){
	$crime = $safety[$townIndex];
	if($crime < 15)
		return 100;
	if($crime < 25)
		return 50;
	if($crime < 35)
		return 0;
	if($crime < 70)
		return -50;
	return -100;
}

//calcultae the average score with preference factored in
function calcAdjustedScore($rawScore, $preference){
	if($preference == "No Preference")
		return 0;
	if($preference == "Not Important")
		return (.25 * $rawScore);
	if($preference == "Important")
		return (2 * $rawScore);
	else
		return (5 * $rawScore);
}

//convert preference to the maximum possible score for that category
function prefToPosScore($preference){
	if($preference == "No Preference")
		return 0;
	if($preference == "Not Important")
		return 25;
	if($preference == "Important")
		return 200;
	else
		return 500;
}

//calculate score if user prefers small town
function calcSmallTown($townIndex, $sizes){
	$size = $sizes[$townIndex];
	if($size < 6000)
		return 500;
	if($size < 12000)
		return 300;
	if($size < 16000)
		return 100;
	if($size < 20000)
		return 0;
	if($size < 25000)
		return -100;
	if($size < 35000)
		return -500;
	return -1000;
}

//calculate score if user prefers large town
function calcLargeTown($townIndex, $sizes){
	$size = $sizes[$townIndex];
	if($size < 6000)
		return -300;
	if($size < 12000)
		return 0;
	if($size < 16000)
		return 500;
	if($size < 35000)
		return 200;
	if($size < 50000)
		return 0;
	if($size < 65000)
		return -200;
	return -1000;
}

//calculate score if user prefers small city
function calcSmallCity($townIndex, $sizes){
	$size = $sizes[$townIndex];
	if($size < 15000)
		return -1000;
	if($size < 25000)
		return -300;
	if($size < 35000)
		return 100;
	if($size < 75000)
		return 300;
	if($size < 100000)
		return 500;
	if($size < 130000)
		return 200;
	if($size < 160000)
		return 0;
	if($size < 200000)
		return -400;
	return -1000;
}

//calculate score if user prefers big city
function calcBigCity($townIndex, $sizes){
	$size = $sizes[$townIndex];
	if($size < 70000)
		return -1000;
	if($size < 100000)
		return -300;
	if($size < 200000)
		return 0;
	return 500;
}

//calculate the size score. calls the above listed functions
function calcSizeScore($townIndex, $preference, $sizes){
	if($preference == "No Preference")
		return 0;
	if($preference == "Small Town")
		return calcSmallTown($townIndex, $sizes);
	if($preference == "Large Town")
		return calcLargeTown($townIndex, $sizes);
	if($preference == "Small City")
		return calcSmallCity($townIndex, $sizes);
	return calcBigCity($townIndex, $sizes);
}

//sum up all of the possibilities
function sumPossibilities($pricePref, $schoolPref, $diversityPref, $safetyPref){ //population pref is always out of 500
	return (prefToPosScore($pricePref) + prefToPosScore($diversityPref) + prefToPosScore($schoolPref) 
		 	+ prefToPosScore($safetyPref) + 500);
}

//pull data from the user's input
$townName = $_GET["town_name"];
if($townName == ""){
	$townName = "[no town entered]";
}
$distance = $_GET["miles_from"];
$price = $_GET["afford"];
$safety = $_GET["safety"];
$population = $_GET["population"];
$diversity = $_GET["diversity"];
$school = $_GET["school"];

$index = findIndexFromName($townName, 351, $names);
$townsInRange = findTownsInRange($index, $distance, 351, $latitude, $longitude, $names);

//set up the score for each town in range
$scores = array();
for($i = 0; $i < count($townsInRange); $i++){
	$index = $townsInRange[$i];
	
	//score calculations
	$priceRawScore = calcPriceScoreRaw($index, $prices);
	$priceScore = calcAdjustedScore($priceRawScore, $price);
	$safetyRawScore = calcSafetyScoreRaw($index, $crimes);
	$safetyScore = calcAdjustedScore($safetyRawScore, $safety);
	$sizeScore = calcSizeScore($index, $population, $populations);
	$scoreTotal = $priceScore + $sizeScore + $safetyScore;

	$scores[$i] = $scoreTotal;
}

//sorts the towns by their score. Currently a selection sort, to be changed soon
function sortByScore(& $scores, & $indexes){
	for($i = 0; $i < count($indexes) - 1; $i++)
	{
		$highestInd = $i;
		for($j = $i; $j < count($indexes); $j++){
			if($scores[$j] > $scores[$highestInd])
				$highestInd = $j;
		}
		$tempIndex = $indexes[$i];
		$indexes[$i] = $indexes[$highestInd];
		$indexes[$highestInd] = $tempIndex;
		
		$tempScore = $scores[$i];
		$scores[$i] = $scores[$highestInd];
		$scores[$highestInd] = $tempScore;	
	}
}


//write the top ten scores to the DOM
sortByScore($scores, $townsInRange);
$posScore = sumPossibilities($price, $school, $diversity, $safety);
?>

	<div id="layout">
    <!-- Menu toggle -->
    <a href="#menu" id="menuLink" class="menu-link">
        <!-- Hamburger icon -->
        <span></span>
    </a>

    <div id="menu">
        <div class="pure-menu pure-menu-open">
            <a class="pure-menu-heading" href="#">Results</a>
            <ul>
            <?php
			for($i = 0; $i < count($scores); $i++){
				$townNum = $townsInRange[$i];
				if($scores[$i] < 0)
					break;
				echo '<li><a href="#';
				echo $i;
				echo 'town">';
				echo $names[$townNum];
				echo '</a></li>';
			}?>
            </ul>
        </div>
    </div>

    <div id="main">
        <div class="header">
            <h1>Results</h1>
            <h2>Top towns based on your preferences</h2>
        </div>

        <div class="content">
<?php
for($i = 0; $i < count($scores); $i++){
	$townNum = $townsInRange[$i];
	if($scores[$i] < 0)
		break;
	echo "<h1 id='";
	echo $i;
	echo "town' class='content-head'>";
	echo ($i + 1);
	echo " - ";
	echo $names[$townNum];
	echo "</h1>";
	echo "<h2 class='content-head'>";
	echo round($scores[$i]/$posScore, 2)*100;
	echo "% match<br></p>";
	echo "</h2>";
	echo "Average home price: $";
	echo $prices[$townNum];
	echo "<br/>";
	echo "Population: ";
	echo $populations[$townNum];
	echo "<br/>";
	echo $crimes[$townNum];
	echo ": ";
	echo "<br/>";
	if($disMatters){
		echo "Distance from ";
		echo $townName;
		echo ": ";
	}
	echo "<hr/>";
}

echo '</div>
    </div>
</div><script src="js/ui.js"></script>';
?>
</body>
</html>