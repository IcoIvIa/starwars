import { useEffect } from "react";

function SearchResult({ filteredData,setInfoViewTitle }){
    console.log(filteredData)

    useEffect(() => {
        setInfoViewTitle(filteredData[0].name)
    },[])
    return(
        <div>
            <p></p>
            <p>{filteredData[0].description}</p>
            <img src={filteredData[0].image} alt={`${filteredData[0].name}'s Image`} />
        </div>
    )
};

export default SearchResult