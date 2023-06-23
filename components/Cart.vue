<template>
	<v-menu v-if="carts.length" offset-y :close-on-content-click="false">
		<template #activator="{ props }">
			<v-btn size="65px" v-bind="props">
				<v-icon color="white">mdi-cart</v-icon>
			</v-btn>
		</template>
		<v-card>
			<v-list dense width="420px">
				<v-list-item v-for="cart in carts" :key="cart.id">
					<template #prepend>
						<v-list-item-media>
							<v-img :src="cart.value.product.image" alt="Product Image" width="60px" heigth="60px" />
						</v-list-item-media>
					</template>

					<v-list-item-title class="pl-4">{{ cart.value.product.name }}</v-list-item-title>
					<v-list-item-subtitle class="pl-4">{{ cart.value.product.price }}</v-list-item-subtitle>

					<template #append>
						<Quantity
							:model-value="cart.value.quantity"
							:loading="cart.value.loading"
							@update:model-value="(v) => update(cart, v)"
						/>
					</template>
				</v-list-item>
			</v-list>
			<v-card-title class="text-uppercase text-center" width="100%">{{ allPrice }}</v-card-title>
			<v-btn class="text-uppercase" width="100%" :disabled="loading" @click="purchase">Purchase</v-btn>
		</v-card>
	</v-menu>
</template>

<script setup lang="ts">
import { useCartStore } from "~/store/cart";

const loading = ref(false);
const cartStore = useCartStore();
const { getCarts, updateCartDebounce, purchaseAll } = cartStore;
const { carts } = storeToRefs(cartStore);
const allPrice = computed(() => carts.value.reduce((sum, cart) => (sum += cart.value.quantity * cart.value.product.price), 0));

const update = (cart: any, quantity: number) => {
	if ((cart as any).value.quantity !== quantity) {
		(cart as any).value.quantity = quantity;

		return updateCartDebounce((cart as any));
	}
};

const purchase = async () => {
	loading.value = true;
	await purchaseAll();
	loading.value = false;
};

await getCarts();
</script>
