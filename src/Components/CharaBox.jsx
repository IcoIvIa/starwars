function CharaBox(filteredData){
    
    return(
    <div
        id = "charaDraw"
        className="charaBox">
        <img className="charaImg" src={filteredData.filteredData[0].image} aria-hidden="true"/>
        <p className="charaDrawHeader">{filteredData.filteredData[0].name}</p> 

    </div>
    );
}

export default CharaBox