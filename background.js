var interval = 1;
var timeout;

function genericOnClick(info, tab) {
  console.log("item " + info.menuItemId + " was clicked");
  console.log("info: " + JSON.stringify(info));
  console.log("tab: " + JSON.stringify(tab));
  info.selectionText && console.log(info.selectionText);
}

// Create one test item for each context type.
var contexts = ["selection","link"];
for (var i = 0; i < contexts.length; i++) {
  var context = contexts[i];
  var title = "Add to Daily Danish";
  var id = chrome.contextMenus.create({"title": title, "contexts":[context],
                                       "onclick": genericOnClick});
  console.log("'" + context + "' item:" + id);
}

function message(msg){
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    if(tabs.length > 0){
      chrome.tabs.sendMessage(tabs[0].id, {createDiv: {innerHTML: msg}}, function(response) {
          alert("confirmation received");
          console.log(response);
          //console.log(response.confirmation);
      });
    }
  });
}

function millisTillNext(){
  var now = new Date();
  var minutes = now.getMinutes();
  var nextPeriod = minutes + (interval - (minutes % interval) );
  return new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), nextPeriod, 0, 0) - now;
}

function promptUser(){
    var now = new Date();
    var time = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
    /*alert("It's " + time + " now! Time for your meds!");*/
    message("It's " + time + " now! Time for your meds!");
    var int = millisTillNext();
    timeout = setTimeout(promptUser, int);
}

var int = millisTillNext();
//timeout = setTimeout(promptUser, int);
