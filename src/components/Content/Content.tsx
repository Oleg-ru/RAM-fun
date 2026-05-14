import './Content.css'
import {useEffect, useRef, useState} from "react";
import {fetchCharacters} from "../../api/getData.ts";
import type {Character} from "../../types/Character.ts";
import {CharacterItem} from "../Character/CharacterItem.tsx";

function Content() {

    const [characters, setCharacters] = useState<Array<Character> | []>([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [pages, setPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const elementRef = useRef(null);

    useEffect(() => {
        let isFetching = false; // Локальный флаг для предотвращения дублирующих вызовов

        const fetchData = async () => {
            // Проверяем, не выполняется ли уже запрос
            if (isFetching) return;
            isFetching = true;

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
                if (currentPage !== 1) {
                    setCurrentPage(prev => prev - 1);
                }
                setError("Ошибка! Не удалось получить персонажей");
            } finally {
                setLoading(false);
                isFetching = false; // Сбрасываем флаг после завершения
            }
        };

        void fetchData();
    }, [currentPage]);

    useEffect(() => {

        function loadMoreHandle() {
            if (currentPage < pages && !loading) {
                setCurrentPage(prev => prev + 1);
            }
        }

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !loading && currentPage < pages && elementRef.current) {
                console.log('✅ 30% достигнуто! Функция сработала!')
                loadMoreHandle();
            }
        }, {root: null, threshold: 0.3, rootMargin: "0px"});

        if (elementRef.current) {
            observer.observe(elementRef.current)
        }

        return () => {
            if (elementRef.current) {
                observer.unobserve(elementRef.current);
                observer.disconnect();
            }
        }
    }, [currentPage, loading, pages]);

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

            <div
                ref={elementRef}
                style={{
                    height: '10px',     // маленькая высота
                    background: 'transparent',  // прозрачный
                    marginTop: '10px'   // небольшой отступ
                }}
            />
        </>
    );
}

export default Content;