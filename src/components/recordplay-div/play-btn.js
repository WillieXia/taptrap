import React, { Component } from 'react';

export default class Play_btn extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React'
    };

    this.playing = false;
  }

  play = () => {
    if(this.playing){
      document.getElementById("playicon").style.color = "#000000";
    }else{
      document.getElementById("playicon").style.color = "#00ff00";
    }

    this.playing = !this.playing;
  }

  render() {
    return (
      <button id="play-btn" onClick={this.play}><i id="playicon" className="fa fa-play"></i></button>
    );
  }
}