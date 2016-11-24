import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/AppConstants';

import api from '../api';

const TaskListsActions = {
  loadTaskLists() {
    api.listTaskLists()
    .then(data =>
      AppDispatcher.dispatch({
        type  : Constants.TASK_LISTS_LOAD_SUCCESS,
        items : data.items || []
      })
    )
    .catch(err =>
      AppDispatcher.dispatch({
        type  : Constants.TASK_LISTS_LOAD_FAIL,
        error : err
      })
    );
  },

  createTaskList(params) {
    api.insertTaskList({ title: params.name})
    .then(data => {
      AppDispatcher.dispatch({
        type     : Constants.TASK_LISTS_CREATE_SUCCESS,
        taskList : data
      });
    })
    .catch(err => {
      AppDispatcher.dispatch({
        type  : Constants.TASK_LISTS_CREATE_FAIL,
        error : err
      });
    });
  },

  updateTaskList(params) {
    api.updateTaskList({ title: params.title})
    .then(data => {
      AppDispatcher.dispatch({
        type       : Constants.TASK_LISTS_UPDATE_SUCCESS,
        taskList   : data,
        taskListId : params.taskListId
      });
    })
    .catch(err => {
      AppDispatcher.dispatch({
        type  : Constants.TASK_LISTS_UPDATE_FAIL,
        error : err
      });
    });
  },

  deleteTaskList(params) {
    api.deleteTaskList({ taskListId: params.taskListId})
    .then(data => {
      AppDispatcher.dispatch({
        type       : Constants.TASK_LISTS_DELETE_SUCCESS,
        taskListId : params.taskListId
      });
    })
    .catch(err => {
      AppDispatcher.dispatch({
        type  : Constants.TASK_LISTS_DELETE_FAIL,
        error : err
      });
    });
  }
};

export default TaskListsActions;
