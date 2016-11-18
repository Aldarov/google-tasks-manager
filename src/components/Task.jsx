import React from 'react';

import Checkbox from 'material-ui/Checkbox';

import './Task.scss';

const Task = React.createClass({
  render () {  
    return (
      <div className="Task">
        <Checkbox
          className='Task__checkbox'
          checked={this.props.isCompleted}
        />

        <div className="Task__text">
          <div className="TasksPage__title">{this.props.text}</div>
        </div>
      </div>
    );
  }
});

export default Task;
