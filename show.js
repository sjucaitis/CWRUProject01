// Accessing local storage items and inserting them into the elements of the show.html page

var title = localStorage.getItem("Title");
var titleDisplay = document.getElementById("titleShow");
titleDisplay.innerText = title;

var plot = localStorage.getItem("Plot");
var plotDisplay = document.getElementById("plotShow");
plotDisplay.innerText = plot;

var rating = localStorage.getItem("Rating");
var ratingDisplay = document.getElementById("ratingShow");
ratingDisplay.innerText = "IMDb- " + rating;

var poster = localStorage.getItem("Poster");
var posterDisplay = document.querySelector(".poster");
posterDisplay.setAttribute("srcset", poster);

var year = localStorage.getItem("Year");
var yearDisplay = document.getElementById("yearShow");
yearDisplay.innerText = year;

var director = localStorage.getItem("Director");
var directorDisplay = document.getElementById("directorShow");
directorDisplay.innerText = "Director(s): " + director;

var actors = localStorage.getItem("Actors");
var actorsDisplay = document.getElementById("actorsShow");
actorsDisplay.innerText = "Actor(s): " + actors;

getTitleVideo(title);


// Gets the url to a youtube video for the movie/show title
function getTitleVideo(title){
    var titleSearch = title.replaceAll(" ", "+");
    var queryUrl = "https://cors-anywhere.herokuapp.com/https://tastedive.com/api/similar?q=" + titleSearch + "&info=1&limit=1&k=385951-ChaseEdw-B7D7T5KF";
    console.log(queryUrl);
    $.ajax({
    method: "GET",
    url: queryUrl
    })
    .done(function(data){
    localStorage.setItem("Video", data.Similar.Info[0].yUrl);

    var video = localStorage.getItem("Video");
    var videoDisplay = document.querySelector("iframe");
    videoDisplay.src = video;
    });
}