import React from 'react';

import TaskListsStore from '../stores/TaskListsStore';
import TaskListsActions from '../actions/TaskListsActions';

import { List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import ListIcon from 'material-ui/svg-icons/action/view-list';
import HomeIcon from 'material-ui/svg-icons/action/home';
import ExitIcon from 'material-ui/svg-icons/action/exit-to-app';
import FolderIcon from 'material-ui/svg-icons/file/folder';
import AddIcon from 'material-ui/svg-icons/content/add';

import TaskListCreateModal from './TaskListCreateModal.jsx';

import './TaskListsPage.scss';

function getStateFromFlux() {
  return {
    taskLists: TaskListsStore.getTaskLists()
  };
}

const TaskListsPage = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState() {
    return Object.assign({},
      getStateFromFlux(),
      { isCreatingTaskList: false }
    );
  },

  componentWillMount() {
    TaskListsActions.loadTaskLists();
  },

  componentDidMount() {
    TaskListsStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    TaskListsStore.removeChangeListener(this._onChange);
  },

  _onChange() {
      this.setState(getStateFromFlux());
  },

  handleAddTaskList() {
    this.setState({ isCreatingTaskList: true });
  },

  handleTaskListClose() {
    this.setState({ isCreatingTaskList: false });
  },

  handleTaskListSubmit(taskList) {
    TaskListsActions.createTaskList(taskList);

    this.setState({ isCreatingTaskList: false });
  },

  render () {
    const { router } = this.context;

    return (
      <div className="TaskListsPage">
        <div className="TaskListsPage__menu">
          <List className="TaskListsPage__list">
            <h3 className="TaskListsPage__title">Google задачи</h3>
            <Divider/>
            <List className="TaskListsPage__list">
              <ListItem
                leftIcon={<HomeIcon/>}
                primaryText="Home"
                onClick={router.push.bind(null, '/lists')}
              />
              <ListItem
                leftIcon={<ListIcon/>}
                primaryText="About"
                onClick={router.push.bind(null, '/about')}
              />
            </List>
            <Divider />
            <List className='TaskListsPage__list' >
              <Subheader>Список задач</Subheader>
              {
                  this.state.taskLists.map(list =>
                      <ListItem
                          key={list.id}
                          leftIcon={<FolderIcon />}
                          primaryText={list.name}
                          onClick={router.push.bind(null, `/lists/${list.id}`)}
                      />
                  )
              }
              <ListItem
                  leftIcon={<AddIcon />}
                  primaryText="Добавить список задач"
                  onClick={this.handleAddTaskList}
              />
            </List>
            <Divider/>
            <List className="TaskListsPage__list">
              <ListItem
                leftIcon={<ExitIcon/>}
                primaryText="Выйти"
                onClick={this.handleLogOut}
              />
            </List>
          </List>
        </div>
        <div className="TaskListsPage__tasks">
          {this.props.children}
        </div>
        <TaskListCreateModal
          isOpen={this.state.isCreatingTaskList}
          onSubmit={this.handleTaskListSubmit}
          onClose={this.handleTaskListClose}
        />
      </div>
    );
  }
});

export default TaskListsPage;
