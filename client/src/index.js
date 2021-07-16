import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {Landing} from "./components/Landing";
import { Nav } from "./components/Nav/Nav";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { Route, HashRouter as Router } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { Home } from "./components/Home";
import { Detail } from "./components/Detail";
import { Create } from "./components/Create";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <Router>
        <Route exact path="/" component={Landing} />
        <Route path="/home/" component={Nav} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/detail" component={Detail} />
        <Route exact path="/home/create" component={Create} />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
