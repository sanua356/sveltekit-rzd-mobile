<script lang="ts">
	import Button from '../../components/Button.svelte';
	import Table from '../../components/Table.svelte';
	import Tbody from '../../components/Tbody.svelte';
	import Thead from '../../components/Thead.svelte';
	const routes = [
		{ width: '40%', title: 'Название' },
		{ width: '40%', title: 'Опции' }
	];
	const routesData = [
		[
			{ id: 1, value: 'Муром' },
			{
				id: 2,
				value: 'Удалить',
				onClick: () => {
					console.log('123');
				}
			}
		]
	];
</script>

<section class="section">
	<div class="options">
		<h3 class="options__title">Точки маршрута</h3>
		<hr class="options__underline" />
		<div class="routes">
			<Table>
				<Thead headNames={routes} />
				<Tbody bodyRows={routesData} />
			</Table>
			<Button type="button" variant="red" isSlim fullWidth>Новая точка маршрута</Button>
		</div>
	</div>
</section>

<style>
	.section {
		padding: 15px;
	}
	.options__title {
		font-size: 1rem;
		font-weight: 400;
	}
	.options__underline {
		margin-top: 7px;
		border: none;
		background-color: #000;
		height: 2px;
		width: 25%;
		border-radius: 5px;
	}
	.routes {
		display: flex;
		flex-direction: column;
		padding-bottom: 15px;
		border-bottom: 1px solid rgba(0, 0, 0, 0.3);
	}
</style>
