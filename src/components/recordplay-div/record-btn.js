import React, { Component } from 'react';
import {Howl, Howler} from 'howler';

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
      document.getElementById("micicon").style.color = "#000000";
    }else{
      document.getElementById("micicon").style.color = "#ff0000";
    }

    this.recording = !this.recording;
  }

  render() {
    return (
      <button id="record-btn" onClick={this.record}><i id="micicon" className="fa fa-microphone"></i></button>
    );
  }
}