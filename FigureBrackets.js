<!DOCTYPE html>
<html>
  <head>
    <title>Place searches</title>
    <button type="button" id="next" onclick="selected()">Next</button>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
    <meta charset="utf-8">
    <style>
      /* Always set the map height explicitly to define the size of the div
       * element that contains the map. */
      #map {
        height: 100%;
      }
      /* Optional: Makes the sample page fill the window. */
      html, body {
        height: 100%;
        margin: 0;
        padding: 0;
      }
    </style>
    <script>

// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAtGQKZqyVy5FX4GoQArfpZkhnTwLWjTQo&libraries=places">

var map;
var infoWindow;
var service;
var array = [];

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 35.906955, lng: -79.047857},
    zoom: 15,
    styles: [{
      stylers: [{ visibility: 'simplified' }]
    }, {
      elementType: 'labels',
      stylers: [{ visibility: 'off' }]
    }]
  });

  infoWindow = new google.maps.InfoWindow();
  service = new google.maps.places.PlacesService(map);


  // The idle event is a debounced event, so we can query & listen without
  // throwing too many requests at the server.
  map.addListener('idle', performSearchCase2);
  //map.addListener('idle', performSearchCase1(wordArray[i].location));**
  //map.addListener('idle', performSearchCase3);

  //marker.setMap(map); // adds the variable MARKER to the map
}

/*var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: 'Hello World!'
  }
*/

function performSearchCase1(string) {
var request = {
    bounds: map.getBounds(),
      keyword: string
  };
  service.radarSearch(request, callback);
}

function performSearchCase2() {
  var request = {
    bounds: map.getBounds(),
    keyword: 'alderman'
  };
  service.radarSearch(request, callback);
}

function performSearchCase3() {
  var request = {
    bounds: map.getBounds(),
    keyword: 'Davis'
  };
  service.radarSearch(request, callback);
}

 function deleteMarkers(marker) {

        for (var i = 0; i < results.length; i++) {
          if(array[i] != marker){
          array[i].setMap(null);
          }
          //results[0].setMap(null);
        }
      }

function callback(results, status) {
   array = results;
  if (status !== google.maps.places.PlacesServiceStatus.OK) {
    console.error(status);
    return;
  }
  for (var i = 0; i < results.length; i++) {
    addMarker(results[i]);

  }
}


function addMarker(place) {
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
    icon: {
      url: 'http://maps.gstatic.com/mapfiles/circle.png',
      anchor: new google.maps.Point(14, 12),
      scaledSize: new google.maps.Size(12, 19)
    }
  });

  google.maps.event.addListener(marker, 'click', function() {
    service.getDetails(place, function(result, status) {
      if (status !== google.maps.places.PlacesServiceStatus.OK) {
        console.error(status);
        return;
      }
      infoWindow.setContent(result.name);
      infoWindow.open(map, marker);
    });
  });
// second listener
   var isZoom = false;
    var wayPoint;
    google.maps.event.addListener(marker, 'dblclick', function() {
      service.getDetails(place, function(result, status) {
        if (status !== google.maps.places.PlacesServiceStatus.OK) {
          console.error(status);
          return;
        }
      });
         if(isZoom == true){
         map.setZoom(15);
         map.panTo(marker.position);
//         wayPoint = result.name;
         isZoom = false;
//         document.getElementById("waypoints").value = result.name;
//         document.getElementById('button').onclick = selected();


         }else{
         map.setZoom(17);
         map.panTo(marker.position);
         isZoom = true;
         }
         //deleteMarkers(marker);
         //array = [];
  });

  /*var wayPoint;
  function setWayPoint(){
  wayPoint = marker;
8 } */


  /*var listener = google.maps.event.addListener('dblclick', setWayPoint());
  */

}

<!--function selected(){
map.clear;
continue;
}-->
</script>
  </head>
  <body>
    <div id="map"></div>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAtGQKZqyVy5FX4GoQArfpZkhnTwLWjTQo&libraries=places&callback=initMap" async defer></script>
  </body>
</html>
