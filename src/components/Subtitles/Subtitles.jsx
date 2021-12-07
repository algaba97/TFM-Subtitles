import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import useTranslate from "../../utils/useTranslate";
import vtt from "vtt.js";
import Word from "./Word";

const Subtitles = ({
  backgroundColor = "Green",
  color = "White",
  size = "10px",
  font = "Arial",
}) => {
  // Data containing all subtitle file data
  const subtitleData = useRef();
  // Last subtitle line translated
  const lastSubtitle = useRef("Default");
  // Current subtitle line displayed
  const [subtitle, setSubtitle] = useState("");

  const { translate } = useTranslate();

  useEffect(() => {
    const fetchSubtitle = async () => {
      const response = await fetch(
        "https://brenopolanski.github.io/html5-video-webvtt-example/MIB2-subtitles-pt-BR.vtt"
      );
      const text = await response.text();
      const { WebVTT } = vtt;

      const parser = new WebVTT.Parser(window, WebVTT.StringDecoder());
      subtitleData.current = { cues: [], regions: [] };

      parser.oncue = (cue) => {
        subtitleData.current.cues.push(cue);
      };

      parser.onregion = (region) => {
        subtitleData.current.regions.push(region);
      };

      parser.parse(text);

      window.video.addEventListener("timeupdate", onTimeUpdate);
    };
    fetchSubtitle();
    return () => window.player.removeEventListener("timeupdate");
  }, []);

  const findCurrentSubtitle = (time) => {
    return subtitleData.current.cues?.find(({ startTime, endTime }) => {
      return time >= startTime && time <= endTime;
    });
  };

  const onTimeUpdate = async (time) => {
    //     const { WebVTT } = vtt;
    const newSubtitle = findCurrentSubtitle(
      window.player.getMediaElement().currentTime
    );
    if (
      newSubtitle !== undefined &&
      newSubtitle?.text !== lastSubtitle.current
    ) {
      lastSubtitle.current = newSubtitle?.text;
      setSubtitle(await translate(newSubtitle.text));
      // Old format
      // WebVTT.processCues(window, [newSubtitle|| ""], document.getElementById('subs'));
    }
  };

  return (
    <div
      style={{
        color: color,
        fontFamily: font,
        fontSize: size,
        zIndex: "1",
        position: "absolute",
        top: "0px",
        background: backgroundColor !== "Disabled" ? backgroundColor : "",
        textAlign: "center",
        cursor: "pointer",
      }}
    >
      <Word value= {subtitle} />
     
    </div>
  );
};

export default Subtitles;
