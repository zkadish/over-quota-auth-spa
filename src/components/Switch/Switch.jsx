import React, { useCallback } from 'react';
import { string } from 'prop-types';
import CoreSwitch from '@mui/material/Switch';
import Box from '@mui/material/Box';

const Switch = props => {
  const { className, checked, onSwitchChange } = props;

  const handleChange = useCallback(() => {
    onSwitchChange();
  }, [onSwitchChange]);

  return (
    <Box>
      <CoreSwitch
        className={className}
        checked={!!checked}
        onChange={handleChange}
        value="checked"
        size="small"
      />
    </Box>
  );
};

Switch.propTypes = {
  className: string // eslint-disable-line
};

Switch.defaultProps = {
  className: ''
};

export default Switch;
