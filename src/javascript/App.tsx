import * as React from "react";
import {Component} from "react";
import { Router, Link, globalHistory } from "@reach/router";


import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Terms from "./pages/Terms";
import About from "./pages/About";
import Privacy from "./pages/Privacy";

class App extends Component {
  render() {
    return(
        <div>
            <Header />

            <Router>
                <Home path="/" />
                <Terms path="/terms-of-service" />
                <Privacy path="/privacy-policy" />
                <About path="/about" />
            </Router>

            <Footer />
        </div>
    );
  }
    public componentDidMount() {
    globalHistory.listen(({ action }) => {
      if (action === 'PUSH') {
          document.getElementById('css-toggle').checked = false;
      }
    })
  }
}

export default App;
