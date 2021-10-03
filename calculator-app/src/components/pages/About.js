import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import AboutText from "./AboutText"
export default  function About(){
    return (
      <div className={"About"}>
        <Navbar />
        <AboutText/>
      </div>
    )
}