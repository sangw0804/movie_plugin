inspect = raw => {
  const blackList = ['네이버', '영화', '블로그', ':', '-'];

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
