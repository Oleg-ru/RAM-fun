import './Content.css'
import {useEffect, useState} from "react";
import {fetchCharacters} from "../../api/getData.ts";
import type {Character} from "../../types/Character.ts";
import {CharacterItem} from "../Character/CharacterItem.tsx";

function Content() {

    const [characters, setCharacters] = useState<Array<Character> | []>([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [pages, setPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (error) {
                    setError("");
                }
                setLoading(true);
                const data = await fetchCharacters(`${currentPage}`);
                setCharacters(prev => {
                    const map = new Map(prev.map(char => [char.id, char]));
                    data.results.forEach(char => map.set(char.id, char));
                    return Array.from(map.values());
                });
                if (!pages) {
                    setPages(data.info.pages);
                }
            } catch (e) {
                setError("Ошибка! Не удалось получить персонажей");
            } finally {
                setLoading(false);
            }
        };

        void fetchData();
    }, [currentPage]);

    const loadMoreHandle = () => {
        setCurrentPage(prev => prev + 1);
    };

    if (loading && characters.length === 0) {
        return <div>Загрузка</div>
    }

    if (error && characters.length === 0) {
        return (
            <div>
                ⚠️ {error}
            </div>
        )
    }

    return (
        <>
            <div className="characters-container">
                {characters.map(character => <CharacterItem key={character.id + currentPage} {...character}/>)}
            </div>
            {loading && characters.length > 0 && <div className="bg-[#2ecc71] p-3 rounded">Загрузка...</div>}
            {error && characters.length > 0 && <div className="text-[#e74c3c]">Ошибка загрузки новых персонажей</div>}
            {currentPage !== pages && (
                <div className="pt-5 pb-5 flex justify-center items-center">
                    <button className={`w-1/6 mt-5 cursor-pointer bg-[#7ed957] rounded transition-all
                                       active:bg-[#2ecc71] active:delay-100
                                       ${loading ? 'hover:cursor-not-allowed' : 'hover:w-1/5 hover:duration-200 hover:delay-200'}
                                       `}
                            onClick={loadMoreHandle}
                            disabled={loading}
                    >
                        Load more
                    </button>
                </div>
            )}
        </>
    );
}

export default Content;