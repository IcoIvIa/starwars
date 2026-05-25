import { useEffect, useState } from 'react'
import './App.css'
import FirstText from './Components/firsttext.jsx'
import SearchingScreen from './Components/SearchingScreen.jsx'
import SearchResult from './Components/SearchResult.jsx'
import CharaBox from './Components/CharaBox.jsx'
import { useFetchData } from '../src/hooks/useFetchData.js'

function App() {
    const { allCharaData, allEntityData, isApiLoading } = useFetchData()
    const [searchQuery, setSearchQuery] = useState('')
    const [screenState, setScreenState] = useState(0)
    const [clickedCategory, setClickedCategory] = useState('')

    const [isLoading, setIsLoading] = useState(false)
    const [filteredData, setFilteredData] = useState([])
    const [infoViewTitle, setInfoViewTitle] =useState('INFO VIEW')
    const [clickedCharaData , setClickedCharaData] =useState(null)

    const handleSearch = async (category,allCategoryData) => {
        if (searchQuery === '') return
        setScreenState(1)
        setClickedCategory(category)
        setIsLoading(true)

        console.log(allCategoryData.length)

        const filterd = allCategoryData.filter(element =>
            element.name.toLowerCase().includes(searchQuery.toLocaleLowerCase())
        )
        // fordebug
        console.log("CLICKED:",filterd)
        console.log(category)
        setFilteredData(filterd)
        setScreenState(2)
        setIsLoading(false)
    }


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
                    onClick={() => handleSearch('character',allCharaData)}
                >CHARACTER<br />scand…</button>
                <button
                    id="entitySearchButton" className="searchButton"
                    onClick={() => handleSearch('entity',allEntityData)}
                >ENTITY<br />scand…</button>
                <div id="menu" className="hidden"><p>A protocol droid will handle the translation.</p></div>
            </div>

            <div id="charaDraw">
                {filteredData.length > 0 &&  (
                    <CharaBox 
                    filteredData={filteredData} 
                    setClickedCharaData={setClickedCharaData}
                    setInfoViewTitle={setInfoViewTitle}
                    />)}
            </div>
            <div id="infoView">
                <h2 id="infoViewTitle">{infoViewTitle}</h2>
                <div>
                    {screenState === 0 && <FirstText />}
                    {screenState === 1 && <SearchingScreen searchQuery={searchQuery} clickedCategory={clickedCategory} />}
                    {screenState === 2 && clickedCharaData !== null && (
                        <SearchResult 
                            clickedCharaData={clickedCharaData} 
                            setInfoViewTitle={setInfoViewTitle}
                            />)}
                </div>
            </div>
        </div>
    )
}

export default App
