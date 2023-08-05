import React, { useRef, useEffect } from 'react';
import videojs from 'video.js';
import { Box } from '@mui/material';

import '../../../../node_modules/video.js/dist/video-js.css';
import './VideoJsPlayer.css';

const VideoJsPlayer = (props) => {
  const {options, onReady} = props;

  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    // Make sure Video.js player is only initialized once
    if(!playerRef.current) {
      // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode. 
      const videoElement = document.createElement("video-js");

      // videoElement.classList.add('vjs-big-play-centered');
      videoRef.current.appendChild(videoElement);

      //
      const player = playerRef.current = videojs(videoElement, options, () => {
        console.log('player is ready');
        const moveOneFrame = (forward) => {
          // Current time in seconds - float value thankfully
          const currentTime = player.currentTime();
          // Number of seconds (< 1) per frame
          // TOOD: get frame rate and use it to calculate secondsPerFrame
          const secondsPerFrame = 1 / 30;
          forward ? player.currentTime(currentTime + secondsPerFrame) : player.currentTime(currentTime - secondsPerFrame);
        }

        // add back and forward one frame
        const backButton = player.controlBar.addChild('button', {}, 0);
        backButton.on(backButton, 'click', () => moveOneFrame(false));
        backButton.addClass('frame-icon');
        backButton.addClass('back-icon');
        const forwardButton = player.controlBar.addChild('button', {}, 2);
        forwardButton.on(forwardButton, 'click', () => moveOneFrame(true));
        forwardButton.addClass('frame-icon');
        forwardButton.addClass('forward-icon');
        console.log('player has been customized');

        onReady && onReady(player);
      });
      return;
    }
    // You could update an existing player in the `else` block here
    // on prop change, for example:
    const player = playerRef.current;

    player.autoplay(options.autoplay);
    player.src(options.sources);
  }, [options, videoRef]);

  // Dispose the Video.js player when the functional component unmounts
  React.useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <Box>
      <Box ref={videoRef} />
    </Box>
  );
}

export default VideoJsPlayer;
