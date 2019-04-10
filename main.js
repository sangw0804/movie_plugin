title = document.getElementsByTagName('title')[0].innerText;
console.log(title);

// from /helpers
movie = getRankOfCandidates(title);
if (!movie.length) {
  movie = inspect(title);
}

console.log(movie);

fetch(`https://movie-plugin.p-e.kr/movie_search?movie=${movie[0]}`).then(
  async res => {
    const movies = JSON.parse(await res.text());
    console.log(movies);

    chrome.runtime.sendMessage({
      action: 'getSource',
      movies
    });
  }
);
