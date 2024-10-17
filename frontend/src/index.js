import React from 'react';
import ReactDOM from 'react-dom/client';
import{BrowserRouter,Routes,Route} from 'react-router-dom';
import './index.css';
import Homepage from './landing_page/home/Homepage';
import Signup from'./landing_page/signup/SignUp.js';

import AboutPage from './landing_page/about/AboutPage.js';
import ProductPage from './landing_page/products/ProductPage.js';
import SupportPage from './landing_page/support/SupportPage.js';
import Navbar from './landing_page/Navbar.js';
import Footer from './landing_page/Footer.js';
import Notfound from './landing_page/Notfound.js';
import { AuthProvider } from './context/AuthContext.js'; 
import Login from './landing_page/login/Login.js';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <AuthProvider>
        <BrowserRouter>
    <Navbar/>

    <Routes>
        <Route path='/' element={<Homepage/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/about' element={<AboutPage/>}></Route>
        <Route path='/products' element={<ProductPage/>}></Route>
       
        <Route path='/support' element={<SupportPage/>}></Route>
        <Route path='*' element={<Notfound/>}></Route>

    </Routes>
    <Footer/>
    </BrowserRouter>
    </AuthProvider>

    
    
 
);

