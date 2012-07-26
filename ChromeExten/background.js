// TabTracker for Chrome (extension)
// background.js

var EVENT_SEND_METHOD = "PUT";
var EVENT_SEND_HOST = "http://nthmost.net";

//all listener-callbacks go here:

//test callback function
function hello() 
{  chrome.tabs.create({url: 'http://www.live-evil.com/moonquotes.html' });  
   console.log("Hand out the free cigarettes. We smoke while we shoot the bird.");
   console.log("I really hope he can see this, because I'm doing it as hard as I can.");
   console.log("Your roommate is a nerd. Yes, on the moon, nerds get their pants pulled down and they are spanked with moon rocks!");
}


function send_event(stuff) { 
   console.log("going to try to send this stuff to the server: "+stuff);
   var xhr = new XMLHttpRequest();
   path = EVENT_SEND_HOST + stuff;
   try {
      xhr.open(EVENT_SEND_METHOD, path, true);
      xhr.onreadystatechange = function() {
         if (xhr.readyState == 4) {
            //safe way to read from response:
            //document.getElementById("resp").innerText = xhr.responseText;
            console.log("successfully sent event.");
         } else { 
            console.log("couldn't send event!");
         }; //end if-else
      }; //end xhr callback function
   } //end try
   catch (err) { 
      console.log(err);
   }; //end catch
}

function handle_tab_created(createdtab) { 
   console.log("tab was created with tabID "+createdtab.id);
   //get stuff out of createdtab. send it to the server.
   path_to_send = "/tab/"+createdtab.id+"/"+createdtab.windowId+"/"+createdtab.url
   send_event(path_to_send);
   return null;
} 

function handle_tab_attached(tabId, attachInfo) {
   console.log("tab attached to new window: "+attachInfo.newWindowId);
   //do some stuff with what's in attachInfo,
   //which contains: newWindowId, newPosition (both integers)
   return null;
}

function handle_tab_activated(activeInfo) { 
   //do some stuff with what's in activeInfo,
   //which contains: tabId, windowId
   console.log("tabId "+activeInfo.tabId+" activated in window "+activeInfo.windowId);
   return null;
} 

function handle_tab_detached(tabId, detachInfo) {
   //do some stuff with what's in detachInfo,
   //which contains: oldWindowId, oldPosition (integers)
   console.log("tabId "+tabId+" detached from window "+oldWindowId);
   return null;
} 

function handle_tab_highlighted(highlightInfo) {
   //do some stuff with what's in highlightInfo,
   //which contains: windowId (int), tabIds (array of ints)
   msg = "";

   if (highlightInfo.tabIds) { 
   for (i in highlightInfo.tabIds) {
      msg += i + ", ";
   } }

   console.log("highlight event triggered in Tabs: "+msg);
   return null;
} 

function handle_tab_moved(tabId, moveInfo) {
   //do some stuff with what's in moveInfo,
   //which contains: windowId, fromIndex, toIndex (all integers)
   console.log("tabId "+tabId+" moved to index "+toIndex+" in windowID "+windowId);
   return null;
} 

function handle_tab_removed(tabId, removeInfo) { 
   //do some stuff with what's in removeInfo,
   //which contains: isWindowClosing (boolean)
   msg = "tabId"+tabId+" closed (removed) "
   if (removeInfo.isWindowClosing) {
      msg += "because window is closing"
   } else { msg += "(window still open)" }
   console.log(msg)
   return null;
} 

function handle_tab_updated(tabId, changeInfo, updatedtab) {
   //do some stuff with what's in changeInfo,
   //which contains: status (str), url (str), pinned (bool)
   console.log("tabId "+tabId+" updated in some way - let's figure out how...");
   console.log("   status: "+changeInfo.status);
   console.log("   url: "+changeInfo.url);
   console.log("   pinned: "+changeInfo.pinned);

   return null;
}

//all listeners below:

chrome.tabs.onCreated.addListener(handle_tab_created);
chrome.tabs.onActivated.addListener(handle_tab_activated);
chrome.tabs.onAttached.addListener(handle_tab_attached);
chrome.tabs.onDetached.addListener(handle_tab_detached);
chrome.tabs.onHighlighted.addListener(handle_tab_highlighted);
chrome.tabs.onMoved.addListener(handle_tab_moved);
chrome.tabs.onRemoved.addListener(handle_tab_removed);
chrome.tabs.onUpdated.addListener(handle_tab_updated);

//test listener:
chrome.browserAction.onClicked.addListener(hello);

