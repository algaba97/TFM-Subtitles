

import vtt from 'vtt.js';



const subtitles = (player, subtitle) =>{
      const subtitleDiv = document.createElement('div');

      player.__videoElement.parentNode.appendChild(subtitleDiv);

      subtitleDiv.setAttribute('id', 'subs');

}

export default subtitles;
    
   