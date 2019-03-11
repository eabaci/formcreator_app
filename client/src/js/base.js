import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
	apiKey: 'AIzaSyA15kLLtbmgXT-wupd2EqR-K8G15cE_aqU',
	authDomain: 'form-creator-17ee6.firebaseapp.com',
	databaseURL: 'https://form-creator-17ee6.firebaseio.com'
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;
