export const useApi = () => {
	const {
		public: { backend },
	} = useRuntimeConfig();

	return $fetch.create({
		baseURL: backend || 'http://localhost:3000',
		credentials: 'include',
	});
};
