import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from '../src/App/App';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Main from './User/Main';
import Restaurant from "./Restaurant/Restaurant";
import Delivery from "./Delivery/Delivery";
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/main" component={Main} />
        <Route path="/restaurant" component={Restaurant}/>
        <Route path="/delivery" component={Delivery}/>
      </Switch>
    </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
