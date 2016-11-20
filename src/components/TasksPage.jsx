import React from 'react';

import TaskListsStore from '../stores/TaskListsStore';
import TasksStore from '../stores/TasksStore';
import TasksActions from '../actions/TasksActions';

import IconButton from 'material-ui/IconButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import Task from './Task.jsx';

import './TasksPage.scss';

function getStateFromFlux() {
  return {
    tasks: TasksStore.getTasks()
  };
}

const TasksPage = React.createClass({
  getInitialState: function() {
    return getStateFromFlux();
  },

  componentWillMount() {
    TasksActions.loadTasks(this.props.params.id);
  },

  componentDidMount() {
    TasksStore.addChangeListener(this._onChange);
  },

  componentWillReceiveProps(nextProps) {
    if (this.props.params.id !== nextProps.params.id) {
        TasksActions.loadTasks(nextProps.params.id);
    }
  },

  componentWillUnmount() {
    TasksStore.removeChangeListener(this._onChange);
  },

  _onChange() {
    this.setState(getStateFromFlux());
  },

  render () {
    return (
      <div className="TasksPage">
        <div className="TasksPage__header">
          <h2 className="TasksPage__title">Список задач</h2>
          <div className="TasksPage__tools">
            <IconButton>
              <ContentAdd/>
            </IconButton>
          </div>
        </div>
        <div className="TasksPage__tasks">
          {
            this.state.tasks.map(task =>
              <Task
                key={task.id}
                text={task.text}
                isCompleted={task.isCompleted}
              />
            )
          }
        </div>
      </div>
    );
  }
});

export default TasksPage;
