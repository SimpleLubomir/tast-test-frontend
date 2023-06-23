export const useApi = () => {
	const {
		public: { backend },
	} = useRuntimeConfig();

	return $fetch.create({
		baseURL: backend,
		credentials: 'include',
	});
};
