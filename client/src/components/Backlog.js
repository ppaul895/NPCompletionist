import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useEffect, useState, useContext } from "react";
import { useHistory, useParams } from 'react-router-dom';
import AuthContext from "../context/AuthContext";

const GAME_DEFAULT = {
  "title": "",
  "release_date": "",
  "developer": "",
  "score": 0,
  "genre": "",
  "platform": ""
};

export default function Backlog() {
  const [userId, setUserId] = useState(0);
  const [backlog, setBacklog] = useState([]);
  const [games, setGames] = useState([]);
  const [game, setGame] = useState(GAME_DEFAULT);
  const [errors, setErrors] = useState([]);
  const history = useHistory();
  const { id } = useParams();
  const auth = useContext(AuthContext);

  useEffect(() => {
    console.log("useEffect called");
    if (!auth.user) {
      document.location.href = '/sign-in';
    }

    const getUserId = async (username) => {
      const apiURL = `http://localhost:8080/api/user/${username}`;
      fetch(apiURL)
        .then(response => {
          if (response.status === 200) {
            return response.json();
          } else {
            return Promise.reject(`Unexpected status code: ${response.status}`);
          }
        })
        .then(data => {
          setUserId(data.appUserId);
        })
        .catch(console.log);
    };

    getUserId(auth.user.username);

    const init = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${auth.user.token}`
      }
    };

    fetch(`http://localhost:8080/api/backlog/user-backlog/${userId}`, init)
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          return Promise.reject(`Unexpected status code: ${response.status}`);
        }
      })
      .then(data => {
        setBacklog(data);
      })
      .catch(console.log);
  }, [userId]);

  // const handleDeleteGame = (gameId) => {
  //   const game = games.find(games => games.id === gameId);

  //   if (window.confirm(`Delete ${game.title} from your backlog?`)) {
  //     const init = {
  //       method: 'DELETE'
  //     };
  //     fetch(`http://localhost:8080/api/game/${id}`, init)
  //       .then(response => {
  //         if (response.status === 204) {
  //           const newGames = games.filter(games => games.id === gameId);
  //           setGames(newGames);
  //         } else {
  //           return Promise.reject(`Unexpected Status Code: ${response.status}`);
  //         }
  //       })
  //       .catch(console.log);
  //   }
  // };

  // const handleEditGame = () => {
  //   game.gameId = id;

  //   const init = {
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(game)
  //   };

  //   fetch(`http://localhost:8080/api/game/${id}`, init)
  //     .then(response => {
  //       if (response.status === 204) {
  //         return null;
  //       } else if (response.status === 400) {
  //         return response.json();
  //       } else {
  //         return Promise.reject(`Unexpected Status Code: ${response.status}`);
  //       }
  //     })
  //     .then(data => {
  //       if (!data) {
  //         history.push(`/game`);
  //         // this is probably wrong url and needs to be isCompleted == true and using backlog;
  //       } else {
  //         setErrors(data);
  //       }
  //     })
  //     .catch(console.log);
  // };

  return (
    <>
      {backlog.map(b => (
        <div key={b.backlogId}>
          <p>backlogId: {b.backlogId}</p>
          <p>userId: {b.userId}</p>
          <p>gameid: {b.gameId}</p>
          <p>datetimeAddedid: {b.datetimeAdded}</p>
          <p>isCompleted: {b.completed ? "yes" : "no"}</p>
        </div>
      ))}
    </>
  );
}