import React, { useRef, useEffect } from 'react';
import PropTypes from "prop-types";
import shaka from "shaka-player";

import Subtitles from '../Subtitles/Subtitles'

const Player = () => {

    const player = useRef();

    useEffect(() => {
        shaka.polyfill.installAll();
        initPlayer();
    }, []);

    const initPlayer = async() => {

        const video = document.getElementById('video');
        player.current = new shaka.Player(video);
        window.player = player.current;

        await player.current.load("https://brenopolanski.github.io/html5-video-webvtt-example/MIB2.mp4")
          

        }

    return (
      <div>
        <h2>Player</h2>
        <Subtitles></Subtitles>
        <video 
         id="video"
          width="640"
          poster="//shaka-player-demo.appspot.com/assets/poster.jpg"
          controls
          autoPlay
        >
        </video>
  
      </div>
    );
}

export default Player;

Player.propTypes = {
    visible: PropTypes.bool
};

