// const msg = document.getElementById('message');

chrome.runtime.onMessage.addListener((request, sender) => {
  if (request.action == 'getSource') {
    const { title, link, image, director, actors, date, rate } = request;

    const app = new Vue({
      el: '#app',
      data: {
        title,
        link,
        image,
        director,
        actors,
        date,
        rate
      }
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
