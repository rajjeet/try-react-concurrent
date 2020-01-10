import React, {Suspense} from 'react';
import { BrowserRouter, NavLink, Route, Switch } from 'react-router-dom';
import { Home } from './home';
import { About } from './about';
import { Contact } from './contact';


export let App = () => {
  return (
    <BrowserRouter>
      <>
        <NavLink to={'/'}>Home</NavLink>
        {' | '}
        <NavLink to={'/about'}>About</NavLink>
        {' | '}
        <NavLink to={'/contact'}>Contact</NavLink>

      </>
      <Switch>
        <Route exact path={'/'} render={() => <Suspense><Home text={"Home"} /></Suspense>} />
        <Route exact path={'/about'} render={() => <Suspense><About text={"About"} /></Suspense>} />
        <Route exact path={'/contact'} render={() => <Suspense><Contact text={"Contact"} /></Suspense>} />
      </Switch>
    </BrowserRouter>
  );
};
