import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

function NotFound() {
  return (
    <Container align="center" sx={{ mt: 5, mb: 15 }}>
      <Box sx={{ mb: 3 }}>
        <img src="/images/404.gif" alt="NPCompletionist" sx={{ my: 10 }}></img>
      </Box>
      <Button variant="contained" size="large" href="/" sx={{
        backgroundColor: '#ffffff',
        width: '250px',
        height: '60px',
        fontSize: '20px',
      }}>
        Continue?
      </Button>
    </Container>
  );
}

export default NotFound;