import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Catalog from './components/catalog';
import ItemForm from './components/ItemForm';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={Catalog} />
          <Route path="/add" component={ItemForm} />
          <Route path="/edit/:id" component={ItemForm} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;