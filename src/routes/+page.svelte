<script>
	import Button from '../components/Button.svelte';
</script>

<section class="section">
	<div class="info">
		<h2 class="info__title">Доход с начала месяца:</h2>
		<div class="total">
			<span class="total__money">5000₽</span>
			<span class="total__subtitle">(С учётом вычета 13% НДФЛ)</span>
		</div>
	</div>
	<div class="stats">
		<h3 class="stats__title">Таблица доходов</h3>
		<hr class="stats__underline" />
		<table class="table">
			<thead class="thead">
				<th class="td__number">#</th>
				<th class="td__date">Дата явки</th>
				<th class="td__money">Доход</th>
				<th class="td__details">Детали</th>
			</thead>
			<tbody class="tbody">
				<tr>
					<td class="td__number">1</td>
					<td class="td__date">23.05.2023 19:07</td>
					<td class="td__money">3204₽</td>
					<td class="td__details"><button>Подробнее</button></td>
				</tr>
				<tr>
					<td class="td__number">1</td>
					<td class="td__date">23.05.2023 19:07</td>
					<td class="td__money">3204₽</td>
					<td class="td__details"><button>Подробнее</button></td>
				</tr>
				<tr>
					<td class="td__number">1</td>
					<td class="td__date">23.05.2023 19:07</td>
					<td class="td__money">3204₽</td>
					<td class="td__details"><button>Подробнее</button></td>
				</tr>
				<tr>
					<td class="td__number">1</td>
					<td class="td__date">23.05.2023 19:07</td>
					<td class="td__money">3204₽</td>
					<td class="td__details"><button>Подробнее</button></td>
				</tr>
				<tr>
					<td class="td__number">1</td>
					<td class="td__date">23.05.2023 19:07</td>
					<td class="td__money">3204₽</td>
					<td class="td__details"><button>Подробнее</button></td>
				</tr>
				<tr>
					<td class="td__number">1</td>
					<td class="td__date">23.05.2023 19:07</td>
					<td class="td__money">3204₽</td>
					<td class="td__details"><button>Подробнее</button></td>
				</tr>
			</tbody>
		</table>
		<Button type="button" variant="red" fullWidth>Новый доход</Button>
	</div>
</section>

<style>
	.section {
		padding: 20px;
	}
	.info {
		display: flex;
		flex-direction: column;
	}
	.info__title {
		font-size: 1.2rem;
		font-weight: 400;
	}
	.total {
		display: flex;
		align-items: flex-end;
	}
	.total__money {
		font-weight: 500;
		font-size: 2rem;
		margin-top: 10px;
		display: block;
	}
	.total__subtitle {
		color: rgba(0, 0, 0, 0.3);
		font-size: 0.8rem;
		display: block;
		margin-left: 5px;
	}
	.stats {
		margin-top: 35px;
	}
	.stats__title {
		font-size: 1rem;
		font-weight: 400;
	}
	.stats__underline {
		margin-top: 7px;
		border: none;
		background-color: #000;
		height: 2px;
		width: 25%;
		border-radius: 5px;
	}
	.table {
		display: block;
		margin-top: 10px;
		width: 100%;
		max-height: 43vh;
		overflow-y: auto;
		border: 1px solid rgba(0, 0, 0, 0.3);
		border-collapse: collapse;
		table-layout: fixed;
		overflow-wrap: break-word;
		text-align: center;
		border-top-left-radius: 7px;
		border-top-right-radius: 7px;
	}
	.thead {
		background-color: #f3f5f7;
	}
	.thead th {
		background-color: #eeeeee;
		padding: 10px;
		font-weight: 500;
		font-size: 0.9rem;
		color: #666c76;
	}
	.tbody td {
		padding: 10px;
		border-top: 1px solid rgba(0, 0, 0, 0.3);
		font-size: 0.9rem;
	}
	.tbody tr {
		width: 100%;
	}
	.tbody button {
		border: none;
		background-color: transparent;
		border-bottom: 1px solid rgba(0, 0, 0, 0.3);
		color: rgba(0, 0, 0, 0.6);
	}
	.td__number {
		width: 10%;
	}
	.td__date {
		width: 100%;
	}
	.td__money {
		width: 20%;
	}
	.td__details {
		width: 40%;
	}
</style>
