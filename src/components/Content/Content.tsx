import './Content.css'
import {useEffect, useState} from "react";
import {fetchCharacters} from "../../api/getData.ts";
import type {Character} from "../../types/Character.ts";
import {CharacterItem} from "../Character/CharacterItem.tsx";

function Content() {

    const [characters, setCharacters] = useState<Array<Character> | []>([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await fetchCharacters("1");
                setCharacters(data);
            } catch (e) {
                setError("Ошибка! Не удалось получить персонажей");
            } finally {
                setLoading(false);
            }
        };

        void fetchData();
    }, []);

    if (loading) {
        return <div>Загрузка</div>
    }

    if (error) {
        return (
            <div>
                ⚠️ {error}
            </div>
        )
    }

    return (
        <div className="characters-container">
            {characters.map(character => <CharacterItem key={character.id} {...character}/>)}
        </div>
    );
}

export default Content;