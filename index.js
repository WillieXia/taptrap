import React, { Component } from 'react';
import { render } from 'react-dom';
import Tabl from './components/grid/tabl.js';
import Recordplay_div from './components/recordplay-btn-div.js';
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
        <Recordplay_div />
        <Tabl />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
