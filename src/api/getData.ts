import axios from "axios";
import type {CharacterResponse} from "../types/CharacterResponse.ts";

const API = axios.create({
    baseURL: "https://rickandmortyapi.com/api",
    headers: {
        'Content-Type': 'application/json',
    },
});

export const fetchCharacters = async (page: string, options?: { signal?: AbortSignal }): Promise<CharacterResponse> => {
    try {
        const resp = await API.get("/character", {
            signal: options?.signal,
            params: {
                page,
            }
        });
        return resp.data;
    } catch (err) {
        throw new Error("Произошла ошибка при запросе Character: " + err);
    }
};