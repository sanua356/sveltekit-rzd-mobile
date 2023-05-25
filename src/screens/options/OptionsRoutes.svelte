<script lang="ts">
	import { IndexedDBLibrary } from '$lib/utils/indexeddb';
	import type { iBodyTable } from '$lib/utils/types';
	import { onMount } from 'svelte';
	import Table from '../../components/Table.svelte';
	import Thead from '../../components/Thead.svelte';
	import Tbody from '../../components/Tbody.svelte';
	import Button from '../../components/Button.svelte';
	import Modal from '../../components/Modal.svelte';

	const routesTableHead = [
		{ width: '40%', title: 'Название' },
		{ width: '40%', title: 'Опции' }
	];
	let routes: Array<iBodyTable[]>;
	$: routes = [];
	$: isOpenedModalRoute = false;
	$: isOpenedDeleteRoute = false;
	$: selectedRoute = { id: -1, value: '' };
	$: modalRouteInput = '';

	onMount(async () => {
		updateRoutes();
	});

	async function updateRoutes() {
		const db = new IndexedDBLibrary('rzd', 'routes');
		const newRoutes = (await db.read()) as iBodyTable[];
		let result: Array<iBodyTable[]> = [];
		newRoutes.forEach((route) => {
			result.push([
				{ id: route.id, value: route.value },
				{
					id: route.id,
					value: 'Удалить',
					onClick: (id) => {
						selectedRoute = { ...selectedRoute, id };
						getRouteNameFromId(id);
						isOpenedDeleteRoute = true;
					}
				}
			]);
		});
		routes = result;
	}

	async function onClickSaveRoute() {
		if (modalRouteInput.length > 0) {
			const db = new IndexedDBLibrary('rzd', 'routes');
			const isSaved = await db.write({ value: modalRouteInput });
			if (isSaved) {
				updateRoutes();
				isOpenedModalRoute = false;
				modalRouteInput = '';
			}
		}
	}

	async function onClickDeleteRoute(id: number) {
		const db = new IndexedDBLibrary('rzd', 'routes');
		const isDeleted = await db.delete(id);
		if (isDeleted) {
			isOpenedDeleteRoute = false;
			updateRoutes();
		}
	}

	async function getRouteNameFromId(id: number) {
		const db = new IndexedDBLibrary('rzd', 'routes');
		const route = (await db.read(id)) as iBodyTable[];
		if (route[0]) {
			selectedRoute = { ...selectedRoute, value: route[0].value };
		} else {
			selectedRoute = { ...selectedRoute, value: 'ОШИБКА ЗАГРУЗКИ МАРШРУТА' };
		}
	}
</script>

<div class="routes">
	<div class="options">
		<h3 class="options__title">Точки маршрута</h3>
		<hr class="options__underline" />
		<div class="routes">
			<Table>
				<Thead headNames={routesTableHead} />
				<Tbody bodyRows={routes} />
			</Table>
			<Button
				type="button"
				variant="red"
				isSlim
				fullWidth
				onClick={() => (isOpenedModalRoute = true)}>Новая точка маршрута</Button
			>
		</div>
	</div>
	<Modal showModal={isOpenedModalRoute} onClose={() => (isOpenedModalRoute = false)}>
		<div class="modal__route">
			<h3 class="route__title">Создать точку маршрута</h3>
			<hr class="route__underline" />
			<p class="route__description">
				В данном окне вы можете создать новую точку маршрута, чтобы использовать её во время
				указания в смене
			</p>
			<input
				type="text"
				class="route__input"
				placeholder="Например: Муром"
				bind:value={modalRouteInput}
			/>
			<Button type="button" variant="red" onClick={onClickSaveRoute} isSlim>Сохранить</Button>
		</div>
	</Modal>
	<Modal showModal={isOpenedDeleteRoute} onClose={() => (isOpenedDeleteRoute = false)}>
		<div class="modal__route">
			<h3 class="route__title">Удалить точку маршрута</h3>
			<hr class="route__underline" />
			<p class="route__description">
				Вы действительно хотите удалить точку маршрута с названием: "{selectedRoute.value}"
			</p>
			<Button
				type="button"
				variant="red"
				onClick={() => onClickDeleteRoute(selectedRoute.id)}
				isSlim>Удалить</Button
			>
		</div>
	</Modal>
</div>

<style>
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
	.modal__route {
		padding: 15px;
		background-color: #fff;
		border-radius: 7px;
	}
	.route__title {
		display: flex;
		flex-direction: column;
		font-size: 1.1rem;
		font-weight: 600;
	}
	.route__underline {
		margin-top: 10px;
		height: 3px;
		border-radius: 5px;
		width: 30%;
		background-color: #000;
		border: none;
	}
	.route__input {
		width: 100%;
		display: block;
		font-size: 0.9rem;
		margin-top: 9px;
		padding: 8px 15px;
		border: 1px solid rgba(0, 0, 0, 0.3);
		border-radius: 10px;
	}
	.route__description {
		display: block;
		margin-top: 7px;
		font-size: 0.9rem;
		color: rgba(0, 0, 0, 0.6);
	}
</style>
