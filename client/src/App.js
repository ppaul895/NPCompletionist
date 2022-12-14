import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuthContext from "./context/AuthContext";
import jwtDecode from "jwt-decode";
import Home from './components/homepage/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import NotFound from './components/NotFound';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import ContactUs from './components/ContactUs';
import Backlog from './components/Backlog';
import Featured from './components/Featured';
import Search from './components/Search';
import Box from '@mui/material/Box';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#42A5F5',
    }
  },
});

const LOCAL_STORAGE_TOKEN_KEY = "npcToken";

function App() {
  const [user, setUser] = useState(null);
  const [restoreLoginAttemptCompleted, setRestoreLoginAttemptCompleted] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
    if (token) {
      login(token);
    }
    setRestoreLoginAttemptCompleted(true);
  }, []);

  const login = (token) => {
    localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);
    const { sub: username, authorities: authoritiesString } = jwtDecode(token);
    const roles = authoritiesString.split(',');
    const user = {
      username,
      roles,
      token,
      hasRole(role) {
        return this.roles.includes(role);
      }
    };
    setUser(user);
    return user;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
  };

  const auth = {
    user: user ? { ...user } : null,
    login,
    logout
  };

  if (!restoreLoginAttemptCompleted) {
    return null;
  }

  return (
    <AuthContext.Provider value={auth}>
      <ThemeProvider theme={darkTheme}>
      <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
        <CssBaseline />
        <Router>
          <Navbar />
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/featured" exact>
              <Featured />
            </Route>
            <Route path="/backlog">
              <Backlog />
            </Route>
            <Route path="/contact-us">
              <ContactUs />
            </Route>
            <Route path="/sign-in" exact>
              <SignIn />
            </Route>
            <Route path="/sign-up" exact>
              <SignUp />
            </Route>
            <Route path="/search/:searchQuery" exact component={Search}/>
            <Route>
              <NotFound />
            </Route>
          </Switch>
          <Footer />
        </Router>
        </Box>
      </ThemeProvider>
    </AuthContext.Provider>
  );
}

export default App;