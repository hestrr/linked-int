<script lang="ts">
	import { goto } from '$app/navigation';
	import { FirebaseApp, firestore, auth } from '$lib';
	import Collection from '$lib/Collection.svelte';
	import Doc from '$lib/Doc.svelte';
	import { Title, Skeleton, Stack, Paper, Group } from '@svelteuidev/core';

	const projects = [
		{
			name: 'Very Awesome Name',
			description: 'FWD Final project. Creative people welcomed',
			tags: ['Web', 'React', 'Firebase'],
			participants: ['Polina', 'Dias', 'Roman']
		},
		{
			name: 'Very Awesome Name',
			description:
				'Image recognition capstone project. We are looking for someone who has experience with CV. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis semper ante efficitur malesuada accumsan.',
			tags: ['AI/ML', 'TensorFlow', '4th year', 'Python', 'PostgreSQL'],
			participants: ['Daniil', 'Adel']
		},
		{
			name: 'Very Awesome Name',
			description: 'FWD Final project. Creative people welcomed',
			tags: ['Web', 'React', 'Firebase'],
			participants: ['Polina', 'Dias', 'Roman']
		},
		{
			name: 'Very Awesome Name',
			description: 'FWD Final project. Creative people welcomed',
			tags: ['Web', 'React', 'Firebase'],
			participants: ['Polina', 'Dias', 'Roman']
		}
	];
</script>

<svelte:head>
	<title>Projects | LinkedIn't</title>
</svelte:head>
<FirebaseApp {auth} {firestore}>
	<Collection ref="/projects" let:data={projects}>
		{#each projects as project}
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
		{/each}
	</Collection>
</FirebaseApp>
