import './App.css';
import { Routes, Route } from "react-router-dom";
import ListArticle from './components/List';
import Detail from './components/Detail';

export default function App() {
  return (

    <>

    <Routes>
       <Route path="/" element={<ListArticle />} />
       <Route path="/detail/:title" element={<Detail />} />
    </Routes>
    
    </>




 
  );
}


