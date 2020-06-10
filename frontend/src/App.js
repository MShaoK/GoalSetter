import React from 'react';
import logo from './logo.svg';
import './App.css';

import Swipable from "./Swipable"
import DragScroll from "./DragScroll"
import Tasks from "./Tasks"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Swipable/>
        <Tasks/>
      </header>
    </div>
  );
}

export default App;
