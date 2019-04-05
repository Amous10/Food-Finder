//event that runs ajax calls once the enter button is pressed
$(document).keypress(function (event) {

  var keycode = (event.keyCode ? event.keyCode : event.which);
  if (keycode == '13') {
      //or hit submit button || can we do two listener events?
      alert('You pressed a "enter" key in somewhere');
      // clearing the text field on submit
      $("#city-search").val("");
      getCityID();
  };
});


// // Let's say we have a click handler and fires off a series of AJAX request
// $selector.on('click', function() {
//     // Construct empty array
//     var deferreds = [];

//     // Loop using .each
//     $(this).find('div').each(function() {
//         var ajax = $.ajax({
//             url: $(this).data('ajax-url'),
//             method: 'get'
//         });

//         // Push promise to 'deferreds' array
//         deferreds.push(ajax);
//     });

//     // Use .apply onto array from deferreds
//     $.when.apply($, deferreds).then(function() {
//         // Things to do when all is done
//     });
// });



function getCityID() {
  event.preventDefault();
  //first ajax call to get city ID from Zomato
  var search = $("#city-search").val();
  var queryURL = "https://developers.zomato.com/api/v2.1/cities?q=" + search;
  $.ajax({

          url: queryURL,
          method: "GET",
          headers: {
              'user-key': '100f8418181c52c8e7bd4b83d06f6750',
              'Content-Type': 'application/json'
          },
          credentials: 'same-origin'
      })
      .then(function (response) {
          console.log(response);
          console.log(response.location_suggestions[0].id);
          //need a return somewhere

          //second call to get cuisine by using city code
          // american:1, (italian:55), mexican:73, pizza:82, sushi:177, thai:95
          var cityID = response.location_suggestions[0].id;
          var queryURL = "https://developers.zomato.com/api/v2.1/search?entity_id=" + cityID + "&entity_type=city&count=100&radius=10000&cuisines=1%2C%2073%2C%2082%2C%20177%2C%2095"

          $.ajax({
                  url: queryURL,
                  method: "GET",
                  headers: {
                      'user-key': '100f8418181c52c8e7bd4b83d06f6750',
                      'Content-Type': 'application/json'
                  },
                  credentials: 'same-origin'
              })
              .then(function (response) {

               
              });
      });
};




// // variables for the query responses we want
// var name = response.name;
// var location = response.location;
// var pics = response.thumb;
// var cuisine = response.cuisine;
// var userRating = response.user_rating;
// var phoneNumber = response.phone_numbers;

// // appending the results to a table
// $("#restaurant-table > tbody").append(
// "<tr><td id='table-name'>" + name + 
// "</td><td id='table-location'>" + location + 
// "</td><td id='table-pics'>" + pics + 
// "</td><td id='table-cuisine'>" + cuisine +  
// "</td><td id='table-rating'>" + userRating + 
// "</td><td id='table-phone'>" + phoneNumber + 
// "</td></tr>");




//   $("city-search").on("click", function(event) {


//     event.preventDefault();
//     getRestaurant()



//   });