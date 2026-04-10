'use strict';

/**
 * const　entityApiUrlAndPage or caraApiUrlAndPageを引数にする
 * @param {} apiUrlAndPage 
 *     const entityApiUrlAndPage = {
        'https://starwars-databank-server.onrender.com/api/v1/locations?page=' : 33,
        'https://starwars-databank-server.onrender.com/api/v1/organizations?page=' :14,
        'https://starwars-databank-server.onrender.com/api/v1/vehicles?page=' : 27,};
    const CharaApiUrlAndPage = {
        'https://starwars-databank-server.onrender.com/api/v1/characters?page=' : 97,
        'https://starwars-databank-server.onrender.com/api/v1/creatures?page=' : 8,
        'https://starwars-databank-server.onrender.com/api/v1/droids?page='  : 6,
        'https://starwars-databank-server.onrender.com/api/v1/species?page='  :9,
    };
 * findcharにある文字列を探して関数SERCHPROCESSにわたす。最後まで探したらreturn Promise.all(promiseRequests);を実行
 */

function apiSearch(apiUrlAndPage, findChar, pageSearchCheck, hitObjectAssy) {
    let promiseRequests = [];
    for (let baseUrl in apiUrlAndPage) {
        const maxPage = apiUrlAndPage[baseUrl];

        console.log("Base URL:", baseUrl);
        console.log("Max Page:", maxPage);

        for (let i = 1; i <= maxPage; i++) {
            console.log(i);
            // ↓promise用変数
            const Request =
                $.ajax({
                    url: baseUrl + i,
                    type: "GET",
                    dataType: "json",
                    beforeSend: function () {
                        document.getElementById('infoViewTitle').textContent = 'SCANNING…';
                        const infoViewText = document.getElementById('infoViewText');
                        infoViewText.textContent = ` Your scanned keyword   [ ${findChar} ]  :::::    `
                    },
                    error: function () {
                        const infoViewText = document.getElementById('infoViewText');
                        infoViewText.innerHTML = 'scan error' + infoViewText.innerHTML;
                    },
                })

                    .done(function (characters) {
                        // キャラクター名を抽出　
                        searchProcess(characters, findChar, pageSearchCheck, hitObjectAssy);
                    })
                    .fail(function (error) {
                        window.alert(`読み込みエラー ： ${error}`);
                        console.log(error);
                    });

            promiseRequests.push(Request); //配列に1ページずつ追加
        }
    }

    return Promise.all(promiseRequests);
};