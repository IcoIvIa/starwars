import { useState } from 'react'
import './App.css'
import FirstText from './Components/firsttext.jsx'
import SearchingScreen from './Components/SearchingScreen.jsx'



function App() {
    const [searchQuery, setSearchQuery] = useState('')
    const [screenState, setScreenState] = useState(0)

  return (

    <div>
        <h1>you must feel the Force around you…</h1>
    <div id="searchFormArea">
        <input 
            type="search" name="searchForm" id="searchForm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button 
            id="charaSearchButton" className="searchButton"
            onClick={() => setScreenState(1)}
        >CHARACTER<br />scan…</button>
        <button 
            id="entitySearchButton" className="searchButton"
            onClick={() => setScreenState(1)}
        >ENTITY<br />scand…</button>
        <div id="menu" className="hidden"><p>A protocol droid will handle the translation.</p></div>
    </div>

    <div id="charaDraw"></div>
    <div id="infoView">
        <h2 id="infoViewTitle">INFO VIEW</h2>
        <div className="infoViewTextArea">
            <img id="infoViewImg" src={null} style={{display:'none'}} />
            {screenState === 0 && <FirstText />}
            {screenState === 1 && <SearchingScreen searchQuery={searchQuery} />}
        </div>
    </div>
</div>
  )
}

export default App
