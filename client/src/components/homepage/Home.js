import * as React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import LandingHeader from './LandingHeader';
import Info from './Info';
import Team from './Team';

function Home() {

  return (
    <Router>
      <LandingHeader />
      <Info />
      <Team />
      </Router>
  );
}


export default Home;