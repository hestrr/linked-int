<script lang="ts">
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

{#each projects as project}
	<Paper class="flex mb-5 rounded-lg">
		<Stack spacing="md" class="w-3/5">
			<Title order={2} class="font-[600]">{project.name}</Title>
			<p class="text-gray-500 font-[500]">{project.description}</p>
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
				{#each project.participants.reverse() as participant}
					<Stack>
						<Skeleton circle height={50} />
						<p class="-mt-3 text-center font-[400]">{participant}</p>
					</Stack>
				{/each}
			</Group>
		</Stack>
	</Paper>
{/each}
