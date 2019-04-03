const isThereTwo = (str, char, char2) => {
  const startIndex = str.indexOf(char);
  const endIndex = str.indexOf(char2, startIndex + 1);

  return startIndex > -1 && endIndex > -1 && [startIndex + 1, endIndex];
};

const inspect = raw => {};

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

const movie = getRankOfCandidates(title);
if (!movie.length) {
}

chrome.runtime.sendMessage({
  action: 'getSource',
  source: movie[0]
});
