import {type ChangeEvent, useState} from "react";
import type {SearchProps} from "../../types/search.ts";

function Search({onSearch}: SearchProps) {

    const [searchName, setSearchName] = useState("");
    const [searchStatus, setSearchStatus] = useState("");

    return (
        <div className="flex gap-4 items-center bg-yellow-400 p-2 rounded shadow-inner border-2 border-yellow-600">
            <input type="text"
                   value={searchName}
                   onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchName(e.target.value)}
                   placeholder="Name"
                   className="bg-blue-50 border-2 border-blue-300 p-2 rounded text-blue-900 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-md"
            />
            <select name="" id=""
                    value={searchStatus}
                    onChange={(e) => setSearchStatus(e.target.value)}
                    className="bg-blue-50 border-2 border-blue-300 p-2 rounded text-blue-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-md"
            >
                <option value="" disabled>Status</option>
                <option value="dead">Мертв</option>
                <option value="alive">Жив</option>
                <option value="unknown">Неизвесно</option>
            </select>
            <button onClick={() => {
                onSearch(searchName, searchStatus);
                setSearchName("");
                setSearchStatus("");
            }}
                    className="bg-linear-to-b from-yellow-400 to-yellow-600 text-blue-900 font-bold px-4 py-2 rounded border-2 border-yellow-700 shadow-lg hover:from-yellow-300 hover:to-yellow-500 active:shadow-inner active:translate-y-0.5 transition-all duration-150"
            >
                Search
            </button>
        </div>
    );
}

export default Search;