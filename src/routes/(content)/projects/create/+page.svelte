<script lang="ts">
	import { goto } from '$app/navigation';
	import { User, Doc, FirebaseApp, auth, firestore } from '$lib';
	import { Flex, Paper, Skeleton, Stack, Title, Textarea, Button } from '@svelteuidev/core';
	import {
		collection,
		getDocs,
		type DocumentData,
		query,
		where,
		addDoc
	} from 'firebase/firestore';
	import { Cross2 } from 'radix-icons-svelte';
	import { onMount } from 'svelte';

	let title: string;
	let description: string;

	let contributors = [] as Array<string>;
	let tags = [] as string[];

	let newTagValue: string;

	let autocompleteValue = '';
	let autocompleteFocus = false;

	let candidates = [] as DocumentData[];
	let filteredCandidates = [] as DocumentData[];

	onMount(async () => {
		const candidatesSnapshot = await getDocs(collection(firestore, '/users'));
		candidatesSnapshot.forEach((candidate) => {
			candidates.push(candidate.data());
		});
		candidates = candidates;
		filteredCandidates = filterCandidates(candidates);

		if (auth.currentUser) {
			contributors = [`users/${auth.currentUser.uid}`];
		}
	});

	function handleNewTag(e: KeyboardEvent) {
		if (e.key !== 'Enter') return;
		tags = [...tags, newTagValue];
		newTagValue = '';
	}

	function handleDeleteTag(tagToDelete: string) {
		tags = tags.filter((el) => el !== tagToDelete);
	}

	async function addContributor(contributor: DocumentData) {
		const contributorQuery = query(
			collection(firestore, '/users'),
			where('username', '==', contributor.username)
		);
		const contributorSnapCol = await getDocs(contributorQuery);
		let contributorRef = contributorSnapCol.docs[0];
		console.log(contributors, contributorRef.ref.path);
		if (contributors.includes(contributorRef.ref.path)) return;
		contributors.push(contributorRef.ref.path);
		autocompleteFocus = false;
		contributors = contributors;
	}
	function deleteContributor(contributorRef: string) {
		contributors = contributors.filter((contributor) => contributor !== contributorRef);
	}
	function filterCandidates(candidates: DocumentData[]) {
		candidates = candidates.filter((candidate) => {
			let containsSearch = `${candidate.name} ${candidate.surname}`
				.toLocaleLowerCase()
				.includes(autocompleteValue.toLocaleLowerCase());
			// TODO: Add the already contributor check
			let AlreadyContributor = false;
			return containsSearch && !AlreadyContributor;
		});
		if (candidates.length > 5) return candidates.slice(0, 5);
		return candidates;
	}

	async function submitProject() {
		await addDoc(collection(firestore, 'projects'), { title, tags, description, contributors });
		goto('/projects');
	}
</script>

<svelte:head>
	<title>New project | LinkedIn't</title>
</svelte:head>

<FirebaseApp {auth} {firestore}>
	<User>
		<Paper class="mb-40 rounded-xl px-[8%] py-[5%]">
			<Title order={1}><b>New project</b></Title>
			<Stack spacing="sm" class="w-2/5 mt-8">
				<label for="title" class="font-[400] text-lg">Title</label>
				<input
					class="w-full h-8 bg-[#F8F9FA] border-2 rounded-xl p-4 placeholder-gray-500 placeholder-opacity-100 border-[#C9CFD6] focus:text-black"
					id="title"
					placeholder="Enter project title"
					bind:value={title}
				/>
			</Stack>
			<Stack class="w-[90%] mt-[3%]">
				<label for="year" class="font-[400] text-lg">Description</label>
				<Textarea
					class="[&>*>*]:p-2 [&>*>*]:border-[#C9CFD6] [&>*>*]:bg-[#F8F9FA] [&>*>*]:pb-[5%] focus:[&>*>*]:border-black [&>*>*]:border-2 [&>*>*]:rounded-xl"
					bind:value={description}
					placeholder="Describe your project"
					variant="unstyled"
				/>
			</Stack>
			<Title order={2} class="mt-[5%]"><b>Team members</b></Title>
			<Stack spacing="sm" class="w-2/5 mt-8">
				<label for="title" class="font-[400] text-lg">Add new member</label>
				<input
					placeholder="Search by name"
					class="border-2 border-[#C9CFD6] rounded-xl bg-[#F8F9FA] px-3 py-1"
					bind:value={autocompleteValue}
					on:click={() => (autocompleteFocus = !autocompleteFocus)}
					on:keydown={() => (filteredCandidates = filterCandidates(candidates))}
				/>
				<div>
					{#if autocompleteFocus}
						<div
							class="flex justify-center flex-col border-2 border-[#C9CFD6] rounded-xl bg-[#F8F9FA] absolute ml-[2%] z-20 px-5"
						>
							{#each filteredCandidates as candidate}
								<button
									on:click={() => addContributor(candidate)}
									class="text-center py-3 text-gray-400 hover:text-black z-50"
								>
									{`${candidate.name} ${candidate.surname}`}
								</button>
							{/each}
						</div>
					{/if}
				</div>
			</Stack>
			<Flex class="mt-8">
				<Stack class="w-1/2">
					<p>Members</p>
					{#each contributors as contributorRef}
						<Flex>
							<Skeleton circle height={75} />
							<Doc ref={contributorRef} let:data={contributor}>
								<Stack class="ml-5">
									<p class="text-xl -mt-2">
										{`${contributor.name} ${contributor.surname}`}
									</p>
									{#if contributor.year}
										<p class="-mt-4 text-sm text-[#6E6E6E]">{contributor.year}</p>
									{/if}
								</Stack>
							</Doc>
						</Flex>
					{/each}
				</Stack>
				<Stack class="w-1/2">
					<p>Status</p>
					{#each contributors as contributorRef, id}
						{#if id === 0}
							<p class="bg-[#C2F8D6] w-auto my-auto mr-auto px-6 py-2 rounded-3xl">Admin</p>
						{:else}
							<p
								class="bg-[#D4EAFF] w-auto my-auto mr-auto px-6 py-2 rounded-3xl flex items-center"
							>
								Invited <button
									class="ml-1 hover:[&>*>*]:fill-black"
									on:click={() => deleteContributor(contributorRef)}><Cross2 color="gray" /></button
								>
							</p>
						{/if}
					{/each}
				</Stack>
			</Flex>
			<Title order={2} class="mt-[5%]"><b>Tags</b></Title>
			<Stack class="w-[90%] mt-5">
				<div class="h-auto">
					<input
						class="w-full h-8 bg-[#F8F9FA] border-2 rounded-lg p-4 border-[#C9CFD6] text-black"
						placeholder="Enter new tag"
						bind:value={newTagValue}
						on:keydown={handleNewTag}
					/>
					<Flex class="w-full flex-wrap [&>*]:mt-[2%] [&>*]:mr-[2%]">
						{#if tags.length > 0}
							{#each tags as tag}
								<div class="bg-blue-100 px-4 py-2 rounded-2xl flex items-center max-h-16 w-auto">
									{tag}
									<button type="button" on:click={() => handleDeleteTag(tag)}>
										<Cross2 class="mt-[2%] ml-[2%] [color:gray] hover:[color:black]" size={20} />
									</button>
								</div>
							{/each}
						{:else}
							<div class="mt-5 ml-2">You haven't specified your tags yet. It's time to fix it!</div>
						{/if}
					</Flex>
				</div>
			</Stack>
			<Button
				variant="subtle"
				color="#19191D"
				class="bg-[#B3E9D5] hover:bg-[#6bd9b3] mt-[5%] rounded-3xl w-1/5 h-14 text-xl font-[500]"
				type="button"
				on:click={submitProject}
			>
				Upload
			</Button>
		</Paper>
		<div slot="signedOut">Login or register to create groups</div>
	</User>
</FirebaseApp>
