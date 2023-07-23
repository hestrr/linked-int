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
		Flex
	} from '@svelteuidev/core';
	import { MagnifyingGlass } from 'radix-icons-svelte';
	import Person from '~icons/material-symbols/person';
	import BookmarkFilled from '~icons/material-symbols/bookmark';
	import List from '~icons/ph/list-fill';
	import Bell from '~icons/mdi/bell';
	import { goto } from '$app/navigation';
	import { auth, firestore, FirebaseApp, User, logout } from '$lib';

	// so typescript doesn't cry about the type "MagnifyingGlass" is not an SVG type
	const MagnifyingGlassTS = MagnifyingGlass as unknown as undefined;
</script>

<FirebaseApp {auth} {firestore}>
	<AppShell class="h-auto min-h-screen bg-[#EAF4F4]">
		<Header slot="header" height={'75px'} class="flex items-center">
			<Title class="ml-[6%] font-plex font-[600]"><b>LinkedIn't</b></Title>
			<TextInput
				placeholder="Search"
				icon={MagnifyingGlassTS}
				class="w-1/4 ml-[8.5%]"
				radius="xl"
				variant="filled"
			/>
			<User>
				<button on:click={() => logout()} class="ml-auto mr-44">
					<Skeleton circle height={50} />
				</button>
				<div slot="signedOut" class="w-[17%] h-full ml-auto mr-[3%]">
					<Flex class="w-full h-full" justify="space-between" align="center">
						<Button
							variant="outline"
							color="#35484E"
							on:click={() => goto('/auth/register')}
							class="rounded-2xl px-5 hover:bg-gray-200  text-xl  font-[500]">Sign Up</Button
						>
						<Button
							variant="subtle"
							color="#35484E"
							on:click={() => goto('/auth/login')}
							class="rounded-2xl px-5 hover:bg-gray-200 text-xl font-[500]">Log in</Button
						>
					</Flex>
				</div>
			</User>
		</Header>
		<Navbar slot="navbar" class="h-full w-1/5 bg-[#EAF4F4] mt-6">
			<Stack class="flex h-full ml-auto w-50" spacing="lg">
				<Button
					variant="subtle"
					color="gray"
					size="xl"
					class="hover:bg-[#EAF4F4] mr-auto h-auto  font-[500]"
					on:click={() => goto('/projects')}
				>
					<List slot="leftIcon" color="#646F70" />Ongoing projects
				</Button>
				<Button
					variant="subtle"
					color="gray"
					size="xl"
					class="hover:bg-[#EAF4F4] mr-auto h-auto font-[500]"
					on:click={() => goto('/my/projects')}
				>
					<BookmarkFilled slot="leftIcon" color="#646F70" />My projects
				</Button>
				<Button
					variant="subtle"
					color="gray"
					size="xl"
					class="hover:bg-[#EAF4F4] mr-auto h-auto  font-[500]"
					on:click={() => goto('/my/profile')}
				>
					<Person slot="leftIcon" color="#646F70" />Profile
				</Button>
				<Button
					variant="subtle"
					color="gray"
					size="xl"
					class="hover:bg-[#EAF4F4] mr-auto h-auto  font-[500]"
					on:click={() => goto('/my/notifications')}
				>
					<Bell slot="leftIcon" color="#646F70" />Notifications
				</Button>
				<Button
					variant="subtle"
					color="#19191D"
					class="bg-[#B3E9D5] hover:bg-[#6bd9b3] ml-auto mr-auto rounded-3xl w-10/12 h-16 text-xl font-[500]"
					on:click={() => goto('/projects/create')}
				>
					New Post
				</Button>
			</Stack>
		</Navbar>
		<ShellSection grow className="w-2/3 ml-16 h-full"><slot /></ShellSection>
	</AppShell>
</FirebaseApp>
