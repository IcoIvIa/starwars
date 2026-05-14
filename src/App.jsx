import { useState } from 'react'
import './App.css'
import FirstText from './Components/firsttext.jsx'
import SearchingScreen from './Components/SearchingScreen.jsx'



function App() {
    const [searchQuery, setSearchQuery] = useState('')
    const [screenState, setScreenState] = useState(0)
    const [clickedCategory,setClickedCategory] = useState('')
    const [searchResult,setSearchResult] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    

        const charaApiUrlAndPage = [
        'https://starwars-databank-server.onrender.com/api/v1/characters?page=',
        'https://starwars-databank-server.onrender.com/api/v1/creatures?page=',
        'https://starwars-databank-server.onrender.com/api/v1/droids?page=',
        'https://starwars-databank-server.onrender.com/api/v1/species?page=',
    ];

    const handleSearch = async (Category) => {
        if(searchQuery === '') return
        setScreenState(1)
        setClickedCategory(Category)
        setIsLoading(true)

        

        let page = 90
        // ローディング対策
        let data = []
        const alldata = []
  
        // for debug
        // const url = `https://starwars-databank-server.onrender.com/api/v1/characters?page=${page}`
        // const response = await fetch(url)
        // data = await response.json()
        // Ziro 

let hasMore = true

while(hasMore){
        const url = `https://starwars-databank-server.onrender.com/api/v1/characters?page=${page}`
        const response = await fetch(url)
        data = await response.json()
        
        if (data.info.next === null) {
            hasMore = false 
        }
        alldata.push(...data.data)
        // console.log(url)
        // console.log(alldata.length)
        page += 1

}



        const filterd = alldata.filter(element =>
            element.name.toLowerCase().includes(searchQuery.toLocaleLowerCase())
        )
        

        // console.log(url)
        // console.log(data.data)
        console.log(filterd)
        // console.log(alldata)


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
            onClick={() => handleSearch('character')}
        >CHARACTER<br />scan…</button>
        <button 
            id="entitySearchButton" className="searchButton"
            onClick={() => handleSearch('entity')}
        >ENTITY<br />scand…</button>
        <div id="menu" className="hidden"><p>A protocol droid will handle the translation.</p></div>
    </div>

    <div id="charaDraw"></div>
    <div id="infoView">
        <h2 id="infoViewTitle">INFO VIEW</h2>
        <div className="infoViewTextArea">
            <img id="infoViewImg" src={null} style={{display:'none'}} />
            {screenState === 0 && <FirstText />}
            {screenState === 1 && <SearchingScreen searchQuery={searchQuery} clickedCategory ={clickedCategory} />}
        </div>
    </div>
</div>
  )
}

export default App
