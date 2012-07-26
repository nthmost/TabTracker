// background.js

var EVENT_SEND_METHOD = "PUT";
var EVENT_SEND_HOST = "http://nthmost.net";

//all listener-callbacks go here:

//test callback function
function hello() 
{  chrome.tabs.create({url: 'http://boring.com' });  
   console.log("you clicked the Mooninite! Jerk!");
}

function handle_tab_created(createdtab) {
   console.log("tab with tabId "+createdtab.Id+" was created.");
}


//test listener:
chrome.browserAction.onClicked.addListener(hello);

chrome.tabs.onCreated.addListener(handle_tab_created);

