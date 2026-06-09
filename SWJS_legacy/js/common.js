'use strict';
    let loadingPromise = null;//検索処理中のフラグ 他ファイルで読み込むためにここで定義
/**
 * 検索用処理用　.doneのJSONがcharacters にはいる。
 * findchar は検索文字列　
 * pageSearchCheck検索ヒット確認用空文字””が入る
 * hitObjectAssyは検索結果
 * フィルターとローディング画面付き
 * @param {*} characters 
 */
function searchProcess(characters, findChar, pageSearchCheck, hitObjectAssy) {

    for (const character of characters.data) {
        // console.log(character.name);
        const infoViewText = document.getElementById('infoViewText');
        // 検索フィルター　ちょっと緩い検索
        if (character.name.toLowerCase().includes(findChar.toLowerCase())) {
            pageSearchCheck.value = 'hit';
            hitObjectAssy.push(character);
                // ローディング画面表示
            infoViewText.textContent += '○';
        }
    };
    // ローディング画面表示
    // if (pageSearchCheck !== 'hit') {
    //     const infoViewText = document.getElementById('infoViewText');
    //     infoViewText.textContent = ` Your scanned keyword   [ ${findChar} ]  :::::  Scanning…  `
    // }
};

//hitobjectAssyに格納した検索結果を.charadraw HTMLに書き込む。キャラクタースキャンを押した時用（色青
function charaBoxDraw(hitObjectAssy) {
    if (hitObjectAssy.length >= 1) {
        for (const hitObject of hitObjectAssy) {
            const charainfo =
                `<div class="charaBox">
                                    <div class="charaDrawHeader">
                                        <h2 class="name">${hitObject.name}</h2>
                                        <img class="charaImg" src="${hitObject.image}" alt="charaimage">
                                    </div>
                                    <p class="description">${hitObject.description}</p>
                                </div>`;
            document.getElementById('charaDraw').insertAdjacentHTML("beforeend", charainfo);
        }
    };
};

//hitobjectAssyに格納した検索結果を.charadraw HTMLに書き込む。エンティティスキャンを押した時用（色赤＃redのクラスで区別
function charaBoxRedDraw(hitObjectAssy) {
    if (hitObjectAssy.length >= 1) {
        for (const hitObject of hitObjectAssy) {
            const charainfo =
                `<div class="charaBoxRed">
                                    <div class="charaDrawHeader">
                                        <h2 class="name">${hitObject.name}</h2>
                                        <img class="charaImg" src="${hitObject.image}" alt="charaimage">
                                    </div>
                                    <p class="description">${hitObject.description}</p>
                                </div>`;
            document.getElementById('charaDraw').insertAdjacentHTML("beforeend", charainfo);
        }
    };
};

/**
 * hitobjectAssyに格納した検索結果をもとにインフォビューにヒット数や指示を書き込む
 * @param {*} hitObjectAssy 
 */
function hitResultDraw(hitObjectAssy) {
    const hitResult = `<p> result : ${hitObjectAssy.length}</p>`;
    document.getElementById('infoViewText').insertAdjacentHTML("beforeend", hitResult);
    if (hitObjectAssy.length >= 1) {
        const ymcthclick = `<p>You must click the hologram !</p>`;
        document.getElementById('infoViewText').insertAdjacentHTML("beforeend", ymcthclick);
    }
};

/**
 * キャラボックスをクリックしたときにインフォメーションビューを書き換える
 * elementにはconst charaBoxRedClick = document.querySelectorAll('.charaBoxRed');のforeachがはいる
 * @param {*} element 
 */
function infoViewDraw(element) {
    document.querySelectorAll('#infoViewText p:not([id])').forEach(p => p.remove());
    // 不要な p タグの削除（検索結果だけ）
    const name = element.querySelector('.name').textContent;
    const img = element.querySelector('.charaImg').src;
    const description = element.querySelector('.description').textContent;
    const infoTitle = document.getElementById('infoViewTitle');
    const infoImg = document.getElementById('infoViewImg');
    const infoText = document.getElementById('infoViewText');
    const infoViewTextAreaImgFlex = document.querySelector('.infoViewTextArea');

    infoTitle.textContent = name;
    infoImg.src = img;
    infoImg.style.display = "block";
    infoText.textContent = description;
    console.log(element);
    infoViewTextAreaImgFlex.id = 'infoViewTextAreaImgFlex';
    // 翻訳タグを表示して翻訳されたら消える。関数translate、searchbuttonで.hidedenを付与
        // document.querySelector('.hidden').classList.remove('hidden');
        //jqeryでフェードイン表示
        const menu = $('.hidden');
menu.hide().removeClass('hidden').fadeIn(1000);
}; 


//インフォビューの初期化
const h1 = document. querySelector('h1');
h1.addEventListener('click',() =>{
    if(loadingPromise ) return;

    infoViewReset();
    document.getElementById('infoViewTitle').textContent = 'INFO VIEW'
    document.getElementById('infoViewText').innerHTML=
    'スターウォーズの用語を検索できます。<br><br>キャラクターの検索は英語でテキストボックスに入力して「CHARACTER scan…」をクリックしてください。<br>　例：Skywalker<br><br>地名、組織名や乗り物の情報は英語でテキストボックスに入力して「ENTITYscan…」クリックしてください<br>　例：jedi'

});

/**
 * インフォビューの初期化
 */
function infoViewReset (){
const infoViewTitle = document.getElementById('infoViewTitle');
const infoViewText = document.getElementById('infoViewText');
const infoViewImg = document.getElementById('infoViewImg');
    infoViewTitle.textContent = "";
    infoViewText.textContent ="";
    infoViewImg.src = "";
    document.getElementById('infoViewImg').style.display = "none";//ディスプレイブロックの解除 
};
