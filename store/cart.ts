import { Ref } from 'vue';
import debounce from 'lodash/debounce';

interface Response<T> {
	message?: string;
	status: number;
	data: T;
}

interface Product {
	id: string;
	name: string;
	description: string;
	price: number;
}

interface Cart {
	id: string;
	quantity: number;
	product: Product;
}

interface CartLoading extends Cart {
	loading: boolean;
}

export const useCartStore = defineStore('cart-store', () => {
	const carts = ref<Ref<CartLoading>[]>([]);
	const loading = ref(false);

	const fetch = useApi();
	const getCarts = async () => {
		loading.value = true;

		const { data } = await fetch<Response<Cart[]>>('cart', {
			method: 'GET',
		});

		carts.value =
			data?.map((cart) => ref({ ...cart, loading: false })) || carts.value;
		loading.value = false;
	};

	const updateCart = async (cart: Ref<CartLoading>) => {
		cart.value.loading = true;

		const {
			data: { quantity },
		} = await fetch<Response<Cart>>(`cart/${cart.value.id}`, {
			method: 'PATCH',
			body: {
				quantity: cart.value.quantity,
			},
		});

		cart.value.quantity = quantity;
		cart.value.loading = false;
	};

	const createCart = async (productId: string, quantity = 1) => {
		const { data } = await fetch<Response<Cart>>('cart', {
			method: 'POST',
			body: {
				productId,
				quantity,
			},
		});

		carts.value.push(ref({ ...data, loading: false }));
	};

	const updateCartDebounce = debounce(updateCart, 500);

	const deleteCart = async (cart: Ref<CartLoading>) => {
		cart.value.loading = true;

		await fetch<Response<Cart>>(`cart/${cart.value.id}`, {
			method: 'DELETE',
		});

		carts.value = carts.value.filter(
			($cart) => cart.value.id !== $cart.value.id,
		);

		cart.value.loading = false;
	};

	const purchaseAll = async () => {
		carts.value.forEach((v) => (v.value.loading = true));

		await fetch<Response<Cart>>(`cart/purchase`, {
			method: 'POST',
		});

		carts.value = [];
	};

	return {
		carts,
		loading,
		getCarts,
		updateCart,
		updateCartDebounce,
		deleteCart,
		createCart,
		purchaseAll,
	};
});
