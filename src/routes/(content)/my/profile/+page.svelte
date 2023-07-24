<script lang="ts">
	import { Paper, Skeleton, Title, Flex, Stack, Text, Button } from '@svelteuidev/core';
	import Telegram from '~icons/fa6-brands/telegram';
	import Behance from '~icons/devicon-plain/behance';
	import { GithubLogo } from 'radix-icons-svelte';
	import { Doc, User, auth, firestore } from '$lib';
	import FirebaseApp from '$lib/FirebaseApp.svelte';
	import { goto } from '$app/navigation';
</script>

<svelte:head>
	<title>My profile | LinkedIn't</title>
</svelte:head>
<FirebaseApp {auth} {firestore}>
	<User let:user>
		<Doc ref={`users/${user.uid}`} let:data={userData} let:ref={userDataRef}>
			<Paper class="mb-40">
				<Flex align="center">
					<Skeleton circle height={125} />
					<Flex class="ml-[5%] w-[80%]" justify="space-between">
						<Stack>
							<Title order={1} class="font-[500]">
								{userData.name}
								{userData.surname}
							</Title>
							<Text color="#6E6E6E">1st year student</Text>
							<Button
								variant="subtle"
								color="#67737E"
								class="bg-[#E1F2F3] w-36 h-3 flex justify-center items-center rounded-xl py-3"
								on:click={() => goto('/my/settings')}>Edit profile</Button
							>
						</Stack>
						<Flex class="w-36 -mt-16 float-right mr-[5%]" align="center" justify="space-evenly">
							{#if userData.telegramLink}
								<a href={userData.telegramLink}><Telegram class="w-8 h-8" color="#6E6E6E" /></a>
							{/if}
							{#if userData.githubLink}
								<a href={userData.githubLink}><GithubLogo class="w-8 h-8" color="#6E6E6E" /></a>
							{/if}
							{#if userData.behanceLink}
								<a href={userData.behanceLink}><Behance class="w-8 h-8" color="#6E6E6E" /></a>
							{/if}
						</Flex>
					</Flex>
				</Flex>
				<Stack class="mt-5">
					<Title order={2} class="w-full font-[500] my-3">About</Title>
					<Text>
						{userData.about ? userData.about : 'You can write something here'}</Text
					>
				</Stack>
				<Stack class="mt-5">
					<Title order={2} class="font-[500] my-3">Technologies</Title>
					<Flex justify="flex-start" wrap="wrap">
						{#if userData.tags}
							{#each userData.tags as tag}
								<Paper
									class="bg-[#CFE4F7] w-auto h-3 flex justify-center items-center rounded-2xl py-4 px-6 text-[#67737E] font-[500] mb-5 mr-3"
								>
									{tag}
								</Paper>
							{/each}
						{:else}
							You haven't specified your technologies yet. It's time to fix it!
						{/if}
					</Flex>
				</Stack>
			</Paper>
		</Doc>
		<div slot="signedOut">Login to see your profile</div>
	</User>
</FirebaseApp>
