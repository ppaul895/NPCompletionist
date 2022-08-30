import * as React from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useEffect, useState } from "react";
import {useHistory, useParams} from 'react-router-dom';

const GAME_DEFAULT = {
    "title": "",
    "release_date": "0",
    "developer": "",
    "score": 0,
    "genre": "",
    "platform": ""
};

export default function Backlog() {
  const [games, setGames] = useState([]);
  const [game, setGame] = useState(GAME_DEFAULT);
  const [errors, setErrors] = useState([]);
  const history = useHistory();
  const {id} = useParams();

  useEffect(() => {
      fetch('http://localhost:8080/api/game')
          .then(response => response.json())
          .then(data => setGames(data))
          .catch(console.log);
  }, []);


  const handleDeleteGame = (gameId) => {
      const game = games.find(games => games.id === gameId);

      if (window.confirm(`Delete ${game.title} from your backlog?`)) {
          const init = {
              method: 'DELETE'
          };
          fetch(`http://localhost:8080/api/game/${id}`, init)
              .then(response => {
                  if (response.status === 204) {
                      const newGames = games.filter(games => games.id === gameId);
                      setGames(newGames);
                  } else {
                      return Promise.reject(`Unexpected Status Code: ${response.status}`);
                  }
              })
              .catch(console.log);
      }
  };

      const handleEditGame = () => {
        game.gameId = id;

        const init = {
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(game)
        };
    
        fetch(`http://localhost:8080/api/game/${id}`, init)
        .then(response => {
            if (response.status ===  204){
                return null;
            } else if (response.status === 400){
                return response.json();
            }else{
                return Promise.reject(`Unexpected Status Code: ${response.status}`);
            }
        })
        .then(data =>{
            if (!data){
                history.push(`/game`);
// this is probably wrong url and needs to be isCompleted == true and using backlog;
            }else{
                setErrors(data);
            }
        })
        .catch(console.log);
    };



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

      <Box
  m={1}
  display="flex"
  justifyContent="flex-start"
  alignItems="flex-start"
>
      <Button size="large" variant="contained" align="left" color="success"  href="/featured"
      sx={{ mt: 2, mb: 8 }}>
        Add Games
        </Button>
</Box>

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
        Completed
      </Typography>

      <Grid container align="center" spacing={2}>
        <Card sx={{ opacity: 0.75, filter: "grayscale(100%)", maxWidth: 250, maxHeight: 300, my: 2, mx: 2 }}>
          <CardMedia
            component="img"
            image="https://upload.wikimedia.org/wikipedia/en/thumb/2/21/Borderlands_3_cover_art.jpg/220px-Borderlands_3_cover_art.jpg"
            alt="Borderlands 3"
          />
        </Card>
        <Card sx={{ opacity: 0.75, filter: "grayscale(100%)", maxWidth: 250, maxHeight: 300, my: 2, mx: 2 }}>
          <CardMedia
            component="img"
            image="https://upload.wikimedia.org/wikipedia/en/thumb/4/4b/Unpacking_game_cover.png/220px-Unpacking_game_cover.png"
            alt="Unpacking "
            
          />
        </Card>
      </Grid>



    </Container>




  );
}