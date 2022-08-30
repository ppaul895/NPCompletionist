import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import AddIcon from '@mui/icons-material/Add';
import Link from '@mui/material/Link';
import Developer from './Developer';
import Button from '@mui/material/Button';

function Featured() {
    const [games, setGames] = useState([]);

    useEffect(() => {
        fetch('https://api.rawg.io/api/games?key=1f3f83a36dda4d97a9e97270a8975ecf&ordering=-metacritic&page_size=21')
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    return Promise.reject(`Unexpected status code: ${response.status}`);
                }
            })
            .then(data => {
                let arr = data.results;
                const removedEl = arr.splice(1, 1);
                setGames(arr);
                console.log(games);
                console.log(removedEl);
            })
            .catch(console.log);
    }, []);

    function renderPlatforms(platforms) {
        return platforms.map(p => `${p.platform.name}`).join(', ');
    }

    function renderGenre(genres) {
        if (genres.length > 1 && genres[0] === 'Action') {
            return genres[1].name;
        } else {
            return genres[0].name;
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
                            <Typography align="left" sx={{ fontSize: '18px' }}>
                                    {game.name} <Typography display="inline" align="right" sx={{
                                        color:'#66B263', 
                                        fontSize: "12px", 
                                        fontWeight: 500, 
                                        border: "1px solid #66B26380", 
                                        px: 1, 
                                        py:0.5,
                                        width: '34px',
                                        borderRadius: '5px',
                                        ml: 1,
                                        }}
                                        >
                                    {game.metacritic}
                                    </Typography>
                                </Typography>
                                <Typography variant="body2" color="text.secondary" align="left">                
                                    {<Developer gameId={game.id} />} <br></br>
                                    {renderGenre(game.genres)} &nbsp;-&nbsp; {renderPlatforms(game.parent_platforms)}<br></br>
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
                        <th>Developer</th>
                        <th>Score</th>
                        <th>Image URL</th>
                        <th>Genre</th>
                        <th>Platforms</th>
                    </tr>
                </thead>
                <tbody>
                    {games.map(game => (
                        <tr key={game.id}>
                            <td>{game.name}</td>
                            <td>{game.released}</td>
                            <td><Developer gameId={game.id} /></td>
                            <td>{game.metacritic}</td>
                            <td>{game.background_image}</td>
                            <td>{renderGenre(game.genres)}</td>
                            <td>{renderPlatforms(game.parent_platforms)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default Featured;