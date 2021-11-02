$(document).ready(function() {
  jQuery('times.timeago').timeago();
  let $app = $('#app');
  $app.html('');

  var clickEvents = function() {
    $('.username').on("click", function(event) {
      getUserFeed(event.target.innerText.slice(1));
    });
    $("#update-feed").on("click", function(event) {
      getFeed();
    });
  }

  var feedSetUp = function() {
    $feed.html('');
    $('<h1 class="feeder-head">News Feed</h1>').appendTo($feed);
  }

  var getTweets = function(tweet) {
    var $tweet = $('<div id="tweet" class="tweet"></div>');
    $tweet.appendTo($feed);
    $('<img class="profile-photo" src=' + tweet.profilePhotoURL + ' alt="' + tweet.user + '">').appendTo($tweet);
    var $username = $('<h5 class="username">@' + tweet.user + '</h5>');
    $username.appendTo($tweet);
    $('<p class="message">' + tweet.message + '</p>').appendTo($tweet);
    $('<h6 class="timestamp">' + jQuery.timeago(tweet.created_at) + '</h6>').appendTo($tweet);
    var $icons = $('<div class="icons"></div>');
    $icons.appendTo($tweet);
    $('<i class="far fa-thumbs-up like"></i>').appendTo($icons);
    $('<i class="far fa-comment comment"></i>').appendTo($icons);
    $('<i class="fas fa-retweet retweet"></i>').appendTo($icons);
    $('<i class="far fa-share-square share"></i>').appendTo($icons);
    clickEvents();
  }

  var getFeed = function() {
    feedSetUp();
    $('<button type="button" id="update-feed">Update Feed</button>').appendTo($feed);
    var index = streams.home.length - 1;
    while (index >= 0){
      var tweet = streams.home[index];
      getTweets(tweet);
      index--;
    }
    clickEvents();
  }

  var getUserFeed = function(user) {
    feedSetUp();
    $('<button type="button" id="update-feed">Back</button>').appendTo($feed);
    var index = streams.users[user].length - 1;
    while (index >= 0) {
      var tweet = streams.users[user][index];
      getTweets(tweet);
      index--;
    }
    clickEvents();
  }

  let $header = $('<header class="header"></header>');
  $header.appendTo($app);
  let $twiddler = $('<h1 class"page-name">Twiddler</h1>');
  $twiddler.appendTo($header);

  let $main = $('<div class="main"></div>');
  $main.appendTo($app);

  let $div = $('<div id="new-tweet-container" class="container"></div>');
  $div.appendTo($main);
  $('<h2>New Post Form</h2>').appendTo($div);
  let $form = $('<form id="new-tweet-form" class="form"></form>');
  $form.appendTo($div);
  var $fieldSet = $('<fieldset></fieldset>');
  $fieldSet.appendTo($form);
  var $label = $('<label for="username"></label>');
  $label.appendTo($fieldSet);
  $label.append('Username<br>');
  $('<input id="username" type="text" name="username" placeholder="Enter Your Username"><br>').appendTo($label);
  $label = $('<label for="message"></label>');
  $label.appendTo($fieldSet);
  $label.append('Message<br>');
  $('<input id="message" type="text" name="message" placeholder="What\'s on your mind?"><br>').appendTo($label);
  $('<button type="button" id="submit-post">Post</button>').appendTo($fieldSet);
  $('#submit-post').on("click", function(event) {
    event.preventDefault();
    var tweet = {};
    tweet.user = document.getElementById("username").value;
    tweet.message = document.getElementById("message").value;
    tweet.created_at = new Date();
    tweet.profilePhotoURL = 'assets/img/visitor.png';
    if (streams.users[tweet.user] === undefined) {
      streams.users[tweet.user] = [];
      $('<li class="username friend">@' + tweet.user + '</li>').appendTo($friendsList);
    }
    addTweet(tweet);
    $form[0].reset();
    getFeed();
  });

  var $feed = $('<section id="feed" class="container" section></section>');
  $feed.appendTo($main);
  getFeed();

  $div = $('<div id="friends-container" class="container"></div>');
  $div.appendTo($main);
  $header2 = $('<h2>Friends List</h2>');
  $header2.appendTo($div);
  var $friendsList = $('<ul id="friends-list" class="list"></ul>');
  $friendsList.appendTo($div);
  for (var user in streams.users) {
    $('<li class="username friend">@' + user + '</li>').appendTo($friendsList);
  }
  clickEvents();
});