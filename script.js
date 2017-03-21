$(document).ready(function () {
  // Request random quote from quotesondesign.com
  function getRandomQuote() {
    var quoteRequest = $.ajax({
      type: 'GET',
      url: 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=?',
      datatype: 'json',
      cache: false
    });
    quoteRequest.done(function (data) {
      // Remove <p> tags and trailing white space
      var quote = data[0].content.slice(3,-5).trim();
      var author = data[0].title;
      $('#quoteContent').html('&ldquo; ' + quote + ' &rdquo;');
      $('#quoteAuthor').html(author);
    });
    quoteRequest.fail(function (xhr, status, error) {
      console.warn(xhr.responseText);
    });
  }

  // Request random photo from Unsplash
  function getRandomBackground() {
    var photoRequest = $.ajax({
      type: 'GET',
      url: 'https://api.unsplash.com/photos/random?client_id=9aa2f67b98d0fc60047248749538fb79be5414742a022301205a0817af275b73&query=design',
      datatype: 'json',
      cache: false
    });
    photoRequest.done(function (data) {
      var photoURL = data.urls.regular;
      var photoUser = data.user.name;
      var photoUserURL = data.user.links.html;
      $('body').css('background-image', 'url(' + photoURL + ')');
      $('#photoCredit').html(photoUser).attr({
        href: photoUserURL,
        alt: photoUser,
        title: photoUser
      });
    });
    photoRequest.fail(function (xhr, status, error) {
      console.warn(xhr.responseText);
    });
  }

  // Get another random quote and background image on click
  $('#getQuoteBtn').on('click', function (e) {
    e.preventDefault();
    getRandomQuote();
    getRandomBackground();
  });

  // Get random quote and background image on load
  getRandomQuote();
  getRandomBackground();
});