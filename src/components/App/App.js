import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Header from "../elements/Header/Header";
import NotFound from "../elements/NotFound/NotFound";
import Home from "../Home/Home";
import Movie from "../Movie/Movie";

const App = () => {
  return (
    <Router>
      <React.Fragment>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/:movieId" component={Movie} />
          <Route component={NotFound} />
        </Switch>
      </React.Fragment>
    </Router>
  );
};

export default App;
