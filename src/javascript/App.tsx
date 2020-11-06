import * as React from "react";
import {Component} from "react";
import { Router, Link } from "@reach/router";

import Home from "./pages/Home";
import Terms from "./pages/Terms";
import About from "./pages/About";
import Privacy from "./pages/Privacy";

class App extends Component {
  render() {
    return(
      <div className="App">
          <h1>Hello, World! </h1>
          <Link to="/">Home</Link> 
          <Link to="/about">About</Link>
          <Link to="/terms-of-service">Terms of Service</Link>
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Router>
              <Home path="/" />
              <Terms path="/terms-of-service" />
              <Privacy path="/privacy-policy" />
              <About path="/about" />
          </Router>
      </div>
    );
  }
}

export default App;
