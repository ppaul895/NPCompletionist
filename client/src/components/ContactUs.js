import React, { useState } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ContactMail } from '@mui/icons-material';
import Alert from '@mui/material/Alert';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function ContactUs() {
  const [displayAlert, setDisplayAlert] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    var form = document.getElementById("contactForm");
    form.reset();
    setDisplayAlert(true);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <ContactMail />
          </Avatar>
          <Typography component="h1" variant="h5">
            Contact Us
          </Typography>
          <Box component="form" id="contactForm" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoComplete="off"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="off"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  type="email"
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="off"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="outlined-multiline-static"
                  label="Comments"
                  multiline
                  rows={4}
                  defaultValue=""
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Contact Us
            </Button>
            {displayAlert && <Alert variant="outlined" severity="success">
              Your message has been sent!
            </Alert>} <br></br>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}