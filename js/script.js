
// this is the listener
// currently runs whenever the extension is opened.

chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    crawledList = new Set();
    getUrls();
    sendResponse({message: "received"});
  });

// this function gets all the urls on the local page and adds them to a set

function getUrls () {
    console.log("This still runs I think");
    let queue = new Set(); // "queue", no duplicates
    let links =  document.links; // all links on the page

    // "get" request to all those pages?????
    fetch(links)

      .then((data) => {

           for (var i=0; i<links.length; i++){
                // should add a domain checker here
                queue.add(links[i].href);

            };
        return queue;
        })

    console.log("Queue List", queue);
    //crawl(queue);
}

function crawl(urlList) {
  // add url to crawledList
  url = [...urlList][0] // grabs first link in set
  console.log(url); // prints url (or atleast it tries to)

  // add url to crawled list.
  crawledList.add(url);
  urlList.delete(url);
  // Create a new queue
  localQueue = new Set();
}
