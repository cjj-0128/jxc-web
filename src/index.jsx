import React from 'react';
import './index.css';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import ReactDom from 'react-dom';
import useRoute from '@/routes';
import Home from './pages/home';

function Index(){
  const [routes] = useRoute();
  
  return(
    <HashRouter>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        {/* {routes.map((route, index) => {
          return (
            <Route
              key={index}
              path={route.path}
              element={<route.component />}
            />
          );
        })} */}
      </Routes>
   </HashRouter>
  )
}

const render = ({ appContent, loading }) => {
  const container = document.getElementById('root');
  ReactDom.render(<Index loading={loading} content={appContent} />, container);
}

const loader = (loading) => render({ loading });

render({ loading: true });