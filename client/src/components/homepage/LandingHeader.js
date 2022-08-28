import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import CheckIcon from '@mui/icons-material/Check';
import Button from '@mui/material/Button';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';


function LandingHeader() {

	return (

<Box
      sx={{
        position: 'relative',
        backgroundColor: 'grey.800',
        color: '#fff',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url(${"/images/header.jpg"})`,
        minHeight: '400px',
      }}
    >

      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: 'rgba(0,0,0,.5)',
        }}
      />
      <Grid container>

        <Grid item md={8}>
          <Box
            sx={{
              position: 'relative',
              p: { xs: 3, md: 6 },
              pr: { md: 0 },
            }}
          >
            <Typography color="inherit" gutterBottom
              sx={{
                ml: { xs: 2, md: 10, lg: 25, xl: 25 },
                mt: 10,
                fontFamily: 'poppins',
                fontSize: '65px',
                fontWeight: 400,
                lineHeight: '1.2em',
                letterSpacing: '0rem',
                color: 'inherit',
                textDecoration: 'none',
                maxWidth: '900px',
              }}>
              Stop putting off your gaming backlog.
            </Typography>

            <Grid item md={11}>
              <Typography variant="h5" color="inherit" paragraph
                sx={{
                  ml: { xs: 2, md: 10, lg: 25, xl: 25 },
                  fontFamily: 'poppins',
                  fontWeight: 300,
                  letterSpacing: '.05rem',
                  color: 'inherit',
                  textDecoration: 'none',
                  fontSize: '16px',
                  maxWidth: '800px',
                }}>
                What's harder than NP-hard? Actually completing a video game before buying another one. NPCompletionist is a web app to search games and manage your backlog!
              </Typography>
            </Grid>

            <Grid item md={11}
              sx={{
                ml: { xs: 2, md: 10, lg: 25, xl: 25 },
                fontFamily: 'poppins',
                fontWeight: 300,
                letterSpacing: '.05rem',
                lineHeight: '1.6em',
                color: 'inherit',
                textDecoration: 'none',
                fontSize: '16px',
                maxWidth: '800px',
              }}>
              <CheckIcon sx={{ mr: 1.5, verticalAlign: -5, }} />
              Create a full backlog list
            </Grid>

            <Grid item md={11}
              sx={{
                ml: { xs: 2, md: 10, lg: 25, xl: 25 },
                fontFamily: 'poppins',
                fontWeight: 300,
                letterSpacing: '.05rem',
				lineHeight: '1.6em',
                color: 'inherit',
                textDecoration: 'none',
                fontSize: '16px',
                maxWidth: '800px',
              }}>
              <CheckIcon sx={{ mr: 1.5, verticalAlign: -5, }} />
			  Easily organize and track your games
            </Grid>

            <Grid item md={11}
              sx={{
                ml: { xs: 2, md: 10, lg: 25, xl: 25 },
                mb: 15,
                fontFamily: 'poppins',
                fontWeight: 300,
                letterSpacing: '.05rem',
                color: 'inherit',
                textDecoration: 'none',
                fontSize: '16px',
                maxWidth: '800px',
              }}>
              <Button color="inherit" variant="outlined" size="large" href="/sign-up" sx={{ mt: 3 }}>
                Get Started <ChevronRightIcon sx={{ ml: 1 }} />
              </Button>
            </Grid>

          </Box>
        </Grid>
      </Grid>
    </Box>
	  );
	}
	
	
	export default LandingHeader;