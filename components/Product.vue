<template>
	<v-card
		class="my-4" :elevation="elevation"
		@mouseover="elevation = 10"
		@mouseleave="elevation = 3"
	>
		<v-img
			:src="image"
			aspect-ratio="1"
			contain
		/>
		<v-card-title class="text-center font-weight-bold">
			{{ name }}
		</v-card-title>
		<v-card-text class="text-center">
			{{ description }}
		</v-card-text>
		<v-card-subtitle class="text-center text-uppercase">
			{{ price }}
		</v-card-subtitle>
		<template #actions>
			<div style="width: 100%" class="text-center actions">
				<v-btn
					v-if="!cart"
					size="40px"
					variant="elevated"
					:loading="loading"
					:disabled="loading"
					class="text-uppercase p-16"
					@click="create"
				>
					Buy
				</v-btn>
				<Quantity
					v-else
					class="mx-13"
					:loading="cart.value.loading"
					:model-value="cart.value.quantity"
					@update:model-value="(v) => update(v)"
					@delete="deleteCart(cart)"
				/>
			</div>
		</template>
	</v-card>
</template>

<script setup lang="ts">
import { useCartStore } from "~/store/cart";

const cartStore = useCartStore();
const { carts } = storeToRefs(cartStore);
const { createCart, deleteCart, updateCartDebounce } = cartStore;

interface ProductProps {
	id: string;
	name: string;
	description: string;
	image: string;
	price: number;
}

const props = defineProps<ProductProps>();
const { id, name, description, image, price } = toRefs(props);
const elevation = ref(3);
const loading = ref(false);
const cart = computed(() => carts.value.find((c) => c.value.product.id === id.value));
const create = async () => {
	loading.value = true;

	await createCart(id.value);

	loading.value = false;
};

const update = (quantity: number) => {
	if ((cart as any).value.value.quantity !== quantity) {
		(cart as any).value.value.quantity = quantity;

		return updateCartDebounce((cart as any).value);
	}
};
</script>

<style lang="sass" scoped>
.actions
	height: 60px
</style>
