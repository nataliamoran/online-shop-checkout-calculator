import React from 'react';
import { BrowserRouter, Route} from 'react-router-dom';
import Store from "./components/pages/Store.js"
import About from "./components/pages/About.js"
import Contact from "./components/pages/Contact.js"
import './App.css';

function App(){
  return(
      <BrowserRouter>
          <div className={"App"}>
          </div>
          <Route path={"/"} exact component={Store}/>
          <Route path={"/about"} component={About}/>
          <Route path={"/contact"} component={Contact}/>
      </BrowserRouter>
  )
}
export default App;