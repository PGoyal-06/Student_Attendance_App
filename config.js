import firebase from 'firebase';

var firebaseConfig = {
  apiKey: 'AIzaSyBNL3Eg-97H_gcyrY5_7v8qwsELSk4qmeg',
  authDomain: 'project-60-70aac.firebaseapp.com',
  projectId: 'project-60-70aac',
  storageBucket: 'project-60-70aac.appspot.com',
  messagingSenderId: '174067171556',
  appId: '1:174067171556:web:386fa22d1eb990eba0ecf1',
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export default firebase.database();
