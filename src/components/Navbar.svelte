<script lang="ts">
	import { capitalizeFirstLetter } from '$utils';
	import { page } from '$app/stores';
	// import { title } from '$utils/styles';
	import * as Icon from 'svelte-mono-icons';
	import { css } from '@emotion/css';
	let mobileMenuWidth: number = 0;
	let mobileMenuWidthVar: number = 90;
	let mobileMenuNumber: number = 0;
	let indicatorSize: number = 62;
	let navOptions = [
		{ page: '/', icon: Icon.HomeIcon },
		{ page: '/profile', icon: Icon.UserIcon },
		{ page: '/message', icon: Icon.MessageIcon },
		{ page: '/photos', icon: Icon.CameraIcon },
		{ page: '/settings', icon: Icon.SettingsIcon }
	];
	navOptions.forEach((item, i) => {
		if ($page.url.pathname == item.page) {
			mobileMenuNumber = i;
		}
	});
</script>

<nav
	class="w-[99%] absolute bottom-[10px] h-[72px] flex justify-center items-center bg-white rounded-md sm:top-0 sm:w-full sm:rounded-none"
>
	<ul
		class="{css`
			width: ${mobileMenuWidthVar}%;
		`} flex justify-around text-black h-full items-center sm:w-full sm:justify-start sm:gap-9 "
	>
		{#each navOptions as Menu, i}
			<li class="z-[1] relative" on:click={() => (mobileMenuNumber = i)}>
				<a
					href={Menu.page}
					class="relative flex justify-center items-center flex-col w-full text-center"
				>
					<span
						class="{css`
							transition-timing-function: cubic-bezier(0.01, 0.07, 0.13, 1.33);
						`} transition-transform duration-[0.3s] block leading-[75px] text-center sm:hidden {mobileMenuNumber ==
						i
							? 'translate-y-[-35px]'
							: ''}"
					>
						<Menu.icon size="24" />
					</span>
					<span
						class="{css`
							transition-timing-function: cubic-bezier(0.01, 0.07, 0.13, 1.33);
						`} absolute font-normal text-black text-[0.75em] tracking-wider transition-transform duration-[0.3s] translate-y-[20px] {mobileMenuNumber ==
						i
							? 'text-black translate-y-[10px] sm:text-red-400'
							: 'text-white'} sm:text-black sm:relative sm:translate-y-0"
						>{Menu.page == '/'
							? 'Home'
							: Menu.page.startsWith('/') && capitalizeFirstLetter(Menu.page.slice(1))}</span
					>
				</a>
			</li>
		{/each}
	</ul>
</nav>

<div
	bind:offsetWidth={mobileMenuWidth}
	class="{css`
		position: absolute;
		bottom: 50px;
		width: ${mobileMenuWidthVar}%;
		margin-left: ${(mobileMenuWidth * ((100 - mobileMenuWidthVar) / 100)) / 2}px;
		margin-right: ${(mobileMenuWidth * ((100 - mobileMenuWidthVar) / 100)) / 2}px;
		height: ${indicatorSize}px;
		background-color: transparent;
	`} sm:hidden"
>
	<div
		class={css`
			color: white;
			background-color: lightgreen;
			width: ${indicatorSize}px;
			height: ${indicatorSize}px;
			border-radius: 50%;
			border: 5px solid #475569;

			transition: transform 0.3s;
			transition-timing-function: cubic-bezier(0.01, 0.07, 0.13, 1.33);
			transform: translateX(
				${(mobileMenuWidth / 5) * mobileMenuNumber + (mobileMenuWidth / 5 - indicatorSize) / 2}px
			);
			&::before {
				content: '';
				position: absolute;
				top: 49%;
				left: -21.6px;
				width: 20px;
				height: 20px;
				background: transparent;
				border-top-right-radius: 15px;
				box-shadow: 1px -10px 0 0 #475569;
			}
			&::after {
				content: '';
				position: absolute;
				top: 49%;
				right: -22px;
				width: 20px;
				height: 20px;
				background: transparent;
				border-top-left-radius: 15px;
				box-shadow: -1px -10px 0 0 #475569;
			}
		`}
	/>
</div>
