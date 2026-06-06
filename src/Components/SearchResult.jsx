
function SearchResult({ clickedCharaData , translatText }){
    console.log(clickedCharaData)

    return(
        <div id="infoViewTextAreaImgFlex" className="infoViewTextArea">
            <p id="infoViewText">
                {translatText === ''
                ? clickedCharaData.description
                :translatText }</p>
            <img 
            id="infoViewImg"
            src={clickedCharaData.image} 
            alt={`${clickedCharaData.name}'s Image`} />
        </div>
    )
};

export default SearchResult