import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

function Copyright(props) {
  return (
    <Box align="center">
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="/">
          NPCompletionist
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </Box>
  );
}

export default function StickyFooter() {
  return (

    <Box
      component="footer"
      // align="center"
      px={{ xs: 3, sm: 10 }}
      py={{ xs: 5, sm: 10 }}
      sx={{
        py: 10,
        px: 2,
        mt: 'auto',
        backgroundColor: '#222222',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={4}>
            <Box borderBottom={1}>Social</Box>
            <Box>
              <Link href='/' color="inherit">
                Twitch
              </Link>
            </Box>
            <Box>
              <Link href='/' color="inherit">
                Twitter
              </Link>
            </Box>
            <Box>
              <Link href='/' color="inherit">
                Instagram
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box borderBottom={1}>Navigation</Box>
            <Box>
              <Link href='/' color="inherit">
                Home
              </Link>
            </Box>
            <Box>
              <Link href='/contact-us' color="inherit">
                Contact Us
              </Link>
            </Box>
            <Box>
              <Link href='/' color="inherit">
                Featured Games
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box borderBottom={1}>Account</Box>
            <Box>
              <Link href='/backlog' color="inherit">
                Backlog
              </Link>
            </Box>
            <Box>
              <Link href='/sign-up' color="inherit">
                Sign Up
              </Link>
            </Box>
            <Box>
              <Link href='/sign-in' color="inherit">
                Sign In
              </Link>
            </Box>
            <Copyright />
          </Grid>
        </Grid>
      </Container>
    </Box>

  );
}