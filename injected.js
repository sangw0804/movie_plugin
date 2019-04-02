const getRankOfCandidates = raw => {
  // 어떻게 html title에서 영화 제목을 뽑아낼 것인가?
  // '' "" <> [] 로 둘러쌓인 문자열 -> 영화 제목일 가능성 가장 높음!
  

  return raw;
}

const {innerText: title} = document.getElementsByTagName('title')[0];
console.log(title);

// 이 파일에서 dom 작업 모두 처리

const movie = getRankOfCandidates(title);

chrome.runtime.sendMessage({
  action: "getSource",
  source: movie
});