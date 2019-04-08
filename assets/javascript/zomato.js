$(document).ready(function() {
  // Initial array of zomato cuisine id's.
  let cuisines = [
    {
      cuisine_id: 1,
      cuisine_name: "American"
    },
    {
      cuisine_id: 73,
      cuisine_name: "Mexican"
    },
    {
      cuisine_id: 177,
      cuisine_name: "Sushi"
    },
    // { "cuisine_id": 25, "cuisine_name": "Chinese" },
    // { "cuisine_id": 55, "cuisine_name": "Italian" },
    {
      cuisine_id: 95,
      cuisine_name: "Thai"
    },
    {
      cuisine_id: 82,
      cuisine_name: "Pizza"
    }
  ];

  // var loading = false;
  $("#spinner").hide();
  $("#map").hide();
  $("#recent-view").hide();
  const defaultImg = "assets/images/food_thumb.jpg";
  const baseURL = "https://developers.zomato.com/api/v2.1/";
  let q = "";
  let cityArgs = "cities?q=";
  const ZapiKey = "100f8418181c52c8e7bd4b83d06f6750";
  let headers = {
    "user-key": ZapiKey,
    Accept: "application/json"
  };

  // curl -X GET --header "Accept: application/json" --header "user-key: 100f8418181c52c8e7bd4b83d06f6750" "https://developers.zomato.com/api/v2.1/cities?q=phoenix"
  function searchCity(query) {
    //TODO Add a loading feature to accommodate chained ajax calls.
    // loading = true;
    $("#spinner").show();
    $("#results-view").empty();

    let queryURL = `${baseURL}${cityArgs}${query}`;
    let cuisineBtnText = $("#cuisine-text").text();
    let cuisineID = "";
    if (cuisineBtnText !== "Cuisines") {
      let cuisineObj = cuisines.find(id => id.cuisine_name === cuisineBtnText);
      cuisineID = cuisineObj.cuisine_id;
      // console.log(cuisineID);
    }

    $.ajax({
      url: queryURL,
      method: "GET",
      headers: headers
    }).then(function(response) {
      let cityID;
      try {
        cityID = response.location_suggestions[0].id;
        // $('#results-view').html(JSON.stringify(response));
      } catch (error) {
        //Catch the error for not matching an input City and default to PHX.
        cityID = 301;
      }
      // console.log('cityID');
      // let queryURL = `${baseURL}search?entity_id=${cityID}&entity_type=city&q=&start=1&count=6&radius=700&cuisines=21%2C34&sort=rating&order=desc`;
      let queryURL = `${baseURL}search?entity_id=${cityID}&entity_type=city&q=&start=1&count=6&radius=700&cuisines=${cuisineID}&sort=rating&order=desc`;
      // console.log(queryURL);
      //SECOND AJAX CAll is the chained in order to use the city ID to find foods if the type of cuisine
      return $.ajax({
        url: queryURL,
        method: "GET",
        headers: headers
      }).then(function(secondResponse) {
        // $('#results-view').html(JSON.stringify(response));
        // loading = false;
        $("#spinner").hide();
        $("#recent-view").show();
        //MAKE MAGIC HAPPEN:
        let resultsFound = secondResponse.results_found;
        $("#results-view").html("");

        if (resultsFound > 0) {
          //Was going to check length, but changed the API call to return only 6 results. May want to implement later.
          // let cardsQuantity = 6;
          // if (resultsFound < 6){
          //   cardsQuantity = resultsFound;
          // }


          // Looping through restaurants
          for (const restaurant of secondResponse.restaurants) {
            // variables for the query responses we want
            let r = restaurant.restaurant;
            let id = r.id;
            let name = r.name;
            let latitude = r.location.latitude;
            let longitude = r.location.longitude;
            let imgsrc = r.thumb;
            // let imgsrc2 = r.image;
            let cuisines = r.cuisines;
            let userRating = r.user_rating.aggregate_rating;
            let avgCostForTwo = r.average_cost_for_two;

            if (imgsrc === "") {
              imgsrc = defaultImg;
            }

            //TODO style the cards
            let addDiv = createRestaurantCardDiv(
              id,
              name,
              imgsrc,
              cuisines,
              userRating,
              avgCostForTwo,
              latitude,
              longitude
            );

            $("#results-view").prepend(addDiv);
          }
        } else {
          //TODO result found is ZERO, do something.
        }
      });
    });
  }

  function searchZomatoCity() {
    // Preventing the button from trying to submit the form
    event.preventDefault();
    q = $("#search-city-input")
      .val()
      .trim();

    searchCity(q);

    $("#search-city-input").val("");
    $("#cuisine-text").text("Cuisines");

  }

  function createRestaurantCardDiv(
    id,
    name,
    imgsrc,
    cuisines,
    userRating,
    avgCostForTwo,
    latitude,
    longitude
  ) {
    let div = `
    <div>
    <div class="uk-card uk-card-default restaurant-card" data-id="${id}" data-lat="${latitude}" data-long="${longitude}">
        <a href="#modal-sections-${id}" uk-toggle>
            <div class="uk-card-media-top">                
                <h3 class="uk-card-title">${name}</h3>
                <img src="${imgsrc}" alt="${name}">
            </div>
            <div class="card-body">
                <h5 class="uk-card-title uk-text-left" style="font-family: 'Roboto', sans-serif;">${cuisines}</h5>        
        <p class="uk-text-left" style="font-family: 'Roboto', sans-serif;">Avg cost for two: \$${avgCostForTwo}</p>
        <h1 id="star" class="uk-icon uk-margin-medium-left" uk-icon="icon: star"style="font-size:18px;">${userRating}</h1>
            </div>
        </a>
    </div>
    </div>


  <div id="modal-sections-${id}" uk-modal>
    <div class="r-modal uk-modal-dialog">
        <button class="uk-modal-close-default" type="button" uk-close></button>
        <div class="uk-modal-header r-modal-header">
            <h1 class="uk-modal-title uk-text-center uk-text-bottom" Style="font-size:36px; font-family: 'Roboto', sans-serif;">${name}</h1>
        </div>
        <div class="uk-modal-body">
        <!-- -->    
        <div class="uk-child-width-1-2@s" uk-grid>
        <div id="map${id}"></div>
    <div class="uk-card uk-card-default">    
      <div class="uk-card-media-top">
        
      <h6 class="uk-card-title uk-text-left" style="font-size:18px; font-family: 'Roboto', sans-serif;">${name}</h6>
        <img src="${imgsrc}" alt="${name}">
      </div>
      <div class="uk-card-body">
        <h5 class="uk-card-title uk-text-left" style="font-family: 'Roboto', sans-serif;">${cuisines}</h5>        
        <p class="uk-text-left" style="font-family: 'Roboto', sans-serif;">Avg cost for two: \$${avgCostForTwo}</p>
        <h1 id="star" class="uk-icon uk-margin-medium-left" uk-icon="icon: star"style="font-size:18px;">${userRating}</h1>
      </div>    
    </div>
  </div>
        <!-- -->
        </div>
        <div class="uk-modal-footer uk-text-right">
            <button class="uk-button uk-button-primary uk-modal-close thumbs-down" data-name="${name}" data-cuisines="${cuisines}" data-id="${id}" type="button"><i class="fa fa-thumbs-down"></i>  Thumbs Down!</button>
            <button class="uk-button uk-button-primary uk-modal-close thumbs-up" data-name="${name}" data-cuisines="${cuisines}" data-id="${id}" type="button"><i class="fa fa-thumbs-up"></i>  Thumbs Up!</button>
        </div>
        </div>
</div>

    `;
    return div;
  }


  function thumbsUp() {
    let name = $(this).attr("data-name");
    let cuisines = $(this).attr("data-cuisines");
    let id = $(this).attr("data-id");
    let thumb = "Thumbs Up!";
    if (indexFB === null || indexFB === 0 || indexFB === 7) {

      indexFB = 1;
    }
    //There are 6 displayed restaurants in the reviews, index keeps position to update at that position.

    let data = {
      name: name,
      id: id,
      cuisines: cuisines,
      rated: thumb,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    };
    updateFBReviews(data);

  }
  function thumbsDown() {
    let name = $(this).attr("data-name");
    let cuisines = $(this).attr("data-cuisines");
    let id = $(this).attr("data-id");
    let thumb = "Thumbs Down!";

    if (indexFB === null || indexFB === 0 || indexFB >= 7) {

      indexFB = 1;
    }
    //There are 6 displayed restaurants in the reviews, index keeps position to update at that position.

    let data = {
      name: name,
      id: id,
      cuisines: cuisines,
      rated: thumb,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    };
    // updateFBReviews(data);
  }

  function updateFBReviews(data) {
    // restaurant`${indexFB}`.set(data);

    //above doesn't work. must be better way than what I am about to do.
    if (indexFB === 1) {
      restaurant1.set(data);
    } else if (indexFB === 2) {
      restaurant2.set(data);
    } else if (indexFB === 3) {
      restaurant3.set(data);
    } else if (indexFB === 4) {
      restaurant4.set(data);
    } else if (indexFB === 5) {
      restaurant5.set(data);
    } else if (indexFB === 6) {
      restaurant6.set(data);
    } else {
      restaurant6.set(data);
    }
    FBDBindexRef.set(indexFB);
    indexFB++;
  }

  function appendMap() {

    let tmp = $(this).attr("data-id");
    let lat = $(this).attr("data-lat");
    let long = $(this).attr("data-long");

    moveToLocation(lat, long);
    $("#map").show();
    $("#map").appendTo($(`#map${tmp}`));
  }

  function pickCuisine() {
    $("#cuisine-text").text($(this).text());
  }


  $(document).on("click", ".cuisine-btn", pickCuisine);
  $(document).on("click", "#search-city-btn", searchZomatoCity);
  $(document).on("click", ".thumbs-up", thumbsUp);
  $(document).on("click", ".thumbs-down", thumbsDown);
  $(document).on("click", ".restaurant-card", appendMap);
});

