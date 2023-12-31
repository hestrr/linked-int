import {
	getAuth,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	signOut,
	onAuthStateChanged
} from 'firebase/auth';
import type { Auth, User } from 'firebase/auth';
import { firebaseApp } from '$lib/firebase';

const firebaseAuth: Auth = getAuth(firebaseApp);

let user: User | null = null;

const login = async (email: string, password: string): Promise<void | string> => {
	try {
		const userCredentials = await signInWithEmailAndPassword(firebaseAuth, email, password);
		user = userCredentials.user;
	} catch (error: any) {
		return error.message;
	}
};

const register = async (email: string, password: string): Promise<User | string> => {
	try {
		const userCredentials = await createUserWithEmailAndPassword(firebaseAuth, email, password);
		user = userCredentials.user;
		return user;
	} catch (error: any) {
		return error.message;
	}
};
const logout = async (): Promise<void> => {
	await signOut(firebaseAuth);
	user = null;
};

onAuthStateChanged(firebaseAuth, (currentUser) => {
	if (currentUser) {
		user = currentUser;
	} else {
		user = null;
	}
});

export { user, login, register, logout, firebaseAuth };
