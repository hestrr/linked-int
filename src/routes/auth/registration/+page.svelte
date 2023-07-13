<script lang="ts">
    import {
        createUserWithEmailAndPassword,
        getAuth
    } from 'firebase/auth';
    import {
        getFirestore,
        addDoc,
        collection,
        Firestore,
        CollectionReference
    } from 'firebase/firestore';

    let username = '' as string;
    let name = '' as string;
    let surname = '' as string;
    let email = '' as string;
    let password = '' as string;

    async function login() {
        const auth = getAuth();
        await createUserWithEmailAndPassword(auth, email, password);

        const firestore = getFirestore() as Firestore;
        const usersCollection = collection(firestore, 'users') as CollectionReference<{
            name: string;
            surname: string;
            email: string;
            username: string;
        }>;
        await addDoc(usersCollection, {
            email: email,
            username: username,
            name: name,
            surname: surname
        });
    }
</script>

<h1>Registration</h1>
<form on:submit|preventDefault={login}>
    <label for="username">Username:</label>
    <input type="text" id="username" bind:value={username} required/>
    <br/>
    <label for="name">Name:</label>
    <input type="text" id="name" bind:value={name} required/>
    <br/>
    <label for="surname">Surname:</label>
    <input type="text" id="surname" bind:value={surname} required/>
    <br/>
    <label for="email">Email:</label>
    <input type="email" id="email" bind:value={email} required/>
    <br/>
    <label for="password">Password:</label>
    <input type="password" id="password" bind:value={password} required/>
    <br/>
    <button type="submit">Register</button>
</form>
