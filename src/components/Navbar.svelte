<script lang="ts">
	import { getJsVariables, capitalizeFirstLetter } from '$utils';
	import { title } from '$utils/styles';
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
</script>

<nav
	class="w-[99%] absolute bottom-[10px] h-[72px] flex justify-center items-center bg-white rounded-md"
>
	<ul
		class="{css`
			width: ${mobileMenuWidthVar}%;
		`} flex justify-around text-black h-full sm:bg-slate-400 items-center"
	>
		{#each navOptions as Menu, i}
			<li class="{css``} z-[1] relative" on:click={() => (mobileMenuNumber = i)}>
				<a
					href={Menu.page}
					class="relative flex justify-center items-center flex-col w-full text-center"
				>
					<span
						class="transition duration-[0.5s] block leading-[75px] text-center {mobileMenuNumber ==
						i
							? 'translate-y-[-35px]'
							: ''}"
					>
						<Menu.icon size="24" />
					</span>
					<span
						class="absolute font-normal text-black text-[0.75em] tracking-wider transition duration-[0.5s] translate-y-[20px] {mobileMenuNumber ==
						i
							? 'opacity-1 translate-y-[10px]'
							: 'opacity-0'}"
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
	class={css`
		position: absolute;
		bottom: 50px;
		width: ${mobileMenuWidthVar}%;
		margin-left: ${(mobileMenuWidth * ((100 - mobileMenuWidthVar) / 100)) / 2}px;
		margin-right: ${(mobileMenuWidth * ((100 - mobileMenuWidthVar) / 100)) / 2}px;
		height: ${indicatorSize}px;
		background-color: transparent;
	`}
>
	<div
		class={css`
			color: white;
			background-color: lightgreen;
			width: ${indicatorSize}px;
			height: ${indicatorSize}px;
			border-radius: 50%;
			border: 5px solid #475569;
			transition: transform 0.5s;
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
