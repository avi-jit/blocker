console.log("front.js")


var today = new Date()
// Sun Aug 22 2021 23:06:36 GMT+0530 (India Standard Time)
var day = today.getDay() // S is 0, M is 1 ...
//var year = today.getFullYear(); var month = today.getMonth() + 1; var date = today.getDate(); var seconds = today.getSeconds(); var full = today.toString()
var hrs = today.getHours()
var mins = today.getMinutes()
var time = parseFloat(hrs+'.'+mins)
console.log('time: ' + time)
var unblocked = false

// https://developer.chrome.com/docs/extensions/reference/storage/
function getAllStorageLocalData() {
  // Immediately return a promise and start asynchronous work
  return new Promise((resolve, reject) => {
    // Asynchronously fetch all data from storage.sync.
    chrome.storage.local.get(null, (items) => {
      // Pass any observed errors down the promise chain.
      if (chrome.runtime.lastError) {
        return reject(chrome.runtime.lastError);
      }
      // Pass the data retrieved from storage down the promise chain.
      resolve(items);
    });
  });
}
const storageCache = {};
// Asynchronously retrieve data from storage.sync, then cache it.
const initStorageCache = getAllStorageLocalData().then(items => {
  // Copy the data retrieved from storage into storageCache.
  Object.assign(storageCache, items);
});

async function doWork() {
  await initStorageCache;
  chrome.runtime.sendMessage({ text: "what is my tab?" }, tab => {
    my_url = tab.tab.url
    console.log('My tab is', my_url);
    console.log(storageCache)

    var unblocked = false
    for (var i = 0; i < storageCache.unblock_times.length; i++) {
      //console.log(unblock_times[i]);
      var item = storageCache.unblock_times[i];
      item[0] = parseFloat(item[0].replace(":", "."))
      item[1] = parseFloat(item[1].replace(":", "."))
      //if (hrs >= item[0] && hrs < item[1]) {
      if (time >= item[0] && time < item[1]) {
        console.log("Unblocking in: " + item)
        unblocked = true;
        break;
      }
    }
    if (unblocked === false) {
      if (day > 0 && day < 6)
      {
        for (var i = 0; i < storageCache.sites.length; i++) {
          //console.log(unblock_times[i]);
          let site = storageCache.sites[i]
          if (my_url.includes(site)){
            console.log("Blocked: " + my_url + "; Contains: " + site)
            window.location.replace('http://google.com')
          }
        }
      }
    }
  });
}
doWork()
