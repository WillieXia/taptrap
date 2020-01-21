import React, { Component } from 'react';

export default class Record_btn extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React'
    };

    this.recording = false;
  }

  record = () => {
    if(this.recording){
      this.color = "#000000";
    }else{
      this.color = "#ff0000";
    }

    this.recording = !this.recording;
  }

  render() {
    return (
      <button id="record-btn" onClick={this.record}><i id="micicon" className="fa fa-microphone"></i></button>
    );
  }
}