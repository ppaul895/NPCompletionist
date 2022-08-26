import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import NotFound from './components/NotFound';

function App() {
  return (
    <Router>
      <Navbar />
      <h1 className="my-4">Field Agent</h1>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;