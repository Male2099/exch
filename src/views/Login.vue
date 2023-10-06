<script>
import { useAppOptionStore } from '@/stores/app-option';
import authApi from "../services/apis/user/authApi";
import { userAuthStore } from "../stores/app-auth";

const appOption = useAppOptionStore();

export default {
	// mounted() {
	// 	appOption.appSidebarHide = true;
	// 	appOption.appHeaderHide = true;
	// 	appOption.appContentClass = 'p-0';
	// },
	// beforeRouteLeave(to, from, next) {
	// 	appOption.appSidebarHide = false;
	// 	appOption.appHeaderHide = false;
	// 	appOption.appContentClass = '';
	// 	next();
	// },
	data() {
		return {
			bg: {
				activeImg: '/assets/img/login-bg/login-bg-main.jpg',
			},
			user: {
				username: 'root',
				password: '123456'
			},
			error: ''
		}
	},
	methods: {
		async login(e) {
			e.preventDefault();
			try {
				await authApi.login(this.user.username, this.user.password)
				const authStore = userAuthStore();
				//init the auth user,
				await authStore.setUser();
				this.$router.push({ path: '/admin' })
			} catch (error) {
				this.error = error
			}
		},
	}
}

</script>
<template>
	<div>
		<!-- BEGIN login -->
		<div class="login login-v2 fw-bold">
			<!-- BEGIN login-cover -->
			<div class="login-cover">
				<div class="login-cover-img" v-bind:style="{ backgroundImage: 'url(' + bg.activeImg + ')' }"></div>
				<div class="login-cover-bg"></div>
			</div>
			<!-- END login-cover -->

			<!-- BEGIN login-container -->
			<div class="login-container">
				<!-- BEGIN login-header -->
				<div class="login-header">
					<div class="brand">
						<div class="d-flex align-items-center">
							<span class="logo"></span> <b>Lekha POS</b>
						</div>
					</div>
					<div class="icon">
						<i class="fa fa-lock"></i>
					</div>
				</div>
				<!-- END login-header -->

				<!-- BEGIN login-content -->
				<div class="login-content">
					<form v-on:submit="login" method="GET">
						<div class="form-floating mb-20px">
							<input type="text" v-model="user.username" class="form-control fs-13px h-45px border-0"
								placeholder="Username" id="emailAddress" :class="{ 'is-invalid': error }" required />
							<label for="emailAddress"
								class="d-flex align-items-center text-gray-600 fs-13px">Username</label>
						</div>
						<div class="form-floating">
							<input type="password" v-model="user.password" class="form-control fs-13px h-45px border-0"
								placeholder="Password" :class="{ 'is-invalid': error }" required />
							<label for="emailAddress"
								class="d-flex align-items-center text-gray-600 fs-13px">Password</label>
						</div>
						<div class="d-flex justify-content-center text-danger my-3">
							{{ error }}
						</div>
						<div class="mb-20px">
							<button type="submit" class="btn btn-theme d-block w-100 h-45px btn-lg">Login</button>
						</div>
						<!-- show error -->

					</form>
				</div>
				<!-- END login-content -->
			</div>
			<!-- END login-container -->
		</div>
		<!-- END login -->

		<!-- BEGIN login-bg -->
		<!-- <div class="login-bg-list clearfix">
			<div class="login-bg-list-item" v-bind:class="{ 'active': bg.bg1.active }"><a href="javascript:;" class="login-bg-list-link" v-on:click="select('bg1')" style="background-image: url(/assets/img/login-bg/login-bg-17.jpg)"></a></div>
			<div class="login-bg-list-item" v-bind:class="{ 'active': bg.bg2.active }"><a href="javascript:;" class="login-bg-list-link" v-on:click="select('bg2')" style="background-image: url(/assets/img/login-bg/login-bg-16.jpg)"></a></div>
			<div class="login-bg-list-item" v-bind:class="{ 'active': bg.bg3.active }"><a href="javascript:;" class="login-bg-list-link" v-on:click="select('bg3')" style="background-image: url(/assets/img/login-bg/login-bg-15.jpg)"></a></div>
			<div class="login-bg-list-item" v-bind:class="{ 'active': bg.bg4.active }"><a href="javascript:;" class="login-bg-list-link" v-on:click="select('bg4')" style="background-image: url(/assets/img/login-bg/login-bg-14.jpg)"></a></div>
			<div class="login-bg-list-item" v-bind:class="{ 'active': bg.bg5.active }"><a href="javascript:;" class="login-bg-list-link" v-on:click="select('bg5')" style="background-image: url(/assets/img/login-bg/login-bg-13.jpg)"></a></div>
			<div class="login-bg-list-item" v-bind:class="{ 'active': bg.bg6.active }"><a href="javascript:;" class="login-bg-list-link" v-on:click="select('bg6')" style="background-image: url(/assets/img/login-bg/login-bg-12.jpg)"></a></div>
		</div> -->
		<!-- END login-bg -->
	</div>
</template>