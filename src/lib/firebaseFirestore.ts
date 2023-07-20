import { collection, CollectionReference, getFirestore, type Firestore } from 'firebase/firestore';
import { firebaseApp } from '$lib/firebase';
import type { Project, User } from '$lib/types';

const firestore = getFirestore(firebaseApp) as Firestore;

const usersCollection = collection(firestore, 'users') as CollectionReference<User>;
const projectsCollection = collection(firestore, 'projects') as CollectionReference<Project>;

export { firestore, usersCollection, projectsCollection };
