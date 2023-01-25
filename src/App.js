import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Characterlist from './Component/Characterlist';
import Character from './Component/Character';

function App() {
  return (
    <div className=" bg-gray-300">
      <BrowserRouter>
        <Routes>
          <Route index path='/' element={<Characterlist />} />
          <Route path='/Character/:id' element={<Character/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
