import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CardContent from '@mui/material/CardContent';
import DeleteIcon from '@mui/icons-material/Clear';
import CardActions from '@mui/material/CardActions';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import { useEffect, useState, useContext } from "react";
import AuthContext from "../context/AuthContext";

export default function Backlog() {
  const [games, setGames] = useState([]);
  const auth = useContext(AuthContext);

  useEffect(() => {
    if (!auth.user) {
      document.location.href = '/sign-in';
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    var userId;
    await fetch(`http://localhost:8080/api/user/${auth.user.username}`)
      .then(res => res.json())
      .then(data => userId = data.appUserId);

    const init = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${auth.user.token}`
      }
    };
    var backlog = [];
    await fetch(`http://localhost:8080/api/backlog/user-backlog/${userId}`, init)
      .then(res => res.json())
      .then(data => backlog = data);

    var gamesArr = [];
    for (var i = 0; i < backlog.length; i++) {
      await fetch(`http://localhost:8080/api/game/${backlog[i].gameId}`)
        .then(res => res.json())
        .then(data => gamesArr.push(data));
    }

    var backgroundImages = [];
    for (i = 0; i < gamesArr.length; i++) {
      await fetch(`http://localhost:8080/api/media/${gamesArr[i].mediaId}`)
        .then(res => res.json())
        .then(data => backgroundImages.push(data.image_url))
    }

    for (i = 0; i < gamesArr.length; i++) {
      gamesArr[i] = {
        ...gamesArr[i], background_image: backgroundImages[i],
        isCompleted: backlog[i].completed, backlogId: backlog[i].backlogId,
        userId: userId, datetimeAdded: backlog[i].datetimeAdded
      };
    }

    setGames(gamesArr);
  }

  const updateBacklogItem = (backlogId, userId, gameId, datetimeAdded, completed) => {
    const updatedBacklogItem = {
      backlogId: backlogId,
      userId: userId,
      gameId: gameId,
      datetimeAdded: datetimeAdded,
      completed: completed
    }
    const init = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.user.token}`
      },
      body: JSON.stringify(updatedBacklogItem)
    };
    fetch(`http://localhost:8080/api/backlog/${backlogId}`, init)
      .then(response => {
        if (response.status === 204) {
          return null;
        } else if (response.status === 400) {
          return response.json();
        } else {
          return Promise.reject(`Unexpected status code: ${response.status}`);
        }
      })
      .then(data => {
        if (!data) {
          fetchData();
        } else {
          console.log("There was an error updating your backlog.")
        }
      })
      .catch(console.log);
  };

  const deleteBacklogItem = (backlogId) => {
    const backlogItem = games.find(game => game.backlogId === backlogId);
    if (window.confirm(`Delete ${backlogItem.title} from your backlog?`)) {
      const init = {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${auth.user.token}`
        }
      };
      fetch(`http://localhost:8080/api/backlog/${backlogId}`, init)
        .then(response => {
          if (response.status === 204) {
            return null;
          } else if (response.status === 404) {
            return response.json();
          } else {
            return Promise.reject(`Unexpected status code: ${response.status}`);
          }
        })
        .then(data => {
          if (!data) {
            fetchData();
          } else {
            console.log("There was an error deleting from your backlog.")
          }
        })
        .catch(console.log);
    }
  };

  function renderDate(releaseDate) {
    const fields = releaseDate.split('-');
    const date = new Date(fields[0], fields[1] - 1, fields[2]);
    return date.toLocaleDateString();
  }

  function renderPlatforms(platforms) {
    const platformImageSrcs = [];
    for (var i = 0; i < platforms.length; i++) {
      var slug;
      switch (platforms[i].platformId) {
        case 1: slug = "pc"; break;
        case 2: slug = "playstation"; break;
        case 3: slug = "xbox"; break;
        case 4: slug = "ios"; break;
        case 5: slug = "android"; break;
        case 6: slug = "mac"; break;
        case 7: slug = "linux"; break;
        case 8: slug = "nintendo"; break;
        case 9: slug = "atari"; break;
        case 10: slug = "commodore-amiga"; break;
        case 11: slug = "sega"; break;
        case 12: slug = "3do"; break;
        case 13: slug = "neo-geo"; break;
        case 14: slug = "web"; break;
        default: slug = "";
      }
      platformImageSrcs.push('/images/platform_icons/' + slug + '.svg');
    }
    const platformNames = platforms.map(p => p.name);
    const platformInfo = [platformImageSrcs, platformNames];
    return platformInfo;
  }

  const IOSSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor: theme.palette.mode === 'dark' ? '#edad00' : '#edad00',
          opacity: 1,
          border: 0,
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5,
        },
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#33cf4d',
        border: '6px solid #fff',
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color:
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
      },
    },
    '& .MuiSwitch-thumb': {
      color: '#fff',
      boxSizing: 'border-box',
      width: 22,
      height: 22,
    },
    '& .MuiSwitch-track': {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500,
      }),
    },
  }));

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
          Your Backlog
        </Typography>
        <Grid container align="center" spacing={2}>
          {games.map(game => (
            <Card key={game.backlogId} sx={{ width: '250px', height: 'auto', my: 2, mx: 2 }}>
              {!game.isCompleted ? <CardMedia
                component="img"
                image={game.background_image}
                style={{ height: '130px' }}
                alt={game.title} /> :
                <CardMedia
                  component="img"
                  image={game.background_image}
                  style={{ height: '130px', filter: "grayscale(100%)", opacity: '0.8' }}
                  alt={game.title} />}
              <CardContent align="left">
                <Box sx={{ mb: .7 }}>
                  <Typography display="inline" sx={{ fontSize: '18px' }}>
                    {game.title}
                  </Typography>
                </Box>
                {game.platforms && renderPlatforms(game.platforms)[0].map(platformSrc =>
                  <Box key={platformSrc} display="inline" sx={{ mr: 1 }}>
                    <img src={platformSrc} height="18px" title={renderPlatforms(game.platforms)[1]
                    [renderPlatforms(game.platforms)[0].indexOf(platformSrc)]} alt="Platform"></img>
                  </Box>
                )}
                <Typography variant="body2" color="text.secondary" align="left">
                  <br></br><span style={{ opacity: .6 }}>Developer:</span> {game.developer} <br></br>
                  <span style={{ opacity: .6 }}>Release Date:</span> {game.releaseDate !== "" ? renderDate(game.releaseDate) : "N/A"} <br></br>
                  <span style={{ opacity: .6 }}>Genre:</span> {game.genre !== "" ? game.genre : "N/A"}
                </Typography>
              </CardContent>
              <CardActions sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', p: 2 }}>
                {!game.score && <Typography display="inline" sx={{
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
                {game.score && game.score >= 80 && <Typography display="inline" sx={{
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
                  {game.score}
                </Typography>}
                {game.score && game.score >= 60 && game.score < 80 && <Typography display="inline" sx={{
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
                  {game.score}
                </Typography>}
                {game.score && game.score < 60 && <Typography display="inline" sx={{
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
                  {game.score}
                </Typography>}
                {<IOSSwitch sx={{ m: .3 }} defaultChecked={game.isCompleted}
                  onChange={() => updateBacklogItem(game.backlogId, game.userId, game.gameId, game.datetimeAdded, !game.isCompleted)} />}
                <Fab size="small" color="error" aria-label="delete" onClick={() => deleteBacklogItem(game.backlogId)}>
                  <DeleteIcon />
                </Fab>
              </CardActions>
            </Card>
          ))}
        </Grid>
      </Container>
    </>
  );
}