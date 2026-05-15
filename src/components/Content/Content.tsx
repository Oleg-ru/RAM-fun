import './Content.css'
import {useEffect, useRef, useState} from "react";
import {fetchCharacters} from "../../api/getData.ts";
import type {Character} from "../../types/Character.ts";
import {CharacterItem} from "../Character/CharacterItem.tsx";
import {fetchSearchCharacters} from "../../api/getCharactersByName.ts";
import type {CharacterResponse} from "../../types/CharacterResponse.ts";
import type {SearchParams} from "../../types/search.ts";
import {throttle} from "../../utils/throttle.ts";

function Content({searchParams}: SearchParams) {

    const [characters, setCharacters] = useState<Array<Character> | []>([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [pages, setPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const elementRef = useRef(null);
    const isFetchingRef = useRef(false);

    useEffect(() => {

        const fetchData = async () => {
            // Проверяем, не выполняется ли уже запрос
            if (isFetchingRef.current) return; // Проверяем значение из ref
            isFetchingRef.current = true; // Меняем значение в ref

            try {
                if (error) {
                    setError("");
                }
                setLoading(true);
                let data!: CharacterResponse;
                if ('searchName' in searchParams || 'searchStatus' in searchParams) {
                    console.log("вызвался поиск по параметрам")
                    data = await fetchSearchCharacters(searchParams.searchName, searchParams?.searchStatus);
                    setPages(data.info.pages);
                    setCharacters(data.results);
                } else {
                    data = await fetchCharacters(`${currentPage}`);
                    setCharacters(prev => {
                        const map = new Map(prev.map(char => [char.id, char]));
                        data.results.forEach((char: Character) => map.set(char.id, char));
                        return Array.from(map.values());
                    });
                }

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
                isFetchingRef.current = false; // Сбрасываем значение в ref
            }
        };

        void fetchData();
    }, [currentPage, searchParams]);

    useEffect(() => {

        function loadMoreHandle() {
            if (currentPage < pages && !loading) {
                setCurrentPage(prev => prev + 1);
            }
        }

        const throttledLoadMore = throttle(loadMoreHandle, 5000); // Ограничение: 1 вызов в секунду

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !loading && currentPage < pages && elementRef.current) {
                throttledLoadMore();
            }
        }, {root: null, threshold: 0.3, rootMargin: "0px"});

        if (elementRef.current && pages > 1) {
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
        return <div className="flex justify-center items-center h-full">
            <div className="loader"></div>
        </div>
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
            {loading && characters.length > 0 && <div className="mt-12 flex justify-center items-center bg-[#2ecc71] p-3 rounded ">Загрузка...</div>}
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