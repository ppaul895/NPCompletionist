import { useEffect, useState, useContext, forwardRef } from 'react';
import AuthContext from "../context/AuthContext";
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
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function Featured() {
    const [games, setGames] = useState([]);
    const [successOpen, setSuccessOpen] = useState(false);
    const [errorOpen, setErrorOpen] = useState(false);
    const [notLoggedInOpen, setNotLoggedInOpen] = useState(false);
    const auth = useContext(AuthContext);

    useEffect(() => {
        fetch('https://api.rawg.io/api/games?key=349a281c3d9c4c97838c1666b0c84955&page_size=40')
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

    const addBacklogItem = async (background_image, name, released, rawgGameId, metacritic, genres, parent_platforms) => {
        const image_url = background_image ? background_image : "image_not_found#" + crypto.randomUUID();
        const title = name;
        const releaseDate = released ? released : "1000-01-01";
        const score = metacritic ? metacritic : -1;
        const developer = document.getElementById(rawgGameId).innerHTML;
        const platforms = parent_platforms ? renderPlatforms(parent_platforms)[1] : [];
        const genre = genres.length > 0 ? renderGenre(genres) : "N/A";

        if (!auth.user) {
            setNotLoggedInOpen(true);
            return;
        }
        // fetch userId
        var userId;
        await fetch(`http://localhost:8080/api/user/${auth.user.username}`)
            .then(res => res.json())
            .then(data => userId = data.appUserId);

        // check if game already exists
        var gamesTableGames = [];
        await fetch(`http://localhost:8080/api/game/`)
            .then(res => res.json())
            .then(data => gamesTableGames = data);
        var gameId;
        var postGameInfo = true;
        for (var idx = 0; idx < gamesTableGames.length; idx++) {
            if (gamesTableGames[idx].title === title && gamesTableGames[idx].releaseDate === releaseDate) {
                gameId = gamesTableGames[idx].gameId;
                postGameInfo = false;
                break;
            }
        }
        if (postGameInfo) {
            // post to media
            var mediaId;
            const mediaToAdd = {
                image_url: image_url,
                trailer_url: ""
            };
            const mediaInit = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(mediaToAdd)
            };
            await fetch(`http://localhost:8080/api/media`, mediaInit)
                .then(response => {
                    if (response.status === 201) {
                        return response.json();
                    } else {
                        return Promise.reject(`Unexpected status code: ${response.status}`);
                    }
                })
                .then(data => {
                    if (data) {
                        mediaId = data.mediaId;
                    } else {
                        console.log("There was an error adding to media: " + data);
                    }
                })
                .catch(console.log);

            // post to game
            const gameToAdd = {
                title: title,
                releaseDate: releaseDate,
                developer: developer,
                score: score,
                mediaId: mediaId,
                genre: genre
            };
            const gameInit = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(gameToAdd)
            };
            await fetch(`http://localhost:8080/api/game`, gameInit)
                .then(response => {
                    if (response.status === 201) {
                        return response.json();
                    } else {
                        return Promise.reject(`Unexpected status code: ${response.status}`);
                    }
                })
                .then(data => {
                    if (data) {
                        gameId = data.gameId;
                    } else {
                        console.log("There was an error adding to game: " + data);
                    }
                })
                .catch(console.log);

            // post to game_platform for each platform
            for (var i = 0; i < platforms.length; i++) {
                var platformId;
                switch (platforms[i]) {
                    case "PC": platformId = 1; break;
                    case "PlayStation": platformId = 2; break;
                    case "Xbox": platformId = 3; break;
                    case "iOS": platformId = 4; break;
                    case "Android": platformId = 5; break;
                    case "Apple Macintosh": platformId = 6; break;
                    case "Linux": platformId = 7; break;
                    case "Nintendo": platformId = 8; break;
                    case "Atari": platformId = 9; break;
                    case "Commodore / Amiga": platformId = 10; break;
                    case "SEGA": platformId = 11; break;
                    case "3DO": platformId = 12; break;
                    case "Neo Geo": platformId = 13; break;
                    case "Web": platformId = 14; break;
                    default: platformId = 1;
                }
                const gamePlatformToAdd = {
                    gameId: gameId,
                    platformId: platformId
                };
                const gamePlatformInit = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(gamePlatformToAdd)
                };
                await fetch(`http://localhost:8080/api/gameplatform`, gamePlatformInit)
                    .then(response => {
                        if (response.status === 201) {
                            return response.json();
                        } else {
                            return Promise.reject(`Unexpected status code: ${response.status}`);
                        }
                    })
                    .then(data => {
                        if (!data) {
                            console.log("There was an error adding to game_platform: " + data);
                        }
                    })
                    .catch(console.log);
            }
        }

        // post to backlog
        const backlogItemToAdd = {
            userId: userId,
            gameId: gameId,
            datetimeAdded: new Date().toISOString(),
            completed: false
        };
        const backlogInit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${auth.user.token}`
            },
            body: JSON.stringify(backlogItemToAdd)
        };
        await fetch(`http://localhost:8080/api/backlog`, backlogInit)
            .then(response => {
                if (response.status === 201 || response.status === 400) {
                    return response.json();
                } else {
                    return Promise.reject(`Unexpected status code: ${response.status}`);
                }
            })
            .then(data => {
                console.log(data);
                if (data.backlogId) {
                    setSuccessOpen(true);
                } else {
                    setErrorOpen(true);
                }
            })
            .catch(console.log);
    };

    const Alert = forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSuccessOpen(false);
        setErrorOpen(false);
        setNotLoggedInOpen(false);
    };

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
        const date = new Date(fields[0], fields[1] - 1, fields[2]);
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
                                style={{ height: '130px' }}
                                alt={game.name} />
                            <CardContent align="left">
                                <Box sx={{ mb: .7 }}>
                                    <Typography display="inline" sx={{ fontSize: '18px' }}>
                                        {game.name}
                                    </Typography>
                                </Box>
                                {game.parent_platforms && renderPlatforms(game.parent_platforms)[0].map(platformSrc =>
                                    <Box key={platformSrc} display="inline" sx={{ mr: 1 }}>
                                        <img src={platformSrc} height="18px" title={renderPlatforms(game.parent_platforms)[1]
                                        [renderPlatforms(game.parent_platforms)[0].indexOf(platformSrc)]} alt="Platform"></img>
                                    </Box>
                                )}
                                <Typography variant="body2" color="text.secondary" align="left">
                                    <br></br><span style={{ opacity: .6 }}>Developer:</span> <span id={game.id}>{<Developer gameId={game.id} />}</span> <br></br>
                                    <span style={{ opacity: .6 }}>Release Date:</span> {game.released !== null ? renderDate(game.released) : "N/A"} <br></br>
                                    <span style={{ opacity: .6 }}>Genre:</span> {game.genres.length > 0 ? renderGenre(game.genres) : "N/A"}
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', p: 2 }}>
                                {!game.metacritic && <Typography display="inline" sx={{
                                    color: '#9e9e9e',
                                    fontSize: "14px",
                                    fontWeight: 500,
                                    border: "2px solid #9e9e9e80",
                                    width: "32px",
                                    height: "32px",
                                    px: 0.75,
                                    py: 0.5,
                                    borderRadius: '5px'
                                }}>
                                    ?
                                </Typography>}
                                {game.metacritic && game.metacritic >= 80 && <Typography display="inline" sx={{
                                    color: '#6DC849',
                                    fontSize: "14px",
                                    fontWeight: 500,
                                    border: "2px solid #6DC84980",
                                    width: "32px",
                                    height: "32px",
                                    px: 0.75,
                                    py: 0.5,
                                    borderRadius: '5px'
                                }}>
                                    {game.metacritic}
                                </Typography>}
                                {game.metacritic && game.metacritic >= 60 && game.metacritic < 80 && <Typography display="inline" sx={{
                                    color: '#FDCA52',
                                    fontSize: "14px",
                                    fontWeight: 500,
                                    border: "2px solid #FDCA5280",
                                    width: "32px",
                                    height: "32px",
                                    px: 0.75,
                                    py: 0.5,
                                    borderRadius: '5px'
                                }}>
                                    {game.metacritic}
                                </Typography>}
                                {game.metacritic && game.metacritic < 60 && <Typography display="inline" sx={{
                                    color: '#FC4B37',
                                    fontSize: "14px",
                                    fontWeight: 500,
                                    border: "2px solid #FC4B3780",
                                    width: "32px",
                                    height: "32px",
                                    px: 0.75,
                                    py: 0.5,
                                    borderRadius: '5px'
                                }}>
                                    {game.metacritic}
                                </Typography>}
                                <Fab size="small" color="primary" aria-label="add" onClick={() =>
                                    addBacklogItem(game.background_image, game.name, game.released, game.id,
                                        game.metacritic, game.genres, game.parent_platforms)}>
                                    <AddIcon />
                                </Fab>
                            </CardActions>
                        </Card>
                    ))}
                </Grid>
            </Container>
            <Snackbar open={successOpen} autoHideDuration={5000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Success! Game has been added to your backlog.
                </Alert>
            </Snackbar>
            <Snackbar open={errorOpen} autoHideDuration={5000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    Error! Game has already been added to your backlog.
                </Alert>
            </Snackbar>
            <Snackbar open={notLoggedInOpen} autoHideDuration={5000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    Error! You must be signed in to add to your backlog.
                </Alert>
            </Snackbar>
        </>
    );
}

export default Featured;