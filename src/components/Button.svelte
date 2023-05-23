<script lang="ts">
	export let type: 'button' | 'submit' | 'reset',
		variant: 'red',
		onClick: () => void = () => {},
		fullWidth: boolean = false,
		isSlim: boolean = false;
</script>

<button
	class={`button ${variant === 'red' ? 'red' : ''}`}
	class:isSlim
	class:fullWidth
	{type}
	on:click={onClick}><slot /></button
>

<style>
	.button {
		margin-top: 20px;
		width: fit-content;
		border: none;
		padding: 15px;
		border-radius: 7px;
		font-size: 0.9rem;
	}
	.button.red {
		color: #fff;
		background-color: #e21a1a;
	}
	.button.fullWidth {
		width: 100%;
	}
	.button.isSlim {
		padding: 10px 15px;
		font-size: 0.8rem;
	}
</style>
