import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ApolloProvider from './apollo/ApolloProvider';
import AuthProvider from './context/AuthProvider';
import WebClient from './WebClient';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ApolloProvider>
          <Routes>
            <Route path="/*" element={<WebClient />} />
          </Routes>
        </ApolloProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
