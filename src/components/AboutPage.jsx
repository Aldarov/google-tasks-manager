import React from 'react';
import Paper from 'material-ui/Paper';

import './AboutPage.scss';

const AboutPage = React.createClass({
  render () {
    return (
      <div className="AboutPage">
        <Paper
          zDepth={3}
          className="AboutPage__content"
        >
          <h2>Менеджер задач.</h2>
          <p>Приложение основано на <a href="https://developers.google.com/google-apps/tasks/">Google Task API</a>, использует концепцию Material Disign.
          </p>
          <p>
            Финальное приложение курса ReactJs Essential.
          </p>
        </Paper>
      </div>
    );
  }
});

export default AboutPage;
