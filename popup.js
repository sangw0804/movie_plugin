chrome.runtime.onMessage.addListener((request, sender) => {
  if (request.action == 'getSource') {
    const { title, link, image, director, actors, date, rate } = request;

    const trimedTitle = title.split('<b>').join("").split('</b>').join("")

    const app = new Vue({
      el: '#app',
      data: {
        title: trimedTitle,
        link,
        image,
        director,
        actors,
        date,
        rate,
        link
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
       alert(chrome.runtime.lastError.message);
      }
    }
  );
};

window.onload = onWindowLoad;
