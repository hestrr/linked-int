import {collection, CollectionReference, getFirestore} from 'firebase/firestore';
import {firebaseApp} from "$lib/firebase";
import type {Project, User} from "$lib/types";

const firestore = getFirestore(firebaseApp);

const usersCollection = collection(firestore, 'users') as CollectionReference<User>;
const projectsCollection = collection(firestore, 'projects') as CollectionReference<Project>;

export {firestore, usersCollection, projectsCollection}