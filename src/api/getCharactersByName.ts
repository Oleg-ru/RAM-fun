import axios from "axios";

const API = axios.create({
    baseURL: 'https://rickandmortyapi.com/api',
    headers: {
        'Content-Type': 'application/json',
    }
});


export const fetchSearchCharacters = async (name: string, status?: string) => {
    try {
        const response = await API.get('/character', {
            params: {
                name,
                status,
            }
        });
        return response.data;
    } catch (error) {
        throw new Error("Ошибка при поиске персонажей")
    }
}