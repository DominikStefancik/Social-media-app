import React from 'react';
import ReactDOM from 'react-dom';
import ApolloProvider from './apollo/ApolloProvider';
import WebClient from './WebClient';

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider>
      <WebClient />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
