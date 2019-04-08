// var indexFB=0;
$(document).ready(function() {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCu0Kf8a9uXU-9kfUG0ndAUD-OtbNY_k5M",
    authDomain: "food-finder-31d64.firebaseapp.com",
    databaseURL: "https://food-finder-31d64.firebaseio.com",
    projectId: "food-finder-31d64",
    storageBucket: "food-finder-31d64.appspot.com",
    messagingSenderId: "578287699810"
  };
  firebase.initializeApp(config);

  let database = firebase.database();

  restaurants = database.ref("restaurants");
  restaurant1 = database.ref("restaurants/restaurant1");
  restaurant2 = database.ref("restaurants/restaurant2");
  restaurant3 = database.ref("restaurants/restaurant3");
  restaurant4 = database.ref("restaurants/restaurant4");
  restaurant5 = database.ref("restaurants/restaurant5");
  restaurant6 = database.ref("restaurants/restaurant6");
  FBDBindexRef = database.ref("index");
  indexFB=0;
  //  Code for handling the push
  // database.ref().push({
  //   name: name,
  //   id: id,
  //   cuisines: cuisines,
  //   rated: rated,   
  //   dateAdded: firebase.database.ServerValue.TIMESTAMP
  // });

  restaurants.on(
    "child_added",
    function(childSnapshot) {
      // console.log(childSnapshot.val());
      let r = childSnapshot.val();
      let name = r.name;
      let cuisines = r.cuisines;
      let rated = r.rated;
      
      let newRow = $("<tr>").append(
        $("<td>").text(name),
        $("<td>").text(cuisines),
        $("<td>").text(rated)
      );
      // Append the new row to the table
      $("#review-table").append(newRow);
    },
    // Handle the errors
    function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    }
  );
});
