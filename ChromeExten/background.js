// TabTracker for Chrome (extension)
// background.js

var EVENT_SEND_METHOD = "PUT";
//var EVENT_SEND_METHOD = "GET";
var EVENT_SEND_HOST = "http://nthmost.net:8080";
//var EVENT_SEND_HOST = "http://localhost:8080";

//how to compose the events to send to Event Storage:
// if it's a TAB:
//      /tab/TABID_int/EventType_str/?params
// if it's a WINDOW:
//      /win/WINID_int/EventType_str/?params


function get_random()
{
    var ranNum= Math.floor(Math.random()*5);
    return ranNum;
}
function get_random_quote() {
   var whichQuote=get_random();

    var quote=new Array(5)
     quote[0]="Hand out the free cigarettes. We smoke while we shoot the bird.";
     quote[1]="I really hope he can see this, because I'm doing it as hard as I can.";
     quote[2]="Your roommate is a nerd. Yes, on the moon, nerds get their pants pulled down and they are spanked with moon rocks!";
     quote[3]="Everyone, bow your heads and pretend to be serious.";
     quote[4]="Stealing the 10 speed is easy. Filling it with illegal substances and smuggling it across the border is much harder.";
     quote[5]="We are sorry in the most sarcastic sense of the word.";
     quote[6]="Our liability coverage is zero. Our balls, however, are enormous.";
     quote[7]="We do whatever we want, to whomever we want, at all times!";
  
   return(quote[whichQuote]);
}

//all listener-callbacks go here:

//test callback function
function hello() 
{  //chrome.tabs.create({url: 'http://www.live-evil.com/moonquotes.html' });  
   var q = get_random_quote()
   console.log(q);
   send_event(q);
}


//compose_event params: "tab" or "win", "ID", "Event Type" (string), "otherParams" 
function compose_event(thing, thingId, eventType, otherParams) {
   otherParams = typeof otherParams !== 'undefined' ? otherParams : ""; //allows otherParams to be optional.
   return "/"+thing+"/"+thingId+"/"+eventType+"/"+otherParams;
}

function send_event(stuff) { 
   if (stuff == null) { 
      console.log("send_event got null 'stuff', aborting.");
      return
   } 
   console.log("going to try to send this stuff to the server: "+stuff);
   var xhr = new XMLHttpRequest();
   path = EVENT_SEND_HOST + stuff;
   try {
      xhr.open(EVENT_SEND_METHOD, path, true);
      xhr.onreadystatechange = function() {
         if (xhr.readyState == 4) {
            if (xhr.status > 1) { 
               //safe way to read from response:
               //document.getElementById("resp").innerText = xhr.responseText;
               console.log("successfully sent event.");
             }  
         } else { 
            console.log("couldn't send event!");
         }; //end if-else
      }; //end xhr callback function
      xhr.send();
   } //end try
   catch (err) { 
      console.log(err);
   }; //end catch
}

function handle_tab_created(createdtab) { 
   console.log("(Tab Created) tabID "+createdtab.id+" just born.");
   //get stuff out of createdtab. send it to the server.
   send_event(compose_event("tab", createdtab.id, "Created", "winId="+createdtab.windowId+"&url="+createdtab.url));
   return null;
} 

function handle_tab_attached(tabId, attachInfo) {
   console.log("(Tab Attached) tabId "+tabId+" now attached to window: "+attachInfo.newWindowId);
   //do some stuff with what's in attachInfo,
   //which contains: newWindowId, newPosition (both integers)
   send_event(compose_event("tab", tabId, "Attached", "winId="+attachInfo.newWindowId));
   return null;
}

function handle_tab_activated(activeInfo) { 
   //do some stuff with what's in activeInfo,
   //which contains: tabId, windowId
   console.log("(Tab Activated) tabId "+activeInfo.tabId+" activated in window "+activeInfo.windowId);
   //send_event...?  Not sure if we really want this one.
   return null;
} 

function handle_tab_detached(tabId, detachInfo) {
   //do some stuff with what's in detachInfo,
   //which contains: oldWindowId, oldPosition (integers)
   console.log("(Tab Detached) tabId "+tabId+" detached from window "+detachInfo.oldWindowId);
   send_event(compose_event("tab",tabId,"Detached","winId="+detachInfo.oldWindowId));
   return null;
} 

/* Highlight event seems superfluous to our needs.
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
*/

function handle_tab_moved(tabId, moveInfo) {
   //do some stuff with what's in moveInfo,
   //which contains: windowId, fromIndex, toIndex (integers)
   console.log("(Tab Moved) tabId "+tabId+" moved to index "+moveInfo.toIndex+" in windowID "+moveId.windowId);
   send_event(compose_event("tab",tabId,"Moved","winId="+moveInfo.windowId+"&toIndex="+moveId.toIndex));
   return null;
} 

function handle_tab_removed(tabId, removeInfo) { 
   //do some stuff with what's in removeInfo,
   //which contains: isWindowClosing (boolean)
   msg = "(Tab Removed) tabId"+tabId+" closed (removed) "
   if (removeInfo.isWindowClosing) {
      msg += "because window is closing"
   } else { msg += "(window still open)" }
   console.log(msg)
   send_event(compose_event("tab",tabId,"Removed","windowclosing="+removeInfo.isWindowClosing));
   return null;
} 

function handle_tab_updated(tabId, changeInfo, updatedtab) {
   //do some stuff with what's in changeInfo,
   //which contains: status (str), url (str), pinned (bool)
   console.log("(Tab Updated) tabId "+tabId+" updated:");
   console.log("   status: "+changeInfo.status);
   console.log("   url: "+changeInfo.url);
   //console.log("   pinned: "+changeInfo.pinned);
   if (changeInfo.status == "loading") {
      send_event(compose_event("tab",tabId,"Updated","winId="+updatedtab.windowId+"&url="+updatedtab.url));
   }
   return null;
}

function handle_window_created(createdwindow) {
   console.log("(Window Created) winId "+createdwindow.id+" was just born.");
   //we could also get info about what tabs in this window, but maybe we don't need that.
   send_event(compose_event("win", createdwindow.id, "Created"));
}

function handle_window_focuschanged(winId) {
   console.log("(Focus Change) winId "+winId+" is now in focus.");
   send_event(compose_event("win", winId, "Focus"));
} 

function handle_window_removed(winId) {
   console.log("(Window Removed) winId "+winId+" is no longer with us.");
   send_event(compose_event("win", winId, "Removed"));
}

//all listeners below...
//   some commented out for having too high noise/signal ratio:

chrome.tabs.onCreated.addListener(handle_tab_created);
chrome.tabs.onActivated.addListener(handle_tab_activated);
chrome.tabs.onAttached.addListener(handle_tab_attached);
chrome.tabs.onDetached.addListener(handle_tab_detached);
//chrome.tabs.onHighlighted.addListener(handle_tab_highlighted);
//chrome.tabs.onMoved.addListener(handle_tab_moved);
chrome.tabs.onRemoved.addListener(handle_tab_removed);
chrome.tabs.onUpdated.addListener(handle_tab_updated);

chrome.windows.onCreated.addListener(handle_window_created);
chrome.windows.onFocusChanged.addListener(handle_window_focuschanged);
chrome.windows.onRemoved.addListener(handle_window_removed);

//test listener:
chrome.browserAction.onClicked.addListener(hello);

