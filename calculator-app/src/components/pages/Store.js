import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import StoreList from "../../components/Products/StoreList";
export default  function Store(){
    return (
      <div className={"Store"}>
        <Navbar />
          <StoreList/>
      </div>
    )
}