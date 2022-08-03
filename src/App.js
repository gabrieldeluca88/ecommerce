import './App.css';
import Navbar from './components/Navbar/Navbar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import {BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<ItemListContainer greeting="Todos nuestros productos"/>}/>
          <Route path='/detail/:productId' element={<ItemDetailContainer />}/>
          <Route path='/category/:categoryId' element={<ItemListContainer greeting="Filtrado"/>}/>
        </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
