function SearchResult(filteredData){
    console.log(filteredData)
    return(
        <div>
            <p>{filteredData.filterd[0].name}</p>
            <p>{filteredData.filterd[0].description}</p>
        </div>
    )
};

export default SearchResult