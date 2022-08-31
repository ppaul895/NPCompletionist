import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CardContent from '@mui/material/CardContent';
import AddIcon from '@mui/icons-material/Add';
import CardActions from '@mui/material/CardActions';
import Developer from './Developer';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';

function Featured() {
    const [games, setGames] = useState([]);

    useEffect(() => {
        fetch('https://api.rawg.io/api/games?key=349a281c3d9c4c97838c1666b0c84955&ordering=-metacritic&page_size=21')
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    return Promise.reject(`Unexpected status code: ${response.status}`);
                }
            })
            .then(data => {
                let arr = data.results;
                arr.splice(1, 1);
                setGames(arr);
            })
            .catch(console.log);
    }, []);

    function renderPlatforms(platforms) {
        const platformImageSrcs = platforms.map(p => '/images/platform_icons/' + p.platform.slug + '.svg');
        const platformNames = platforms.map(p => p.platform.name);
        const platformInfo = [platformImageSrcs, platformNames];
        return platformInfo;
    }

    function renderGenre(genres) {
        if (genres.length > 1 && genres[0].name === 'Action') {
            return genres[1].name;
        } else {
            return genres[0].name;
        }
    }

    function renderDate(releaseDate) {
        const fields = releaseDate.split('-');
        const date = new Date(fields[0], fields[1], fields[2]);
        return date.toLocaleDateString();
    }

    return (
        <>
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
                    Featured Games
                </Typography>
                <Grid container align="center" spacing={2}>
                    {games.map(game => (
                        <Card key={game.id} sx={{ width: '250px', height: 'auto', my: 2, mx: 2 }}>
                            <CardMedia
                                component="img"
                                image={game.background_image}
                                style={{ maxHeight: '130px' }}
                                alt={game.name} />
                            <CardContent align="left">
                                <Box sx={{ mb: .7 }}>
                                    <Typography display="inline" sx={{ fontSize: '18px' }}>
                                        {game.name}
                                    </Typography>
                                </Box>
                                {renderPlatforms(game.parent_platforms)[0].map(platformSrc =>
                                    <Box key={platformSrc} display="inline" sx={{ mr: 1 }}>
                                        <img src={platformSrc} height="18px" title={renderPlatforms(game.parent_platforms)[1]
                                        [renderPlatforms(game.parent_platforms)[0].indexOf(platformSrc)]} alt="Platform"></img>
                                    </Box>
                                )}
                                <Typography variant="body2" color="text.secondary" align="left">
                                    <br></br><span style={{opacity: .6}}>Developer:</span> {<Developer gameId={game.id} />} <br></br>
                                    <span style={{opacity: .6}}>Release Date:</span> {renderDate(game.released)} <br></br>
                                    <span style={{opacity: .6}}>Genre:</span> {renderGenre(game.genres)}
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', p: 2 }}>
                                <Typography display="inline" sx={{
                                    color: '#66B263',
                                    fontSize: "14px",
                                    fontWeight: 500,
                                    border: "2px solid #66B26380",
                                    width: "32px",
                                    height: "32px",
                                    px: 0.75,
                                    py: 0.5,
                                    borderRadius: '5px'
                                }}>
                                    {game.metacritic}
                                </Typography>
                                <Fab size="small" color="primary" aria-label="add" href="/featured">
                                    <AddIcon />
                                </Fab>
                            </CardActions>
                        </Card>
                    ))}
                </Grid>
            </Container>
        </>
    );
}

export default Featured;