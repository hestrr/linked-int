<script lang="ts">
	import {
		AppShell,
		Navbar,
		Header,
		Title,
		TextInput,
		Skeleton,
		ShellSection,
		Stack,
		Button,
		Paper,
		Group
	} from '@svelteuidev/core';
	import { MagnifyingGlass, ListBullet, BookmarkFilled, Person } from 'radix-icons-svelte';

	// so typescript doesn't cry about the type "MagnifyingGlass" is not an SVG type
	const MagnifyingGlassTS = MagnifyingGlass as unknown as undefined;

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

<AppShell class="h-auto bg-[#EAF4F4]">
	<Header slot="header" height={'75px'} class="flex items-center">
		<Title class="ml-36"><b>LinkedIn't</b></Title>
		<TextInput placeholder="Search" icon={MagnifyingGlassTS} class="w-1/4 ml-24" radius="xl" />
		<Skeleton circle height={50} class="ml-auto mr-44" />
	</Header>
	<Navbar slot="navbar" class="h-64 w-1/5 bg-[#EAF4F4] mt-6">
		<Stack class="w-50 h-full flex ml-auto" justify="flex-start">
			<Button variant="subtle" color="gray" size="xl" class="hover:bg-[#EAF4F4] mr-auto">
				<ListBullet slot="leftIcon" />Feed
			</Button>
			<Button variant="subtle" color="gray" size="xl" class="hover:bg-[#EAF4F4] mr-auto">
				<BookmarkFilled slot="leftIcon" />My projects
			</Button>
			<Button variant="subtle" color="gray" size="xl" class="hover:bg-[#EAF4F4] mr-auto">
				<Person slot="leftIcon" />Profile
			</Button>
			<Button
				variant="subtle"
				color="black"
				class="bg-[#B3E9D5] hover:bg-[#B3E9D5] ml-auto mr-auto rounded-3xl w-10/12 h-16 text-xl"
			>
				New Post
			</Button>
		</Stack>
	</Navbar>
	<ShellSection grow className="w-2/3 ml-16">
		{#each projects as project}
			<Paper class="flex mb-5">
				<Stack spacing="md" class="w-3/5">
					<Title order={2}><b>{project.name}</b></Title>
					<p class="text-gray-500">{project.description}</p>
					<Group class="mt-6">
						{#each project.tags as tag}
							<Paper
								class="bg-[#CFE4F7] w-auto h-3 flex justify-center items-center rounded-xl py-3 px-2 text-[#67737E]"
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
								<p class="-mt-3 text-center">{participant}</p>
							</Stack>
						{/each}
					</Group>
				</Stack>
			</Paper>
		{/each}
	</ShellSection>
</AppShell>
