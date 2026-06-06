
function CharaBox({ filteredData, clickedCategory, dispatch }) {

    let boxClassName = "charaBox";

    if (clickedCategory === "character") {
        boxClassName = "charaBox";
    } else if (
        clickedCategory === "entity") {
        boxClassName = "charaBoxRed";
    }

    return(
    <>
        {filteredData.map((charaCard) => (
            <div key={charaCard._id}
                className={boxClassName}
                onClick={() =>
                    dispatch({
                        type: 'SELECT_CHARA',
                        chara: charaCard,
                        title: charaCard.name
                    })
                }>
                <img className="charaImg" src={charaCard.image} alt="" />
                <p className="charaDrawHeader">{charaCard.name}</p>
            </div>

        ))}

    </>
    );
}

export default CharaBox