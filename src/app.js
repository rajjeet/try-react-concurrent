import React from 'react';
import { BrowserRouter, NavLink, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { Home } from './section/1-home';
import { ProfilePage } from './section/2-profile-page';
import { FetchOnRender } from './section/3-fetch-on-render';
import { FetchOnRenderSiblings } from './section/3a-fetch-on-render-siblings';
import { FetchThenRender } from './section/4-fetch-then-render';
import { FetchThenRenderAll } from './section/4a-fetch-then-render-all';
import { FetchEarly } from './section/5-fetch-early';
import { FetchWithProps } from './section/5a-fetch-with-props';
import { RaceWithUseEffectHooks } from './section/6-race-with-use-effect';
import { RaceWithComponentDidUpdate } from './section/6a-race-with-component-did-update';
import { RaceWithSuspense } from './section/6b-race-with-suspense';
import { Transitions } from './section/7-transitions';


const VerticalNav = styled.div`
  display: flex;
  flex-direction: column;
  background-color: beige;
  padding: 1em;  
  width: 300px;
  font-size: 1.5em;
`;
const Layout = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;  
`;
const Main = styled.div`
  padding: 1em;
  width: 100%;
`;

export let App = () => {
  return (

    <BrowserRouter>
      <Layout>

        <VerticalNav>
          <NavLink to={'/'}>Home</NavLink>
          <NavLink to={'/profile-page'}>Profile Page</NavLink>
          <NavLink to={'/fetch-on-render'}>Fetch On Render (Parent-Child)</NavLink>
          <NavLink to={'/fetch-on-render-sibling'}>Fetch On Render (Siblings)</NavLink>
          <NavLink to={'/fetch-then-render'}>Fetch Then Render</NavLink>
          <NavLink to={'/fetch-then-render-all'}>Fetch Then Render (All)</NavLink>
          <NavLink to={'/fetch-early'}>Fetch Early</NavLink>
          <NavLink to={'/fetch-with-props'}>Fetch w/ Props</NavLink>
          <NavLink to={'/race-with-use-effect-hooks'}>Race with useEffect</NavLink>
          <NavLink to={'/race-with-component-did-update'}>Race with Component Did Update</NavLink>
          <NavLink to={'/race-with-suspense'}>Race with Suspense</NavLink>
          <NavLink to={'/transitions'}>Transitions</NavLink>
        </VerticalNav>

        <Switch>
          <Main>
            <Route exact path={'/'} component={Home} />
            <Route exact path={'/profile-page'} component={ProfilePage} />
            <Route exact path={'/fetch-on-render'} component={FetchOnRender} />
            <Route exact path={'/fetch-on-render-sibling'} component={FetchOnRenderSiblings} />
            <Route exact path={'/fetch-then-render'} component={FetchThenRender} />
            <Route exact path={'/fetch-then-render-all'} component={FetchThenRenderAll} />
            <Route exact path={'/fetch-early'} component={FetchEarly} />
            <Route exact path={'/fetch-with-props'} component={FetchWithProps} />
            <Route exact path={'/race-with-use-effect-hooks'} component={RaceWithUseEffectHooks} />
            <Route exact path={'/race-with-component-did-update'} component={RaceWithComponentDidUpdate} />
            <Route exact path={'/race-with-suspense'} component={RaceWithSuspense} />
            <Route exact path={'/transitions'} component={Transitions} />
          </Main>
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};
