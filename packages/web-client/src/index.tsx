import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ApolloProvider from './apollo/ApolloProvider';
import WebClient from './WebClient';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ApolloProvider>
        <Routes>
          <Route path="/*" element={<WebClient />} />
        </Routes>
      </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
