import './Header.css'
import Search from "../Search/Search.tsx";

function Header() {
    return (
        <div className="header-container">
            <div>Логотип</div>
            <Search />
        </div>
    );
}

export default Header;