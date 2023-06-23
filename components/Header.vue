<template>
	<div>
		<v-app-bar
			ref="appBar"
			app
			flat
			dark
			transition-mode="in-out"
			class="app-bar-opacity"
			:class="{
				'parallax-visible': isMain && isParallaxVisible,
				'mobile': isMobile && isMain && isParallaxVisible,
			}"
		>
			<template #title>
				<NuxtLink to="/" exact-active-class="active" class="active">
					<v-app-bar-title class="font-italic font-weight-medium">
						eCommerce shop
					</v-app-bar-title>
				</NuxtLink>
			</template>

			<!--			<v-btn icon :to="toLocale('cart')">-->
			<!--				<v-tooltip transition="fade-transition" location="bottom" open-delay="1200ms">-->
			<!--					<template #activator="{ props }">-->
			<!--						<v-icon v-bind="props">mdi-cart</v-icon>-->
			<!--					</template>-->
			<!--					<span>{{ $t("cart") }}</span>-->
			<!--				</v-tooltip>-->
			<!--			</v-btn>-->

			<!--			<v-menu>-->
			<!--				<template #activator="{ props }">-->
			<!--					<v-icon v-bind="props">mdi-cart</v-icon>-->
			<!--				</template>-->
			<!--				<v-list-->
			<!--					variant="text"-->
			<!--					class="list-background"-->
			<!--					:bg-color="`rgba(var(&#45;&#45;v-theme-primary), ${isMain && isParallaxVisible ? 0 : 1})`"-->
			<!--					elevation="3"-->
			<!--				>-->
			<!--					<v-list-item-->
			<!--						v-for="(cart, index) in carts"-->
			<!--						:key="`${cart.id}__${index}`" width="100px"-->
			<!--					>-->
			<!--						<v-card width="100%" :title="cart.product.name" :subtitle="cart.product.description">-->
			<!--							<template #actions>-->
			<!--								<Quantity-->
			<!--									:loading="cart.loading"-->
			<!--									:quantity="cart.quantity"-->
			<!--									@update:quantity="(v) => changeQuantity(cart, v)"-->
			<!--									@delete="deleteCart(cart)"-->
			<!--								/>-->
			<!--							</template>-->
			<!--						</v-card>-->
			<!--						<div class="text-uppercase text-white text-center">{{ cart.name }}</div>-->
			<!--					</v-list-item>-->
			<!--				</v-list>-->
			<!--			</v-menu>-->
			<Cart />
		</v-app-bar>
		<v-parallax
			v-if="isMain"
			ref="parallax"
			v-scroll="onScroll"
			src="/images/parallax.jpg"
			height="500"
		>
			<div class="d-flex flex-column fill-height justify-center align-center text-white">
				<h1 class="font-italic font-weight-thin big">
					eCommerce shop
				</h1>
			</div>
		</v-parallax>
	</div>
</template>

<script lang="ts" setup>
const parallax = ref<ComponentPublicInstance>();
const appBar = ref<ComponentPublicInstance>();
const isParallaxVisible = ref(true);

const router = useRouter();
const isMain = computed(() => {
	return (router.currentRoute.value.name as string)?.startsWith("index");
});

const { isMobile } = useDevice();

const onScroll = () => {
	const parallaxElement = parallax.value?.$el as HTMLElement;
	const appBarElement = appBar.value?.$el as HTMLElement;

	isParallaxVisible.value = (parallaxElement?.clientHeight || 0) - (appBarElement?.clientHeight || 0) + parallaxElement?.getClientRects()[0]?.top > 0;
};
</script>

<style lang="sass" scoped>
.app-bar-opacity
	background-color: rgb(var(--v-theme-primary))
	transition: background-color ease-in 300ms, opacity ease-in 300ms
	color: white
	padding-left: 20px
	padding-right: 20px

	&.parallax-visible
		background-color: rgba(var(--v-theme-primary), 0)

	&.mobile
		opacity: 0

.font-italic
	font-family: 'Dancing Script', cursive
	font-size: 1.7rem

	&.big
		font-size: 3rem

.border-white
	border: solid 0.5px white

.active
	color: white
	text-decoration: none


.list-background
	transition: background-color ease-in 300ms
</style>
