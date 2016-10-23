import React from 'react';
import {render} from 'react-dom';
import { Router, Route, IndexRoute, hashHistory, IndexLink, Link } from 'react-router';
import AwesomeComponent from './AwesomeComponent.jsx';
import Home from './Home.jsx';
import Nope from './Nope.jsx';
import Game from './Game.jsx';
class App extends React.Component {
  render () {
    return <div>
            <h1>Simple SPA</h1>
            <ul className="header">
              <li><IndexLink to="/" activeClassName="active">Home</IndexLink></li>
              <li><Link to="/awesome" activeClassName="active">Awesome</Link></li>
              <li><Link to="/game" activeClassName="active">Game</Link></li>              
            </ul>
            <div className="content">
              {this.props.children}
            </div>
          </div>;
  }
}

render(
    <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Home} />
          <Route path="awesome" component={AwesomeComponent} />  
          <Route path="game" component={Game} />       
          <Route path='*' component={Nope} />
        </Route>

      </Router>
    , document.getElementById('app'));
