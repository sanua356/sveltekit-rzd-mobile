<script lang="ts">
	interface iHead {
		width: string;
		title: string;
	}
	export let headNames: iHead[] = [];
</script>

<thead class="thead">
	<th style:width="10%">#</th>
	{#each headNames as { width, title }, i}
		<th style:width="{width}%">{title}</th>
	{/each}
</thead>

<style>
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
</style>
