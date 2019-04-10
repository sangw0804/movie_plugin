blackList = ['네이버', '영화', '블로그', ':', '-', '영화추천'];

// 페이지의 텍스트에서 title에 있는 단어들이 몇번씩 등장하는지 검색
rawText = document.documentElement.outerText;
Array.from(window.frames).forEach(
  frame => (rawText += ` ${frame.document.documentElement.outerText}`)
);

makeCandidates = raw => {
  const words = raw
    .split(' ')
    .map(rawWords => rawWords.trim())
    .filter(w => !blackList.includes(w));
  const candidates = [];

  for (let candidateMax = 1; candidateMax <= words.length; candidateMax++) {
    for (let i = 0; i <= words.length - candidateMax; i++) {
      let temp = '';
      for (let j = i; j < i + candidateMax; j++) {
        temp += ` ${words[j]}`;
      }
      candidates.push(temp.trim());
    }
  }

  return candidates;
};

inspect = raw => {
  const candidates = makeCandidates(raw);
  const counter = {};

  candidates.forEach(candidate => {
    counter[candidate] =
      (rawText.split(candidate).length - 1) *
      Math.min(2, candidate.split(' ').length);
  });

  return Object.keys(counter).sort((a, b) => counter[b] - counter[a]);
};
