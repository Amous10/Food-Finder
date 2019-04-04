
$(document).ready(function () {

  // Initial array of cities.
  let cities = ['Phoenix', 'Tempe'];

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

    let queryURL = `${baseURL}${cityArgs}${query}`;
    console.log(queryURL);

    $.ajax({
      url: queryURL,
      method: 'GET',
      headers: headers
    })
      .then(function (response) {
        console.log(response);
        $('#results-view').html(JSON.stringify(response));
        
      });
  }
  function searchCuisine(query) {
    //"https://developers.zomato.com/api/v2.1/cuisines?city_id=301"
    // let queryURL = `${baseURL}${cityArgs}${query}`;
    let queryURL = 'https://developers.zomato.com/api/v2.1/cuisines?city_id=301';
    console.log(queryURL);

    $.ajax({
      url: queryURL,
      method: 'GET',
      headers: headers
    })
      .then(function (response) {
        console.log(response);
        $('#results-view').html(JSON.stringify(response));
      });
  }

  function searchRestaurants(query) {
    //https://developers.zomato.com/api/v2.1/search?entity_id=301&entity_type=city&q=subs&start=1&count=20&radius=1000&sort=rating&order=desc
    let queryURL = 'https://developers.zomato.com/api/v2.1/search?entity_id=301&entity_type=city&q='+query+'&start=1&count=20&radius=1000&sort=rating&order=desc';
    console.log(queryURL);

    $.ajax({
      url: queryURL,
      method: 'GET',
      headers: headers
    })
      .then(function (response) {
        console.log(response);
        $('#results-view').html(JSON.stringify(response));
        
      });
  }

  function searchZomatoCity() {
    
    // Preventing the button from trying to submit the form
    event.preventDefault();
    q = $('#search-city-input').val().trim();
    searchCity(q);
  }

  function searchZomatoCuisine() {
    
    // Preventing the button from trying to submit the form
    event.preventDefault();
    q = $('#search-cuisine-input').val().trim();
    searchCuisine(q);
  }
  
  function searchZomatoRestaurants() {
    
    // Preventing the button from trying to submit the form
    event.preventDefault();
    q = $('#search-restaurants-input').val().trim();
    searchRestaurants(q);
  }

  $(document).on('click', '#search-city-btn', searchZomatoCity);
  $(document).on('click', '#search-cuisine-btn', searchZomatoCuisine);
  $(document).on('click', '#search-restaurants-btn', searchZomatoRestaurants);





});