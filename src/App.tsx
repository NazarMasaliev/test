import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainPage from './Pages/MainPage';
import AboutProduct from './Pages/AboutProduct';
import Addproducts from './Pages/addProducts';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/AboutProduct/:id' element={<AboutProduct />} />
        <Route path='/addProducts' element={<Addproducts />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
