import { EventEmitter } from 'events';

import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

const CHANGE_EVENT = 'change';
const DELETE_TASKS_LIST_EVENT = 'deleteTaskList';

let _taskLists = [];
let _error = null;

function formatTaskList(data) {
  return {
    id   : data.id,
    name : data.title
  };
};

const TaskListsStore = Object.assign({}, EventEmitter.prototype, {
  getTaskLists() {
    return _taskLists;
  },

  getList(taskListId) {
    const taskIndex = _taskLists.findIndex(list => list.id === taskListId);
    return _taskLists[taskIndex];
  },

  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  emitDeleteTasksList() {
    this.emit(DELETE_TASKS_LIST_EVENT);
  },

  addDeleteTasksListListener(callback) {
    this.on(DELETE_TASKS_LIST_EVENT, callback);
  },

  removeDeleteTasksListListener(callback) {
    this.removeListener(DELETE_TASKS_LIST_EVENT, callback);
  }
});

AppDispatcher.register(action => {
  switch (action.type) {
    case AppConstants.TASK_LISTS_LOAD_SUCCESS: {
      _taskLists = action.items.map(formatTaskList);

      TaskListsStore.emitChange();
      break;
    }

    case AppConstants.TASK_LISTS_LOAD_FAIL: {
      _taskLists = [];
      _error = action.error;

      TaskListsStore.emitChange();
      break;
    }

    case AppConstants.TASK_LISTS_CREATE_SUCCESS: {
      const newTaskList = formatTaskList(action.taskList);
      _taskLists.push(newTaskList);

      TaskListsStore.emitChange();
      break;
    }

    case AppConstants.TASK_LISTS_CREATE_FAIL: {
      _error = action.error;

      TaskListsStore.emitChange();
      break;
    }

    case AppConstants.TASK_LISTS_UPDATE_SUCCESS: {
      const updatedTaskListIndex =
        _taskLists.findIndex(t => t.id === action.taskListId);
      _taskLists[updatedTaskListIndex] = formatTaskList(action.taskList);

      TaskListsStore.emitChange();
      break;
    }

    case AppConstants.TASK_LISTS_UPDATE_FAIL: {
      _error = action.error;

      TaskListsStore.emitChange();
      break;
    }

    case AppConstants.TASK_LISTS_DELETE_SUCCESS: {
      const deletedTaskListIndex =
        _taskLists.findIndex(t => t.id === action.taskListId);
      _taskLists.splice(deletedTaskListIndex, 1);

      TaskListsStore.emitChange();
      TaskListsStore.emitDeleteTasksList();
      break;
    }

    case AppConstants.TASK_LISTS_DELETE_FAIL: {
      _error = action.error;

      TaskListsStore.emitChange();
      break;
    }

    default: {
    }
  }
});

export default TaskListsStore;
