import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';

function Featured() {
    const [games, setGames] = useState([]);

    useEffect(() => {
        fetch('https://api.rawg.io/api/games?key=fe487707d2de401dacea3b793a51f537&ordering=-metacritic&page=1')
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    return Promise.reject(`Unexpected status code: ${response.status}`);
                }
            })
            .then(data => {
                setGames(data.results);
            })
            .catch(console.log);
    }, []);

    function renderPlatforms(platforms) {
        return platforms.map(p => `${p.platform.name}`).join(', ');
    }

    function renderGenres(genres) {
        return genres.map(g => `${g.name}`).join(', ');
    }

    function renderDevelopers(id) {
        const apiURL = `https://api.rawg.io/api/games/${id}?key=fe487707d2de401dacea3b793a51f537`;
        let dev;
        
        fetch(apiURL)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    return Promise.reject(`Unexpected status code: ${response.status}`);
                }
            })
            .then(data => {
                dev = data.developers[0] ? data.developers[0].name : 'noDev';
                console.log(dev);
            })
            .catch(console.log);
        console.log(dev);
        return dev;
    }

    return (
        <>
            <h2 className="mb-4">Games</h2>
            <table className="table table-striped table-hover table-sm">
                <thead className="thead-dark">
                    <tr>
                        <th>Title</th>
                        <th>Release Date</th>
                        <th>Developers</th>
                        <th>Score</th>
                        <th>Image URL</th>
                        <th>Genres</th>
                        <th>Platforms</th>
                    </tr>
                </thead>
                <tbody>
                    {games.map(game => (
                        <tr key={game.id}>
                            <td>{game.name}</td>
                            <td>{game.released}</td>
                            <td>{renderDevelopers(game.id)}</td>
                            <td>{game.metacritic}</td>
                            <td>{game.background_image}</td>
                            <td>{renderGenres(game.genres)}</td>
                            <td>{renderPlatforms(game.parent_platforms)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>


            <Container align="center" sx={{
      py: 10,
    }}>
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
        Featured Games
      </Typography>

      
      
        <Grid container align="center" spacing={2}>
        {games.map(game => (
            <tr key={game.id}>
        <Card sx={{ width: '250px', maxHeight: 'auto', my: 2, mx: 2 }}>
        <CardMedia
            component="img"
            image={game.background_image}
            style={{maxHeight: '130px'}}
            alt={game.name} />
            <CardContent>
        <Typography gutterBottom variant="h6" component="div" align="left">
        {game.name}
        </Typography>
        <Typography variant="body2" color="text.secondary"align="left">
        <b>Release Date:</b> {game.released}<br></br>
        {renderDevelopers(game.id)}<br></br>
        {game.metacritic}<br></br>
         {renderGenres(game.genres)}<br></br>
         {renderPlatforms(game.parent_platforms)}<br></br>
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
            </Card></tr>
            ))}
            </Grid>
                    
                    </Container>
        
        </>
    );
}

export default Featured;