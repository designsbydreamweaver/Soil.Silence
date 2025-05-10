import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './HomePage';
import JourneyStartPage from './JourneyStartPage';
import AudioManager from './components/AudioManager';

const App = () => {
  return (
    <AudioManager>
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/start" component={JourneyStartPage} />
        </Switch>
      </Router>
    </AudioManager>
  );
};

export default App;
