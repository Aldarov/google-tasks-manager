import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

import api from '../api';

import moment from 'moment';

function DateToRFC3339(date) {
  return moment(date).format("YYYY-MM-DDTHH:mm:ss")+"Z";
}

const TasksActions = {
  loadTasks(taskListId) {
    api.listTasks(taskListId)
    .then(data =>
      AppDispatcher.dispatch({
        type  : AppConstants.TASKS_LOAD_SUCCESS,
        items : data.items || []
      })
    )
    .catch(err =>
      AppDispatcher.dispatch({
        type  : AppConstants.TASKS_LOAD_FAIL,
        error : err
      })
    );
  },

  updateTaskStatus(params) {
    api.updateTask({
      taskListId: params.taskListId,
      taskId: params.taskId,
      status: params.isCompleted ? 'completed' : 'needsAction'
    })
    .then(data => {
      AppDispatcher.dispatch({
        type   : AppConstants.TASK_UPDATE_SUCCESS,
        task   : data,
        taskId : params.taskId
      });
    })
    .catch(err => {
      console.log(err);
      AppDispatcher.dispatch({
        type  : AppConstants.TASK_UPDATE_FAIL,
        error : err
      });
    });
  },

  updateTask(params) {
    api.updateTask({
      taskListId: params.taskListId,
      taskId: params.taskId,
      title: params.text,
      notes: params.notes,
      due: DateToRFC3339(params.due)
    })
    .then(data => {
      AppDispatcher.dispatch({
        type   : AppConstants.TASK_UPDATE_SUCCESS,
        task   : data,
        taskId : params.taskId
      });
    })
    .catch(err => {
      AppDispatcher.dispatch({
        type  : AppConstants.TASK_UPDATE_FAIL,
        error : err
      });
    });
  },

  createTask(params) {
    api.insertTask({
      taskListId: params.taskListId,
      title: params.text,
      notes: params.notes,
      due: DateToRFC3339(params.due)
    })
    .then(data => {
      AppDispatcher.dispatch({
        type : AppConstants.TASK_CREATE_SUCCESS,
        task : data
      });
    })
    .catch(err => {
      AppDispatcher.dispatch({
        type  : AppConstants.TASK_CREATE_FAIL,
        error : err
      });
    });
  },

  deleteTask(params) {
    api.deleteTask({
      taskListId: params.taskListId,
      taskId: params.taskId
    })
    .then(() => {
      AppDispatcher.dispatch({
        type   : AppConstants.TASK_DELETE_SUCCESS,
        taskId : params.taskId
      });
    })
    .catch(err => {
      AppDispatcher.dispatch({
        type  : AppConstants.TASK_DELETE_FAIL,
        error : err
      });
    });
  },
};

export default TasksActions;
