export interface Search {
    (searchName: string, searchStatus?: string): void;
}

export interface SearchProps {
    onSearch: Search;
}

export interface SearchParams {
    searchParams: {
        searchName: string;
        searchStatus?: string;
    } | {};
}