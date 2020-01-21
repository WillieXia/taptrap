import React, {Component} from 'react';

export default class Beat_btn extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React'
    };

    this.play_type = 0;

    // 0 == cut
    // 1 == overlap
    // 2 == loop
  }

  trigger = () => {
    // this.color = "black";
  }

  render() {
    return (<button className="beat-btn" onClick={this.trigger}></button>);
  }
}