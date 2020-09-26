// on click send request to api (proxy required)
$("button").on("click", function(){
    var title = $("#showInput").val();
    var queryUrl = "https://cors-anywhere.herokuapp.com/https://tastedive.com/api/similar?q=" + title + "&limit=5&k=385951-ChaseEdw-B7D7T5KF";
    $.ajax({
    method: "GET",
    url: queryUrl
  })
  .done(getShows);
});
// Get related results and display them in our html
function getShows(data){
  for(var i = 0; i < 5; i++){
    var par = $("<p>");
    $(par).text(data.Similar.Results[i].Name);
    $("#test").append(par);
  }
}
