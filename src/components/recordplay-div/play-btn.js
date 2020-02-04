import React, { Component } from 'react';
import {Howl, Howler} from 'howler';

export default class Play_btn extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React'
    };

    this.sound = new Howl({
      src: ['sound.mp3'],
      loop: true
    });
  }

  play = () => {
    if(this.playing){
      document.getElementById("playicon").style.color = "#000000";
      this.sound.pause();
    }else{
      document.getElementById("playicon").style.color = "#00ff00";
      this.sound.play();
    }

    this.playing = !this.playing;
  }

  render() {
    return (
      <button id="play-btn" onClick={this.play}><i id="playicon" className="fa fa-play"></i></button>
    );
  }
}