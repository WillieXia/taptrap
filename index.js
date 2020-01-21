import React, { Component } from 'react';
import { render } from 'react-dom';
import Tabl from './components/grid/tabl.js';
import Record_btn from './components/recordplay-div/record-btn.js';
import './style.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React'
    };
  }

  render() {
    return (
      <div id="ctn">
        <div id="recordplay-btn-div">
          <Record_btn />
        </div>
        <Tabl />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
