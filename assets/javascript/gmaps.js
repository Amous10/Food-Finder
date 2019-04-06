var map;
$(document).ready(function () {

const pinDrop = 'assets/images/food_thumb.jpg';

let latitude = 33.519390;
let longitude = -112.073751;

initMap = function() {  
  rMap(latitude,longitude);
}



let rMap = function(latitude, longitude) {
  var mapOptions = {
    center: new google.maps.LatLng(latitude, longitude),
    zoom: 13
};
  map = new google.maps.Map($('#map')[0], 
  mapOptions);
  // setMarkers(map, latitude, longitude);
  moveToLocation(latitude, longitude);
}
function moveToLocation(lat, lng){
  var center = new google.maps.LatLng(lat, lng);
  // TODO maybe use global variable, map?  
  map.setCenter(center);
  setMarkers(map, lat, lng);
}

// initMap = function() {  
//   rMap(latitude,longitude);
// }

// let rMap = function(latitude, longitude) {
//   var map = new google.maps.Map($('#map')[0], {  
//     zoom: 13,
//     center: {lat: latitude, lng: longitude}
//   }); 
//   // setCoords(latitude, longitude); 
//   setCoords(100, 100); 
//   setMarkers(map, latitude, longitude);  
// }
// function setCoords(latitude, longitude) {
//   map.center = {lat: latitude, lng: longitude};
// }

function setMarkers(map, lat, long) {
  // Adds markers to the map.

  // Marker sizes are expressed as a Size of X,Y where the origin of the image
  // (0,0) is located in the top left of the image.

  // Origins, anchor positions and coordinates of the marker increase in the X
  // direction to the right and in the Y direction down.
  var image = {
    url: 'assets/images/pin.png',
    // This marker is 20 pixels wide by 32 pixels high.
    size: new google.maps.Size(20, 32),
    // The origin for this image is (0, 0).
    origin: new google.maps.Point(0, 0),
    // The anchor for this image is the base of the flagpole at (0, 32).
    anchor: new google.maps.Point(0, 32)
  };
  // Shapes define the clickable region of the icon. The type defines an HTML
  // <area> element 'poly' which traces out a polygon as a series of X,Y points.
  // The final coordinate closes the poly by connecting to the first coordinate.
  var shape = {
    coords: [1, 1, 1, 20, 18, 20, 18, 1],
    type: 'poly'
  };
      
    var marker = new google.maps.Marker({
      position: {lat: lat, lng: long},
      map: map,
      icon: image,
      shape: shape      
    });

}


});