import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import './LoginPage.scss';

const LoginPage = React.createClass({
  handleLogIn() {
    console.log('Login clicked');
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
              primary={true}
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
