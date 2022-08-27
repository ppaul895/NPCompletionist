import * as React from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';



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
        How Do I Get Started?
      </Typography>

      <Grid container align="center">




        <Grid item xs={3}>
          <Paper elevation={0} sx={{ py: 3 }}>

		  <span class="material-symbols-outlined" >search</span>
		  
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
                mx: 2,
                fontFamily: 'poppins',
                fontWeight: '400',
                fontSize: '14px',
                maxWidth: '800px',
              }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={3}>
          <Paper elevation={0} sx={{ py: 3 }}>

		  <span class="material-symbols-outlined" >library_add</span>
		  
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
                mx: 2,
                fontFamily: 'poppins',
                fontWeight: '400',
                fontSize: '14px',
                maxWidth: '800px',
              }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={3}>
          <Paper elevation={0} sx={{ py: 3 }}>

		  <span class="material-symbols-outlined" >sentiment_dissatisfied</span>
		  
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
              Step Three
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
              sx={{
                mx: 2,
                fontFamily: 'poppins',
                fontWeight: '400',
                fontSize: '14px',
                maxWidth: '800px',
              }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Typography>
          </Paper>
        </Grid>


		<Grid item xs={3}>
          <Paper elevation={0} sx={{ py: 3 }}>

		  <span class="material-symbols-outlined" >sports_esports</span>
		  
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
                mx: 2,
                fontFamily: 'poppins',
                fontWeight: '400',
                fontSize: '14px',
                maxWidth: '800px',
              }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Typography>
          </Paper>
        </Grid>
        
		
      </Grid>
    </Container>


  );
}