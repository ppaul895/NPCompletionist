import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import Divider from '@mui/material/Divider';


function Copyright(props) {
  return (
    <Box px={{ xs: 3, sm: 3 }} mt={{ xs: 3, sm: 3 }} mb={{ xs: 1, sm: 1 }} align="center">
      <Typography variant="body2" color="text.secondary"  {...props} sx={{opacity: '.5'}}>
        {'Copyright © '}
        <Link color="inherit" underline="none" href="/">
          NPCompletionist
        </Link>{' '}
        {new Date().getFullYear()}
        {' • Powered by '}
        <Link color="inherit" underline="none" href="https://rawg.io/">
        rawg.io
        </Link>{' '}
      </Typography>
    </Box>
  );
}

export default function StickyFooter() {
  return (

    <Box
      component="footer"
      // align="center"
      px={{ xs: 3, sm: 20 }}
      pt={{ xs: 5, sm: 8 }}
      sx={{
        pb: 2,
        px: 10,
        mt: 'auto',
        backgroundColor: '#272727',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={2}>

        <Grid item xs={12} sm={12}>
            <Box sx={{ mb: 3 }}>
              <img src="/images/white-logo-full.png" alt="NPCompletionist" sx={{ mb: 3 }} width="300px"></img>
            </Box>
            </Grid>

          <Grid item xs={12} sm={4}>
            <Box borderBottom={0} sx={{
              textTransform: 'uppercase',
              fontFamily: 'poppins',
              fontWeight: '500',
              fontSize: '14px',
              letterSpacing: '.1rem',
              mb: 1,
            }}
            >
              Site Map
            </Box>

            <Box>
              <Link href='/' underline="none" variant="body2" color="text.secondary">
                Home
              </Link>
              <br></br>
              <Link href='/' underline="none" variant="body2" color="text.secondary">
                Featured Games
              </Link>
              <br></br>
              <Link href='/contact-us' underline="none" variant="body2" color="text.secondary">
                Contact
              </Link>
            </Box>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Box borderBottom={0} sx={{
              textTransform: 'uppercase',
              fontFamily: 'poppins',
              fontWeight: '500',
              fontSize: '14px',
              letterSpacing: '.1rem',
              mb: 1,
            }}
            >
              Account
            </Box>

            <Box>
              <Link href='/sign-in' underline="none" variant="body2" color="text.secondary">
              Sign In
              </Link>
              <br></br>
              <Link href='/backlog' underline="none" variant="body2" color="text.secondary">
              Backlog
              </Link>
              <br></br>
              <Link href='/sign-up' underline="none" variant="body2" color="text.secondary">
              Sign Up
              </Link>
            </Box>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Box borderBottom={0} sx={{
              textTransform: 'uppercase',
              fontFamily: 'poppins',
              fontWeight: '500',
              fontSize: '14px',
              letterSpacing: '.1rem',
              mb: 1,
            }}
            >
              Follow Us
            </Box>

            <Box borderBottom={0} sx={{
              fontFamily: 'poppins',
              fontWeight: '300',
              fontSize: '13px',
              letterSpacing: '.025rem',
              opacity: '.5',
              mb: 1,
            }}
            >
              Follow us on social media to find out the latest updates on our progress.
            </Box>

            <Box>
              <GitHubIcon sx={{ mr: 2 }} />
              <TwitterIcon sx={{ mr: 2 }} />
              <InstagramIcon sx={{ mr: 2 }} />
            </Box>
          </Grid>

          


        </Grid>
        <Divider variant="fullWidth" sx={{ mt: 5 }} ></Divider>
      </Container>

      <Copyright />
    </Box>

  );
}