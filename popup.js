chrome.runtime.onMessage.addListener((request, sender) => {
  if (request.action == 'getSource') {
    const { movies } = request;

    const trimedTitle = movies[0].title
      .split('<b>')
      .join('')
      .split('</b>')
      .join('');

    const app = new Vue({
      el: '#app',
      data: {
        title: trimedTitle,
        link: movies[0].link,
        image: movies[0].image,
        director: movies[0].director,
        actors: movies[0].actor,
        date: movies[0].pubDate,
        rate: movies[0].userRating,
        link: movies[0].link
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
