
function CharaBox({ filteredData, setClickedCharaData, setInfoViewTitle }) {

    return (
        <>
            {filteredData.map((charaCard) => (
                <div key={charaCard._id}
                    className="charaBox"
                    onClick={() => {
                        setClickedCharaData(charaCard)
                        if (charaCard.name) {
                            setInfoViewTitle(charaCard.name)
                        }
                    }}>
                    <img className="charaImg" src={charaCard.image} aria-hidden="true" />
                    <p className="charaDrawHeader">{charaCard.name}</p>
                </div>

            ))}

        </>
    );
}

export default CharaBox