$(document).ready(function () {
  // AJAX Post HTTP Request
  function getRandomQuote() {
    var quoteRequest = $.ajax({
      type: 'GET',
      url: 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=?',
      datatype: 'json',
      cache: false
    });
    quoteRequest.done(function (data) {
      var quote = data[0].content;
      var author = data[0].title;
      var link = data[0].link;
      $('#quoteContent').html(quote);
      $('#quoteAuthor').html(author);
      $('#quoteSource').html(link);
      console.log(data[0]);
    });
    quoteRequest.fail(function (xhr, status, error) {
      console.warn(xhr.responseText);
    });
  }
  $('button#getQuote').on('click', function (e) {
    e.preventDefault();
    getRandomQuote();
  });
});