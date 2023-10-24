<script>
import swal from "sweetalert"
import router from "@/router"
import authApi from '../../services/apis/user/authApi'
import { userAuthStore } from "@/stores/app-auth";
import PictureInput from 'vue-picture-input'
import imageApi from '../../services/apis/imageApi';
import userApi from '../../services/apis/user/userApi';
import roleApi from "../../services/apis/role/roleApi"

const authStore = userAuthStore();
export default {
	components: {
		PictureInput,
	},
	data() {
		return {
			defaultImage: "../../../src/assets/defaultImage.png",
			roles: [],
			authUser: {},
			user: {
				username: '',
				name: '',
				password: '',
				img: '',
				dob: '',
				role: '',
				roleId: '',
				sex: '',
				address: '',
				phone: "",
				status: '',
				totalOrders: 0
			},
			updateUser: {
				username: '',
				name: '',
				password: '',
				img: '',
				dob: '',
				role: '',
				roleId: '',
				sex: '',
				address: '',
				phone: "",
				status: '',

			},
			image: null,
			errors: {
				username: null,
			},
			loading: false,
			inEditProfileMode: false,
			inToResetPasswordMode: false,
		}
	},
	async mounted() {
		this.roles = await roleApi.getAllRoles();
		this.user = await userApi.getUserById(this.$route.params.id)
		this.authUser = authStore.user;


		this.user.roleId = this.user.role.id
		this.updateUser = { ...this.user }
	}
	, computed: {
		isSubmittable() {
			if (this.errors.username) {
				return false
			}
			return true
		},
	}, watch: {
		'updateUser.username'(newVal) {
			this.errors.username = ''
		}
	},
	methods: {
		valdiatePassword() {
			if (this.updateUser.password.length < 6 || this.updateUser.password.length > 20) {
				this.errors.password = "The password must be between 6 and 20 characters long"
			}
			else {
				this.errors.password = null
			}
		},
		onChange(image) {
			if (image) {
				this.image = this.$refs.pictureInput.file
			}
		},
		// async inToResetPasswordMode() {
		// 	const confirm = await this.confirmResetPasswordMode()
		// 	if (confirm) {
		// 		router.push('/admin/me/reset-password')
		// 	}
		// },
		async updateUserInfo(e) {
			e?.preventDefault()
			const confirm = await this.confirmUpdateMeModal()
			if (confirm) {
				try {
					const imgUrl = await imageApi.uplaodImage(this.image)
					this.updateUser.img = imgUrl ?? this.updateUser.img
					this.user = await userApi.updateUserById(this.$route.params.id, this.updateUser)
					this.inEditProfileMode = false
					await this.updateMeSuccesModal()
					this.user.roleId = this.user.role.id
					this.updateUser = { ...this.user }
				} catch (error) {
					this.errors.username = error?.errors?.username
				}
			} else {
				this.user.roleId = this.user.role.id
				this.updateUser = { ...this.user }

			}

		},
		async confirmResetPasswordMode() {
			return swal({
				title: "Reset password",
				text: "Are you sure you want to reset your password",
				icon: "info",
				buttons: {
					cancel: {
						text: 'Cancel',
						value: null,
						visible: true,
						className: 'btn btn-default',
						closeModal: true,
					},
					confirm: {
						text: 'Continue',
						value: true,
						visible: true,
						className: 'btn btn-danger',
						closeModal: true
					}
				}
			})
		},
		async confirmUpdateMeModal(text, text1) {
			return swal({
				title: text || "Update confirmation",
				// text: "Are you sure you want to make changes on your info",
				icon: "info",
				content: {
					element: "span",
					attributes: {
						innerHTML: text1 || `Updating  <span class="text-red">${this.user.name}</span> information will automatically update all associated data`
					}
				},
				buttons: {
					cancel: {
						text: 'Cancel',
						value: null,
						visible: true,
						className: 'btn btn-default',
						closeModal: true,
					},
					confirm: {
						text: 'Condfirm',
						value: true,
						visible: true,
						className: 'btn btn-danger',
						closeModal: true
					}
				}
			})
		},
		async confirmUserStatusOperation() {
			const confirm = await this.confirmUpdateMeModal(
				this.updateUser.status ?
					"User Deactivation"
					: 'User Reactivation',
				this.updateUser.status ?
					`By deactivating  <span class="text-red">${this.user.name}</span> their login access has been revoked. They will no longer be able to log in to the system.`
					: `By reactivate <span class="text-success">${this.user.name}</span> Once reactivated, they will regain access to log in to the system.`
			);
			if (confirm) {
				this.updateUser.status = !this.updateUser.status;
			}
		},
		async updateMeSuccesModal() {
			await swal({
				title: "Success",
				text: "User updated successfully!",
				icon: "success",
				button: {
					text: "OK",
					className: 'btn btn-success',
				}
			});
		}
	},

}
</script>

<template>
	<div>
		<div class="d-flex justify-content-between mb-2">
			<h1 class="page-header mb-0">User Info</h1>
			<ol class="breadcrumb my-1">
				<li class="breadcrumb-item"><router-link to="/admin">Home</router-link></li>
				<li class="breadcrumb-item active"><router-link to="/admin/user">User</router-link></li>
				<li class="breadcrumb-item active"><span>User Info</span></li>
				<!-- <li class="breadcrumb-item active"><i class="fa fa-arrow-back"></i>View Order</li> -->
			</ol>
		</div>
		<div class="table-responsive form-inline">
			<form @submit="updateUserInfo">
				<div class="profile">
					<div class="profile-header">
						<div class="profile-header-cover"></div>
						<div class="profile-header-content">
							<div class="profile-header-img p-0 ">
								<!-- <img v-if="!inEditProfileMode" :src="user.img || defaultImage" /> -->

								<div class=" _profile-img-wrapper">
									<div class="_profile-img-container "
										:class="{ '_disable-picture-input': !inEditProfileMode }">
										<picture-input ref="pictureInput" width="120" height="120" margin="0"
											accept="image/*" size="10" button-class="btn" :custom-strings="{
												upload: '<h1>Bummer!</h1>',
												drag: 'input profile picture'
											}" @change="onChange" :prefill="user.img || defaultImage" :alertOnError="false">
										</picture-input>
									</div>
								</div>

							</div>
							<div class="profile-header-info">
								<h4 class="mt-0 mb-1">{{ user.name }}</h4>
								<p class="mb-2">@{{ user.username }}</p>
								<p class="mb-2">{{ user.role.name }}</p>
								<button type="button" v-if="user.id!=authUser.id"
									@click="inEditProfileMode = !inEditProfileMode; updateUser = { ...user }; errors.username = ''"
									class="btn btn-xs" :class="inEditProfileMode ? 'btn-red' : 'btn-yellow'">
									{{ !inEditProfileMode ? 'Edit User' : 'Cancel edit' }}
								</button>
							</div>
						</div>
					</div>
				</div>
				<div class="card border-0 mb-4">
					<div class="card-body">
						<div class="mb-3 fs-5 fw-bold">User Info</div>


						<div class="row">
							<div class="col-md-6 mb-3">
								<label for="name" class="form-label">Name</label>
								<input type="text" class="form-control" id="name" placeholder="Name"
									v-model="updateUser.name" :disabled="!inEditProfileMode"
									:class="{ 'disabled-input': !inEditProfileMode }" required>
							</div>
							<div class="col-md-6 mb-3">
								<label for="validationServerUsername" class="form-label">Username</label>
								<input type="text" placeholder="Username" v-model="updateUser.username"
									:disabled="!inEditProfileMode"
									:class="['form-control', { 'disabled-input': !inEditProfileMode, 'is-invalid': errors.username }]"
									required id="validationServerUsername">

								<div class="invalid-feedback">
									{{ errors.username }}
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-md-6 mb-3">
								<label class="form-label">Phone</label>
								<input type="phone" class="form-control" placeholder="Phone" v-model="updateUser.phone"
									:disabled="!inEditProfileMode" :class="{ 'disabled-input': !inEditProfileMode }">
							</div>
							<div class="col-md-6 mb-3">

								<label class="form-label">Sex</label>
								<select class="form-control" v-model="updateUser.sex" :disabled="!inEditProfileMode"
									:class="{ 'disabled-input': !inEditProfileMode }">
									<option value="MALE" selected>MALE</option>
									<option value="FEMALE">FEMALE</option>
								</select>
							</div>
						</div>
						<div class="row">
							<div class="col-md-6 mb-3">
								<label class="form-label">Address</label>
								<input type="Address" class="form-control" placeholder="Address"
									v-model="updateUser.address" :disabled="!inEditProfileMode"
									:class="{ 'disabled-input': !inEditProfileMode }">
							</div>
							<div class="col-md-6 mb-3">
								<label for="dob" class="form-label">Date Of Birth</label>
								<input type="date" class="form-control" id="dob" placeholder="DOB" v-model="updateUser.dob"
									:disabled="!inEditProfileMode" :class="{ 'disabled-input': !inEditProfileMode }">
							</div>
						</div>

						<div class="row">
							<div class="col-md-6 mb-3">
								<label class="form-label">Role</label>
								<div>
									<select class="form-control" v-model="updateUser.roleId" :disabled="!inEditProfileMode"
										:class="{ 'disabled-input': !inEditProfileMode }">
										<option v-for="(role) in roles" :key="role.id" :value="role.id" v-text="role.name">
										</option>
									</select>
								</div>
							</div>
							<div v-if="!inEditProfileMode" class="col-md-6 mb-3">
								<div v-if="!inEditProfileMode" class="col-md-6 mb-3 w-100">
									<div class="form-label">Total orders</div>
									<div type="number" class="form-control disabled-input" :disabled="!inEditProfileMode">
										{{ user.totalOrders }}
									</div>
								</div>
							</div>
						</div>
						<div class="row">
							<div v-if="!inEditProfileMode">
								<div class="form-label">Status</div>
								<div type="number" class="form-control disabled-input" :class="{ 'text-red': !user.status }"
									:disabled="!inEditProfileMode">
									{{ user.status ? "Active" : "Inactive" }}
								</div>
							</div>
						</div>

						<div v-if="inEditProfileMode">

							<div class="mb-3">
								<button v-if="!inToResetPasswordMode" type="button"
									@click="inToResetPasswordMode = !inToResetPasswordMode"
									class="btn btn-white w-100 text-red border-danger">Reset
									password</button>

								<div v-if="inToResetPasswordMode" class="mb-3 text-danger">
									<label for="validationServerPassword" class="form-label">New Password</label>
									<input type="password" placeholder="Password" v-model="updateUser.password" required
										@input="valdiatePassword()" :class="{ 'is-invalid': errors.password }"
										class="form-control" id="validationServerPassword">
									<div class="invalid-feedback">
										{{ errors.password }}
									</div>
								</div>
							</div>

							<!-- change user status -->
							<div class="mb-3">
								<button v-if="updateUser.status" type="button" @click="confirmUserStatusOperation()"
									class="btn btn-white w-100 text-red border-danger">Disbale This User
								</button>
								<button v-else type="button" @click="confirmUserStatusOperation()"
									class="btn btn-white w-100 text-success border-success">Enable This User
								</button>
							</div>

							<div v-if="!loading" class="d-grid gap-2 d-md-flex justify-content-md-end"
								style="margin: auto;">
								<button :disabled="!isSubmittable"
									class="btn btn-success me-md-2 btn-rounded px-4 rounded-pill"
									type="submit">Confirm</button>

								<button @click="inEditProfileMode = false; updateUser = { ...user }; errors.username = ''"
									class="btn btn-danger btn-rounded px-4 rounded-pill">Cancel</button>
							</div>
							<div v-else class="d-grid gap-2 d-md-flex justify-content-md-end" style="margin: auto;">
								<button class="btn btn-success btn-rounded rounded-pill"
									style="padding-left: 2.5rem;padding-right: 2.5rem;padding-top: .91rem; padding-bottom: .91rem;"
									type="button">
									<!-- <Loading style="font-size: .22rem" /> -->
								</button>
							</div>
						</div>
						<div v-if="!inEditProfileMode"
							style="width: 100%; display: flex; justify-content: end;margin-top: .5rem;">
							<router-link to="/admin/user"
								class="btn btn-success btn-rounded px-4 rounded-pill">Back</router-link>
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>
</template>

<style scoped>
.disabled-input {
	border-left: none;
	border-top: none;
	border-right: none;
	border-radius: 0;
	background-color: inherit;
}

._red {
	background-color: red;
}

#auth-profile {
	margin-top: -1.21rem;
	height: 90vh;
	/* background-color: white; */
}

._profile-img-wrapper {
	position: relative;

}

._profile-img-container {
	position: absolute;
	height: 100%;
	width: 100%;
	z-index: 10;
	background-color: blue;
}

._disable-picture-input {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	/* background-color: rgba(0, 0, 0, 0.5);  */
	pointer-events: none;
}
</style>