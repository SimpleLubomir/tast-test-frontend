<template>
	<v-container fluid>
		<v-row justify="center" align="center">
			<v-col cols="12" md="6" lg="4">
				<v-card outlined>
					<v-card-title>
						<h1>{{ (statusCode === 404) ? "Not Found" : "Error" }}</h1>
					</v-card-title>
					<v-card-text v-if="statusCode !== 404">
						<p>An error has occurred while trying to access this page.</p>
						<p>Please try again later or contact the website administrator.</p>
					</v-card-text>
					<v-card-actions>
						<v-btn color="primary" @click="handleError">Go to Homepage</v-btn>
					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script setup lang="ts">
const error = useError();
const statusCode = ref(404);

if (error?.value && "statusCode" in error.value) {
	statusCode.value = Number(error.value.statusCode);
}
const handleError = () => clearError({ redirect: "/" });
</script>
