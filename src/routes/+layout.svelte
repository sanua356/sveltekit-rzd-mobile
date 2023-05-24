<script>
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import logo from '$lib/images/logo.png';
	import { onMount } from 'svelte';
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import AiOutlineHome from 'svelte-icons-pack/ai/AiOutlineHome';
	import BiCoinStack from 'svelte-icons-pack/bi/BiCoinStack';
	import IoStatsChart from 'svelte-icons-pack/io/IoStatsChart';
	import VscGear from 'svelte-icons-pack/vsc/VscGear';
	import './styles.css';

	$: navPadding = 0;
	if (browser) {
		onMount(async () => {
			navPadding = document.querySelector('.nav')?.clientHeight || 0;
		});
	}
</script>

<svelte:head>
	<title>Расчет зарплаты РЖД</title>
	<meta name="description" content="Расчет зарплаты помощника машиниста РЖД" />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" />
	<link
		href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="app">
	<main class="main" style="padding-bottom:{navPadding}px;">
		<header class="header">
			<img src={logo} class="header__logo" alt="Логотип" />
		</header>
		<slot />
		<nav class="nav">
			<ul class="ul">
				<li class="li">
					<a href="/" class:active={$page.url.pathname === '/'}
						><Icon src={AiOutlineHome} size="25px" />Главная</a
					>
				</li>
				<li class="li">
					<a href="/stats" class:active={$page.url.pathname === '/stats'}
						><Icon src={IoStatsChart} size="25px" />Статистика</a
					>
				</li>
				<li class="li">
					<a href="/options" class:active={$page.url.pathname === '/options'}
						><Icon src={BiCoinStack} size="25px" />Опции</a
					>
				</li>
				<li class="li">
					<a href="/settings" class:active={$page.url.pathname === '/settings'}
						><Icon src={VscGear} size="25px" />Настройки</a
					>
				</li>
			</ul>
		</nav>
	</main>
</div>

<style>
	.main {
		position: relative;
		min-height: 100vh;
		width: 100%;
		max-width: 100vw;
		background-color: #fff;
		overflow-y: auto;
	}
	.header {
		padding: 10px 15px;
		display: flex;
		align-items: center;
		border-bottom: 1px solid rgba(0, 0, 0, 0.2);
	}
	.header__logo {
		max-width: 25vw;
		height: auto;
		margin-left: auto;
		margin-right: auto;
	}
	.nav {
		width: 100%;
		position: fixed;
		bottom: 0;
		left: 0;
		border-top: 1px solid rgba(0, 0, 0, 0.2);
		background-color: #fff;
		z-index: 3;
	}
	.ul {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 15px;
	}
	.li {
		list-style-type: none;
	}
	.li a {
		color: rgba(0, 0, 0, 1);
		font-size: 0.8rem;
		text-decoration: none;
		display: flex;
		flex-direction: column;
		align-items: center;
		opacity: 0.6;
		transition: 0.3s ease-in-out opacity;
		font-weight: 300;
	}
	.li a.active {
		opacity: 1;
		font-weight: 400;
	}
</style>
