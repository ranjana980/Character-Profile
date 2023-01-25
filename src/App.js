import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Characterlist from './Component/Characterlist';
import Character from './Component/CharacterDetails';

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route index path='/' element={<Characterlist />} />
          <Route path='/CharacterDetails/:id' element={<Character/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
