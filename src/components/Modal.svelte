<script lang="ts">
	import { afterUpdate } from 'svelte';

	export let showModal: boolean, onClose: () => void;

	let dialog: HTMLDialogElement;

	$: if (dialog && showModal) dialog.showModal();

	function onClickClose() {
		dialog.close();
		onClose();
	}
	afterUpdate(() => {
		if (!showModal) {
			onClickClose();
		}
	});
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog bind:this={dialog} on:close={onClickClose} on:click|self={onClickClose}>
	<div on:click|stopPropagation>
		<slot />
	</div>
</dialog>

<style>
	dialog {
		max-width: 80vw;
		border-radius: 0.2em;
		border: none;
		padding: 10% 10px;
		width: 100%;
		min-height: 100vh;
		overflow: auto;
		align-items: center;
		justify-content: center;
		margin: 0 auto;
		background-color: transparent;
		display: none;
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}
	dialog[open] {
		display: flex;
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
