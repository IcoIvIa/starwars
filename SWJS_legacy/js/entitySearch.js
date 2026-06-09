'use strict';
$(document).ready(function () {
    let loadingPromise = null;//処理中のフラグ
    const entityApiUrlAndPage = {
        'https://starwars-databank-server.onrender.com/api/v1/locations?page=': 33,
        'https://starwars-databank-server.onrender.com/api/v1/organizations?page=': 14,
        'https://starwars-databank-server.onrender.com/api/v1/vehicles?page=': 27,
    };

    const entitySearchButton = document.getElementById('entitySearchButton');

    entitySearchButton.addEventListener('click', (response) => {
        if (loadingPromise) return; //ここで多重読み込みを防ぐ
        let pageSearchCheck = { value: '' };//ローディング画面用変数。ヒットした場合hitをIF文で代入。要初期化

        let hitObjectAssy = [];// 検索にヒットしたキャラクター個別オブジェクトを一つの配列にまとめる。要初期化
        document.getElementById('infoViewImg').src = "";//画像の初期化
        document.getElementById('infoViewImg').style.display = "none";//ディスプレイブロックの解除 
        document.getElementById('menu').classList.add('hidden');//翻訳の非表示

        let findChar = document.getElementById('searchForm').value;
        let infoViewText = document.getElementById('infoViewText');


        if (findChar.trim() === "") {
            // 入力がない場合の処理、フォームの送信を止める.responseはaddEventListeneの引数
            response.preventDefault();
            infoViewText.innerHTML = '…Dank Farrik !  文字を入力してください！<br>' + infoViewText.innerHTML;
            return false;
        }

        // ↓ここから検索開始

        document.body.classList.add('loading');// loading画面の表示用クラスの付与
        document.getElementById('charaDraw').innerHTML = "";//検索画面の初期化
        infoViewText.textContent = "";//インフォビューの初期化
        document.getElementById('infoViewTitle').textContent = 'INFO VIEW'//タイトル初期化                     




        //APIを読み込む。Promise.allのreturnがあるので、すべて読み込んだ場合の処理を書く loadingPromiseesimorPgnidaolで多重処理を防ぐ
        loadingPromise = apiSearch(entityApiUrlAndPage, findChar, pageSearchCheck, hitObjectAssy,).then(() => {
            // loding画面の非表示
            document.body.classList.remove('loading');
            //SCANNING…をINFOVIEWにもどす
            document.getElementById('infoViewTitle').textContent = 'INFO VIEW';
            // 検索結果の表示
            hitResultDraw(hitObjectAssy);
            //ヒットしたか判断、ヒットしていた場合div.class=charaDrawに結果を表示
            charaBoxRedDraw(hitObjectAssy);
            // charaBoxRedをクリックした場合#infoViewTextに説明を表示
            const charaBoxRedClick = document.querySelectorAll('.charaBoxRed');
            charaBoxRedClick.forEach(element => {
                element.addEventListener('click', () => {
                    infoViewDraw(element);
                });
            });
        })// Promise.all閉じ括弧
            .finally(() => {
                loadingPromise = null;
            });
    });// document.getElementById('charaSearchButton');閉じ括弧
}); //$(document).ready(function(){　閉じ括弧