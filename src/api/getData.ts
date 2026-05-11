import axios from "axios";
import type {Character} from "../types/Character.ts";

const API = axios.create({
    baseURL: "https://rickandmortyapi.com/api",
    headers: {
        'Content-Type': 'application/json',
    },
});

export const fetchCharacters = (page: string): Promise<Array<Character>> => {
    return  API.get("/character", {
        params: {
            page,
        }
    })
        .then(resp => resp.data?.results)
        .catch(err => {
            throw new Error("роизошла ошибка при запросе персонажей: ", err)
        });
};