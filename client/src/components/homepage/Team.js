import * as React from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

export default function Team() {
  return (

    <>


<Divider variant="fullWidth"  ></Divider>
<Box
      component="footer"
      sx={{
        py: 10,
        px: 2,
        mt: 'auto',
        backgroundColor: '',
      }}
    >
    <Container maxWidth="lg" align="center" sx={{
    }}>
      
      <Typography
        component="h3"
        variant="h6"
        align="center"
        color="text.primary"
        gutterBottom
        sx={{
          fontFamily: 'poppins',
          fontSize: '16px',
          letterSpacing: '.2rem',
          fontWeight: '500',
        }}
      >
        
        OUR TEAM
      </Typography>
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
        Meet the NPCs
      </Typography>
      <Typography
        variant="h5"
        align="center"
        color="text.secondary"
        paragraph
        sx={{
          fontFamily: 'poppins',
          fontWeight: '400',
          fontSize: '16px',
          maxWidth: '800px',
        }}>
        Software developers, gamers, and overall really cool dudes.
      </Typography>


      <Grid container align="center">

      <Grid item xs={1.5}>
          
        </Grid>

        <Grid item xs={3}>
          <Paper elevation={0} sx={{ py: 3 }}>
            <Avatar alt="Prince Paul" src="/images/prince.png"
              align="center" sx={{
                width: '150px',
                height: '150px',
                border: '4px solid white',
              }} />
            <Typography
              component="h3"
              variant="h6"
              align="center"
              color="text.primary"
              gutterBottom
              sx={{
                mt: 3,
                fontFamily: 'poppins',
                fontSize: '20px',
                letterSpacing: '.025rem',
                fontWeight: '400',
              }}
            >
              Prince Paul
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
              My favorite games are CS:GO, Guild Wars 2, Star Citizen, 
              and Minecraft.<br></br><br></br>

              <b>Currently trying to finish:</b> Stardew Valley
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={3}>
          <Paper elevation={0} sx={{ py: 3 }}>
          <Avatar alt="Chantell Cruz" src="/images/chantell.png"
              align="center" sx={{
                width: '150px',
                height: '150px',
                border: '4px solid white',
              }} />
            <Typography
              component="h3"
              variant="h6"
              align="center"
              color="text.primary"
              gutterBottom
              sx={{
                mt: 3,
                fontFamily: 'poppins',
                fontSize: '20px',
                letterSpacing: '.025rem',
                fontWeight: '400',
              }}
            >
              Chantell Cruz
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
              Halo, Destiny, Minecraft, and Animal Crossing are my favorite games.<br></br><br></br>

              <b>Currently trying to finish:</b> Borderlands 2
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={3}>
          <Paper elevation={0} sx={{ py: 3 }}>
          <Avatar alt="Christopher Shaw" src="/images/christopher.png"
              align="center" sx={{
                width: '150px',
                height: '150px',
                border: '4px solid white',
              }} />
            <Typography
              component="h3"
              variant="h6"
              align="center"
              color="text.primary"
              gutterBottom
              sx={{
                mt: 3,
                fontFamily: 'poppins',
                fontSize: '20px',
                letterSpacing: '.025rem',
                fontWeight: '400',
              }}
            >
              Christopher Shaw
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
              I love to play Destiny 2, FIFA, Skyrim, and Minecraft.<br></br><br></br>

              <b>Currently trying to finish:</b> The Last of Us 2
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={1.5}>
          
        </Grid>
      </Grid>
    </Container>
    </Box>
    </>
  );
}