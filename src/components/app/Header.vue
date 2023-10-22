<script setup>
import AppHeaderMegaMenu from '@/components/app/HeaderMegaMenu.vue';
import { slideToggle } from '@/composables/slideToggle.js';
import { useAppOptionStore } from '@/stores/app-option';
import { onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import router from '@/router/index';
import authApi from '@/services/apis/user/authApi';
import { userAuthStore } from '../../stores/app-auth';

const authStore = userAuthStore()
const appOption = useAppOptionStore();

const user = authStore.user;
const defaultImage = "../../src/assets/defaultImage.png"


function logout() {
	authApi.logout();
	router.push('/login')
}
</script>

<template>
	<div id="header" class="app-header" :data-bs-theme="appOption.appHeaderInverse ? 'dark' : ''"
		style="position: sticky;"
	>
		<!-- BEGIN navbar-header -->
		<div class="navbar-header">
			<button type="button" class="navbar-mobile-toggler" v-if="appOption.appSidebarTwo"
				v-on:click="toggleAppSidebarEndMobileToggled">
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
			</button>
			<RouterLink to="/admin/dashboard" class="navbar-brand">
				<span class="navbar-logo"></span> <b>Lekha POS Admin</b>
			</RouterLink>
		</div>
		<!-- END navbar-header -->


		<!-- BEGIN header-nav -->
		<div class="navbar-nav">
			<div class="navbar-item navbar-user dropdown">
				<a href="#" class="navbar-link dropdown-toggle d-flex align-items-center" data-bs-toggle="dropdown">
					<img :src="user.img || defaultImage" onerror="this.src='../../src/assets/defaultImage.png'" alt=""
						style="width: 27px; height: 27px; object-fit: cover;" />
					<span>
						<span class="d-none d-md-inline">{{ user.name }}</span>
						<b class="caret"></b>
					</span>
				</a>
				<div class="dropdown-menu dropdown-menu-end me-1">
					<router-link to="/admin/me/profile" class="dropdown-item">Profile</router-link>

					<button @click="logout()" class="dropdown-item">Log Out</button>
				</div>
			</div>

		</div>
		<!-- END header-nav -->
	</div>
</template>
