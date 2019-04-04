


$(document).ready(function () {

  // function initMap() {} // now it IS a function and it is in global

  // $(() => {
  //   initMap = function() {
  //     // your code like...
  //     var map = new google.maps.Map(document.getElementById('map'), {
  //       zoom: 10,
  //       center: {lat: -33.9, lng: 151.2}
  //     });
  //     setMarkers(map);
  //   }
  // });
  
  
// $.ajax({
//       url: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDti1uIIpl2e51oCM6_AqZYYZWma_wn-2k&callback=initMap',
//       method: 'GET'
//     })
//       .then(function (response) {
//         console.log(response);
//         // $('#-div').append(JSON.stringify(response));

//       });


initMap = function() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: {lat: -33.9, lng: 151.2}
  });
  
  setMarkers(map);
}
// initMap();
// Data for the markers consisting of a name, a LatLng and a zIndex for the
// order in which these markers should display on top of each other.
var beaches = [
  ['Bondi Beach', -33.890542, 151.274856, 4],
  ['Coogee Beach', -33.923036, 151.259052, 5],
  ['Cronulla Beach', -34.028249, 151.157507, 3],
  ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
  ['Maroubra Beach', -33.950198, 151.259302, 1]
];

function setMarkers(map) {
  // Adds markers to the map.

  // Marker sizes are expressed as a Size of X,Y where the origin of the image
  // (0,0) is located in the top left of the image.

  // Origins, anchor positions and coordinates of the marker increase in the X
  // direction to the right and in the Y direction down.
  var image = {
    url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
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
  for (var i = 0; i < beaches.length; i++) {
    var beach = beaches[i];
    var marker = new google.maps.Marker({
      position: {lat: beach[1], lng: beach[2]},
      map: map,
      icon: image,
      shape: shape,
      title: beach[0],
      zIndex: beach[3]
    });
  }
}

  function searchGoogleCity() {

    // Preventing the button from trying to submit the form
    event.preventDefault();
    q = $('#search-google-city-input').val().trim();
    // searchCity(q);
  }



  $(document).on('click', '#search-google-city-btn', searchGoogleCity);



});