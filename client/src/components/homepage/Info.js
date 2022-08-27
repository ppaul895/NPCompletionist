import * as React from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';



export default function Info() {
  return (

    <Container align="center" sx={{
      py: 10,
    }}>
      <Typography
        component="h2"
        variant="h2"
        align="center"
        color="text.primary"
        gutterBottom
        sx={{
          fontFamily: 'poppins',
          fontWeight: '400',
        }}
      >
        How does it work?
      </Typography>

      <Grid container align="center">




        <Grid item xs={3}>
          <Paper elevation={0} sx={{ py: 3 }}>

		  <img alt="Search" src="/images/icon-search.png" align="center" width="65px"/>
		  
            <Typography
              component="h3"
              variant="h6"
              align="center"
              color="text.primary"
              gutterBottom
              sx={{
                mt: 3,
                fontFamily: 'poppins',
                fontSize: '18px',
                letterSpacing: '.05rem',
                fontWeight: '400',
				textTransform: 'uppercase',
              }}
            >
              Step One
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
              sx={{
                mx: 3,
                fontFamily: 'poppins',
                fontWeight: '400',
                fontSize: '16px',
              }}>
              Search our database for all your backlogged games
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={3}>
          <Paper elevation={0} sx={{ py: 3 }}>

		  <img alt="Search" src="/images/icon-add.png" align="center" width="65px"/>
		  
            <Typography
              component="h3"
              variant="h6"
              align="center"
              color="text.primary"
              gutterBottom
              sx={{
                mt: 3,
                fontFamily: 'poppins',
                fontSize: '18px',
                letterSpacing: '.05rem',
                fontWeight: '400',
				textTransform: 'uppercase',
              }}
            >
              Step Two
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
              sx={{
                mx: 3,
                fontFamily: 'poppins',
                fontWeight: '400',
                fontSize: '16px',
              }}>
              Add games to create your backlog list
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={3}>
          <Paper elevation={0} sx={{ py: 3 }}>

		  <img alt="Search" src="/images/icon-cry.png" align="center" width="65px"/>
		  
            <Typography
              component="h3"
              variant="h6"
              align="center"
              color="text.primary"
              gutterBottom
              sx={{
                mt: 3,
                fontFamily: 'poppins',
                fontSize: '16px',
                letterSpacing: '.05rem',
                fontWeight: '400',
				textTransform: 'uppercase',
              }}
            >
              Step Three
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
              sx={{
                mx: 3,
                fontFamily: 'poppins',
                fontWeight: '400',
                fontSize: '16px',
              }}>
              <s>Optional</s> Cry about how long your list is
            </Typography>
          </Paper>
        </Grid>


		<Grid item xs={3}>
          <Paper elevation={0} sx={{ py: 3 }}>

		  <img alt="Search" src="/images/icon-controller.png" align="center" width="65px"/>
		  
            <Typography
              component="h3"
              variant="h6"
              align="center"
              color="text.primary"
              gutterBottom
              sx={{
                mt: 3,
                fontFamily: 'poppins',
                fontSize: '18px',
                letterSpacing: '.05rem',
                fontWeight: '400',
				textTransform: 'uppercase',
              }}
            >
              Step Four
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
              sx={{
                mx: 3,
                fontFamily: 'poppins',
                fontWeight: '400',
                fontSize: '16px',
              }}>
              Start gaming and working on that backlog!
            </Typography>
          </Paper>
        </Grid>
        
		
      </Grid>
    </Container>


  );
}