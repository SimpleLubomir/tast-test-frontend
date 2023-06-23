<template>
	<div class="container">
		<v-text-field
			bg-color="white"
			type="text"
			class="number-input"
			input-mode="numeric"
			outlined
			hide-details
			dense
			variant="solo"
			prepend-icon="mdi-minus"
			append-icon="mdi-plus"
			:min="1"
			:step="1"
			:model-value="modelValue"
			:loading="loading"
			:disabled="loading"
			@update:model-value="update"
			@click:prepend="update(modelValue - 1)"
			@click:append="update(modelValue + 1)"
		/>
		<v-icon
			icon="mdi-delete-circle-outline"
			class="flex-column ml-4"
			color="red"
			size="35px"
			:class="{
				'button-loading': loading
			}"
			:disabled="loading"
			@click="emit('delete')"></v-icon>
	</div>
</template>

<script setup lang="ts">
interface CartProps {
	modelValue: number;
	loading: boolean;
}

const props = defineProps<CartProps>();

const { loading, modelValue } = toRefs(props);

const emit = defineEmits(["update:modelValue", "delete"]);

const update = (v: number | string) => {
	const integer = parseInt(v as string, 10);
	const $v = Number.isNaN(integer) ? modelValue : Math.max(1, integer);

	emit("update:modelValue", $v);
};
</script>

<style lang="sass" scoped>
.container
	display: flex
	justify-content: center
	align-items: center

	.number-input
		width: 40%

		input
			height: 50px
			height: 50px

.button-loading
	opacity: 0.5
	pointer-events: none
	cursor: none
</style>
