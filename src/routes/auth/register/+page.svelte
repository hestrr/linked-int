<script lang="ts">
	import type { User } from '$lib/types.d';

	import { register } from '$lib/firebaseAuth';
	import { firestore } from '$lib/firebaseFirestore';
	import { setDoc, doc } from 'firebase/firestore';
	import { goto } from '$app/navigation';

	import { Button, TextInput, Title, Center, ActionIcon } from '@svelteuidev/core';
	import { EyeClosed, EyeOpen } from 'radix-icons-svelte';

	let showPassword = false;

	let username = '' as string;
	let name = '' as string;
	let surname = '' as string;
	let email = '' as string;
	let password = '' as string;

	async function handleRegistration() {
		let user = await register(email, password);

		if (typeof user == 'string') {
			alert(`Error signing up: ${user}`);
			return;
		}

		await setDoc(doc(firestore, '/users', user.uid), {
			email: email,
			username: username,
			name: name,
			surname: surname
		} as User).then(() => {
			goto('/projects');
		});
	}
</script>

<svelte:head>
	<title>Registration | LinkedIn't</title>
</svelte:head>
<form
	method="POST"
	on:submit|preventDefault={handleRegistration}
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
	<Center
		><Button type="submit" size="lg" class="bg-[#1CBC7F] hover:bg-green-600">Submit</Button></Center
	>
</form>
