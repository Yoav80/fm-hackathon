import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import Bill from "./components/Bill";
import Home from "./components/Home";


function BasicExample() {
  return (
      <Router>
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/bill" component={Bill} />
          <Route path="/topics" component={Topics} />
        </div>
      </Router>
  );
}

function Topics({ match }) {
  return (
      <div>
        <h2>Topics</h2>
        <ul>
          <li>
            <Link to={`${match.url}/rendering`}>Rendering with React</Link>
          </li>
          <li>
            <Link to={`${match.url}/components`}>Components</Link>
          </li>
          <li>
            <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
          </li>
        </ul>

        <Route path={`${match.path}/:topicId`} component={Topic} />
        <Route
            exact
            path={match.path}
            render={() => <h3>Please select a topic.</h3>}
        />
      </div>
  );
}

function Topic({ match }) {
  return (
      <div>
        <h3>{match.params.topicId}</h3>
      </div>
  );
}

export default BasicExample;