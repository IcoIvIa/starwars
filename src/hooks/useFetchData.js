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
    { _id: '021', name: 'Character 21', description: '21......................................................................', image: 'https://lumiere-a.akamaihd.net/v1/images/ep8-231017_r_e829cffb.jpeg' },
    { _id: '022', name: 'Character 22', description: '22......................................................................', image: 'https://lumiere-a.akamaihd.net/v1/images/ep8-231017_r_e829cffb.jpeg' },
    { _id: '023', name: 'Character 23', description: '23......................................................................', image: 'https://lumiere-a.akamaihd.net/v1/images/ep8-231017_r_e829cffb.jpeg' },
    { _id: '024', name: 'Character 24', description: '24......................................................................', image: 'https://lumiere-a.akamaihd.net/v1/images/ep8-231017_r_e829cffb.jpeg' },
    { _id: '025', name: 'Character 25', description: '25......................................................................', image: 'https://lumiere-a.akamaihd.net/v1/images/ep8-231017_r_e829cffb.jpeg' },
    { _id: '026', name: 'Character 26', description: '26......................................................................', image: 'https://lumiere-a.akamaihd.net/v1/images/ep8-231017_r_e829cffb.jpeg' },
    { _id: '027', name: 'Character 27', description: '27......................................................................', image: 'https://lumiere-a.akamaihd.net/v1/images/ep8-231017_r_e829cffb.jpeg' },
    { _id: '028', name: 'Character 28', description: '28......................................................................', image: 'https://lumiere-a.akamaihd.net/v1/images/ep8-231017_r_e829cffb.jpeg' },
    { _id: '029', name: 'Character 29', description: '29......................................................................', image: 'https://lumiere-a.akamaihd.net/v1/images/ep8-231017_r_e829cffb.jpeg' },
    { _id: '030', name: 'Character 30', description: '30......................................................................', image: 'https://lumiere-a.akamaihd.net/v1/images/ep8-231017_r_e829cffb.jpeg' },
    { _id: '031', name: 'Character 31', description: '31......................................................................', image: 'https://lumiere-a.akamaihd.net/v1/images/ep8-231017_r_e829cffb.jpeg' },
    { _id: '032', name: 'Character 32', description: '32......................................................................', image: 'https://lumiere-a.akamaihd.net/v1/images/ep8-231017_r_e829cffb.jpeg' },
    { _id: '033', name: 'Character 33', description: '33......................................................................', image: 'https://lumiere-a.akamaihd.net/v1/images/ep8-231017_r_e829cffb.jpeg' },
    { _id: '034', name: 'Character 34', description: '34......................................................................', image: 'https://lumiere-a.akamaihd.net/v1/images/ep8-231017_r_e829cffb.jpeg' },
    { _id: '035', name: 'Character 35', description: '35......................................................................', image: 'https://lumiere-a.akamaihd.net/v1/images/ep8-231017_r_e829cffb.jpeg' },
    { _id: '036', name: 'Character 36', description: '36......................................................................', image: 'https://lumiere-a.akamaihd.net/v1/images/ep8-231017_r_e829cffb.jpeg' },
    { _id: '037', name: 'Character 37', description: '37......................................................................', image: 'https://lumiere-a.akamaihd.net/v1/images/ep8-231017_r_e829cffb.jpeg' },
    { _id: '038', name: 'Character 38', description: '38......................................................................', image: 'https://lumiere-a.akamaihd.net/v1/images/ep8-231017_r_e829cffb.jpeg' },
    { _id: '039', name: 'Character 39', description: '39......................................................................', image: 'https://lumiere-a.akamaihd.net/v1/images/ep8-231017_r_e829cffb.jpeg' },
    { _id: '040', name: 'Character 40', description: '40......................................................................', image: 'https://lumiere-a.akamaihd.net/v1/images/ep8-231017_r_e829cffb.jpeg' },
    { _id: '041', name: 'Character 41', description: '41......................................................................', image: 'https://lumiere-a.akamaihd.net/v1/images/ep8-231017_r_e829cffb.jpeg' },
    { _id: '042', name: 'Character 42', description: '42......................................................................', image: 'https://lumiere-a.akamaihd.net/v1/images/ep8-231017_r_e829cffb.jpeg' },
    { _id: '043', name: 'Character 43', description: '43......................................................................', image: 'https://lumiere-a.akamaihd.net/v1/images/ep8-231017_r_e829cffb.jpeg' },
    { _id: '044', name: 'Character 44', description: '44......................................................................', image: 'https://lumiere-a.akamaihd.net/v1/images/ep8-231017_r_e829cffb.jpeg' },
    { _id: '045', name: 'Character 45', description: '45......................................................................', image: 'https://lumiere-a.akamaihd.net/v1/images/ep8-231017_r_e829cffb.jpeg' },
    { _id: '046', name: 'Character 46', description: '46......................................................................', image: 'https://lumiere-a.akamaihd.net/v1/images/ep8-231017_r_e829cffb.jpeg' },
    { _id: '047', name: 'Character 47', description: '47......................................................................', image: 'https://lumiere-a.akamaihd.net/v1/images/ep8-231017_r_e829cffb.jpeg' },
    { _id: '048', name: 'Character 48', description: '48......................................................................', image: 'https://lumiere-a.akamaihd.net/v1/images/ep8-231017_r_e829cffb.jpeg' },
    { _id: '049', name: 'Character 49', description: '49......................................................................', image: 'https://lumiere-a.akamaihd.net/v1/images/ep8-231017_r_e829cffb.jpeg' },
    { _id: '050', name: 'Character 50', description: '50......................................................................', image: 'https://lumiere-a.akamaihd.net/v1/images/ep8-231017_r_e829cffb.jpeg' }
];

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
                    fetchAllPages(characterApiUrlList),
                    fetchAllPages(entityApiUrlList)
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



