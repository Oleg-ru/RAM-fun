 import { useEffect, useRef, useState } from "react";
import { fetchCharacters } from "../api/getData.ts";
import type { Character } from "../types/Character.ts";
import { fetchSearchCharacters } from "../api/getCharactersByName.ts";
import type { CharacterResponse } from "../types/CharacterResponse.ts";
import type { SearchParams } from "../types/search.ts";

export const useCharacterData = (searchParams: SearchParams) => {
  const [characters, setCharacters] = useState<Array<Character> | []>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
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
        let data!: CharacterResponse;

        // Проверяем, что searchParams содержит параметры поиска
        if (searchParams && 'searchName' in searchParams && typeof searchParams.searchName === 'string') {
          setLoadingSearch(true)
          // Добавляем проверку типов для searchStatus
          const statusParam = 'searchStatus' in searchParams ? (searchParams.searchStatus as string | undefined) : undefined;
          data = await fetchSearchCharacters(searchParams.searchName, statusParam);
          setPages(data.info.pages);
          setCharacters(data.results);
        } else {
          setLoading(true);
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
        setError("Ошибка! Не удалось получить персонажей");
      } finally {
        setLoading(false);
        isFetchingRef.current = false; // Сбрасываем значение в ref
        setLoadingSearch(false);
      }
    };

    void fetchData();
  }, [currentPage, searchParams, error]);

  return {
    characters,
    error,
    loading,
    loadingSearch,
    pages,
    currentPage,
    setCurrentPage,
    setError
  };
};