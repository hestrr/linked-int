<script>
	import { Button, TextInput, Title, Center, ActionIcon } from '@svelteuidev/core';
	import { EyeClosed, EyeOpen } from 'radix-icons-svelte';

	let showPasswordOne = false;
	let showPasswordTwo = false;
</script>

<form method="POST" on:submit|preventDefault={() => {}}>
	<Center><Title order={1}>Sign up</Title></Center>
	<TextInput placeholder="Name" size="lg" type="text" required />
	<TextInput placeholder="Surname" size="lg" type="text" required />
	<TextInput
		placeholder="Email"
		size="lg"
		type="email"
		pattern="^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
		required
	/>
	<TextInput placeholder="Password" size="lg" type={showPasswordOne ? 'text' : 'password'} required>
		<svelte:fragment slot="rightSection">
			{#if showPasswordOne}
				<ActionIcon on:click={() => (showPasswordOne = false)}><EyeOpen /></ActionIcon>
			{:else}
				<ActionIcon on:click={() => (showPasswordOne = true)}
					><EyeClosed color="#646F70" /></ActionIcon
				>
			{/if}
		</svelte:fragment>
	</TextInput>
	<TextInput
		placeholder="Repeat Password"
		size="lg"
		type={showPasswordTwo ? 'text' : 'password'}
		required
	>
		<svelte:fragment slot="rightSection">
			{#if showPasswordTwo}
				<ActionIcon on:click={() => (showPasswordTwo = false)}><EyeOpen /></ActionIcon>
			{:else}
				<ActionIcon on:click={() => (showPasswordTwo = true)}
					><EyeClosed color="#646F70" /></ActionIcon
				>
			{/if}
		</svelte:fragment>
	</TextInput>
	<Center><Button type="submit" color="#1CBC7F" size="lg">Submit</Button></Center>
</form>

<style>
	form {
		height: 110%;
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		flex-direction: column;
		justify-content: space-evenly;
	}
</style>
