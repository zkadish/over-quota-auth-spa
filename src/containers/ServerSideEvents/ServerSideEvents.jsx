import React, { useEffect, useState } from 'react';
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

import classes from './ServerSideEvents.styles';

function ServerSideEvents() {
  const [ facts, setFacts ] = useState([]);
  const [ listening, setListening ] = useState(false);

  useEffect( () => {
    if (!listening) {
      const events = new EventSource('http://localhost:3001/status/events?test=test');

      events.onmessage = (event) => {
        debugger;
        const parsedData = JSON.parse(event.data);

        setFacts((facts) => facts.concat(parsedData));
      };

      setListening(true);
    }
  }, [listening, facts]);

  return (
    <Authn>
      <AppLayout>
        <Paper>
          <Box sx={{ ...classes.serverSideEvents }}>
            <Typography className="title" variant="h2">Server Side Events</Typography>
          </Box>
          <Box sx={{ ...classes.events }}>
            <Box className="event-list">
              {
                facts.map((fact, i) => {
                  return (
                    <Box key={i}>
                      <Box>{fact.info}</Box>
                      <Box>{fact.source}</Box>
                    </Box>
                  )
                })
              }
            </Box>
          </Box>
        </Paper>
      </AppLayout>
    </Authn>
  );
}

export default ServerSideEvents;
