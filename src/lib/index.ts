// place files you want to import through the `$lib` alias in this folder.
import User from './User.svelte';
import Collection from './Collection.svelte';
import Doc from './Doc.svelte';
import FirebaseApp from './FirebaseApp.svelte';
import { docStore, userStore, collectionStore } from './stores';
import { firebaseAuth as auth, login, logout } from './firebaseAuth';
import { firestore } from './firebaseFirestore';

export {
	Doc,
	User,
	Collection,
	FirebaseApp,
	docStore,
	collectionStore,
	userStore,
	auth,
	firestore,
	login,
	logout
};
