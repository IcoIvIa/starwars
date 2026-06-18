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
    { _id: '001', name: 'Luke Skywalker', description: 'Luke Skywalker was a legendary Jedi Master who fought in the Galactic Civil War. He was the son of Anakin Skywalker and Padmé Amidala, and the twin brother of Leia Organa.', image: 'https://lumiere-a.akamaihd.net/v1/images/ep8-231017_r_e829cffb.jpeg' },
    { _id: '002', name: 'Luke Skywalker2', description: '2......................................................................', image: 'https://lumiere-a.akamaihd.net/v1/images/ep8-231017_r_e829cffb.jpeg' },
    { _id: '003', name: 'Luke Skywalker3', description: '3......................................................................', image: 'https://lumiere-a.akamaihd.net/v1/images/ep8-231017_r_e829cffb.jpeg' },
    { _id: '004', name: 'Luke Skywalker4', description: '4......................................................................', image: 'https://lumiere-a.akamaihd.net/v1/images/ep8-231017_r_e829cffb.jpeg' },
    { _id: '005', name: 'Darth Vader', description: '...', image: 'https://lumiere-a.akamaihd.net/v1/images/ep8-231017_r_e829cffb.jpeg' },
    { _id: '006', name: 'Character 6', description: '6......................................................................', image: 'https://lumiere-a.akamaihd.net/v1/images/ep8-231017_r_e829cffb.jpeg' },
    { _id: '007', name: 'Character 7', description: '7......................................................................', image: 'https://lumiere-a.akamaihd.net/v1/images/ep8-231017_r_e829cffb.jpeg' },
    { _id: '008', name: 'Character 8', description: '8......................................................................', image: 'https://lumiere-a.akamaihd.net/v1/images/ep8-231017_r_e829cffb.jpeg' },
    { _id: '009', name: 'Character 9', description: '9......................................................................', image: 'https://lumiere-a.akamaihd.net/v1/images/ep8-231017_r_e829cffb.jpeg' },
    { _id: '010', name: 'Character 10', description: '10......................................................................', image: 'https://lumiere-a.akamaihd.net/v1/images/ep8-231017_r_e829cffb.jpeg' },
    { _id: '011', name: 'Character 11', description: '11......................................................................', image: 'https://lumiere-a.akamaihd.net/v1/images/ep8-231017_r_e829cffb.jpeg' },
    { _id: '012', name: 'Character 12', description: '12......................................................................', image: 'https://lumiere-a.akamaihd.net/v1/images/ep8-231017_r_e829cffb.jpeg' },
    { _id: '013', name: 'Character 13', description: '13......................................................................', image: 'https://lumiere-a.akamaihd.net/v1/images/ep8-231017_r_e829cffb.jpeg' },
    { _id: '014', name: 'Character 14', description: '14......................................................................', image: 'https://lumiere-a.akamaihd.net/v1/images/ep8-231017_r_e829cffb.jpeg' },
    { _id: '015', name: 'Character 15', description: '15......................................................................', image: 'https://lumiere-a.akamaihd.net/v1/images/ep8-231017_r_e829cffb.jpeg' },
    { _id: '016', name: 'Character 16', description: '16......................................................................', image: 'https://lumiere-a.akamaihd.net/v1/images/ep8-231017_r_e829cffb.jpeg' },
    { _id: '017', name: 'Character 17', description: '17......................................................................', image: 'https://lumiere-a.akamaihd.net/v1/images/ep8-231017_r_e829cffb.jpeg' },
    { _id: '018', name: 'Character 18', description: '18......................................................................', image: 'https://lumiere-a.akamaihd.net/v1/images/ep8-231017_r_e829cffb.jpeg' },
    { _id: '019', name: 'Character 19', description: '19......................................................................', image: 'https://lumiere-a.akamaihd.net/v1/images/ep8-231017_r_e829cffb.jpeg' },
    { _id: '020', name: 'Character 20', description: '20......................................................................', image: 'https://lumiere-a.akamaihd.net/v1/images/ep8-231017_r_e829cffb.jpeg' },
];

async function fetchAllPages(apiUrlList, onPageFetched) {
    const result = []

    for (const baseUrl of apiUrlList) {
        let page = 1;
        let hasMore = true

        while (hasMore) {
            const url = `${baseUrl}${page}`
            const response = await fetch(url)
            const data = await response.json()

            if (data.info.next === null) {
                hasMore = false
            }
            result.push(...data.data)
            onPageFetched?.([...result])
            page += 1

        }
        // fordebug
        console.log(`${baseUrl} の要素数${result.length}`)
    } return result
}

export function useFetchData() {

    const [allCharaData, setAllCharaData] = useState([])
    const [allEntityData, setAllEntityData] = useState([])
    const [isApiLoading, setIsApiLoading] = useState(false)

const isDev = false
useEffect(() => {
    if (isDev) {
        setAllCharaData(dummyData)
        setAllEntityData(dummyData)
    } else {

        //  本番用
            setIsApiLoading(true) 
            const fetchData = async () => {
                const [charaData, entityData] = await Promise.all([
                    fetchAllPages(characterApiUrlList, setAllCharaData),
                    fetchAllPages(entityApiUrlList, setAllEntityData)
                ])
                setAllCharaData(charaData)
                setAllEntityData(entityData)
                // fordebug
                console.log(`allCharaDataresult:${charaData.length}`)
                console.log(`allentityDataresult:${entityData.length}`)
                setIsApiLoading(false)
            }
            fetchData()

        }
    
}, []) //テストデータ <----

return{ allCharaData, allEntityData, isApiLoading}

}



