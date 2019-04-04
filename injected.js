const blackList = ['네이버', '영화', '블로그', ':', '-'];

const isThereTwo = (str, char, char2) => {
  const startIndex = str.indexOf(char);
  const endIndex = str.indexOf(char2, startIndex + 1);

  return startIndex > -1 && endIndex > -1 && [startIndex + 1, endIndex];
};

const inspect = raw => {
  // 페이지의 텍스트에서 title에 있는 단어들이 몇번씩 등장하는지 검색
  let rawText = document.documentElement.outerText;
  Array.from(window.frames).forEach(
    frame => (rawText += ` ${frame.document.documentElement.outerText}`)
  );
  const candidates = raw.split(' ').map(rawWords => rawWords.trim());
  const counter = {};

  candidates.forEach(candidate => {
    if (blackList.includes(candidate)) {
      counter[candidate] = -1;
    } else {
      counter[candidate] = rawText.split(candidate).length - 1;
    }
  });

  return Object.keys(counter).sort((a, b) => counter[b] - counter[a]);
};

const getRankOfCandidates = raw => {
  // 어떻게 html title에서 영화 제목을 뽑아낼 것인가?
  // '' "" <> [] 로 둘러쌓인 문자열 -> 영화 제목일 가능성 가장 높음!
  const clues = [["'", "'"], ['"', '"'], ['<', '>'], ['[', ']']];
  const candidates = [];

  clues.forEach(clue => {
    const result = isThereTwo(raw, clue[0], clue[1]);

    if (result) {
      candidates.push(raw.substring(result[0], result[1]));
    }
  });

  return candidates;
};

const { innerText: title } = document.getElementsByTagName('title')[0];
console.log(title);

// 이 파일에서 dom 작업 모두 처리

let movie = getRankOfCandidates(title);
if (!movie.length) {
  movie = inspect(title);
}
console.log(movie);
fetch(`http://localhost:3000/movie_search?movie=${movie[0]}`).then(
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
      rate: movies[0].userRating
    });
  }
);
