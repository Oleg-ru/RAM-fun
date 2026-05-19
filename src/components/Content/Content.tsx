import './Content.css'
import { useEffect, useRef, useState } from "react";
import type { Character } from "../../types/Character.ts";
import { CharacterItem } from "../Character/CharacterItem.tsx";
import type { SearchParams } from "../../types/search.ts";
import { throttle } from "../../utils/throttle.ts";
import FilterCharacter from "../FilterCharacter/FilterCharacter.tsx";
import CharacterDetails from "../CharacterDetails/CharacterDetails.tsx";
import CharacterItemSkeleton from "../Character/CharacterItemSkeleton.tsx";
import { useCharacterData } from "../../hooks/useCharacterData.ts";

function Content({ searchParams }: {searchParams: SearchParams}) {
  const [currentFilterStatuses, setCurrentFilterStatuses] = useState<Array<Character["status"]>>([]);
    const [idCharacterDetails, setIdCharacterDetails] = useState<number | null>(null);

    const elementRef = useRef(null);

  const {
    characters,
    error,
    loading,
    loadingSearch,
    pages,
    currentPage,
    setCurrentPage,
    setError
  } = useCharacterData(searchParams);

    useEffect(() => {
        function loadMoreHandle() {
            if (currentPage < pages && !loading) {
                setCurrentPage(prev => prev + 1);
            }
        }

        const throttledLoadMore = throttle(loadMoreHandle, 5000);

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !loading && currentPage < pages && elementRef.current) {
                throttledLoadMore();
            }
    }, { root: null, threshold: 0.3, rootMargin: "0px" });

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

    if (loadingSearch || loading && characters.length === 0) {
        return <div className="characters-container">
      {Array.from({ length: 8 }).map((_, i) => <CharacterItemSkeleton key={`load-${i}`} />)}
        </div>
    }

    if (error && characters.length === 0) {
        return (
            <div className="flex flex-col gap-3">
                ⚠️ {error}
                <button className="border p-1 rounded hover:bg-blue-300 delay-100 cursor-pointer active:bg-blue-300 active:text-amber-700" onClick={() => setError("")}>Retry</button>
            </div>
        )
    }

    return (
        <>
            <FilterCharacter characters={characters}
                             currentFilterStatuses={currentFilterStatuses}
                             setCurrentFilterStatuses={setCurrentFilterStatuses}
            />
            <div className="characters-container">
                {characters.map(character => {
                    if (currentFilterStatuses.length > 0) {
                        return currentFilterStatuses.includes(character.status)
              ? <CharacterItem key={character.id + currentPage} {...character} setId={setIdCharacterDetails} />
                            : null;
                    }
          return <CharacterItem key={character.id + currentPage} {...character} setId={setIdCharacterDetails} />
                })}
            </div>
            {loading && characters.length > 0 && (
                <div className="characters-container">
          {Array.from({ length: 4 }).map((_, i) => <CharacterItemSkeleton key={`load-${i}`} />)}
                </div>
            )}
            {error && characters.length > 0 && <div className="text-[#e74c3c]">Ошибка загрузки новых персонажей</div>}

            <div
                ref={elementRef}
                style={{
                    height: '10px',     // маленькая высота
                    background: 'transparent',  // прозрачный
                    marginTop: '10px'   // небольшой отступ
                }}
            />
      {idCharacterDetails && <CharacterDetails id={idCharacterDetails} setCloseModal={setIdCharacterDetails} />}
        </>
    );
}

export default Content;