// function sayHello(){
//   document.body.innerText = "Hello, World!";
// }
// window.onload = sayHello;

const msg = document.getElementById('message');

chrome.runtime.onMessage.addListener((request, sender) => {
  if (request.action == 'getSource') {
    const { source } = request;
    msg.innerText = source;
    chrome.tabs.create({
      url: `https://movie.naver.com/movie/search/result.nhn?query=${source}&section=all&ie=utf8`,
      selected: true
    });
  }
});

const onWindowLoad = () => {
  chrome.tabs.executeScript(
    null,
    {
      file: 'injected.js'
    },
    () => {
      if (chrome.runtime.lastError) {
        msg.innerText = chrome.runtime.lastError.message;
      }
    }
  );
};

window.onload = onWindowLoad;
