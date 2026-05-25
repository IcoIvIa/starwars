import { useState, useEffect } from "react";

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
    { _id: '001', name: 'Luke Skywalker', description: '1......................................................................', image: 'https://lumiere-a.akamaihd.net/v1/images/ep8-231017_r_e829cffb.jpeg' },
    { _id: '002', name: 'Luke Skywalker2', description: '2......................................................................', image: 'https://lumiere-a.akamaihd.net/v1/images/ep8-231017_r_e829cffb.jpeg' },
    { _id: '003', name: 'Luke Skywalker3', description: '3......................................................................', image: 'https://lumiere-a.akamaihd.net/v1/images/ep8-231017_r_e829cffb.jpeg' },
    { _id: '004', name: 'Luke Skywalker4', description: '4......................................................................', image: 'https://lumiere-a.akamaihd.net/v1/images/ep8-231017_r_e829cffb.jpeg' },
    { _id: '005', name: 'Darth Vader', description: '...', image: 'https://lumiere-a.akamaihd.net/v1/images/ep8-231017_r_e829cffb.jpeg' },
]

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
            page += 1

        }
        // fordebug
        console.log(`${baseUrl} の要素数${result.length}`)
    } return result
}

export function useFetchData() {

    const [allCharaData, setAllCharaData] = useState([])
    const [allEntityData, setAllEntityData] = useState([])

const isDev = true
useEffect(() => {
    if (isDev) {
        setAllCharaData(dummyData)
        setAllEntityData(dummyData)
    } else {

        //  本番用
            const fetchData = async () => {
                const [charaData, entityData] = await Promise.all([
                    fetchAllPages(characterApiUrlList),
                    fetchAllPages(entityApiUrlList)
                ])
                setAllCharaData(charaData)
                setAllEntityData(entityData)
                // fordebug
                console.log(`allCharaDataresult:${charaData.length}`)
                console.log(`allentityDataresult:${entityData.length}`)
            }
            fetchData()

        }
    
}, []) //テストデータ <----

return{ allCharaData, allEntityData, }

}



