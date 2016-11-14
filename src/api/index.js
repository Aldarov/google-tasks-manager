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
          console.log(authResult);
        }
      );
    });
  }
}
