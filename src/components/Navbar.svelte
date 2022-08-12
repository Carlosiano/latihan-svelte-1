<script lang="ts">
	import { capitalizeFirstLetter } from '$utils';
	import { page } from '$app/stores';
	import {goto} from '$app/navigation';
	import Icon from '@iconify/svelte';
	import { css } from '@emotion/css';
	let mobileMenuWidth: number = 0;
	let mobileMenuWidthVar: number = 90;
	let mobileMenuNumber: number = 0;
	let indicatorSize: number = 62;
	let navOptions = [
		{ page: '/', icon: 'ion:home-outline' },
		{ page: '/profile',icon: 'ant-design:user-outlined' },
		{ page: '/message',icon: 'clarity:camera-line' },
		{ page: '/photos', icon: 'bi:chat-dots' },
		{ page: '/settings', icon: 'ep:setting' }
	];
	navOptions.forEach((item, i) => {
		if ($page.url.pathname == item.page) {
			mobileMenuNumber = i;
		}
	});
</script>


<!-- navigation container -->
<nav class={css`
		position: absolute;
		bottom: 1px;
		width: 99%;
		height: 72px;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: white;
		border-radius: 6px;
		@media (min-width: 640px) {
			position:relative;
			width: 100%;
			border-radius: 0;
		}
	`} >
	<!-- container for each item -->
	<ul class={css`
			width: ${mobileMenuWidthVar}%;
			display: flex;
			justify-content: space-around;
			color: black;
			height: 100%;
			align-items: center;
			@media (min-width: 640px) {
				width: 100%;
				justify-content: flex-start;
				gap: 2.25rem;
				padding-left: 30px;
				padding-right: 30px;
			}
		`}>
		{#each navOptions as Menu, i}
			<li class={css`z-index: 1; position: relative;`} on:click={() => {mobileMenuNumber = i; goto(Menu.page)}}>
				<span href={Menu.page} class="{css`position: relative; display: flex; justify-content: center; align-items: center; flex-direction: column; width: 100%; `} text-center">
					<span class="{css`
							transition-timing-function: cubic-bezier(0.01, 0.07, 0.13, 1.33);
						`} transition-transform duration-[0.3s] block leading-[75px] text-center sm:hidden {mobileMenuNumber ==
						i
							? 'translate-y-[-40px]'
							: ''}" >
						<Icon icon={Menu.icon} width="24" color={mobileMenuNumber == i && '#283140'} class="bg-sla"/>
						<!-- <Menu.icon size="24" /> -->
					</span>
					<span class="{css`
							transition-timing-function: cubic-bezier(0.01, 0.07, 0.13, 1.33);
						`} absolute font-normal text-black text-[0.75em] tracking-wider transition-transform duration-[0.3s] translate-y-[20px] {mobileMenuNumber ==
						i
							? 'text-black translate-y-[10px] sm:text-red-400 '
							: 'text-white sm:text-black '} sm:relative sm:translate-y-0">

							{Menu.page == '/'
							? 'Home'
							: Menu.page.startsWith('/') && capitalizeFirstLetter(Menu.page.slice(1))}
					</span>
				</span>
			</li>
		{/each}
	</ul>
</nav>

<div bind:offsetWidth={mobileMenuWidth}
	class="{css`
		position: absolute;
		bottom: 47px;
		width: ${mobileMenuWidthVar - 1}%;
		margin-left: ${(mobileMenuWidth * ((99 - mobileMenuWidthVar) / 100)) / 2}px;
		margin-right: ${(mobileMenuWidth * ((99 - mobileMenuWidthVar) / 100)) / 2}px;
		height: ${indicatorSize}px;
		background-color: transparent;
		@media (min-width: 640px) {
		}
	`} sm:hidden">
	<div class={css`
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
				top: 57%;
				left: -17.5px;
				width: 18px;
				height: 18px;
				background: transparent;
				border-top-right-radius: 20px;
				box-shadow: 1px -8px 0 0 #475569;
			}
			&::after {
				content: '';
				position: absolute;
				top: 57%;
				right: -17.5px;
				width: 18px;
				height: 18px;
				background: transparent;
				border-top-left-radius: 20px;
				box-shadow: -1px -8px 0 0 #475569;
			}
		`}/>
</div>