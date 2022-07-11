import * as React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import CheckIcon from '@mui/icons-material/Check';
import SaveIcon from '@mui/icons-material/Save';

export default function SubmitButton({width="100%", text="submit", loading, setLoading, onClick}) {
 
  const timer = React.useRef();

  const buttonSx = {
    backgroundColor: '#625038',
    width: '100%'
    
  };

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

 
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ mt:'25px', width: width, position: 'relative' }}>
        <Button
          variant="contained"
          sx={buttonSx}
          disabled={loading}
          // onClick={onClick}
          type="submit"
        >
          Submit
        </Button>
        {loading && (
          <CircularProgress
            size={24}
            sx={{
              color: "#625038",
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-12px',
              marginLeft: '-12px',
            }}
          />
        )}
      </Box>
    </Box>
  );
}
