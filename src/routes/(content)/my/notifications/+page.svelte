<script>
	import { Doc, Collection, FirebaseApp, auth, firestore, User } from '$lib';
	import { Paper, Flex, Skeleton, Stack, Button } from '@svelteuidev/core';
</script>

<svelte:head>
	<title>My notifications | LinkedIn't</title>
</svelte:head>

<FirebaseApp {auth} {firestore}>
	<User let:user>
		<Collection ref={`users/${user.uid}/notifications`} let:data={notificationRefs}>
			{#each notificationRefs as notificationRef}
				<Paper class="mb-5 rounded-xl">
					<Flex>
						<Skeleton circle height={50} />
						<Doc
							ref={`users/${user.uid}/notifications/${notificationRef.id}`}
							let:data={notification}
						>
							<Stack class="ml-5 text-lg">
								{#if notification.type === 'incoming_join'}
									<p>
										<Doc ref={notification.requester.path} let:data={requester}>
											<b>{`${requester.name} ${requester.surname}`}</b> wants to join your project team
										</Doc>
										<Doc ref={notification.project.path} let:data={project}>
											<b>{project.title}</b>
										</Doc>
									</p>
								{:else if notification.type === 'answer_join'}
									<p class="mb-auto">
										<Doc ref={notification.admin.path} let:data={admin}>
											<b>{`${admin.name} ${admin.surname}`}</b>
										</Doc>
										{#if notification.success}
											accepted
										{:else}
											declined
										{/if}
										you into the project team
										<Doc ref={notification.project.path} let:data={project}>
											<b>{project.title}</b>
										</Doc>
									</p>
								{:else if notification.type === 'incoming_invite'}
									<p>
										<Doc ref={notification.admin.path} let:data={admin}>
											<b>{`${admin.name} ${admin.surname}`}</b>
										</Doc>
										has invited you into his/her project
										<Doc ref={notification.project.path} let:data={project}>
											<b>{project.title}</b>
										</Doc>
									</p>
								{:else if notification.type === 'answer_invite'}
									<p class="mb-auto">
										<Doc ref={notification.requester.path} let:data={requester}>
											<b>{`${requester.name} ${requester.surname}`}</b>
										</Doc>
										{#if notification.success}
											accepted
										{:else}
											declined
										{/if}
										your invitation into your project team
										<Doc ref={notification.project.path} let:data={project}>
											<b>{project.title}</b>
										</Doc>
									</p>
								{/if}
								{#if notification.type === 'incoming_join' || notification.type === 'incoming_invite'}
									<Flex>
										<Button variant="white" color="green" class="text-lg">Accept</Button>
										<Button variant="white" color="red" class="text-lg">Decline</Button>
									</Flex>
								{/if}
							</Stack>
						</Doc>
					</Flex>
				</Paper>
			{/each}
		</Collection>
	</User>
</FirebaseApp>
