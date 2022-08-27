import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

function Copyright(props) {
	return (
	  <Typography variant="body2" color="text.secondary" align="center" {...props}>
		{'Copyright © '}
		<Link color="inherit" href="/">
		  NPCompletionist
		</Link>{' '}
		{new Date().getFullYear()}
		{'.'}
	  </Typography>
	);
  }

export default function StickyFooter() {
  return (

      <Box
        component="footer"
		align="center"
        sx={{
          py: 10,
          px: 2,
          mt: 'auto',
		  backgroundColor: '#222222',
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="body1">
            This is a sticky footer.
          </Typography>
          <Copyright />
        </Container>
      </Box>
	
  );
}