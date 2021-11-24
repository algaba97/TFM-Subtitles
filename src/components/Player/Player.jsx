import React, { useRef, useEffect } from 'react';
import PropTypes from "prop-types";
import shaka from "shaka-player";


const Player = () => {

    const player = useRef();

    useEffect(() => {
        shaka.polyfill.installAll();
        initPlayer();
    }, []);

    const initPlayer = () => {

        const video = document.getElementById('video');
        player.current = new shaka.Player(video);
        window.player = player;

        player.current
            .load("https://livesim.dashif.org/livesim/testpic_2s/Manifest.mpd")
            .then(function () {
                // This runs if the asynchronous load is successful.
                console.log("The video has now been loaded! ");
            })
            .catch();

        }

    return (
      <div>
        <h2>Player</h2>
        <video 
         id="video"
          width="640"
          poster="//shaka-player-demo.appspot.com/assets/poster.jpg"
          controls
          autoPlay
        />
      </div>
    );
}

export default Player;

Player.propTypes = {
    visible: PropTypes.bool
};

