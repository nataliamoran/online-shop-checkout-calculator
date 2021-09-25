import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from "./components/Navbar/Navbar";
import ProductList from "./components/Products/ProductList";

import CheckoutCalc from './components/checkout-calculator';
import './App.css';

function App(){
  return(
      <div className={"App"}>
        <Navbar />
          <ProductList/>
      </div>
  )
}
export default App;