import './App.css'
import Header from "./components/Header/Header.tsx";
import Content from "./components/Content/Content.tsx";
import {useState} from "react";

function App() {

    const [searchName, setSearchName] = useState("");
    const [searchStatus, setSearchStatus] = useState("");

  return (
    <div className="root-app">
      <Header searchName={searchName} setSearchName={setSearchName} searchStatus={searchStatus} setSearchStatus={setSearchStatus}/>
      <Content searchName={searchName} searchStatus={searchStatus}/>
    </div>
  )
}

export default App
