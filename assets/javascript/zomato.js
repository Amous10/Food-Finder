
$(document).ready(function () {

  // Initial array of zomato cuisine id's.
  let cuisines = [
    { "cuisine": { "cuisine_id": 1, "cuisine_name": "American" } },
    { "cuisine": { "cuisine_id": 73, "cuisine_name": "Mexican" } },
    { "cuisine": { "cuisine_id": 177, "cuisine_name": "Sushi" } },
    { "cuisine": { "cuisine_id": 25, "cuisine_name": "Chinese" } },
    { "cuisine": { "cuisine_id": 55, "cuisine_name": "Italian" } }
  ];
  var loading = false;
  const baseURL = 'https://developers.zomato.com/api/v2.1/';
  let q = '';
  let cityArgs = 'cities?q=';
  let cuisineArgs = ''
  const ZapiKey = '100f8418181c52c8e7bd4b83d06f6750';
  let headers = {
    'user-key': ZapiKey,
    'Accept': 'application/json'
  };

  // curl -X GET --header "Accept: application/json" --header "user-key: 100f8418181c52c8e7bd4b83d06f6750" "https://developers.zomato.com/api/v2.1/cities?q=phoenix"
  function searchCity(query) {
    //TODO Add a loading feature to accomodate chained ajax calls.
    loading = true;
    let queryURL = `${baseURL}${cityArgs}${query}`;

    $.ajax({
      url: queryURL,
      method: 'GET',
      headers: headers
    })
      .then(function (response) {
        let cityID;
        try {
          cityID = response.location_suggestions[0].id;
          // $('#results-view').html(JSON.stringify(response));               
        }
        catch (error) {
          //Catch the error for not matching an input City and default to PHX.
          cityID = 301;
        }
        // console.log('cityID');
        let queryURL = `https://developers.zomato.com/api/v2.1/search?entity_id=${cityID}&entity_type=city&q=&start=1&count=20&radius=1000&sort=rating&order=desc`;
        // console.log(queryURL);
        //SECOND AJAX CAll is the chained in order to use the city ID to find foods if the type of cuisine
        return $.ajax({
          url: queryURL,
          method: 'GET',
          headers: headers
        })
          .then(function (secondResponse) {
            // $('#results-view').html(JSON.stringify(response));          
            loading = false;
            //MAKE MAGIC HAPPEN:
            let resultsFound = secondResponse.results_found;

            if (resultsFound == 0) {
              //TODO result found is ZERO, do something. 
            }
            else {
              //TODO Populate the cards
              $('#results-view').html(JSON.stringify(secondResponse));
              
              //     <div class="uk-card uk-card-default">
              //     <div class="uk-card-media-top">
              //         <img src="images/light.jpg" alt="">
              //     </div>
              //     <div class="uk-card-body">
              //         <h3 class="uk-card-title">Media Top</h3>
              //         <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
              //     </div>
              // </div>

            }
          })
      });
  }

  function searchZomatoCity() {

    // Preventing the button from trying to submit the form
    event.preventDefault();
    q = $('#search-city-input').val().trim();
    $('#search-city-input').text('Near:  Search by City');
    searchCity(q);
  }

  function searchZomatoCuisine() {

    // Preventing the button from trying to submit the form
    event.preventDefault();
    q = $('#search-cuisine-input').val().trim();
    searchCuisine(q);
  }

  function pickCuisine() {
    // Preventing the button from trying to submit the form   
    event.preventDefault();
    $('#cuisine-text').text($(this).text());
  }

  $(document).on('click', '.cuisine-btn', pickCuisine);
  $(document).on('click', '#search-city-btn', searchZomatoCity);

});