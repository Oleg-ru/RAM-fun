import axios from "axios";
import type {Character} from "../types/Character.ts";

const API = axios.create({
    baseURL: "https://rickandmortyapi.com/api",
    headers: {
        'Content-Type': "application/json"
    }
});

export const fetchCharacterDetails = async (id: number): Promise<{data: Character}> => {
    return API.get(`/character/${id}`)
};