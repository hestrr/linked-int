<script lang="ts">
	import { User, Doc, FirebaseApp, auth, firestore } from '$lib';
	import { Flex, Paper, Skeleton, Stack, Title, Text, Button, Group } from '@svelteuidev/core';
	import LeftArrow from '~icons/teenyicons/arrow-solid';
	import { goto } from '$app/navigation';
	import { deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';
	import { onMount } from 'svelte';

	export let data: { project_id: string };

	let projectStatus: 'unrelated' | 'requestSent' | 'alreadyJoined' = 'unrelated';

	function handleJoin(currentUserUID: string, adminUID: string) {
		setDoc(
			doc(
				firestore,
				`users/${adminUID}/notifications`,
				`ij-${currentUserUID}-${adminUID}-${data.project_id}`
			),
			{
				type: 'incoming_join',
				requester: doc(firestore, 'users', currentUserUID),
				project: doc(firestore, 'projects', data.project_id)
			}
		);
		projectStatus = 'requestSent';
	}

	async function deleteProject() {
		await deleteDoc(doc(firestore, 'projects', data.project_id));
		await goto('/projects');
	}

	onMount(async () => {
		const projectSnapshot = await getDoc(doc(firestore, 'projects', data.project_id));
		const project = projectSnapshot.data();
		if (project?.contributors.includes(doc(firestore, 'users', `${auth.currentUser?.uid}`).path)) {
			projectStatus = 'alreadyJoined';
			return;
		}
		const request = await getDoc(
			doc(
				firestore,
				`users/${project?.admin.id}/notifications`,
				`ij-${auth.currentUser?.uid}-${project?.admin.id}-${data.project_id}`
			)
		);
		if (request.exists()) {
			projectStatus = 'requestSent';
		}
	});
</script>

<svelte:head>
	<title>Project Details | LinkedIn't</title>
</svelte:head>

<FirebaseApp {auth} {firestore}>
	<User let:user>
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
				<Flex class="flex-wrap items-end">
					{#if projectStatus === 'requestSent'}
						<Button
							class="rounded-3xl px-[8%] py-[4%] text-2xl mt-[5%]"
							color="#7DC9BC"
							disabled={true}
							on:click={() => handleJoin(user.uid, projectData.admin.id)}>Request sent</Button
						>
					{:else if projectStatus === 'alreadyJoined'}
						<Button
							class="rounded-3xl px-[8%] py-[4%] text-2xl mt-[5%]"
							color="#7DC9BC"
							disabled={true}
							on:click={() => handleJoin(user.uid, projectData.admin.id)}>Already in project</Button
						>
					{:else}
						<Button
							class="rounded-3xl px-[8%] py-[4%] text-2xl mt-[5%]"
							color="#7DC9BC"
							on:click={() => handleJoin(user.uid, projectData.admin.id)}>Join</Button
						>
					{/if}
					{#if projectData.admin.id === user.uid}
						<Button
							class="ml-[10%]"
							size={'lg'}
							variant="subtle"
							color="red"
							on:click={deleteProject}>Delete project</Button
						>
					{/if}
				</Flex>
			</Paper>
		</Doc>
	</User>
</FirebaseApp>
