<script>
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
				<th>#</th>
				<th>Дата поездки</th>
				<th>Доход</th>
				<th>Детали</th>
			</thead>
			<tbody class="tbody">
				<tr>
					<td>1</td>
					<td>23.05.2023</td>
					<td>3204₽</td>
					<td><button>Подробнее</button></td>
				</tr>
				<tr>
					<td>1</td>
					<td>23.05.2023</td>
					<td>3204₽</td>
					<td><button>Подробнее</button></td>
				</tr><tr>
					<td>1</td>
					<td>23.05.2023</td>
					<td>3204₽</td>
					<td><button>Подробнее</button></td>
				</tr><tr>
					<td>1</td>
					<td>23.05.2023</td>
					<td>3204₽</td>
					<td><button>Подробнее</button></td>
				</tr><tr>
					<td>1</td>
					<td>23.05.2023</td>
					<td>3204₽</td>
					<td><button>Подробнее</button></td>
				</tr><tr>
					<td>1</td>
					<td>23.05.2023</td>
					<td>3204₽</td>
					<td><button>Подробнее</button></td>
				</tr><tr>
					<td>1</td>
					<td>23.05.2023</td>
					<td>3204₽</td>
					<td><button>Подробнее</button></td>
				</tr><tr>
					<td>1</td>
					<td>23.05.2023</td>
					<td>3204₽</td>
					<td><button>Подробнее</button></td>
				</tr>
			</tbody>
		</table>
		<button class="stats__button"> Новый доход </button>
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
	}
	.table * {
		width: 100%;
	}
	.thead {
		background-color: #eeeeee;
	}
	.thead th {
		background-color: #eeeeee;
		padding: 10px;
		font-weight: 500;
		font-size: 0.9rem;
		border-left: 1px solid rgba(0, 0, 0, 0.3);
	}
	.tbody td {
		padding: 10px;
		border-left: 1px solid rgba(0, 0, 0, 0.3);
		border-top: 1px solid rgba(0, 0, 0, 0.3);
		font-size: 0.9rem;
	}
	.tbody tr:nth-child(2n) {
		background-color: #ffe4e4;
	}
	.tbody button {
		border: none;
		background-color: transparent;
		border-bottom: 1px solid rgba(0, 0, 0, 0.3);
		color: rgba(0, 0, 0, 0.6);
	}
	.stats__button {
		margin-top: 20px;
		width: 100%;
		border: none;
		padding: 15px;
		color: #fff;
		background-color: #e21a1a;
		border-radius: 7px;
	}
</style>
