var bool = 1;
var options = {
  type: "basic",
  title: "*** Extension",
  message: "Uh oh! *** est en live !",
  iconUrl: "images/logo.png"
};
var myAudio = new Audio(chrome.runtime.getURL("images/sound.mp3"));


update();

setInterval(function(){
  update();
}, 30000);

function update(){
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://api.twitch.tv/kraken/streams/***?client_id=***", true);
  xhr.onreadystatechange = function(channel) {
    if(xhr.readyState == 4) {
      var data = JSON.parse(xhr.responseText);
      if(data["stream"] == null){
        bool = 1;
        chrome.browserAction.setBadgeText({text: ""});
      }
      else{
        if (bool == 1) {
          chrome.notifications.create(options);
          myAudio.play();
          bool = 2;
        }
        chrome.browserAction.setBadgeText({text: "ON"});
        chrome.browserAction.setBadgeBackgroundColor({color: "green"});
      }
    }
  }
  xhr.send();
}
