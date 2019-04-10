chrome.runtime.onMessage.addListener((request, sender) => {
  if (request.action == 'getSource') {
    const { title, link, image, director, actors, date, rate } = request;

    const trimedTitle = title
      .split('<b>')
      .join('')
      .split('</b>')
      .join('');

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

const excuteScripts = fileName =>
  new Promise((res, rej) => {
    chrome.tabs.executeScript(null, { file: fileName }, () => {
      if (chrome.runtime.lastError)
        rej(alert(chrome.runtime.lastError.message));
      else res();
    });
  });

const onWindowLoad = async () => {
  const files = [
    'helpers/getRankOfCandidates.js',
    'helpers/inspect.js',
    'main.js'
  ];

  for (let i = 0; i < files.length; i++) {
    await excuteScripts(files[i]);
  }
};

window.onload = onWindowLoad;
