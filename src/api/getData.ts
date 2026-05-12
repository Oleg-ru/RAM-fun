import axios from "axios";
import type {Character} from "../types/Character.ts";

const API = axios.create({
    baseURL: "https://rickandmortyapi.com/api",
    headers: {
        'Content-Type': 'application/json',
    },
});

export const fetchCharacters = async (page: string): Promise<Array<Character>> => {
    try {
        const resp = await API.get("/character", {
            params: {
                page,
            }
        });
        return resp.data?.results;
    } catch (err) {
        throw new Error("Произошла ошибка при запросе Character: " + err);
    }
};