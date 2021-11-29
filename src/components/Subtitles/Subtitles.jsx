import React, { useRef, useEffect } from 'react';
import PropTypes from "prop-types";
import useTranslate from '../../utils/useTranslate';
import vtt from 'vtt.js';



const Subtitles = () =>{

      const subtitle = useRef();
      const lastSubtitle = useRef("Default");
      const { translate } = useTranslate();
 
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
        
        

        const onTimeUpdate = async(time) =>{
  
            const { WebVTT } = vtt;
            const newSubtitle = findCurrentSubtitle(window.player.getMediaElement().currentTime);
            if(newSubtitle !== undefined && newSubtitle?.text !== lastSubtitle.current){
                  lastSubtitle.current = newSubtitle?.text;
                  newSubtitle.text = await translate(newSubtitle.text);
                  WebVTT.processCues(window, [newSubtitle|| ""], document.getElementById('subs'));  
                 
            }
           
      }

      


      return <div id="subs">
            TEST
      </div>
}


export default Subtitles;
    
   