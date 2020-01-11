import React from 'react';
import { BrowserRouter, NavLink, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { Home } from './section/home';


const VerticalNav = styled.div`
  display: flex;
  flex-direction: column;
  background-color: beige;
  padding: 1em;  
`;
const Layout = styled.div`
  display: flex;
  flex-direction: row;
  
`;
const Main = styled.div`
  padding: 1em;
`;

export let App = () => {
  return (

    <BrowserRouter>
      <Layout>
        <VerticalNav>
          <NavLink to={'/'}>Home</NavLink>
        </VerticalNav>

        <Switch>
          <Main>
            <Route exact path={'/'} component={Home} />
          </Main>
        </Switch>
      </Layout>
    </BrowserRouter>

  )
    ;
};
