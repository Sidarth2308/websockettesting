import React, { useState } from "react";
import { BrowserRouter as Router,
  Switch,
  Route,} from "react-router-dom"
import Home from "./home";
import Vendor from "./vendor";
import Client from "./client";
  
function App() {
  const [name, setName] = useState("");
  return (
    <Router>
      <Switch>
          <Route path="/client">
            <Client name ={name} />
          </Route>
          <Route path="/vendor">
            <Vendor name = {name} />
          </Route>
          <Route path="/">
            <Home name ={name} setName ={setName} />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
