import React, { useRef, useEffect } from 'react';
import PropTypes from "prop-types";
import vtt from 'vtt.js';



const Subtitles = () =>{

      const subtitle = useRef();
      
 
      useEffect(() => {
      const fetchSubtitle = async() =>{
            const response = await fetch("https://brenopolanski.github.io/html5-video-webvtt-example/MIB2-subtitles-pt-BR.vtt")
            const text = await response.text();
            const { WebVTT } = vtt;

            const parser = new WebVTT.Parser(window, WebVTT.StringDecoder());
            subtitle.current = { cues: [], regions: [] };

            parser.oncue = cue => {
              subtitle.current.cues.push(cue);
            };

            parser.onregion = region => {
              subtitle.current.regions.push(region);
            };

            parser.parse(text);

            window.video.addEventListener('timeupdate', onTimeUpdate);

      }
      fetchSubtitle();
           return()=> window.player.removeEventListener('timeupdate');
        }, []);
      
        const findCurrentSubtitle = (time) => {
              console.log(subtitle.current.cues);
            return subtitle.current.cues?.find(({ startTime, endTime }) => {
                 return time >= startTime && time <= endTime;
            }
                 
            );
      }
        
        

        const onTimeUpdate = (time)=>{
  
            const { WebVTT } = vtt;
            const newSubtitle = findCurrentSubtitle(window.player.getMediaElement().currentTime);
            console.log(newSubtitle);
            WebVTT.processCues(window, [newSubtitle|| ""], document.getElementById('subs'));  
      }

        console.log(subtitle.current);


      return <div id="subs">
            TEST
      </div>
}


export default Subtitles;
    
   