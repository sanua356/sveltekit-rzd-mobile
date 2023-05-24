<table class="table">
	<slot />
</table>

<style>
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
</style>
