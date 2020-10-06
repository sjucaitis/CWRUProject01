// When a user clicks on the search button, the makeRequest function is called with the input passed in it
$("#searchBtn").on("click", function(){
    var titleClick = $("#showInput").val();
    if(titleClick !== ""){
      makeRequest(titleClick);  
    } else {
      return;
    }
});
// When a user presses 'enter' focused on the input, the makeRequest function is called with the input passed in it
$("#showInput").on("keypress", function(e){
  if(e.which === 13){
    var titleEnter = $(this).val();
    if(titleEnter !== ""){
      makeRequest(titleEnter);  
    } else {
      return;
    }
  }
});


// A GET request is sent to the api (using a proxy) and pulls movie data based on user input
function makeRequest(title){
  //Clear any poster images from previous searches
  $("img").remove();
  var titleInput = title;

  // Insert title in the results header
  $("#titleSearch").text(titleInput);

  var titleSearch = titleInput.replaceAll(" ", "+");
  // console.log(titleSearch);
  
  var queryUrl = "https://cors-anywhere.herokuapp.com/https://tastedive.com/api/similar?q=" + titleSearch + "&limit=8&k=385951-ChaseEdw-B7D7T5KF";
  // console.log(queryUrl);
  $.ajax({
    method: "GET",
    url: queryUrl
  })
  .done(getTitles)
}


// Get the title results and display them in within each card in our html
function getTitles(data){
  // console.log(data);
  // If there are no results to the title searched, hide results elements and show message
  if(data.Similar.Results.length < 1){
    $(".row").addClass("result");
    $("#errorFeedback").removeClass("result");
    return;
  } else {
    // If there are results, show results elements and insert titles into html
    $(".row").removeClass("result");
    $("#errorFeedback").addClass("result");

    for(var i = 0; i < 8; i++){
      var movieTitle = data.Similar.Results[i].Name;

      // console.log(movieTitle);
      $("#title" + i).text(movieTitle);

      // Call getPosters to get title's poster
      getPosters(movieTitle, i);
    }
  }
} 


// Get the poster for each title from the omdb API
function getPosters(title, index){
  var movieUrl = "https://www.omdbapi.com/?t=" + title + "&apikey=c539e965";

  $.ajax({
    method: "GET",
    url: movieUrl
  })
  .done(function(data){
    var posterUrl = data.Poster;

    // Create an img tag, add attributes, and append to each respective card
    var posterImg = $("<img>");
    posterImg.attr("src", posterUrl);
    posterImg.attr("movie-title", title);
    posterImg.addClass("poster hvr-grow");
    $("#card" + index).prepend(posterImg);

    $("input").val("");
  });
}



// When a user clicks on a movie poster (img), they will be directed to the show page with more info on that movie
$(".card").on("click", "img", function(){
  var title = $(this).attr("movie-title");
  var url = "https://www.omdbapi.com/?t=" + title + "&apikey=c539e965";

  $.ajax({
    method: "GET",
    url: url
  })
  .done(function(data){
    // Call the populate storage function and pass the data from the api into it
    populateStorage(data);

    // Direct user to the show page with more info on the movie
    window.location.href = "show.html";
  });
});


// Store the movie data to local storage for use in the show.html file
function populateStorage(data){
  localStorage.setItem("Title", data.Title);
  localStorage.setItem("Year", data.Year);
  localStorage.setItem("Poster", data.Poster);
  localStorage.setItem("Plot", data.Plot);
  localStorage.setItem("Rating", data.Ratings[0].Value);
  localStorage.setItem("Actors", data.Actors);
  localStorage.setItem("Director", data.Director);
}