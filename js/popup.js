

chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
  console.log(tabs[0].url);
  const urlForm = document.getElementById('urlFormInput');
  urlForm.value = tabs[0].url;
  let msgObj = "Hello";
  chrome.tabs.sendMessage(tabs[0].id, msgObj);

});

//document.addEventListener('DOMContentLoaded', downloader);

// Right now this just saves a text file to the computer to test downloading with Chrome Extension
// no longer works
function saveAs(){
    let file = new File(["test"], "test.txt", {
      type: "text/plain",
    });
    let url = URL.createObjectURL(file);
    const urlForm = document.getElementById('urlFormInput');
    let name = urlForm.value;
    chrome.downloads.download({
      url: url,
      filename: "replacewithname", // not working with name variable
      saveAs: true
    });
}

function downloader() {
    let submitBtn = document.getElementById('form');
    submitBtn.addEventListener('submit', saveAs()); // when download button pressed, trigger saveAs function
}

document.addEventListener('DOMContentLoaded', downloader());
