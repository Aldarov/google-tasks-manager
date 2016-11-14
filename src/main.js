import ReactDOM from 'react-dom';
import React from 'react';
import {Router, Route, hashHistory} from 'react-router';

import SessionActions from './actions/SessionActions';

import App from './App.jsx';
import LoginPage from './components/LoginPage.jsx';
import LoggedInLayout from './components/LoggedInLayout.jsx';
import AboutPage from './components/AboutPage.jsx';

// window.handleGoogleApiLoaded = () => {
//   SessionActions.authorize(true, renderApp);
// };
renderApp();

function renderApp() {
  ReactDOM.render (
    <Router history={hashHistory}>
      <Route path='/' component={App} >
        <Route path='/login' component={LoginPage}/>
        <Route component={LoggedInLayout}>
          <Route path='/about' component={AboutPage}></Route>
        </Route>
      </Route>
    </Router>,
    document.getElementById('mount-point')
  );
}
