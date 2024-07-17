import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './apollo/apolloClient';
import App from './App';

const root = document.getElementById('root');

const rootElement = (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

const rootContainer = root.createRoot(rootElement);
rootContainer.render();