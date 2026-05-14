import type {Dispatch, SetStateAction} from "react";

export interface SearchProps {
    searchName: string;
    setSearchName: Dispatch<SetStateAction<string>>;
    searchStatus: string;
    setSearchStatus: Dispatch<SetStateAction<string>>;
}