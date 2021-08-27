/*
chrome.storage.onChanged.addListener(function (changes, namespace) {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    console.log(
      `Storage key "${key}" in namespace "${namespace}" changed.`,
      `Old value was "${oldValue}", new value is "${newValue}".`
    );
    if (key === 'sites') {
      //setURLs(sites)
      console.log('sites changed')
    }
  }
})

function setURLs(sites) {
  var urls = []
  for (const site of sites) {
    //console.log(site)
    if (site.includes(".")){
      urls.push("*://*." + site + "/*")
      //console.log("*://*." + site + "/*")
    }
    else {
      urls.push("*://*." + site + ".com/*")
      //console.log("*://*." + site + ".com/*")
    }
  }
  //return urls
  chrome.storage.local.set({ urls: urls}, function () {
      console.log('chrome.storage.local set urls');
      console.log(urls)
  })
}
*/

// https://developer.chrome.com/docs/extensions/mv3/service_workers/
chrome.runtime.onInstalled.addListener(function() {
  var sites = [
    "news.google.com",
    "twitter",
    "instagram",
    "quora",
    "linkedin",
    "facebook",
    "fb",
    "youtube",
    "wsj",
    "washingtonpost",
    "netflix",
    "amazon",
    "amazon.in",
    "amazon.sg",
    "robinhood",
    "zerodha",
    "coindcx",
    "primevideo",
    "primevideo.in",
    "pinterest"
  ]
  //console.log(sites)
  chrome.storage.local.set({ sites: sites}, function () {
      console.log('chrome.storage.local set sites');
      console.log(sites)
      //setURLs(sites)
  })
  //var unblock_times = [[13, 15],[21, 22]]
  var unblock_times = [["13:00", "15:00"], ["20:00", "21:00"]]
  chrome.storage.local.set({ unblock_times: unblock_times }, function () {
      console.log('chrome.storage.local set unblock_times');
      console.log(unblock_times)
  })
  //getSitesCreateListener()
})

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    if (msg.text == "what is my tab?") {
        sendResponse({tab: sender.tab});
    }
});
