<script>
	import SettingsField from './../../components/SettingsField.svelte';
</script>

<div class="section">
	<SettingsField
		label="Дата начала месяца"
		fieldType="number"
		fieldName="startCalcultaionsDate"
		defaultValue={0}
		description="Это поле отвечает за число месяца, с которого необходимо начать считать доход. Можно ввести значение от 1 до 31"
	/>
</div>

<style>
	.section {
		padding: 20px;
		display: flex;
		flex-direction: column;
	}
</style>
