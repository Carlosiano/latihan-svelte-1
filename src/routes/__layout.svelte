<script>
	import '$utils/app.css';
	import Navbar from '$components/Navbar.svelte';
</script>

<div class="flex flex-col justify-between w-full">
	<main class="mb-[130px]">
		<slot />
	</main>
	<header class="flex justify-center fixed bottom-0 w-full">
		<div class="absolute bottom-0 h-[95px] left-0 right-0 bg-slate-600 border-none" />
		<Navbar />
	</header>
</div>

<style>
	:global(body) {
		background-color: #475569;
	}
</style>
