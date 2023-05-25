<script lang="ts">
	import type { iBodyTable } from '$lib/utils/types';

	export let bodyRows: Array<iBodyTable[]> = [];
</script>

<tbody class="tbody">
	{#each bodyRows as row, i}
		<tr>
			<td>{i + 1}</td>
			{#each row as { id, value, onClick }, i}
				<td>
					{#if !onClick}
						{value}
					{:else}
						<button class="button" on:click={() => (onClick ? onClick(id) : () => {})}
							>{value}</button
						>
					{/if}
				</td>
			{/each}
		</tr>
	{/each}
</tbody>

<style>
	.tbody td {
		padding: 10px;
		border-top: 1px solid rgba(0, 0, 0, 0.3);
		font-size: 0.9rem;
	}
	.tbody tr {
		width: 100%;
	}
	td:nth-child(2) {
		width: 100%;
	}
	td .button {
		border: none;
		background-color: transparent;
		border-bottom: 1px solid rgba(0, 0, 0, 0.3);
		color: rgba(0, 0, 0, 0.6);
	}
</style>
