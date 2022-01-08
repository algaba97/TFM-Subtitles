import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import shaka from "shaka-player";

import Subtitles from "../Subtitles/Subtitles";
import Selector from "../Selector/Selector";

import options from "../../utils/options";
const Player = () => {
  const player = useRef();
  const [backgroundColor, setBackgroundColor] = useState("");
  const [color, setColor] = useState("White");
  const [font, setFont] = useState("Arial");
  const [fontSize, setFontSize] = useState("12");
  const [helpLanguage, setHelpLanguage] = useState("es");

  const callbacks = [
    setBackgroundColor,
    setColor,
    setFont,
    setFontSize,
    setHelpLanguage,
  ];

  useEffect(() => {
    shaka.polyfill.installAll();
    initPlayer();
  }, []);

  const initPlayer = async () => {
    const video = document.getElementById("video");
    player.current = new shaka.Player(video);
    window.player = player.current;
    const queryParams = new URLSearchParams(window.location.search);
    const url = queryParams.get('video') || "https://brenopolanski.github.io/html5-video-webvtt-example/MIB2.mp4";
    
    await player.current.load(
      url
    );
  };

  const showOptions = () =>
    options.map((option, i) => (
      <div style={{ width: "15%" }}>
        <Selector
          title={option?.title}
          options={option?.options}
          onChange={(selectedOption) => callbacks[i](selectedOption?.value)}
        />
      </div>
    ));

  return (
    <div>
      <h2>Player</h2>

      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <video
          id="video"
          width="640"
          poster="//shaka-player-demo.appspot.com/assets/poster.jpg"
          controls
          autoPlay
        />
        <Subtitles
          backgroundColor={backgroundColor}
          color={color}
          size={fontSize}
          font={font}
          helpLanguage={helpLanguage}
        ></Subtitles>
      </div>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        {showOptions()}
      </div>
    </div>
  );
};

export default Player;

Player.propTypes = {
  visible: PropTypes.bool,
};
