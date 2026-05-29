
function CharaBox({ filteredData, dispatch }) {

    return (
        <>
            {filteredData.map((charaCard) => (
                <div key={charaCard._id}
                    className="charaBox"
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