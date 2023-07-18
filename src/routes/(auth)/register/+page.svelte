<script lang="ts">
	import type { User } from '$lib/types.d';
	import { createUserWithEmailAndPassword } from 'firebase/auth';
	import {
		getFirestore,
		addDoc,
		collection,
		Firestore,
		CollectionReference
	} from 'firebase/firestore';
	import { firebaseAuth } from '$lib/firebase';
	import { goto } from '$app/navigation';

	import { Button, TextInput, Title, Center, ActionIcon } from '@svelteuidev/core';
	import { EyeClosed, EyeOpen } from 'radix-icons-svelte';

	let showPassword = false;

	let username = '';
	let name = '';
	let surname = '';
	let email = '';
	let password = '';

	async function register() {
		await createUserWithEmailAndPassword(firebaseAuth, email, password);

		const firestore = getFirestore() as Firestore;
		const usersCollection = collection(firestore, 'users') as CollectionReference<User>;

		await addDoc(usersCollection, {
			email: email,
			username: username,
			name: name,
			surname: surname
		} as User).then(() => {
			goto('/auth/login');
		});
	}
</script>

<form
	method="POST"
	on:submit|preventDefault={register}
	class="h-[110%] w-full flex flex-wrap flex-col justify-evenly"
>
	<Center><Title order={1}>Sign up</Title></Center>
	<TextInput placeholder="Username" size="lg" type="text" required bind:value={username} />
	<TextInput placeholder="Name" size="lg" type="text" required bind:value={name} />
	<TextInput placeholder="Surname" size="lg" type="text" required bind:value={surname} />
	<TextInput
		placeholder="Email"
		size="lg"
		type="email"
		pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
		required
		bind:value={email}
	/>
	<TextInput
		placeholder="Password"
		size="lg"
		type={showPassword ? 'text' : 'password'}
		required
		bind:value={password}
	>
		<svelte:fragment slot="rightSection">
			{#if showPassword}
				<ActionIcon on:click={() => (showPassword = false)}><EyeOpen /></ActionIcon>
			{:else}
				<ActionIcon on:click={() => (showPassword = true)}><EyeClosed color="#646F70" /></ActionIcon
				>
			{/if}
		</svelte:fragment>
	</TextInput>
	<Center><Button type="submit" size="lg" class="bg-[#1CBC7F]">Submit</Button></Center>
</form>
