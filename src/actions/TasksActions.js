import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/AppConstants';

import api from '../api';

const TasksActions = {
  loadTasks(taskListId) {
    api.listTasks(taskListId)
    .then(data =>
      AppDispatcher.dispatch({
        type  : Constants.TASKS_LOAD_SUCCESS,
        items : data.items || []
      })
    )
    .catch(err =>
      AppDispatcher.dispatch({
        type  : Constants.TASKS_LOAD_FAIL,
        error : err
      })
    );
  },

};

export default TasksActions;
