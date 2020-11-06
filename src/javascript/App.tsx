import * as React from "react";
import {Component} from "react";
import { Router, Link } from "@reach/router";


import Header from "./components/Header";

import Home from "./pages/Home";
import Terms from "./pages/Terms";
import About from "./pages/About";
import Privacy from "./pages/Privacy";

class App extends Component {
  render() {
    return(
      <div className="App">
        <Header />
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
