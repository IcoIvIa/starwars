"use strict";

// div#menuをクリックでインフォビューテキストを翻訳　asyncがないとバグる
document.getElementById('menu').addEventListener('click', async () => {
    // loading画面の表示用クラスの付与
    document.body.classList.add('loading');
    const description = document.getElementById('infoViewText').textContent;

    //function translateで翻訳結果をインフォビューに書き換える.翻訳メニュを隠す
    const result = await translate(description);
    document.getElementById('infoViewText').textContent = result;
    document.getElementById('menu').classList.add('hidden');

});

/**
 * 翻訳APIを呼ぶ
 * @param {翻訳するテキスト} text 
 * @returns 翻訳したデータ
 */
async function translating(text) {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|ja`;

try {
    const responce = await fetch(url);
    const result = await responce.json();
    return result.responseData.translatedText;
} catch(error){
console.error('データ取得エラー:', error);
}
}

/**
 * APIが1回500バイトまで翻訳できる（２５０文字くらい）ので２００文字を超えたらをストップ。単語ごとに分けるために空白でストップ。翻訳する文を配列に入れ、strを空にして再度チェック、残った文を最後に配列にプッシュ。配列をtranslating(text)に渡して翻訳された文字列を結合していく。asyncがないとバグる
 * @param {原文} description 
 * @returns 翻訳結果
 */

async function translate(description) {

    const spaceStr = [' ', '　'];
    let translatText = "";
    const translateTextsplice = [];

    for (const str of description) {
        translatText = translatText + str;
        if (spaceStr.includes(str) && translatText.length > 200) {
            translateTextsplice.push(translatText);
            translatText = "";
        }
    }
    if (translatText.length > 0) {
        translateTextsplice.push(translatText);
    }

    let result ="";
    for (const element of translateTextsplice) {
        result += await translating(element);
    }

// loding画面の非表示
    document.body.classList.remove('loading');
    return result;
};