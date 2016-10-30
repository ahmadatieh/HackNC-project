<!DOCTYPE html>
<html>
  <head>
    <title>Place searches</title>
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
  map.addListener('idle', performSearch);
}

function performSearch() {
  var request = {
    bounds: map.getBounds(),
    keyword: 'kenan'
  };
  service.radarSearch(request, callback);
}

function callback(results, status) {
  if (status !== google.maps.places.PlacesServiceStatus.OK) {
    console.error(status);
    return;
  }
  for (var i = 0, result; result = results[i]; i++) {
    addMarker(result);
  }
}

function addMarker(place) {
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
    icon: {
      url: 'http://maps.gstatic.com/mapfiles/circle.png',
      anchor: new google.maps.Point(10, 10),
      scaledSize: new google.maps.Size(10, 17)
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
}
</script>
  </head>
  <body>
    <div id="map"></div>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAtGQKZqyVy5FX4GoQArfpZkhnTwLWjTQo&libraries=places&callback=initMap" async defer></script>
  </body>
</html>
