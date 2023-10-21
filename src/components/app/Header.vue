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
// const notificationData = [{
// 	icon: 'fa fa-bug media-object bg-gray-500',
// 	title: 'Server Error Reports <i class="fa fa-exclamation-circle text-danger"></i>',
// 	time: '3 minutes ago'
// }, {
// 	img: '/assets/img/user/user-1.jpg',
// 	iconMedia: 'fab fa-facebook-messenger text-blue media-object-icon',
// 	title: 'John Smith',
// 	desc: 'Quisque pulvinar tellus sit amet sem scelerisque tincidunt.',
// 	time: '25 minutes ago'
// }, {
// 	img: '/assets/img/user/user-2.jpg',
// 	iconMedia: 'fab fa-facebook-messenger text-blue media-object-icon',
// 	title: 'Olivia',
// 	desc: 'Quisque pulvinar tellus sit amet sem scelerisque tincidunt.',
// 	time: '35 minutes ago'
// }, {
// 	icon: 'fa fa-plus media-object bg-gray-500',
// 	title: 'New User Registered',
// 	time: '1 hour ago'
// }, {
// 	icon: 'fa fa-envelope media-object bg-gray-500',
// 	iconMedia: 'fab fa-google text-warning media-object-icon fs-14px',
// 	title: 'New Email From John',
// 	time: '2 hour ago'
// }];

// function toggleAppSidebarCollapsed() {
// 	if (appOption.appSidebarCollapsed) {
// 		appOption.appSidebarToggled = !appOption.appSidebarToggled;
// 	} else if (appOption.appSidebarToggled) {
// 		appOption.appSidebarToggled = !appOption.appSidebarToggled;
// 	}
// 	appOption.appSidebarCollapsed = !appOption.appSidebarCollapsed;
// };

// function toggleAppSidebarMobileToggled() {
// 	appOption.appSidebarMobileToggled = !appOption.appSidebarMobileToggled;
// };

// function toggleAppSidebarEndToggled() {
// 	appOption.appSidebarEndToggled = !appOption.appSidebarEndToggled;
// };

// function toggleAppSidebarEndMobileToggled() {
// 	appOption.appSidebarEndMobileToggled = !appOption.appSidebarEndMobileToggled;
// };

// function toggleAppHeaderSearch(event) {
// 	event.preventDefault();

// 	appOption.appHeaderSearchToggled = !appOption.appHeaderSearchToggled;
// };

// function toggleAppTopMenuMobileToggled(event) {
// 	event.preventDefault();
// 	slideToggle(document.querySelector('.app-top-menu'));
// };

// function handleWindowResize() {
// 	window.addEventListener('resize', function () {
// 		var elm = document.querySelector('.app-top-menu');
// 		if (elm) {
// 			elm.removeAttribute('style');
// 		}
// 	});
// };

// function checkForm(event) {
// 	event.preventDefault();
// 	this.$router.push({ path: '/extra/search' })
// };

// onMounted(() => {
// handleWindowResize();


// });


function logout() {
	authApi.logout();
	router.push('/login')
}
</script>

<template>
	<div id="header" class="app-header" :data-bs-theme="appOption.appHeaderInverse ? 'dark' : ''">
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

			<!-- <button type="button" class="navbar-mobile-toggler" data-bs-toggle="collapse" data-bs-target="#top-navbar"
				v-if="appOption.appMegaMenu && !appOption.appSidebarTwo">
				<span class="fa-stack fa-lg">
					<i class="far fa-square fa-stack-2x"></i>
					<i class="fa fa-cog fa-stack-1x mt-1px"></i>
				</span>
			</button>
			<button type="button" class="navbar-mobile-toggler"
				v-if="appOption.appTopMenu && !appOption.appSidebarHide && !appOption.appSidebarTwo"
				v-on:click="toggleAppTopMenuMobileToggled">
				<span class="fa-stack fa-lg">
					<i class="far fa-square fa-stack-2x"></i>
					<i class="fa fa-cog fa-stack-1x mt-1px"></i>
				</span>
			</button> -->
			<!-- <button type="button" class="navbar-mobile-toggler"
				v-if="appOption.appTopMenu && appOption.appSidebarHide && !appOption.appSidebarTwo"
				v-on:click="toggleAppTopMenuMobileToggled($event)">
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
			</button>
			<button type="button" class="navbar-mobile-toggler" v-if="!appOption.appSidebarHide"
				v-on:click="toggleAppSidebarMobileToggled($event)">
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
			</button> -->
		</div>
		<!-- END navbar-header -->

		<!-- <app-header-mega-menu v-if="appOption.appHeaderMegaMenu" /> -->

		<!-- BEGIN header-nav -->
		<div class="navbar-nav">

			<!-- <div class="navbar-item dropdown" v-if="appOption.appHeaderLanguageBar">
				<a href="#" class="navbar-link dropdown-toggle" data-bs-toggle="dropdown">
					<span class="flag-icon flag-icon-us" title="us"></span>
					<span class="d-none d-sm-inline ms-1">EN</span> <b class="caret"></b>
				</a>
				<div class="dropdown-menu dropdown-menu-end">
					<a href="javascript:;" class="dropdown-item"><span class="flag-icon flag-icon-us me-2"
							title="us"></span> English</a>
					<a href="javascript:;" class="dropdown-item"><span class="flag-icon flag-icon-cn me-2"
							title="cn"></span> Chinese</a>
					<a href="javascript:;" class="dropdown-item"><span class="flag-icon flag-icon-jp me-2"
							title="jp"></span> Japanese</a>
					<a href="javascript:;" class="dropdown-item"><span class="flag-icon flag-icon-be me-2"
							title="be"></span> Belgium</a>
					<div class="dropdown-divider"></div>
					<a href="javascript:;" class="dropdown-item text-center">more options</a>
				</div>
			</div> -->
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
					<!-- <a href="javascript:;" class="dropdown-item d-flex align-items-center">
						Inbox
						<span class="badge bg-danger rounded-pill ms-auto pb-4px">2</span>
					</a> -->
					<!-- <a href="../calendar" class="dropdown-item">Calendar</a> -->
					<!-- <router-link to="/admn/me/setting" class="dropdown-item">Settings</router-link> -->
					<!-- <div class="dropdown-divider"></div> -->
					<button @click="logout()" class="dropdown-item">Log Out</button>
				</div>
			</div>
			<!-- <div class="navbar-divider d-none d-md-block" v-if="appOption.appSidebarTwo"></div>
			<div class="navbar-item d-none d-md-block" v-if="appOption.appSidebarTwo">
				<a href="javascript:;" v-on:click="toggleAppSidebarEndToggled" class="navbar-link icon">
					<i class="fa fa-th"></i>
				</a>
			</div> -->
		</div>
		<!-- END header-nav -->
	</div>
</template>
