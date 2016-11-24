import React from 'react';

import TasksActions from '../actions/TasksActions';
import TasksStore from '../stores/TasksStore';
import TaskListsActions from '../actions/TaskListsActions';
import TaskListsStore from '../stores/TaskListsStore';

import IconButton from 'material-ui/IconButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';

import Task from './Task.jsx';
import TaskCreateModal from './TaskCreateModal.jsx';
import DialogQuestion from './helpers/DialogQuestion.jsx';

import './TasksPage.scss';

function getStateFromFlux() {
  return {
    tasks: TasksStore.getTasks()
  };
}

const TasksPage = React.createClass({
  getInitialState: function() {
    return {
      ...getStateFromFlux(),
      isCreatingTask: false
    };
  },

  componentWillMount() {
    TasksActions.loadTasks(this.props.params.id);
  },

  componentDidMount() {
    TasksStore.addChangeListener(this._onChange);
    TaskListsStore.addDeleteTasksListListener(this._onDeleteTasksList);
  },

  componentWillReceiveProps(nextProps) {
    if (this.props.params.id !== nextProps.params.id) {
        TasksActions.loadTasks(nextProps.params.id);
    }
  },

  componentWillUnmount() {
    TasksStore.removeChangeListener(this._onChange);
    TaskListsStore.removeDeleteTasksListListener(this._onDeleteTasksList);
  },

  _onChange() {
    this.setState(getStateFromFlux());
  },

  _onDeleteTasksList() {
    this.props.router.push("/lists");
  },

  handleStatusChange(taskId, { isCompleted }) {
    TasksActions.updateTaskStatus({
      taskListId: this.props.params.id,
      taskId: taskId,
      isCompleted: isCompleted
    });
  },

  handleTaskUpdate(taskId, { text, notes, due }) {
    TasksActions.updateTask({
      taskListId: this.props.params.id,
      taskId: taskId,
      text: text,
      notes: notes,
      due: due
    });
  },

  handleTaskDelete(taskId) {
    TasksActions.deleteTask({
      taskListId: this.props.params.id,
      taskId: taskId
    });
  },

  handleAddTask() {
      this.setState({ isCreatingTask : true });
  },

  handleClose() {
      this.setState({ isCreatingTask : false });
  },

  handleTaskSubmit(task) {
      const taskListId = this.props.params.id;
      TasksActions.createTask({ taskListId, ...task });

      this.setState({ isCreatingTask : false });
  },

  getTitleTaskList() {
    const res = TaskListsStore.getList(this.props.params.id);
    if (res) {
      return res.name;
    }
    else {
      return '';
    }
  },

  handleDeleteTaskList() {
    this.refs.ques.showQuestion("Удалить текущий список задач?", () => {
      TaskListsActions.deleteTaskList({
        taskListId : this.props.params.id
      });
    })
  },

  render () {
    return (
      <div className="TasksPage">
        <div className="TasksPage__header">
          <h2 className="TasksPage__title">{this.getTitleTaskList()}</h2>
          <div className="TasksPage__tools">
            <IconButton onClick={this.handleAddTask}>
              <ContentAdd/>
            </IconButton>
            <IconButton onClick={this.handleDeleteTaskList}>
              <ContentRemove/>
            </IconButton>
          </div>
        </div>
        <div className="TasksPage__tasks">
          {
            this.state.tasks.map(task =>
              <Task
                key={task.id}
                task={task}
                isCompleted={task.isCompleted}
                onStatusChange={this.handleStatusChange.bind(null, task.id)}
                onUpdate={this.handleTaskUpdate.bind(null, task.id)}
                onDelete={this.handleTaskDelete.bind(null, task.id)}
              />
            )
          }
        </div>
        <TaskCreateModal
            isOpen={this.state.isCreatingTask}
            onSubmit={this.handleTaskSubmit}
            onClose={this.handleClose}
        />
      <DialogQuestion ref="ques" title="Внимание"/>
      </div>
    );
  }
});

export default TasksPage;
