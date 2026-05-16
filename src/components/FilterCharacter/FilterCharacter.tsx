import type {Character} from "../../types/Character.ts";
import  {type Dispatch, type SetStateAction} from "react";
import React from "react";

type CharacterStatus = Character["status"];

function FilterCharacter({characters, currentFilterStatuses, setCurrentFilterStatuses}: {characters: Array<Character>, currentFilterStatuses: Array<CharacterStatus>, setCurrentFilterStatuses: Dispatch<SetStateAction<Array<CharacterStatus>>>}) {

    const statuses = [...new Set(characters.map(character => character.status))] as Array<CharacterStatus>;

    const onClickOnStatus = (e: React.MouseEvent<HTMLButtonElement>) => {
        setCurrentFilterStatuses(prev => {
            // @ts-ignore
            const status = e.target.innerText;
            if (prev.includes(status)) {
                return [...prev.filter(currentStatus => currentStatus !== status)]
            }
            return [...prev, status];
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