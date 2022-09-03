import './App.css';
import Navbar from './components/Navbar/Navbar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartContextProvider } from './context/CartContext';
import Cart from './components/Cart/Cart';
import Checkout from './components/Checkout/Checkout'
import Footer from './components/Footer/Footer';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <CartContextProvider>
          <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<ItemListContainer greeting="Todos nuestros productos"/>}/>
            <Route path='/detail/:productId' element={<ItemDetailContainer />}/>
            <Route path='/category/:categoryId' element={<ItemListContainer greeting="Filtrado"/>}/>
            <Route path='/cart/' element={<Cart/>}/>
            <Route path='/checkout' element={<Checkout />}/>
          </Routes>
          <Footer />
          </BrowserRouter>
        </CartContextProvider>
      </header>
    </div>
  );
}

export default App;
