<script lang="ts">
	import { Doc, Collection, FirebaseApp, auth, firestore, User } from '$lib';
	import { Paper, Flex, Skeleton, Stack, Button } from '@svelteuidev/core';
	import { DocumentReference, deleteDoc, doc, setDoc, getDoc } from 'firebase/firestore';

	interface IncomingJoin {
		type: string;
		project: DocumentReference;
		requester: DocumentReference;
	}

	interface AnswerJoin {
		type: string;
		project: DocumentReference;
		admin: DocumentReference;
		success: boolean;
	}

	interface IncomingInvite {
		type: string;
		project: DocumentReference;
		admin: DocumentReference;
	}

	interface AnswerInvite {
		type: string;
		project: DocumentReference;
		requester: DocumentReference;
		success: boolean;
	}

	async function acceptIncomingJoin(notification: IncomingJoin, notificationRefId: string) {
		const project = await getDoc(notification.project);
		const contributors = project.data()?.contributors;
		contributors.push(notification.requester);
		await setDoc(notification.project, { ...project.data(), contributors });
		await deleteDoc(
			doc(firestore, `users/${auth.currentUser?.uid}/notifications`, notificationRefId)
		);
		await setDoc(
			doc(
				firestore,
				`users/${notification.requester.id}/notifications`,
				`ij-${auth.currentUser?.uid}-${notification.requester.id}-${project.id}`
			),
			{
				type: 'answer_join',
				project: notification.project,
				admin: doc(firestore, 'users', `${auth.currentUser?.uid}`),
				success: true
			} as AnswerJoin
		);
	}
	async function declineIncomingJoin(notification: IncomingJoin, notificationRefId: string) {
		await deleteDoc(
			doc(firestore, `users/${auth.currentUser?.uid}/notifications`, notificationRefId)
		);
		await setDoc(
			doc(
				firestore,
				`users/${notification.requester.id}/notifications`,
				`ij-${auth.currentUser?.uid}-${notification.requester.id}-${notification.project.id}`
			),
			{
				type: 'answer_join',
				project: notification.project,
				admin: doc(firestore, 'users', `${auth.currentUser?.uid}`),
				success: false
			} as AnswerJoin
		);
	}
	async function acceptIncomingInvite(notification: IncomingInvite, notificationRefId: string) {
		const project = await getDoc(notification.project);
		const contributors = project.data()?.contributors;
		contributors.push(doc(firestore, 'users', `${auth.currentUser?.uid}`));
		await setDoc(notification.project, { ...project.data(), contributors });
		await deleteDoc(
			doc(firestore, `users/${auth.currentUser?.uid}/notifications`, notificationRefId)
		);
		await setDoc(
			doc(
				firestore,
				`users/${notification.admin.id}/notifications`,
				`ii-${auth.currentUser?.uid}-${notification.admin.id}-${notification.project.id}`
			),
			{
				type: 'answer_invite',
				project: notification.project,
				requester: doc(firestore, 'users', `${auth.currentUser?.uid}`),
				success: true
			} as AnswerInvite
		);
	}
	async function declineIncomingInvite(notification: IncomingInvite, notificationRefId: string) {
		await deleteDoc(
			doc(firestore, `users/${auth.currentUser?.uid}/notifications`, notificationRefId)
		);
		await setDoc(
			doc(
				firestore,
				`users/${notification.admin.id}/notifications`,
				`ii-${auth.currentUser?.uid}-${notification.admin.id}-${notification.project.id}`
			),
			{
				type: 'answer_invite',
				project: notification.project,
				requester: doc(firestore, 'users', `${auth.currentUser?.uid}`),
				success: false
			} as AnswerInvite
		);
	}
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
								{#if notification.type === 'incoming_join'}
									<Flex>
										<Button
											variant="white"
											color="green"
											class="text-lg"
											on:click={() => acceptIncomingJoin(notification, notificationRef.id)}
											>Accept</Button
										>
										<Button
											variant="white"
											color="red"
											class="text-lg"
											on:click={() => declineIncomingJoin(notification, notificationRef.id)}
											>Decline</Button
										>
									</Flex>
								{/if}
								{#if notification.type === 'incoming_invite'}
									<Flex>
										<Button
											variant="white"
											color="green"
											class="text-lg"
											on:click={() => acceptIncomingInvite(notification, notificationRef.id)}
											>Accept</Button
										>
										<Button
											variant="white"
											color="red"
											class="text-lg"
											on:click={() => declineIncomingInvite(notification, notificationRef.id)}
											>Decline</Button
										>
									</Flex>
								{/if}
							</Stack>
						</Doc>
					</Flex>
				</Paper>
			{/each}
			{#if notificationRefs.length === 0}
				You don't have any notifications yet
			{/if}
		</Collection>
		<div slot="signedOut">Login to see your notifications</div>
	</User>
</FirebaseApp>
