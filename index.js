import React, { Component } from 'react';
import { render } from 'react-dom';
import Tbl from './components/tbl.js';
import Rcd_div from './components/rcd_div.js';

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
        <Rcd_div />
        <Tbl />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
