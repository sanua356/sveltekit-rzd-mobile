<script lang="ts">
	import Button from './Button.svelte';
	export let fieldName: string,
		label: string,
		description: string,
		fieldType: 'text' | 'number',
		placeholder: string = '',
		defaultValue: string | number | undefined = undefined;

	$: inputValue = defaultValue;
	const handleInput = (e: any) => {
		if (typeof defaultValue === 'number') {
			inputValue = +e.target.value;
		} else {
			inputValue = e.target.value;
		}
	};
</script>

<div class="field">
	<label for={fieldName} class="field__label"
		>{label}
		<input
			class="field__input"
			{placeholder}
			type={fieldType}
			name={fieldName}
			id={fieldName}
			value={inputValue}
			on:input={handleInput}
		/>
	</label>
	<p class="field__description">{description}</p>
	<Button type="button" variant="red" isSlim>Сохранить</Button>
</div>

<style>
	.field {
		width: 100%;
		padding-bottom: 15px;
		border-bottom: 1px solid rgba(0, 0, 0, 0.3);
	}
	.field__label {
		display: flex;
		flex-direction: column;
		font-size: 1.1rem;
	}
	.field__input {
		display: block;
		font-size: 0.9rem;
		margin-top: 9px;
		padding: 8px 15px;
		border: 1px solid rgba(0, 0, 0, 0.3);
		border-radius: 10px;
	}
	.field__description {
		display: block;
		margin-top: 7px;
		font-size: 0.9rem;
		color: rgba(0, 0, 0, 0.6);
	}
</style>
