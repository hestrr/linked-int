<script lang="ts">
	import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';

	let email = '' as string;
	let password = '' as string;

	async function login() {
		const auth = getAuth();
		const { user } = await signInWithEmailAndPassword(auth, email, password);
		console.log(user);
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
