import React, { useRef } from 'react';
import {
  Card,
  CardContent,
  IconButton,
  Typography,
  Paper,
  Box,
} from '@mui/material';
import GetAppIcon from '@mui/icons-material/GetApp';
import AccountBoxSharpIcon from '@mui/icons-material/AccountBoxSharp';
import AppLayout from '../Layout/AppLayout';
import Authn from '../../components/Authn';
import VideoJsPlayer from './VideoJsPlayer'

import classes from './Video.styles';

function Video() {
  const playerRef = useRef(null);

  const videoJsOptions = {
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: true,
    // The controlBar interface has at least 2 different ways to define it here
    // This seemed to work pretty good but still doesn't give absolute control of 
    // what shown in the control bar and there is some css which allows for showing
    // all the appropriate controls: See ../VideoJsPlayer/VideoJsPlayer.css
    // children: { 
    controlBar: {
      playToggle: true,
      volumePanel: {
          inline: false,
      },
      volumeMenuButton: true,
      currentTimeDisplay: true,
      timeDivider: false,
      remainingTimeDisplay: false,
      progressControl: true,
      durationDisplay: true,
      audioTrackButton: true,
      subtitlesButton: true,
      pictureInPictureToggle: false,
      fullscreenToggle: true,
    },
    // },
    sources: [{
      src: 'https://dash.akamaized.net/dash264/TestCasesIOP33/adapatationSetSwitching/5/manifest.mpd',
      // type: 'video/mp4',
      // type: 'application/x-mpegURL',
      type: 'application/dash+xml',
    }]
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on('loadedmetadata', () => {
      console.log('videojs player has loaded video metadata');
    });

    player.on('waiting', () => {
      console.log('videojs player is waiting');
    });

    player.on('pause', () => {
      console.log('videojs player is paused');
    });

    player.on('ended', () => {
      console.log('videojs player has ended');
    });

    player.on('dispose', () => {
      console.log('videojs player will dispose');
    });
  };

  return (
    <Authn>
      <AppLayout>
        <Paper>
          <Box sx={{ ...classes.video }}>
            <Typography className="title" variant="h2">Your Videos</Typography>
          </Box>
          <Box sx={{ ...classes.videoPlayer }}>
            <Box className="player-size">
              <VideoJsPlayer options={videoJsOptions} onReady={handlePlayerReady} />
            </Box>
          </Box>
        </Paper>
      </AppLayout>
    </Authn>
  );
}

export default Video;
