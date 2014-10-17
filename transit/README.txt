Transit Assignment readme

In this assignment, index.html links to transit.js and theme.css to render a map
of a MBTA subway line and the current location of the user. The system uses the 
MBTA subway station JSON API and a csv file with the location of all of the 
stations to render a map of the line which the API gives. On the map, the user
is displayed with their location and the distance to, as well as the name of, the
closest station on the line the API gives back. The line is also displayed, each 
station connected by line segments of the given line's color. Hovering over each
station gives its name, and clicking on the station gives information about which
line its on as well as a schedule of trains that will reach that station.  

However, sometimes the MBTA API does not give back information on a line. If that 
occurs, the marker for the location of the user is displayed, but nothing else is.

This assignment took approximately eight hours to complete.