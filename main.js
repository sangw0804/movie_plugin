const { innerText: title } = document.getElementsByTagName('title')[0];
console.log(title);

// from /helpers
let movie = getRankOfCandidates(title);
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
      title: movies[0].title,
      link: movies[0].link,
      image: movies[0].image,
      director: movies[0].director,
      actors: movies[0].actor,
      date: movies[0].pubDate,
      rate: movies[0].userRating,
      link: movies[0].link
    });
  }
);
