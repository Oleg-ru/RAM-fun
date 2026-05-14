import './Header.css'
import Search from "../Search/Search.tsx";
import type {SearchProps} from "../../types/searchProps.ts";

function Header({searchName, setSearchName, searchStatus, setSearchStatus}: SearchProps) {
    return (
        <div className="header-container">
            <div>Логотип</div>
            <Search />
        </div>
    );
}

export default Header;