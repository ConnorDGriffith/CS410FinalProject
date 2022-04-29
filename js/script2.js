// NOTES:
// Document is the webpage html.
// HOLY SHIT GUYS, WE MIGHT BE ABLE TO PULL THIS OFF.
// WE NEED TO CREATE A PARSER THAT TAKES THE HTML AS AN INPUT STRING AND SPITS 
// OUT AN ARRAY OF URLS. WE DO THAT, AND WE ARE GOLDENNNNNNNN.
function parseURLS(htmlString) {
	let parser = new DOMParser();
	let parsedHtml = parser.parseFromString(htmlString, 'text/html');

	let atags = parsedHtml.getElementsByTagName("a");
	return atags;
}


chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    let crawledList = new Set();
    let depth1 = 3;
    let queue = getURLS(); // all urls on the first page.
    //let url = window.location.toString(); // this how you get the url from a content script
    // test to see if we could crawl in the domain. (WE CAN)


    /*
    fetch("https://www.geeksforgeeks.org/category/programming-language/swift/", {credentials: "same-origin"}).then(response => response.text())
		.then(data => { 
			let atags = parseURLS(data);
			

			for (var i = 0; i <= atags.length; i++) {
				console.log(atags[i].href);
			}
	}); */
    crawl2(queue, depth1); // pass url and depth to crawl function to run recursively
    sendResponse({message: "received"});
    console.log("Done");

  });

// grabs all the urls on first page, put them in a set, return set
function getURLS() {
	console.log("Getting urls");
	let queue = new Set(); // "queue", no duplicates
    let links =  document.links; // all links on the page
    for (var i = 0; i <= links.length; i++) {
    	try {
    		queue.add(links[i].href);
    	} catch {
    		console.log("Oops");
    	}
    }
    return queue; // return the set of all the urls on the page.
}

function crawl2(queue, depth) {
	// exit condition
	let localQueue = new Set(); //this

	queue.forEach(function(url) {
		try {
			fetch(url, {credentials: "same-origin"})
			.then(response => response.text())
			.then(data => {
				let links = parseURLS(data); // WE NEED TO WRITE THIS FUNCTION.
				
				
				for (var i = 0; i <= links.length; i++) {
	    			try {
	    				localQueue.add(links[i].href);
	    			} catch {
	    				console.log("Oopsy");
	    			}
	    		}
				}); // end of the fetch!
		} catch (error) { console.log("YOU'RE REALLY 31?")}
		console.log(localQueue);
		console.log(depth);
		
	}); // end of the queue loop

	if (depth >= 0) {
			crawl2(localQueue, depth-1);
		}
} // end of the crawl2