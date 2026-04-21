import { useState } from 'react'
import './App.css'
import FirstText from './Components/firsttext.jsx'

function App() {

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
            <FirstText />
        </div>
    </div>
</div>
  )
}

export default App
