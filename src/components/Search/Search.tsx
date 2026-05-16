import './Search.css'
import {type ChangeEvent, useState} from "react";
import type {SearchProps} from "../../types/search.ts";

function Search({onSearch}: SearchProps) {

    const [searchName, setSearchName] = useState("");
    const [searchStatus, setSearchStatus] = useState("");

    return (
        <div className="flex gap-3 items-center р-7">
            <input type="text"
                   value={searchName}
                   onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchName(e.target.value)}
                   placeholder="Name"
                   className="border p-1 rounded h-full"
            />
            <select name="" id=""
                    value={searchStatus}
                    onChange={(e) => setSearchStatus(e.target.value)}
                    className="border rounded h-full"
            >
                <option value="" disabled>Выбери статус</option>
                <option value="dead">Мертв</option>
                <option value="alive">Жив</option>
                <option value="unknown">Неизвесно</option>
            </select>
            <button onClick={() => {
                onSearch(searchName, searchStatus);
                setSearchName("");
                setSearchStatus("");
            }}
                    className="border rounded hover:bg-[#58973d] hover:text-white delay-100 h-full p-2 cursor-pointer active:bg-[#90ff62] active:text-black"
            >
                Поиск
            </button>
        </div>
    );
}

export default Search;