import { useEffect, useState, useReducer } from 'react'
import './App.css'
import FirstText from './Components/firsttext.jsx'
import SearchingScreen from './Components/SearchingScreen.jsx'
import SearchEnd from './Components/SearchEnd .jsx'
import SearchResult from './Components/SearchResult.jsx'
import CharaBox from './Components/CharaBox.jsx'
import { useFetchData } from '../src/hooks/useFetchData.js'
import SearchingImg from './assets/warp-space.gif'

function App() {
    const { allCharaData, allEntityData, isApiLoading } = useFetchData()
    const [searchQuery, setSearchQuery] = useState('')

    const initialState = {
        screen: 'idle',
        isLoading: false,
        category: '',
        filteredData: [],
        hitCount: 0,
        clickedCharaData: null,
        infoViewTitle: 'INFO VIEW',
    }

    function reducer(state, action) {
        switch (action.type) {
            case 'SEARCH_START':
                return {
                    ...state,
                    screen: 'searching',
                    isLoading: true,
                    category: action.category,
                    hitCount: action.hitCount,
                    filteredResult: action.filteredResult 
                }
            case 'SEARCH_DONE':
                return {
                    ...state,
                    screen: 'results',
                    isLoading: false,
                    filteredData: action.data,
                }
            case 'SELECT_CHARA':
                return {
                    ...state,
                    clickedCharaData: action.chara,
                    infoViewTitle: action.title
                }
            default:
                return state
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        if (state.isLoading) {
            document.body.classList.add('loading')
        } else {
            document.body.classList.remove('loading')
        }
    }, [state.isLoading])

    const handleSearch = async (category, allCategoryData) => {
        if (searchQuery === '') return

        const filtered = allCategoryData.filter(element =>
            element.name.toLowerCase().includes(searchQuery.toLowerCase())
        )

        dispatch({
            type: 'SEARCH_START',
            category,
            hitCount: filtered.length,
            filteredResult: filtered
        })

        // fordebug
        console.log(allCategoryData.length)

        // setTimeout(() => {

            // dispatch({ type: 'SEARCH_DONE', data: filtered })
        // }, 1000)

    }


    return (




        <div>

            <img
                src={SearchingImg}
                style={{
                    position: 'fixed',
                    top: 0, left: 0,
                    width: '100%', height: '100%',
                    opacity: 0.2,
                    zIndex: 999,
                    pointerEvents: 'none',
                    display: state.isLoading ? 'block' : 'none'
                }}
            />

            <div id="warpOverlay" className={state.isLoading ? 'show' : 'hidden'}></div>

            <h1>you must feel the Force around you…</h1>

            <div id="searchFormArea">
                <input
                    type="search"
                    name="searchForm"
                    id="searchForm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                    id="charaSearchButton"
                    className="searchButton"
                    onClick={() => handleSearch('character', allCharaData)}
                >CHARACTER<br />scand…</button>

                <button
                    id="entitySearchButton"
                    className="searchButton"
                    onClick={() => handleSearch('entity', allEntityData)}
                >ENTITY<br />scand…</button>

                <div id="menu" className="hidden">
                    <p>A protocol droid will handle the translation.</p>
                </div>
            </div>

            <div id="charaDraw">
                {state.filteredData.length > 0 && (
                    <CharaBox
                        filteredData={state.filteredData}
                        dispatch={dispatch}
                    />
                )}
            </div>

            <div id="infoView">
                <h2 id="infoViewTitle">{state.infoViewTitle}</h2>

                <div>
                    {state.screen === 'idle' && <FirstText />}
                    {state.screen === 'searching' && (
                        <SearchingScreen
                            searchQuery={searchQuery}
                            clickedCategory={state.category}
                            hitCount={state.hitCount}
                            onComplete={() => dispatch({ type: 'SEARCH_DONE', data: state.filteredResult })}
                        />
                    )}
                    {state.screen === 'results' && state.clickedCharaData === null && <SearchEnd />}
                            
                    {state.screen === 'results' &&
                        state.clickedCharaData !== null && (
                            <SearchResult
                                clickedCharaData={state.clickedCharaData}
                            />)}
                </div>
            </div>
        </div>
    )
}

export default App
