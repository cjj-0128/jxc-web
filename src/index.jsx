import '@/api/interceptor';
import React from 'react';
import ReactDom from 'react-dom';
import { HashRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import PageLayout from './layout';


function Index(){  
  return(
    <HashRouter>
      <Routes>
        <Route path='/*' element={<PageLayout></PageLayout>}></Route>
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