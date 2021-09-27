import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import ProductList from "../../components/Products/ProductList";
export default  function Store(){
    return (
      <div className={"Store"}>
        <Navbar />
          <ProductList/>
      </div>
    )
}