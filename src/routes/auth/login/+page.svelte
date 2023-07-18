<script lang="ts">
	import { signInWithEmailAndPassword } from 'firebase/auth';
	import { firebaseAuth } from '$lib/firebase';

	import { goto } from '$app/navigation';

	let email = '' as string;
	let password = '' as string;

	async function login() {
		await signInWithEmailAndPassword(firebaseAuth, email, password).then(() => {goto('/projects')});
	}
</script>

<h1>Login</h1>
<form on:submit|preventDefault={login}>
	<label for="email">Email:</label>
	<input type="email" id="email" bind:value={email} required />
	<br />
	<label for="password">Password:</label>
	<input type="password" id="password" bind:value={password} required />
	<br />
	<button type="submit">Login</button>
</form>
