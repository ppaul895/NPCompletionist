import * as React from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';



export default function Backlog() {

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
        Your Backlog
      </Typography>

      <Typography
        component="h5"
        variant="h5"
        align="left"
        color="text.primary"
        gutterBottom
        sx={{
          mt: 3,
          fontFamily: 'poppins',
          fontWeight: '400',
        }}
      >
        In Progress
      </Typography>
     
      <Grid container align="center" spacing={2}>
        <Card sx={{ maxWidth: 250, maxHeight: 300, my: 2, mx: 2 }}>
          <CardMedia
            component="img"
            image="https://upload.wikimedia.org/wikipedia/en/thumb/1/14/Halo_Infinite.png/220px-Halo_Infinite.png"
            alt="Halo Infinite"
          />
        </Card>
        <Card sx={{ maxWidth: 250, maxHeight: 300, my: 2, mx: 2 }}>
          <CardMedia
            component="img"
            image="https://upload.wikimedia.org/wikipedia/en/e/eb/Cuphead_%28artwork%29.png"
            alt="Cuphead"
          />
        </Card>
        <Card sx={{ maxWidth: 250, maxHeight: 300, my: 2, mx: 2 }}>
          <CardMedia
            component="img"
            image="https://upload.wikimedia.org/wikipedia/en/thumb/5/51/Borderlands_2_cover_art.png/220px-Borderlands_2_cover_art.png"
            alt="Borderlands 2"
          />
        </Card>
        <Card sx={{ maxWidth: 250, maxHeight: 300, my: 2, mx: 2 }}>
          <CardMedia
            component="img"
            image="https://upload.wikimedia.org/wikipedia/en/thumb/9/9c/Pokemon_Legends_Arceus_cover.jpg/220px-Pokemon_Legends_Arceus_cover.jpg"
            alt="Pokémon Legends: Arceus"
          />
        </Card>
        <Card sx={{ maxWidth: 250, maxHeight: 300, my: 2, mx: 2 }}>
          <CardMedia
            component="img"
            image="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Celeste_box_art_final.png/220px-Celeste_box_art_final.png"
            alt="Celeste"
          />
        </Card>
        <Card sx={{ maxWidth: 250, maxHeight: 300, my: 2, mx: 2 }}>
          <CardMedia
            component="img"
            image="https://upload.wikimedia.org/wikipedia/en/thumb/1/13/Cover_art_of_Star_Wars_Jedi_Fallen_Order.jpg/220px-Cover_art_of_Star_Wars_Jedi_Fallen_Order.jpg"
            alt="Star Wars Jedi: Fallen Order"
          />
        </Card>
      </Grid>

      <Typography
        component="h5"
        variant="h5"
        align="left"
        color="text.primary"
        gutterBottom
        sx={{
          mt: 5,
          fontFamily: 'poppins',
          fontWeight: '400',
        }}
      >
        Not Started
      </Typography>

      <Grid container align="center" spacing={2}>
        <Card sx={{ maxWidth: 250, maxHeight: 300, my: 2, mx: 2 }}>
          <CardMedia
            component="img"
            image="https://upload.wikimedia.org/wikipedia/en/thumb/2/21/Borderlands_3_cover_art.jpg/220px-Borderlands_3_cover_art.jpg"
            alt="Borderlands 3"
          />
        </Card>
        <Card sx={{ maxWidth: 250, maxHeight: 300, my: 2, mx: 2 }}>
          <CardMedia
            component="img"
            image="https://upload.wikimedia.org/wikipedia/en/thumb/4/4b/Unpacking_game_cover.png/220px-Unpacking_game_cover.png"
            alt="Unpacking "
          />
        </Card>
      </Grid>


      <Button size="large" variant="contained" color="success" sx={{ mt: 5 }}>Add Games</Button>

    </Container>




  );
}