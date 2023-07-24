<script lang="ts">
	import { goto } from '$app/navigation';
	import { FirebaseApp, firestore, auth, User } from '$lib';
	import Collection from '$lib/Collection.svelte';
	import Doc from '$lib/Doc.svelte';
	import { Title, Skeleton, Stack, Paper, Group } from '@svelteuidev/core';
</script>

<svelte:head>
	<title>My projects | LinkedIn't</title>
</svelte:head>
<FirebaseApp {auth} {firestore}>
	<User let:user>
		<Collection ref="/projects" let:data={projects}>
			{#each projects as project}
				{#if project.contributors.includes('users/' + user.uid)}
					<Paper class="flex mb-5 rounded-lg">
						<button
							class="flex w-full h-full"
							on:click={() => goto(`/projects/details/${project.ref.id}`)}
						>
							<Stack spacing="md" class="w-3/5">
								<Title order={2} class="font-[600]">{project.title}</Title>
								<p class="text-gray-500 font-[500] text-left">{project.description}</p>
								<Group class="mt-6">
									{#each project.tags as tag}
										<Paper
											class="bg-[#CFE4F7] w-auto h-3 flex justify-center items-center rounded-xl py-3 px-2 text-[#67737E] font-[500]"
										>
											{tag}
										</Paper>
									{/each}
								</Group>
							</Stack>
							<Stack class="w-2/5 ml-auto mb-auto">
								<Group class="w-full flex-row-reverse pr-12">
									{#each project.contributors.reverse() as contributorRef}
										<Doc ref={contributorRef} let:data={contributor}>
											<Stack>
												<Skeleton circle height={50} />
												<p class="-mt-3 text-center font-[400]">
													{contributor.name}
												</p>
											</Stack>
										</Doc>
									{/each}
								</Group>
							</Stack>
						</button>
					</Paper>
				{/if}
			{/each}
		</Collection>
	</User>
</FirebaseApp>
