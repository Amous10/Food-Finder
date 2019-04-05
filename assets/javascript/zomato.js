
$(document).ready(function () {

  // Initial array of zomato cuisine id's.
  let cuisines = [
    { "cuisine": { "cuisine_id": 1, "cuisine_name": "American" } },
    { "cuisine": { "cuisine_id": 73, "cuisine_name": "Mexican" } },
    { "cuisine": { "cuisine_id": 177, "cuisine_name": "Sushi" } },
    // { "cuisine": { "cuisine_id": 25, "cuisine_name": "Chinese" } },
    // { "cuisine": { "cuisine_id": 55, "cuisine_name": "Italian" } }
    {"cuisine":{"cuisine_id":95,"cuisine_name":"Thai"}},
    {"cuisine":{"cuisine_id":82,"cuisine_name":"Pizza"}},
  ];

  var loading = false;
  const defaultImg = 'assets/images/food_thumb.jpg';
  const baseURL = 'https://developers.zomato.com/api/v2.1/';
  let q = '';
  let cityArgs = 'cities?q=';  
  const ZapiKey = '100f8418181c52c8e7bd4b83d06f6750';
  let headers = {
    'user-key': ZapiKey,
    'Accept': 'application/json'
  };

  // curl -X GET --header "Accept: application/json" --header "user-key: 100f8418181c52c8e7bd4b83d06f6750" "https://developers.zomato.com/api/v2.1/cities?q=phoenix"
  function searchCity(query) {
    //TODO Add a loading feature to accommodate chained ajax calls.
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
        let queryURL = `${baseURL}search?entity_id=${cityID}&entity_type=city&q=&start=1&count=6&radius=1000&sort=rating&order=desc`;
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
            $('#results-view').html('');
            if (resultsFound == 0) {
              //TODO result found is ZERO, do something. 
            }
            else {
              //TODO Populate the cards
              
              //Was going to check length, but changed the API call to return only 6 results. May want to implement later.
              // let cardsQuantity = 6;
              // if (resultsFound < 6){
              //   cardsQuantity = resultsFound;
              // }
                            
              // Looping through restaurants               
              for (const restaurant of secondResponse.restaurants) {
                // variables for the query responses we want
                let r = restaurant.restaurant;
                let name = r.name;                
                let latitude = r.location.latitude;
                let longitude = r.location.longitude;
                let imgsrc = r.thumb;
                let cuisines = r.cuisines;
                let userRating = r.user_rating.aggregate_rating;
                let avgCostForTwo = r.average_cost_for_two;                
                
                if (imgsrc === ''){                  
                  imgsrc = defaultImg;
                }

                //TODO style the cards                
                let addDiv = createDivs(name, latitude, longitude, imgsrc, cuisines, userRating, avgCostForTwo);                
                
                $('#results-view').prepend(addDiv);             

              }
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

  
  function createDivs(name, latitude, longitude, imgsrc, cuisines, userRating, avgCostForTwo) {
 
    let div = `
    <div>
    <div class="uk-card uk-card-default">
      <div class="uk-card-media-top">
        <div class="uk-card-badge uk-label-warning">${userRating}</div>
          <h3 class="uk-card-title">${name}</h3>
        <img src="${imgsrc}" alt="${name}">
      </div>
      <div class="uk-card-body">
        <h5 class="uk-card-title">${cuisines}</h5>        
        <p>Avg cost for two: \$${avgCostForTwo}</p>


        <button uk-toggle="target: #open-map" type="button">Map</button>

        <!-- This is the modal -->
        <div id="open-map" uk-modal>
            <div class="uk-modal-dialog uk-margin-auto-vertical uk-modal-body">
                <h2 class="uk-modal-title"></h2>
                <button class="uk-modal-close" type="button">Close</button>
            </div>
        </div>



      </div>
    </div>
  </div>
    `;

    return div;
  }

  function pickCuisine() {
    // Preventing the button from trying to submit the form   
    event.preventDefault();
    $('#cuisine-text').text($(this).text());
  }

  function mapModal(){
    // event.preventDefault();
    alert(map);

  }

  $(document).on('click', '.cuisine-btn', pickCuisine);
  $(document).on('click', '#search-city-btn', searchZomatoCity);

  
  });
  









    
