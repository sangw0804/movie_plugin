// function sayHello(){
//   document.body.innerText = "Hello, World!";
// }
// window.onload = sayHello;

const msg = document.getElementById('message');

chrome.runtime.onMessage.addListener((request, sender) => {
  if (request.action == "getSource") {
    // msg.innerText = JSON.stringify(request.sou;
    const doc = request.source;
    msg.innerText = request.source;
  }
});

const onWindowLoad = () => {
  chrome.tabs.executeScript(null, {
    file: 'injected.js'
  }, () => {
    if (chrome.runtime.lastError) {
      msg.innerText = chrome.runtime.lastError.message;
    }
  })
}

window.onload = onWindowLoad;