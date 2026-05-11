import './App.css'
import {useEffect, useState} from "react";
import {fetchCharacters} from "./api/getData.ts";
import type {Character} from "./types/Character.ts";

function App() {

  const [characters, setCharacters] = useState<Array<Character> | null>(null)

  useEffect(() => {

    const fetchData = async () => {
      const data = await fetchCharacters("1");
      setCharacters(data);
    };

    fetchData();
  }, []);

  if (!characters) {
    return <div>Загрузка</div>
  }
  console.log(characters)
  return (
    <div>
      {characters.map(character => (
          <div key={character.id}>
            Name: {character.name}
            <img src={character.image} alt="" width={100} height={150}/>
          </div>
      ))}
    </div>
  )
}

export default App
