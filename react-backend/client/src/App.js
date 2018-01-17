import React, { Component } from 'react';
import MiningStats from './components/MiningStats';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MiningStats />
      </div>
    );
  }
}

export default App;