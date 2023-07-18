<script lang="ts">
    import {register} from '$lib/firebaseAuth';
    import {usersCollection} from "$lib/firebaseFirestore";
    import {addDoc} from 'firebase/firestore';
    import {goto} from '$app/navigation';

    let username = '' as string;
    let name = '' as string;
    let surname = '' as string;
    let email = '' as string;
    let password = '' as string;

    async function handleRegistration() {
        await register(email, password);

        await addDoc(usersCollection, {
            email: email,
            username: username,
            name: name,
            surname: surname
        }).then(() => {
            goto('/projects')
        });
    }
</script>

<h1>Registration</h1>
<form on:submit|preventDefault={handleRegistration}>
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
