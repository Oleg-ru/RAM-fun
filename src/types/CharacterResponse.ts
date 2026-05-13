import type {Character} from "./Character.ts";

export interface CharacterResponse {
    info: {
        count: number;
        pages: number;
        next: string | null;
        prev: string | null
    };
    results: Array<Character>
}