import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (

    <div>
        <h1>you must feel the Force around you…</h1>
    <div id="searchFormArea">
        <input type="search" name="searchForm" id="searchForm" />
        <button id="charaSearchButton" className="searchButton">CHARACTER<br />scan…</button>
        <button id="entitySearchButton" className="searchButton">ENTITY<br />scand…</button>
        <div id="menu" className="hidden"><p>A protocol droid will handle the translation.</p></div>
    </div>

    <div id="charaDraw"></div>
    <div id="infoView">
        <h2 id="infoViewTitle">INFO VIEW</h2>
        <div className="infoViewTextArea">
            <img id="infoViewImg" src={null} style={{display:'none'}} />
            <div id="infoViewText">
                <p>スターウォーズの用語を検索できます。</p>
                <p>キャラクターの検索は英語でテキストボックスに入力して「CHARACTER scan…」をクリックしてください。<br />　例：Skywalker</p>
                <p>地名、組織名や乗り物の情報は英語でテキストボックスに入力して「ENTITYscan…」クリックしてください<br />　例：jedi</p>
            </div>
        </div>
    </div>
</div>
  )
}

export default App
