import './Search.css'
import {type ChangeEvent, useState} from "react";
import type {SearchProps} from "../../types/search.ts";

function Search({onSearch}: SearchProps) {

    const [searchName, setSearchName] = useState("");
    const [searchStatus, setSearchStatus] = useState("");

    return (
        <div className="flex">
            <div>
                <input type="text"
                       value={searchName}
                       onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchName(e.target.value)}
                       placeholder="name"
                       className="border p-1 rounded"
                />
            </div>
            <div>
                <select name="" id="" value={searchStatus} onChange={(e) => setSearchStatus(e.target.value)}>
                    <option value="" disabled selected>Выбери статус</option>
                    <option value="dead">Мертв</option>
                    <option value="alive">Жив</option>
                    <option value="unknown">Неизвесно</option>
                </select>
            </div>
            <button onClick={() => {onSearch(searchName, searchStatus)}}>Поиск</button>
        </div>
    );
}

export default Search;