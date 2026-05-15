import './Header.css'
import Search from "../Search/Search.tsx";
import type {SearchProps} from "../../types/search.ts";

function Header({onSearch}: SearchProps) {
    return (
        <div className="header-container">
            <div>Логотип</div>
            <Search onSearch={onSearch}/>
        </div>
    );
}

export default Header;