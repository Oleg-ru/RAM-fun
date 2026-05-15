import './App.css'
import Header from "./components/Header/Header.tsx";
import Content from "./components/Content/Content.tsx";
import {useState} from "react";
import type {Search} from "./types/search.ts";

function App() {

    const [searchParams, setSearchParams] = useState()

    const onSearch: Search = (searchName: string, searchStatus?: string) => {
        setSearchParams({searchName, searchStatus});
    };

  return (
    <div className="root-app">
      <Header onSearch={onSearch}/>
      <Content searchParams={searchParams}/>
    </div>
  )
}

export default App
