import * as React from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';

export default function Team() {
  return (

    <>


<Divider variant="fullWidth"  ></Divider>
    <Container maxWidth="lg" align="center" sx={{
      mb: 10,
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
          mt: 10,
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
          fontSize: '14px',
          maxWidth: '800px',
        }}>
        Something short and leading about the collection below—its contents,
        the creator, etc. Make it short and sweet, but not too short so folks
        don&apos;t simply skip over it entirely.
      </Typography>


      <Grid container align="center">

      <Grid item xs={1.5}>
          
        </Grid>

        <Grid item xs={3}>
          <Paper elevation={0} sx={{ py: 3 }}>
            <Avatar alt="Remy Sharp" src="https://mui.com/static/images/avatar/2.jpg"
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={3}>
          <Paper elevation={0} sx={{ py: 3 }}>
            <Avatar alt="Remy Sharp" src="https://mui.com/static/images/avatar/3.jpg"
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={3}>
          <Paper elevation={0} sx={{ py: 3 }}>
            <Avatar alt="Remy Sharp" src="https://mui.com/static/images/avatar/1.jpg"
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={1.5}>
          
        </Grid>
      </Grid>
    </Container>
    </>


  );
}