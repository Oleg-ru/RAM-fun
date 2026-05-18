import Search from "../Search/Search.tsx";
import type {SearchProps} from "../../types/search.ts";

function Header({onSearch}: SearchProps) {
    return (
        <header className="bg-linear-to-r from-green-900 via-purple-900 to-blue-900 text-green-500 p-4 shadow-2xl border-b-4 border-freen-400 font-rick-morty">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-4xl font-bold tracking-wider">RAM</div>
                <Search onSearch={onSearch}/>
            </div>
        </header>
    );
}

export default Header;