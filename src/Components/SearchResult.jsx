import { useEffect } from "react";

function SearchResult({ clickedCharaData }){
    console.log(clickedCharaData)

    useEffect(() => {
    },[])
    return(
        <div id="infoViewTextAreaImgFlex" className="infoViewTextArea">
            <p id="infoViewText">{clickedCharaData.description}</p>
            <img 
            id="infoViewImg"
            src={clickedCharaData.image} 
            alt={`${clickedCharaData.name}'s Image`} />
        </div>
    )
};

export default SearchResult