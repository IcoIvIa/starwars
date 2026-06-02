import { useState, useEffect } from "react";

function SearchingScreen({ searchQuery, clickedCategory, hitCount ,onComplete}) {
    const [visibleCount, setVisibleCount] = useState(0);

    useEffect(() => {
        setVisibleCount(0)
        if (hitCount <= 0) {
            onComplete()
            return
        }

        const interval = 1500 / hitCount  // 指定の遅延時間に丸を表示する間隔

        let count = 0
        const timer = setInterval(() => {
            count++
            setVisibleCount(count)
            if (count >= hitCount) {
                clearInterval(timer)
                setTimeout(onComplete, 300)
            }
        }, interval)

        return () => clearInterval(timer)
    }, [hitCount])

    return (
        <div>
            <p>Your scanned keyword : {searchQuery}</p>
            <p>Your scanned Category : {clickedCategory}</p>
            <div>:::::&gt;&nbsp;   
                {Array.from({ length: visibleCount }).map((_, i) => (
                    <span key={i}>◯</span>
                ))}
            </div>
        </div>
    )
}

export default SearchingScreen