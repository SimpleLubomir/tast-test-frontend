interface Response<T> {
	message?: string;
	status: number;
	data: T;
}

interface Pagination<T> {
	items: T[];
	total: number;
	page: number;
	perPage: number;
}

interface Product {
	id: string;
	name: string;
	description: string;
	image: string;
	price: number;
}

export const useProductStore = defineStore('product-store', () => {
	const products = ref<Product[]>([]);
	const loading = ref(false);
	const api = useApi();
	const getProducts = async () => {
		loading.value = true;

		const {
			data: { items },
		} = await api<Response<Pagination<Product>>>('product', {
			method: 'GET',
		});

		products.value = items;
		loading.value = false;
	};

	return {
		products,
		loading,
		getProducts,
	};
});
