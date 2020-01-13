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
import { WrapLazyInSuspense } from './section/8-wrap-lazy-in-suspense';
import { SuspenseTrain } from './section/9-suspense-train';
import { DelayPendingIndicator } from './section/10-delay-pending-indicator';
import { HighLowPriorityState } from './section/11-prioritized-state';
import { DeferringState } from './section/12-deferred-state';
import { SuspenseListPage } from './section/13-suspense-list';


const VerticalNav = styled.div`
  display: flex;
  flex-direction: column;
  background-color: beige;
  padding: 1em;  
  width: 400px;
  font-size: 1.2em;
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
      <h1>React Concurrent Mode</h1>
      <Layout>
        <VerticalNav>
          <NavLink to={'/'}>Home</NavLink>
          <NavLink to={'/profile-page'}>Profile Page</NavLink>
          <br/>
          <NavLink to={'/fetch-on-render'}>Fetch On Render (Parent-Child)</NavLink>
          <NavLink to={'/fetch-on-render-sibling'}>Fetch On Render (Siblings)</NavLink>
          <NavLink to={'/fetch-then-render'}>Fetch Then Render</NavLink>
          <NavLink to={'/fetch-then-render-all'}>Fetch Then Render (All)</NavLink>
          <br />
          <NavLink to={'/fetch-early'}>Fetch Early</NavLink>
          <NavLink to={'/fetch-with-props'}>Fetch w/ Props</NavLink>
          <br />
          <NavLink to={'/race-with-use-effect-hooks'}>Race w/ useEffect</NavLink>
          <NavLink to={'/race-with-component-did-update'}>Race w/ ComponentDidUpdate</NavLink>
          <NavLink to={'/race-with-suspense'}>Race w/ Suspense</NavLink>
          <br />
          <NavLink to={'/transitions'}>Transitions</NavLink>
          <NavLink to={'/wrap-lazy-in-suspense'}>Wrap Lazy in Suspense</NavLink>
          <NavLink to={'/suspense-train'}>Suspense Train</NavLink>
          <NavLink to={'/delay-pending-indicator'}>Delay Pending Indicator</NavLink>
          <NavLink to={'/prioritized-state'}>Prioritized State</NavLink>
          <NavLink to={'/deferred-state'}>Deferred State</NavLink>
          <NavLink to={'/suspense-list'}>Suspense List</NavLink>
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
            <Route exact path={'/wrap-lazy-in-suspense'} component={WrapLazyInSuspense} />
            <Route exact path={'/suspense-train'} component={SuspenseTrain} />
            <Route exact path={'/delay-pending-indicator'} component={DelayPendingIndicator} />
            <Route exact path={'/prioritized-state'} component={HighLowPriorityState} />
            <Route exact path={'/deferred-state'} component={DeferringState} />
            <Route exact path={'/suspense-list'} component={SuspenseListPage} />
          </Main>
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};
