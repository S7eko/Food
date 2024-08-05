import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/Header/header';
import ProductsList from './Components/Slider/productsList';
import OneProduct from './Components/Slider/oneProduct'; 
import About from './Components/Slider/About'; 
function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<ProductsList />} />
          <Route path="/product/:id" element={<OneProduct />} /> 
          <Route path="/about" element={<About />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
