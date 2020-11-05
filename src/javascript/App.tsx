import * as React from "react";
import {Component} from "react";
import { Router, Link } from "@reach/router";
import { RouteComponentProps } from "@reach/router";

const Home = (props: RouteComponentProps) => (
    <div>Home</div>
);

const Terms = (props: RouteComponentProps) => (
    <div>Terms</div>
);

class App extends Component {
  render() {
    return(
      <div className="App">
          <h1>Hello, World! </h1>
          <Link to="/">Home</Link> 
          <Link to="/terms-of-service">Terms of Service</Link>
          <Router>
              <Home path="/" />
              <Terms path="/terms-of-service" />
          </Router>
      </div>
    );
  }
}

export default App;
