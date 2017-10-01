$('#wiki-form').submit(function(e) {
  e.preventDefault();
  $("#result").empty();
  var searchTerm = $("#search").val();  

  var xhr = new XMLHttpRequest();
  var url = "https://cors-anywhere.herokuapp.com/http://en.wikipedia.org/w/api.php?action=opensearch&search=" + searchTerm + "&format=json"
  xhr.open('GET', url, true);
  xhr.setRequestHeader('Api-User-Agent', 'Example/1.0');
  xhr.send();
  xhr.addEventListener("readystatechange", processRequest, false);

  function processRequest(e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var response = JSON.parse(xhr.responseText);
      // Do something with response
      responseToHtml(response);
    }
  }
})

function responseToHtml(array) {
  $('.title').fadeOut(300, function() {
    $('.search-form').animate({"margin-top": '30px',}, 500);
  });
  for (var i = 0; i < array[1].length; i++) {
    var searchResult = "<a class=\"search-anchor\" href=\"" + array[3][i] + "\"><div class=\"search-result\"><h3>" + array[1][i] + "</h3><p>" + array[2][i] + "</p></div></a>"
    $('#result').append(searchResult);
  }
}
