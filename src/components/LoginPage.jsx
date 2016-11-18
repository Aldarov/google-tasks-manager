import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import SessionActions from '../actions/SessionActions';
import SessionStore from '../stores/SessionStore';

import './LoginPage.scss';

function getStateFromFlux() {
  return {
    isLoggedIn: SessionStore.isLoggedIn()
  };
}

const LoginPage = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState() {
    return getStateFromFlux();
  },

  componentDidMount() {
    SessionStore.addChangeListener(this._onChange);
  },

  componentWillUpdate: function(nextProps, nextState) {
    if (nextState.isLoggedIn) {
      const { location } = this.props;

      if (location.state && location.state.nextPathname) {
        this.context.router.replace(location.state.nextPathname);
      } else {
        this.context.router.replace('/lists');
      }
    }
  },

  componentWillUnmount() {
    SessionStore.removeChangeListener(this._onChange);
  },

  handleLogIn() {
    SessionActions.authorize();
  },

  _onChange() {
    this.setState(getStateFromFlux());
  },

  render() {
    return (
      <div className="LoginPage">
        <div className="LoginPage__banner">
          <div className="LoginPage__text">
            <h1>Менеджер задач</h1>
            <p>Планируй свою работу!</p>
            <RaisedButton
              label="Войти через Google"
              className='login-button'
              onClick={this.handleLogIn}
            />
          </div>
          <img
            src="/img/desk.png"
            alt=""
            className="LoginPage__image"
          />
        </div>
      </div>
    );
  }
});

export default LoginPage;
