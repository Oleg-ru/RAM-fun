import './Search.css'

function Search() {
    return (
        <div className="flex">
            <div>
                <input type="text" placeholder="name" className="border p-1 rounded"/>
            </div>
            <div>
                <select name="" id="">
                    <option value="dead">Мертв</option>
                    <option value="alive">Жив</option>
                    <option value="unknown">Неизвесно</option>
                </select>
            </div>
        </div>
    );
}

export default Search;