<script lang="ts">
	import { IndexedDBLibrary } from '$lib/utils/indexeddb';
	import type { iBodyTable } from '$lib/utils/types';
	import { onMount } from 'svelte';
	import Icon from 'svelte-icons-pack';
	import VscClose from 'svelte-icons-pack/vsc/VscClose';
	import Button from '../../components/Button.svelte';
	import Modal from '../../components/Modal.svelte';
	import Table from '../../components/Table.svelte';
	import Tbody from '../../components/Tbody.svelte';
	import Thead from '../../components/Thead.svelte';

	const routesTableHead = [
		{ width: '40%', title: 'Название' },
		{ width: '40%', title: 'Проценты' },
		{ width: '40%', title: 'Опции' }
	];

	interface iAllowance {
		id: number;
		title: string;
		percents: number[];
	}

	let allowances: Array<iBodyTable[]>;
	let modalAllowancePercents: Array<number>;
	$: allowances = [];
	$: isOpenedModalAllowance = false;
	$: isOpenedDeleteAllowance = false;
	$: selectedAllowance = { id: -1, title: '' };
	$: modalAllowanceInput = '';
	$: modalAllowanceInputPercent = '';
	$: modalAllowancePercents = [];

	onMount(async () => {
		updateAllowances();
	});

	async function updateAllowances() {
		const db = new IndexedDBLibrary('rzd', 'allowances');
		const newAllowances = (await db.read()) as iAllowance[];
		let result: Array<iBodyTable[]> = [];
		newAllowances.forEach((allowance) => {
			result.push([
				{ id: allowance.id, value: allowance.title },
				{ id: allowance.id, value: allowance.percents.toString().replaceAll(',', '\\') + '%' },
				{
					id: allowance.id,
					value: 'Удалить',
					onClick: (id) => {
						selectedAllowance = { ...selectedAllowance, id };
						getAllowanceNameFromId(id);
						isOpenedDeleteAllowance = true;
					}
				}
			]);
		});
		allowances = result;
	}

	async function onClickSaveAllowance() {
		if (modalAllowanceInput.length > 0) {
			const db = new IndexedDBLibrary('rzd', 'allowances');
			const isSaved = await db.write({
				title: modalAllowanceInput,
				percents: modalAllowancePercents
			});
			if (isSaved) {
				updateAllowances();
				isOpenedModalAllowance = false;
				modalAllowanceInput = '';
				modalAllowancePercents = [];
			}
		}
	}

	async function onClickDeleteAllowance(id: number) {
		const db = new IndexedDBLibrary('rzd', 'allowances');
		const isDeleted = await db.delete(id);
		if (isDeleted) {
			isOpenedDeleteAllowance = false;
			updateAllowances();
		}
	}

	function onClickAddAllowancePercent() {
		if (
			!modalAllowancePercents.includes(Number(modalAllowanceInputPercent)) &&
			Number(modalAllowanceInputPercent) !== 0
		) {
			modalAllowancePercents = [...modalAllowancePercents, Number(modalAllowanceInputPercent)];
			modalAllowanceInputPercent = '';
		}
	}

	function onClickDeleteAllowancePercent(idx: number) {
		modalAllowancePercents = modalAllowancePercents.filter((_, idxArr) => idxArr !== idx);
	}

	async function getAllowanceNameFromId(id: number) {
		const db = new IndexedDBLibrary('rzd', 'allowances');
		const allowance = (await db.read(id)) as iBodyTable[];
		if (allowance[0]) {
			selectedAllowance = { ...selectedAllowance, title: allowance[0].value };
		} else {
			selectedAllowance = { ...selectedAllowance, title: 'ОШИБКА ЗАГРУЗКИ НАДБАВКИ' };
		}
	}
</script>

<div>
	<div class="options">
		<h3 class="options__title">Надбавки (% от часов)</h3>
		<hr class="options__underline" />
		<div class="routes">
			{#if allowances.length > 0}
				<Table>
					<Thead headNames={routesTableHead} />
					<Tbody bodyRows={allowances} />
				</Table>
			{:else}
				<span class="routes_empty">У вас нет пока ни одной надбавки</span>
			{/if}
			<Button
				type="button"
				variant="red"
				isSlim
				fullWidth
				onClick={() => (isOpenedModalAllowance = true)}>Новая надбавка</Button
			>
		</div>
	</div>
	<Modal showModal={isOpenedModalAllowance} onClose={() => (isOpenedModalAllowance = false)}>
		<div class="modal__allowance">
			<h3 class="allowance__title">Создать надбавку</h3>
			<hr class="allowance__underline" />
			<p class="allowance__description">Название надбавки:</p>
			<input
				type="text"
				class="allowance__input"
				placeholder="Например: Вредность"
				bind:value={modalAllowanceInput}
			/>
			<p class="allowance__description">Сумма надбавки в %:</p>
			<div class="allowance__percent">
				<input
					type="number"
					class="allowance__input"
					placeholder="Например: 4%"
					bind:value={modalAllowanceInputPercent}
				/>
				<Button type="button" variant="gray" onClick={onClickAddAllowancePercent} isSlim
					>Добавить</Button
				>
				{#if modalAllowancePercents.length > 0}
					<div class="percents">
						<span class="percents__title">Проценты надбавки: </span>
						<hr class="allowance__underline" />
						<div class="percents">
							{#each modalAllowancePercents as percent, i}
								<div class="percent">
									<span>{percent}% в час</span>
									<button
										on:click={() => onClickDeleteAllowancePercent(i)}
										class="percent__button_delete"><Icon src={VscClose} color={'#000'} /></button
									>
								</div>
							{/each}
						</div>
					</div>
				{/if}
			</div>

			<Button type="button" variant="red" onClick={onClickSaveAllowance} isSlim fullWidth
				>Сохранить</Button
			>
		</div>
	</Modal>
	<Modal showModal={isOpenedDeleteAllowance} onClose={() => (isOpenedDeleteAllowance = false)}>
		<div class="modal__allowance">
			<h3 class="allowance__title">Удалить точку маршрута</h3>
			<hr class="allowance__underline" />
			<p class="allowance__description">
				Вы действительно хотите удалить точку маршрута с названием: "{selectedAllowance.title}"
			</p>
			<Button
				type="button"
				variant="red"
				onClick={() => onClickDeleteAllowance(selectedAllowance.id)}
				isSlim>Удалить</Button
			>
		</div>
	</Modal>
</div>

<style>
	.options {
		margin-top: 25px;
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
	.routes_empty {
		text-align: center;
		margin: 15px auto 0px auto;
		display: block;
		font-size: 1.1rem;
		color: #000;
		opacity: 0.7;
	}
	.modal__allowance {
		padding: 25px;
		background-color: #fff;
		border-radius: 7px;
	}
	.allowance__title {
		display: flex;
		flex-direction: column;
		font-size: 1.1rem;
		font-weight: 600;
	}
	.allowance__underline {
		margin-top: 10px;
		height: 3px;
		border-radius: 5px;
		width: 30%;
		background-color: #000;
		border: none;
	}
	.allowance__input {
		width: 100%;
		display: block;
		font-size: 0.9rem;
		margin-top: 9px;
		padding: 8px 15px;
		border: 1px solid rgba(0, 0, 0, 0.3);
		border-radius: 10px;
	}
	.allowance__description {
		display: block;
		margin-top: 7px;
		font-size: 0.9rem;
		color: rgba(0, 0, 0, 0.6);
	}
	.percents {
		display: flex;
		flex-direction: column;
		width: 100%;
		margin-top: 20px;
	}
	.percents__title {
		font-size: 0.9rem;
		font-weight: 300;
	}
	.percent {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 10px 0;
	}
	.percent__button_delete {
		background-color: transparent;
		border: none;
	}
</style>
