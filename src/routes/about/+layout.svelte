<script lang="ts">
    import {
        AppShell,
        Navbar,
        Header,
        Title,
        Skeleton,
        ShellSection,
        Stack,
        Button,
        Flex
    } from '@svelteuidev/core';
    import Person from '~icons/material-symbols/person';
    import BookmarkFilled from '~icons/material-symbols/bookmark';
    import List from '~icons/ph/list-fill';
    import Bell from '~icons/mdi/bell';
    import { goto } from '$app/navigation';
    import { auth, firestore, FirebaseApp, User, logout } from '$lib';

</script>

<FirebaseApp {auth} {firestore}>
    <AppShell class="h-auto min-h-screen bg-gradient-to-br from-[#3AA0A6] to-[#A3FCC3]">
        <Header slot="header" height={'75px'} class="flex items-center">
            <Title class="ml-[6%] font-plex font-[600]"><b>LinkedIn't</b></Title>
            <!--			<TextInput-->
            <!--				placeholder="Search"-->
            <!--				icon={MagnifyingGlassTS}-->
            <!--				class="w-1/4 ml-[8.5%]"-->
            <!--				radius="xl"-->
            <!--				variant="filled"-->
            <!--			/>-->
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
        <ShellSection grow className="w-2/3 ml-16"><slot /></ShellSection>
    </AppShell>
</FirebaseApp>
