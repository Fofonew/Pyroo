var xhr = new XMLHttpRequest();
xhr.open("GET", "https://api.twitch.tv/kraken/streams/***?client_id=***", true);
xhr.onreadystatechange = function(channel) {
  if(xhr.readyState == 4) {
    var data = JSON.parse(xhr.responseText);

    if(data["stream"] == null){
      chrome.browserAction.setBadgeText({text: ""});
      $("#info").html("<font color='red'><strong>*** est actuellement offline.</strong></font>");
      $("#follow").html("0");
      $("#view").html("0");
    }
    else {
      var title = "&#9679 " + data["stream"]["channel"]["status"];
      var game = "&#9679 " + data["stream"]["game"];
      $("#game").html(game);
      $("#title").html(title);
      var img_out = '<a href="https://twitch.tv/***" target="_blank"><img src="' + data["stream"]["preview"]["medium"] + '" class="images_screen" alt="Stream" title="Stream"/></a>';
      var follow = data["stream"]["channel"]["followers"];
      $("#follow").html(follow);
      var view = data["stream"]["viewers"];
      $("#view").html(view);
      $("#info").html(img_out);
      chrome.browserAction.setBadgeText({text: "ON"});
      chrome.browserAction.setBadgeBackgroundColor({color: "green"});
    }
  }
}
xhr.send();
