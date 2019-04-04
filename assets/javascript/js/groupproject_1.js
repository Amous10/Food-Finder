$("#findRestaurants").on("click", function(event) {
  console.log("insideClick")
  event.preventDefault();
  // runs findRestaurants function
  findRestaurants();
});


  function findRestaurants() {
      //first ajax call to get city ID from Zomato
      var search = $("#restaurants").val().trim();
      var queryURL = "https://developers.zomato.com/api/v2.1/cities?q=" + search;
      $.ajax({

          url: queryURL,
          method: "GET",
          headers: {"user-key": "edc2fbd104e00db2cad79d00459872bc"},
          dataType: "json",
      })
      .then(function(response){
          console.log(response);
          console.log(response.location_suggestions[0].id);
      
          //second call to get the actual info that I want using Zomato ID
          var searchID = response.location_suggestions[0].id;
          var queryURL = "https://developers.zomato.com/api/v2.1/search?entity_id=" + searchID;
          $.ajax({
              url: queryURL,
              method: "GET",
              headers: {"user-key": "edc2fbd104e00db2cad79d00459872bc"},
              dataType: "json",
          })
          .then(function(response2){
              console.log(response2);
      
          });
      });
  };


var getRestaurant = function() {

  // creating variables for the 2 text fields
  var locationInput = $("#location-input").val().trim();
  
  // test
  console.log(locationInput);
  
  // clearing the text field on submit
  $("#location-input").val("");
  
  var queryURL = "https://developers.zomato.com/api/v2.1/cities?q="+ locationInput;

  $.ajax({
      url: queryURL,
      method: "GET",
      headers: {"user-key": "edc2fbd104e00db2cad79d00459872bc"},
      dataType: "json",
  })
  .then(function(response){
      console.log(response);

      // variables for the query responses we want
      var name = response.name;
      var location = response.location;
      var pics = response.thumb;
      var cuisine = response.cuisine;
      var userRating = response.user_rating;
      var phoneNumber = response.phone_numbers;
      
      // appending the results to a table
      $("#restaurant-table > tbody").append(
      "<tr><td id='table-name'>" + name + 
      "</td><td id='table-location'>" + location + 
      "</td><td id='table-pics'>" + pics + 
      "</td><td id='table-cuisine'>" + cuisine +  
      "</td><td id='table-rating'>" + userRating + 
      "</td><td id='table-phone'>" + phoneNumber + 
      "</td></tr>");

  });
};

$("#findRestaurants").on("click", function(event) {

  
  event.preventDefault();
  getRestaurant()

  

});

