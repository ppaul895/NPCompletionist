import React, { useState } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ContactMail } from '@mui/icons-material';
import Alert from '@mui/material/Alert';
import Paper from '@mui/material/Paper';

export default function ContactUs() {
  const [displayAlert, setDisplayAlert] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    var form = document.getElementById("contactForm");
    form.reset();
    setDisplayAlert(true);
  };

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${"/images/keeb.jpg"})`,
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
          <Box
            sx={{
              my: 10,
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
            <Typography sx={{ color: "#dddddd", mt: 2 }}>
              If you have any questions, want to report a bug, or just want to chat, fill out the contact form and we'll get back to you within 2 business days. Or feel free to email us directly at info@npcompletionist.com
            </Typography>
            <Box component="form" id="contactForm" onSubmit={handleSubmit} sx={{ mt: 2 }}>
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
        </Box>
      </Grid>
    </Grid>
  );
}