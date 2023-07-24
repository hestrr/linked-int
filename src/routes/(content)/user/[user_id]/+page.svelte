<script lang="ts">
	import { Paper, Skeleton, Title, Flex, Stack, Text } from '@svelteuidev/core';
	import Telegram from '~icons/fa6-brands/telegram';
	import Behance from '~icons/devicon-plain/behance';
	import { GithubLogo } from 'radix-icons-svelte';
	import { Doc, User, auth, firestore } from '$lib';
	import FirebaseApp from '$lib/FirebaseApp.svelte';

	export let data: { user_id: string };
</script>

<FirebaseApp {auth} {firestore}>
	<User>
		<Doc ref={`users/${data.user_id}`} let:data={userData}>
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
						{userData.about}</Text
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
							No technologies
						{/if}
					</Flex>
				</Stack>
			</Paper>
		</Doc>
	</User>
</FirebaseApp>
