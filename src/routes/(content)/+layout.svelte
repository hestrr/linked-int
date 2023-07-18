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
		Button
	} from '@svelteuidev/core';
	import { MagnifyingGlass, ListBullet, BookmarkFilled, Person } from 'radix-icons-svelte';

	// so typescript doesn't cry about the type "MagnifyingGlass" is not an SVG type
	const MagnifyingGlassTS = MagnifyingGlass as unknown as undefined;
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
	<ShellSection grow className="w-2/3 ml-16 h-full"><slot /></ShellSection>
</AppShell>
