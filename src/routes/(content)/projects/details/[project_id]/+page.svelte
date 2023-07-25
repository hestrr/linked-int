<script lang="ts">
	import { User, Doc, FirebaseApp, auth, firestore } from '$lib';
	import { Flex, Paper, Skeleton, Stack, Title, Text, Button, Group } from '@svelteuidev/core';
	import LeftArrow from '~icons/teenyicons/arrow-solid';
	import { goto } from '$app/navigation';

	export let data: { project_id: string };
</script>

<svelte:head>
	<title>Project Details | LinkedIn't</title>
</svelte:head>

<FirebaseApp {auth} {firestore}>
	<User>
		<Doc ref={`projects/${data.project_id}`} let:data={projectData}>
			<Paper class="mb-40 rounded-xl px-[8%] py-[5%]">
				<a href="/projects" class="flex items-center text-xl text-[#3C7E82]"
					><LeftArrow class="-rotate-45 mr-3" color="#3C7E82" /> <b>Back to all projects</b></a
				>
				<Title order={1} class="mt-[5%] font-[500]"><b>{projectData.title}</b></Title>
				<Text class="mt-[5%]">{projectData.description}</Text>
				<Title order={2} class="mt-[5%]"><b>Team members</b></Title>
				<Flex class="w-full flex-wrap">
					{#each projectData.contributors as contributorRef}
						<Flex class="w-1/2 mt-[3%]">
							<button
								class="flex w-full h-full"
								style="text-align: start"
								on:click={() => goto('/user/' + contributorRef.split('/')[1])}
							>
								<Flex>
									<Skeleton circle height={75} />
									<Doc ref={contributorRef} let:data={contributor}>
										<Stack class="ml-5">
											<p class="text-xl -mt-2">
												{`${contributor.name} ${contributor.surname}`}
											</p>
											<p class="-mt-4 text-sm text-[#6E6E6E]">{contributor.year}</p>
										</Stack>
									</Doc>
								</Flex>
							</button>
						</Flex>
					{/each}
				</Flex>
				<Title order={2} class="mt-[5%]"><b>Tags</b></Title>
				<Group class="mt-6">
					{#each projectData.tags as tag}
						<Paper
							class="bg-[#CFE4F7] w-auto h-3 flex justify-center items-center rounded-xl py-[2%] px-[4%] text-[#4A545D] font-[500]"
						>
							{tag}
						</Paper>
					{/each}
				</Group>
				<Button class="rounded-3xl px-[8%] py-[4%] text-2xl mt-[5%]" color="#7DC9BC">Join</Button>
			</Paper>
		</Doc>
	</User>
</FirebaseApp>
