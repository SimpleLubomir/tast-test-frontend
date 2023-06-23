<template>
	<v-container fluid>
		<v-main class="d-flex justify-center" style="min-height: calc(100vh - 112px)">
			<v-container>
				<v-row>
					<v-col
						v-for="product in products"
						:key="product.id"
						cols="12"
						md="6"
						lg="4"
					>
						<Product
							:id="product.id"
							:name="product.name"
							:description="product.description"
							:image="product.image"
							:price="product.price"
						/>
					</v-col>
				</v-row>
			</v-container>
		</v-main>
	</v-container>
</template>

<script lang="ts" setup>
import { useProductStore } from "~/store/product";

const productStore = useProductStore();
const { products } = storeToRefs(productStore);
const { getProducts } = productStore;

await getProducts();
</script>

<style lang="sass" scoped>
v-footer
	position: absolute
	bottom: 0
	width: 100%
</style>
