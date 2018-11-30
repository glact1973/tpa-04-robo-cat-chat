// see http://thecatapi.com/
const generateCatThumb = function() {
  const apiKey = '3e716ca0-8514-4bf0-bc87-4792a37c3ec0';
  const userId = 'd0x7pr';
  const apiUrl = 'https://api.thecatapi.com/v1/images/search?format=json&size=small';
  const fetchOptions = {
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
    }
  };
  return fetch(apiUrl, fetchOptions)
    .then(function(response) {
      return response.json();
    });
};


const getRandomInt = function(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
};

const catChatPhrases = [
  '可愛いすぎる！',
  'もう可愛くてたまらない〜',
  'なでてあげずにはいられない！',
  'ネコを溺愛している症状：ネコが悪態をつくと、止めるどころか撮影を始めるって',
  '深い深い、海のように深いご縁がありましたね。',
  'いい子、いい子。',
  'にゃんすた'
];
const generateRandomCatChatPhrase = function() {
  //======================================
  // <obata>元々のソースをコメントアウト
  //return "hello";
  //======================================

  //======================================
  //<obata>乱数を生成する関数を読み出し、ランダムなメッセージを返す
  //======================================
  return catChatPhrases[getRandomNum(0,catChatPhrases.length-1)];
  //return 'test';
};

//======================================
//<obata>整数の乱数を作成する関数を新規作成
//Math.random(),Math.ceil(),Math.floorを利用
//======================================
const getRandomNum = function(min, max) {
  min = Math.ceil(min); //引数以上の最小の整数
  max = Math.floor(max); //引数以下の最大の整数
  return Math.floor(Math.random() * (max - min)) + min; //min~maxの間で乱数を作成
}


// see https://market.mashape.com/blaazetech/robohash-image-generator
const generateRobotThumb = function() {
  const apiKey = 'vdaU35425amshse8ir7sxh0qJqFzp1xAvXIjsnVRIdRQsxES8o';
  const randomText = Math.random().toString(36).substring(2);
  // "テンプレート文字列": https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/template_strings
  const apiUrl = `https://robohash.p.mashape.com/index.php?text=${randomText}`;
  const fetchOptions = {
    headers: {
      'Content-Type': 'application/json',
      'X-Mashape-Key': apiKey,
      mode: "cors",
    }
  };

  return fetch(apiUrl, fetchOptions)
    .then(function(response) {
      return response.json();
    });
};

const renderPost = function(robotThumbUrl, catThumbUrl, catChatPhrase) {
  const containerEl = document.querySelector('#container .chats');

  // ポストの枠である要素
  const postEl = document.createElement('DIV');

  // ロボットのプロフィール画像要素
  const robotThumbEl = document.createElement('IMG');
  robotThumbEl.src = robotThumbUrl;

  // ロボットが飼っているにゃんちゃんのプロフィール画像要素
  const catThumbEl = document.createElement('IMG');
  catThumbEl.src = catThumbUrl;

  //<obata> 2つの画像の下にメッセージを表示する
  const catChatPhraseEl = document.createElement('P');
  catChatPhraseEl.innerText = generateRandomCatChatPhrase();

  // ポストの子要素を組み合わせる（次々と追加していく）
  postEl.appendChild(robotThumbEl);
  postEl.appendChild(catThumbEl);
  postEl.appendChild(catChatPhraseEl);

  // 枠要素にポストを追加する
  containerEl.appendChild(postEl);
};

// "async"キーワードの説明： https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/async_function
const addPost = async function() {
  Promise.all([
    generateRobotThumb(),
    generateCatThumb()
  ])
  .then(function(resultsArray) {
    [robotThumb, catThumb] = resultsArray;
    //　上の行はこの書き方の略、意味的に同じです：
    // const robotThumb = resultsArray[0];
    // const catThumb = resultsArray[1];
    // 「分割代入」と呼びます。https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
    renderPost(robotThumb.imageUrl, catThumb[0].url, 'hello');
  });
};

const initPage = function() {
  const addPostBtn = document.querySelector('#container .add-post-btn');
  addPostBtn.addEventListener('click', addPost);
};

initPage();