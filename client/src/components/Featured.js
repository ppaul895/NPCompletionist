import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import AddIcon from '@mui/icons-material/Add';
// import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
// import Fab from '@mui/material/Fab';

function Featured() {
    const [games, setGames] = useState([]);

    useEffect(() => {
        fetch('https://api.rawg.io/api/games?key=1f3f83a36dda4d97a9e97270a8975ecf&ordering=-metacritic&page=1')
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
            <Container align="center" sx={{
                py: 10,
            }}>
                <Typography
                    component="h3"
                    variant="h3"
                    align="left"
                    color="text.primary"
                    gutterBottom
                    sx={{
                        mt: 5
                    }}
                >
                    Featured Games
                </Typography>
                <Grid container align="center" spacing={2}>
                    {games.map(game => (
                        <Card key={game.id} sx={{ width: '250px', maxHeight: 'auto', my: 2, mx: 2 }}>
                            <CardMedia
                                component="img"
                                image={game.background_image}
                                style={{ maxHeight: '130px' }}
                                alt={game.name} />
                            <CardContent>
                                <Typography gutterBottom component="div" align="left" sx={{fontSize: '18px', mb: 0}}>
                                    {game.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" align="left">                
                                    {renderDevelopers(game.id)}<br></br>
                                    {renderGenres(game.genres)} &nbsp;-&nbsp; {renderPlatforms(game.parent_platforms)}<br></br>
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Link href="/featured" align="right"><AddIcon /></Link>
                            </CardActions>
                        </Card>
                    ))}
                </Grid>
            </Container>








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
        </>
    );
}

export default Featured;