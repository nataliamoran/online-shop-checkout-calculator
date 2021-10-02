import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import ContactText from "./ContactText"
export default  function Store(){
    return (
      <div className={"Contact"}>
        <Navbar />
        <ContactText/>
      </div>

    )
}