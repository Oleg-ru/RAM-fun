export interface Search {
    (searchName: string, searchStatus?: string): void;
}

export interface SearchProps {
    onSearch: Search;
}

export type SearchParams = {
    searchName: string;
    searchStatus?: string;
} | {};