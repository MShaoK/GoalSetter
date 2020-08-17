chrome.runtime.onInstalled.addListener(function () {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({})],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});

let activeTabId = null;
let activeWindowId = null;

chrome.runtime.onMessage.addListener(
  (request, sender, response) => {
    console.log("background.js got a message")
    console.log("request from: ", request)

    // Do we even need to track these with the
    //  messaging system we're given?
    // Yes, because this only updates on page loads.
    // Maybe not, this is all from the tab object.
    //  We need the onPageLoad bit to make sure
    //  data is sent AFTER new pages load, but
    //  on old tabs, this data should all be there 
    //  and up to date.
    
    // MESSAGE FROM TAB
    if (sender.tab) {
      activeTabId = sender.tab.id;
      activeWindowId = sender.tab.windowId;

      console.log(
        `You have loaded a new page:
        windowId: ${sender.tab.windowId}
        tabId: ${sender.tab.id}
        tabName: ${sender.tab.title}
        tabUrl: ${sender.tab.url}`
      );
    }
    // MESSAGES FROM EXTENSION

    if (request.action === "startWork") {
      startTime = Date.now();
      response({startTime: startTime});
    } else if (request.action === "stopWork") {
      startTime = null;
      response();
    } else if (request.action === "getStatus") {
      response({startTime: startTime});
    } else if (request.action === "retrieveData") {
      response({activeTabId, activeWindowId, tabName: sender.tab.title, tabUrl: sender.tab.url});
    }
  }
);
console.log("this is background.js reporting for duty");

chrome.tabs.onActivated.addListener(
  tab => {
    console.log(tab);
    chrome.tabs.get(tab.tabId, tab => {
      activeTabId = tab.id;
      activeWindowId = tab.windowId;
      console.log(
        `You have changed tabs:
        windowId: ${tab.windowId}
        tabId: ${tab.id}
        tabName: ${tab.title}
        tabUrl: ${tab.url}`
      );
    });
  }
);

/*
useful tab keys:
  bool    active
  bool    audible?
  int     id
  int     windowId
  string  title
  string  url
*/


/* TIMER */

let startTime = null;
let interval = 1000;

let workActive = false;

const startTimer = () => {
  startTime = Date.now();
};


const retrieveData = () => {
  console.log('retrieving data')
  chrome.runtime.sendMessage({
      action: "retrieveData"
  }, (response) => {
      sendData(response);
  });
};


//sends data every 5 minutes
// window.setInterval(300000, retrieveData);


const sendData = (data) => {
  console.log('sending data:', data);
  $.ajax({
      url: '/', //TO DO: get url
      method: 'POST',
      data: $.param(data),
      success: () => {
          console.log('Successfully sent data to server')
      }
  })
      .catch((err) => console.log(err));
};
