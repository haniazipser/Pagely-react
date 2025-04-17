import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from'./Components/Home'
import ikona from'./assets/ikona.png'
import Navbar from './Components/Navbar';
import Offers from'./Components/Offers'
import Books from'./Components/Books'
import Profile from'./Components/Profile'
import Categories from'./Components/Categories'
import BookDetails from './Components/BookDetails';
import OfferDetails from './Components/OfferDetails';
import CheckOut from './Components/CheckOut';
import { CartProvider } from './context/cart';
import CartContent from './Components/CartContent';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from 'react';
import OffersByIsbn from './Components/OffersByIsbn';
import Registration from './Components/Registration';



function App() {
  const [expanded, setExpanded] = useState(false);
  
  const handleProfile=()=>{
      console.log("Profile rendered, expanded:", expanded);
      setExpanded(!expanded);
  }

  return (
   
    <CartProvider>
        <BrowserRouter>
        <Navbar onProfileClick={handleProfile}/>
        <Profile expanded={expanded}/>
        <ToastContainer 
        position="top-right" 
        autoClose={3000}
        hideProgressBar={true} 
        theme="dark"
        style={{ marginTop: "100px" }} />
        <Routes>
          <Route path='' element={<Home/>}/>
          <Route path='/offers' element={<Offers/>}/>
          <Route path='/offersByIsbn' element={<OffersByIsbn/>}/>
          <Route path='/books' element={<Books/>}/>
          {/*<Route path='/profile' element={<Profile/>}/>*/}
          <Route path='/categories' element={<Categories/>}/>
          <Route path='/cart' element={<CartContent/>}/>
          <Route path='/books/:id' element={<BookDetails/>}/>
          <Route path='/offers/:id' element={<OfferDetails/>}/>
          <Route path='/checkout' element={<CheckOut/>}/>
          <Route path='/register' element={<Registration/>}/>
        </Routes>
        </BrowserRouter>
    </CartProvider>
  );
}

export default App;