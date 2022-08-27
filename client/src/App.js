import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import NotFound from './components/NotFound';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/sign-in" exact>
          <SignIn />
        </Route>
        <Route path="/sign-up" exact>
          <SignUp />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
    </ThemeProvider>
  );
}

export default App;