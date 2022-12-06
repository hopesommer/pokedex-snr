import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Nav } from '../components';
import { ListPage, Home } from '../screens';
import { PokemonModal } from "../components/PokemonList/PokemonModal"

function App() {
  const classes = useStyles();
  const location = useLocation();
  const background = location.state && location.state.background;
 
  return (
        <div className={classes.root}>
            <Nav />
            <div className={classes.content}>
              <div className={classes.scrollableArea}>
                <Routes location={background || location}>
                  <Route path="/" element={<Home />} />
                  <Route path="/pokemon/" element={<ListPage />}>
                    <Route path=":id/:name" element={<PokemonModal/>}/>
                  </Route>
                </Routes>
                {background && (
                  <Routes>
                    <Route path=":id/:name" element={<PokemonModal/>}/>
                  </Routes>
                )}
              </div>
            </div>
        </div>
  );
}

const useStyles = createUseStyles(
  {
    root: {
      background: '#171E2b',
      minHeight: '100vh',
      minWidth: '100vw',
      height: '100%',
      width: '100%',
      display: 'flex',
    },
    content: {
      flex: '1',
      overflow: 'hidden',
      position: 'relative',
    },
    scrollableArea: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: 'auto',
    },
  },
  { name: 'App' }
);

export default App;
