import { useEffect, useState, useReducer } from 'react'
import './App.css'
import FirstText from './Components/firsttext.jsx'
import SearchingScreen from './Components/SearchingScreen.jsx'
import SearchEnd from './Components/SearchEnd .jsx'
import SearchResult from './Components/SearchResult.jsx'
import CharaBox from './Components/CharaBox.jsx'
import { useFetchData } from '../src/hooks/useFetchData.js'
import SearchingImg from './assets/warp-space.gif'
import TranslationMenu from './Components/TranslationMenu.jsx'
import FetchDataLoding from './Components/FetchDataLoding.jsx'

        async function translating(text) {
            const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|ja`;

            try {
                const response = await fetch(url);
                const result = await response.json();
                return result.responseData.translatedText;
            } catch (error) {
                console.error('データ取得エラー:', error);
            }
        }

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
        filteredResult: [],
        translatText: ''
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
                    filteredResult: action.filteredResult,
                    filteredData: [],
                    clickedCharaData: null,
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
                    infoViewTitle: action.title,
                    translatText: ''
                }
            case 'TRANSLATE_START':
                return {
                    ...state,
                    isLoading: true,
                }
            case 'TRANSLATE_DONE':
                return {
                    ...state,
                    isLoading: false,
                    translatText: action.translatText
                }
            case 'TRANSLATE_ERROR':
                return {
                    ...state,
                    isLoading: false
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

    const handleSearch = (category, allCategoryData) => {
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
    }

    const handleTranslation = async (description) => {
        dispatch({ type: 'TRANSLATE_START', })

        try {
            const spaceStr = [' ', '　'];
            let translatText = "";
            const translateTextsplice = [];

            for (const str of description

            ) {
                translatText = translatText + str;
                if (spaceStr.includes(str) && translatText.length > 200) {
                    translateTextsplice.push(translatText);
                    translatText = "";
                }
            }
            if (translatText.length > 0) {
                translateTextsplice.push(translatText);
            }

            let result = "";
            for (const element of translateTextsplice) {
                result += await translating(element);
            }
            dispatch({
                translatText: result,
                type: 'TRANSLATE_DONE',
                isLoading: false
            })
        } catch (error) {
            console.error('データ取得エラー:', error);
            dispatch({
                type: 'TRANSLATE_ERROR',
                isLoading: false
            })
        }

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

                {state.screen === 'results' &&
                    state.clickedCharaData !== null && (
                        <TranslationMenu
                            clickedCharaData={state.clickedCharaData}
                            handleTranslation={handleTranslation}
                        />)}
            </div>

            <div id="charaDraw">
                {state.filteredData.length > 0 && (
                    <CharaBox
                        filteredData={state.filteredData}
                        dispatch={dispatch}
                        clickedCategory={state.category}
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
                                translatText={state.translatText
                                }
                            />)}

                    <FetchDataLoding isApiLoading={isApiLoading}/>
                </div>
            </div>
        </div>
    )
}


export default App
