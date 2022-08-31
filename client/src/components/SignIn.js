import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';

function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const auth = useContext(AuthContext);

  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:8080/authenticate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    if (response.status === 200) {
      const { jwt_token } = await response.json();
      auth.login(jwt_token);
      history.push("/backlog");
    } else if (response.status === 403) {
      setErrors(["Login failed."]);
    } else {
      setErrors(["Unknown error."]);
    }
  };

  return (
      <Grid container component="main" sx={{ height: '100vh' }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${"/images/header_portrait.jpg"})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: '0.8',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={1} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign In
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                onChange={(event) => setUsername(event.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(event) => setPassword(event.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Link href="/sign-up" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link> <br></br><br></br>
              {errors.length > 0 ? <Alert severity="error">{errors}</Alert> : ""}
            </Box>
          </Box>
        </Grid>
      </Grid>
  );
}

export default SignIn;