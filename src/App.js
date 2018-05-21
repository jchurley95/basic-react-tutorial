import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import FunctionalChildComponent from './components/FunctionalChildComponent';
import StatefulChildComponent from './components/StatefulChildComponent';

class App extends Component {
  constructor() {
    super();

    this.state = {

    }
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div>
          <FunctionalChildComponent />
          <StatefulChildComponent />
        </div>
      </div>
    );
  }
}

export default App;
