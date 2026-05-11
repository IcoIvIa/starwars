function SearchingScreen({ searchQuery ,clickedCategory }) {
    return (
        <div>
            <p>Your scanned keyword : {searchQuery}</p>
            <p>Your scanned Category : {clickedCategory}</p>
        </div>
    )
}

export default SearchingScreen