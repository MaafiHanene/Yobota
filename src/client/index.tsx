import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { createStore } from 'redux';

import 'babel-polyfill';
import 'antd/dist/antd.css';
import AppWrapper from './AppWrapper';
import reducer from './state/reducers';
import { createBrowserHistory } from 'history';
import { Router } from "react-router-dom";

// import * as serviceWorker from './serviceWorker';

const client = new ApolloClient({
    uri: '/api',
    request: (operation) => {
      const token = localStorage.getItem('id_token');
      operation.setContext({
        headers: {
          authorization: token ? `Bearer ${token}` : '',
        },
      });
    },
  });

const store = createStore(reducer);
// store.subscribe(() => console.log(store.getState()));

const history = createBrowserHistory();


ReactDOM.render(<Router history={history}><AppWrapper store={store} client={client}/></Router>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
