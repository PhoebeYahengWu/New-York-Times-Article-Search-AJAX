function updatePage(NYTData) {
    // Loop through and build elements for the defined number of articles
    // Create the  list group to contain the articles and add the article content for each
    var articleList = $("<ul>");
    articleList.addClass("list-group");
    // Add the newly created element to the DOM
    $("#article-section").append(articleList);
    for (var i = 0; i < 10; i++) {
      // Get specific article info for current index
      var article = NYTData.response.docs[i];
      // Increase the articleCount (track article # - starting at 1)
      var articleCount = i + 1;

      // If the article has a headline, log and append to $articleList
      var headline = article.headline;
      var articleListItem = $("<li class='list-group-item'>");
  
      if (headline && headline.main) {
        articleListItem.append(
          "<span class='label label-primary'>" + "<strong>" +
           articleCount + "</strong>" +
            "</span>" +
            "<strong> " +
            headline.main +
            "</strong>"
        );
      }
  
      // If the article has a byline, append to articleList
      var byline = article.byline;
  
      if (byline && byline.original) {
        articleListItem.append("<p>" + byline.original +" "+ article.pub_date.substring(0, 10) + "</p>");
      }
  
      // Append url
      articleListItem.append("<a target='_blank' href='" + article.web_url + "'>" + article.web_url + "</a>");
  
      // Append the article
      articleList.append(articleListItem);
    }
  }
  
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
    var query = $("#searchTerm").val();
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

