import './Content.css'
import {useEffect, useState} from "react";
import {fetchCharacters} from "../../api/getData.ts";
import type {Character} from "../../types/Character.ts";

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
        <div>
            {characters.map(character => (
                <div key={character.id}>
                    Name: {character.name}
                    <img src={character.image} alt="" width={100} height={150}/>
                </div>
            ))}
        </div>
    );
}

export default Content;