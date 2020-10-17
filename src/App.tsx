import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import PokemonCard from './pages/PokemonCard/PokemonCard';

function App() {
  return (
    <Router>
      <Container>
        <Switch>
          <Route exact path='/' component={Home} />
        </Switch>
        <Switch>
          <Route exact path='/pokemon/:id' component={PokemonCard} />
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
