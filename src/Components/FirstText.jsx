function FirstText() {

    return (
        <div id="infoViewText">
            <p>スターウォーズの用語を検索できます。</p>
            <p>キャラクターの検索は英語でテキストボックスに入力して「CHARACTER scan…」をクリックしてください。<br />　例：Skywalker</p>
            <p>地名、組織名や乗り物の情報は英語でテキストボックスに入力して「ENTITY scan…」クリックしてください<br />　例：jedi</p>
            <p>※検索は英語で行ってください。日本語での検索には対応していません。</p>
            <br />
            <p>データの全取得には２分ほどかかります。未取得時に検索した場合は、その検索時点で取得していたデータから結果を表示します。</p>
        </div>
    )
}

export default FirstText