const CLIENT_ID = '514180750381-h96ftd4cviqlloo3pg0qurkar0sf8foo.apps.googleusercontent.com';
const SCOPES = ['https://www.googleapis.com/auth/tasks','https://www.googleapis.com/auth/plus.me'];

export default {
  authorize(params) {
    return new Promise(function(resolve, reject) {
      gapi.auth.authorize(
        {
          'client_id': CLIENT_ID,
          'scope': SCOPES,
          'immediate': params.immediate,
          'cookie_policy': 'single_host_origin'
        },
        authResult => {
          if (authResult.error) {
            return reject(authResult.error);
          }

          return gapi.client.load('tasks', 'v1', () => gapi.client.load('plus', 'v1', () => resolve() ) );
        }
      );
    });
  },

  listTaskLists() {
    const request = gapi.client.tasks.tasklists.list();

    return new Promise(function(resolve, reject) {
      request.execute(resp => resolve(resp));
    });
  },

  insertTaskList({ title }) {
    const request = gapi.client.tasks.tasklists.insert({
      title: title
    });

    return new Promise(function(resolve, reject) {
      request.execute(resp => resolve(resp));
    });
  },

  deleteTaskList({ taskListId }) {
    const request = gapi.client.tasks.tasklists.delete({
      tasklist: taskListId
    });

    return new Promise(function(resolve, reject) {
      request.execute(resp => resolve(resp));
    });
  },

  updateTaskList({ taskListId, ...params }) {
    const request = gapi.client.tasks.tasklists.update({
      tasklist: taskListId,
      ...params
    });

    return new Promise(function(resolve, reject) {
      request.execute(resp => resolve(resp));
    });
  },

  listTasks(taskListId) {
    const request = gapi.client.tasks.tasks.list({
      tasklist: taskListId
    });

    return new Promise(function(resolve, reject) {
      request.execute(resp => {
        resolve(resp);
      });
    });
  },

  insertTask({ taskListId, ...params }) {
    const request = gapi.client.tasks.tasks.insert({
      tasklist : taskListId,
      ...params
    });

    return new Promise((resolve, reject) => {
      request.execute(resp => resolve(resp));
    });
  },

  updateTask({ taskListId, taskId, ...params }) {
    // console.log("index.js", {
    //   tasklist : taskListId,
    //   task     : taskId,
    //   id       : taskId,
    //   ...params
    // });
    const request = gapi.client.tasks.tasks.update({
      tasklist : taskListId,
      task     : taskId,
      id       : taskId,
      ...params
    });

    return new Promise((resolve, reject) => {
      request.execute(resp => resolve(resp));
    });
  },

  deleteTask({ taskListId, taskId }) {
    const request = gapi.client.tasks.tasks.delete({
      tasklist : taskListId,
      task     : taskId
    });

    return new Promise((resolve, reject) => {
      request.execute(resp => resolve(resp));
    });
  }
}
