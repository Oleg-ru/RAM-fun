import type {Character} from "../../types/Character.ts";

function FilterCharacter({characters, currentFilterStatuses, setCurrentFilterStatuses}: {characters: Array<Character>}) {

    const statuses = [...new Set(characters.map(character => character.status))];

    const onClickOnStatus = (e) => {
        setCurrentFilterStatuses(prev => {
            const status = e.target.innerText;
            if (prev.includes(status)) {
                return [...prev.filter(currentStatus => currentStatus !== status)]
            }
            return [...prev, e.target.innerText];
        })
    };

    if (statuses.length <= 1) {
        return null;
    }


    return (
        <div className="flex flex-row gap-2 mt-3 justify-center">
            {statuses.map(status => (
                <button key={status + "_id"}
                        className={`border p-2 rounded-4xl hover:bg-[#2ecc71] hover:text-white delay-100 
                        ${currentFilterStatuses.includes(status) ? "border bg-[#2ecc71] hover:text-black hover:after:content-['_❌']" : "after:content-['']"}`}
                        onClick={onClickOnStatus}
                >
                    {status}
                </button>
            ))}
            {currentFilterStatuses.length > 0 && (
                <button className="border p-2 rounded-2xl cursor-pointer" onClick={() => {setCurrentFilterStatuses([])}}>Сбросить фильтр</button>
            )}
        </div>
    );
}

export default FilterCharacter;