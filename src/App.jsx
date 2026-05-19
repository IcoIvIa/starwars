import { useEffect, useState } from 'react'
import './App.css'
import FirstText from './Components/firsttext.jsx'
import SearchingScreen from './Components/SearchingScreen.jsx'
import SearchResult from './Components/SearchResult.jsx'

function App() {
    const [searchQuery, setSearchQuery] = useState('')
    const [screenState, setScreenState] = useState(0)
    const [clickedCategory, setClickedCategory] = useState('')
    const [allCharaData, setAllCharaData] = useState([])
    const [allEntityData, setAllEntityData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [filteredData, setFilteredData] = useState([])
    const [infoViewTitle, setInfoViewTitle] =useState('INFO VIEW')


    const characterApiUrlList = [
        'https://starwars-databank-server.onrender.com/api/v1/characters?page=',
        'https://starwars-databank-server.onrender.com/api/v1/creatures?page=',
        'https://starwars-databank-server.onrender.com/api/v1/droids?page=',
        'https://starwars-databank-server.onrender.com/api/v1/species?page=',
    ];

    const entityApiUrlList = [
        'https://starwars-databank-server.onrender.com/api/v1/locations?page=',
        'https://starwars-databank-server.onrender.com/api/v1/organizations?page=',
        'https://starwars-databank-server.onrender.com/api/v1/vehicles?page=',
    ];

// テストデータ ---->
    const dummyData = [
  { _id: '001', name: 'Luke Skywalker', description: '...', image: 'https://lumiere-a.akamaihd.net/v1/images/ep8-231017_r_e829cffb.jpeg' },
  { _id: '002', name: 'Darth Vader', description: '...', image: 'https://lumiere-a.akamaihd.net/v1/images/ep8-231017_r_e829cffb.jpeg' },
]

const isDev = true
useEffect(() => {
    if(isDev) {
        setAllCharaData(dummyData)
        setAllEntityData(dummyData)
    } else {

  }},[]) //テストデータ <----

    async function fetchAllPages(apiUrlList) {
        const result = []

        for (const baseUrl of apiUrlList) {
            let page = 1;
            let hasMore = true

            while (hasMore) {
                const url = `${baseUrl}${page}`
                const response = await fetch(url)
                const data = await response.json()

                // fordebug
                console.log(`読み込みPAGE：${baseUrl}${page}`)

                if (data.info.next === null) {
                    hasMore = false
                }
                result.push(...data.data)
                page +=1

            }        
            // fordebug
            console.log(`${baseUrl} の要素数${result.length}`)
        } return result
    }


    //  本番用
    // useEffect(() => {
    //     const fetchData = async () => {
    //         const [charaData, entityData] = await Promise.all([
    //             fetchAllPages(characterApiUrlList),
    //             fetchAllPages(entityApiUrlList)
    //         ])
    //         setAllCharaData(charaData)
    //         setAllEntityData(entityData)
    //     // fordebug
    //     console.log(`allCharaDataresult:${charaData.length}`)
    //     console.log(`allentityDataresult:${entityData.length}`)
    //     }
    //     fetchData()

    // },[])

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

            <div id="charaDraw"></div>
            <div id="infoView">
                <h2 id="infoViewTitle">{infoViewTitle}</h2>
                <div className="infoViewTextArea">
                    <img id="infoViewImg" src={null} style={{ display: 'none' }} />
                    {screenState === 0 && <FirstText />}
                    {screenState === 1 && <SearchingScreen searchQuery={searchQuery} clickedCategory={clickedCategory} />}
                    {screenState === 2 && (
                        <SearchResult 
                            filteredData={filteredData} 
                            setInfoViewTitle={setInfoViewTitle}
                            />)}
                </div>
            </div>
        </div>
    )
}

export default App
