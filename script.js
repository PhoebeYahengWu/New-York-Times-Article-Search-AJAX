// function to empty out the articles
function clear() {
    $("#article-section").empty();
}


// add click event to search button
$("#run-search").on("click", function(event) {
    // prevent page from reloading on form submit
    event.preventDefault();
    // empty the region associated with the articles
    clear();
    // build the query url for the ajax request to the NYT API
    var query = document.getElementById("searchTerm");
    var apiKey = "02fSOHjCfipSpvT8KuDnPE9RROVpAEWM"
    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + query + "&api-key=" + apiKey 
    // make ajax request to the API and GET JSON data
    // data then passed as an argument to the updatePage function
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(updatePage);
});

// add click event and function to clear button
$("#clear-all").on("click",clear);