<script>
import { useAppOptionStore } from '@/stores/app-option';
const appOption = useAppOptionStore();
import ConfirmDialogue from '../../components/app/confirm.vue';
import axios from 'axios';
import roleApi from "../../api/roleApi";
import userAipi from "../../api/userApi";
import userApi from '../../api/userApi';
import Loading from "../../components/app/LoadingOnSubmit.vue";
export default {
	data() {
		return {
			defaultimage: '../../src/assets/defaultImage.png',
			user: {
				username: '',
				password: '',
				name: '',
				img: '',
				dob: '',
				roleId: '',
				sex: '',
				address: '',
				phone: '',
				status: ''
			},
			roles: [],
			image: null,
			result: ``,
			errors: {
				username: null,
				password: null
			},
			loading: false
		}
	},
	components: {
		Loading,
		ConfirmDialogue
	},
	methods: {
		onChange(event) {
			const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.user.img = reader.result;
    };

    if (file) {
      reader.readAsDataURL(file);
    }
		},
		handleCheckboxChange() {
			this.result = `The user is ${this.user.status ? 'activated' : 'disactivated'}`
		},
		async doDelete() {
			const ok = await this.$refs.confirmDialogue.show({
				title: 'Delete Confirmation',
				message: 'Are you sure you want to delete? It cannot be undone.',
				okButton: 'Delete Forever',
			})
			if (ok) {
				axios
					.delete(`http://localhost:8081/api/v1/users/${this.$route.params.id}`) // Replace with your API endpoint
					.then(response => {
						this.user = response.data;
					})
				this.$router.push("/user/").then(() => {
					window.location.reload();
				});
			} else {
				alert('You chose not to delete this page. Doing nothing now.')
			}
		},
		valdiatePassword() {
			if ((this.user.password) && (this.user.password.length < 6 || this.user.password.length > 20)) {
				this.errors.password = "The password must be between 6 and 20 characters long"
			}
			else {
				this.errors.password = null
			}
		}, validateUsername() {
			if (this.errors.username) this.errors.username = null;
		},
		async updateUser(e) {
			e.preventDefault();
			this.loading = true;
			try {
				await userApi.updateUserById(this.$route.params.id, this.user);
				this.loading = false;
				this.$router.push("/user")
				
			} catch (err) {
				this.loading = false;
				this.errors = err.errors;
			}
		}
	},

	async mounted() {
		this.user = await userAipi.getUserById(this.$route.params.id)
		this.user.sex = this.user.sex.toLocaleUpperCase()
		appOption.appSidebarWide = true;
		this.roles = await roleApi.getAllRoles();
		this.user.roleId = this.user.role.id
		this.user.password = ''
		console.log(this.user.password.length);

	},
	computed: {
		isUpdatable() {
			if ((this.user.password) && ((this.user.password.length < 6 || this.user.password.length > 20))
				|| (!this.user.username)) {
				return false;
			}
			return true
		}
	},
	beforeRouteLeave(to, from, next) {
		appOption.appSidebarWide = false;
		next();
	},
}
</script>
<template>
	<div class="d-flex align-items-center mb-3">
		<div>
			<ol class="breadcrumb">
				<li class="breadcrumb-item"><a href="javascript:;">Home</a></li>
				<li class="breadcrumb-item"><a href="javascript:;">User</a></li>
				<li class="breadcrumb-item active"><i class="fa fa-arrow-back"></i> View User</li>
			</ol>
			<h1 class="page-header mb-0">User Profile</h1>
		</div>
		<div class="ms-auto">
			 <button class="btn btn-danger btn-rounded px-4 rounded-pill" @click="doDelete"><i
					class="fa fa-trash-o fa-lg me-2 ms-n2 text-success-900"></i>Deleted</button>
			<confirm-dialogue ref="confirmDialogue"></confirm-dialogue> 
			<a href="/user/" class="btn btn-success btn-rounded px-4 rounded-pill">Back</a>
		</div>
	</div>


	<form @submit="updateUser">
		<div class="card border-0 mb-4 p-2">
			<div class="card-body">
				<div class="circle text-center">
					<img :src="user.img || defaultimage" :alt="user.img ? '' : '<img src=\'defaultimage\' alt=\'Placeholder\' width=\'150\' height=\'150\'>'" width="150" height="150">
<picture-input ref="pictureInput" width="150" height="150" margin="16" accept="image/*" size="10"
  button-class="btn" :custom-strings="{
	upload: '<h1>Bummer!</h1>',
	drag: 'input profile picture'
  }" @change="onChange">
</picture-input>
				</div>

				<div class="mb-3">
					<label for="name" class="form-label">Name</label>
					<input type="text" class="form-control" id="name" placeholder="Name" v-model="user.name" required>

				</div>
				<div class="mb-3">
					<label for="validationServerUsername" class="form-label">Username</label>
					<input type="text" placeholder="username" v-model="user.username" required @input="validateUsername()"
						:class="{ 'is-invalid': errors.username }" class="form-control" id="validationServerUsername">
					<div class="invalid-feedback">
						{{ errors.username }}
					</div>
				</div>
				<div class="mb-3">
					<label for="validationServerPassword" class="form-label">passsword</label>
					<input type="password" placeholder="Set new password" v-model="user.password"
						@input="valdiatePassword()" :class="{ 'is-invalid': errors.password }" class="form-control"
						id="validationServerPassword">
					<div class="invalid-feedback">
						{{ errors.password }}
					</div>
				</div>
				<div class="mb-3">
					<label class="form-label">Address</label>
					<input type="Address" class="form-control" placeholder="Address" v-model="user.address">
				</div>
				<div class="mb-3">
					<label class="form-label">Phone</label>
					<input type="phone" class="form-control" placeholder="Phone" v-model="user.phone">
				</div>
				<div class="mb-3">
					<label for="dob" class="form-label">DOB</label>
					<input type="date" class="form-control" id="dob" placeholder="DOB" v-model="user.dob">
				</div>
				<div class="mb-3">

					<label class="form-label">Sex</label>
					<select class="form-control" v-model="user.sex">
						<option value="MALE">MALE</option>
						<option value="FEMALE">FEMALE</option>
					</select>
				</div>
				<div class="mb-3">
					<label class="form-label">Role </label>
					<div>
						<select class="form-control" v-model="user.roleId">
							<option v-for="(role) in roles" :key="role.id" :value="role.id" v-text="role.name"></option>
						</select>
					</div>
				</div>


			</div>
			<div style="margin-left: 1rem">
				<label for="status" class="form-label">Status</label>
				<div class="form-check form-switch mb-4">
					<input class="form-check-input" type="checkbox" id="my-checkbox" v-model="user.status"
						@change="handleCheckboxChange">
					<label id="my-checkbox-checked" class="form-check-label" for="my-checkbox">{{ result }}</label>
					<div>
						<h7> When the user is deactivated, the registry is created in the system, so the username is
							reserved,
							but can not login until it is activated again </h7>
					</div>
				</div>
			</div>
			<div v-if="!loading" class="d-grid gap-2 d-md-flex justify-content-md-end">
				<button :disabled="!isUpdatable" class="btn btn-success me-md-2 btn-rounded px-4 rounded-pill"
					type="submit"><i class="fa fa-recycle"></i>&ensp; Update</button>

				<a href="/user/" class="btn btn-danger btn-rounded px-4 rounded-pill">Cancel</a>
			</div>
			<div v-else class="d-grid gap-2 d-md-flex justify-content-md-end" style="margin: auto;">
				<button class="btn btn-success btn-rounded rounded-pill"
					style="padding-left: 2.5rem;padding-right: 2.5rem;padding-top: .91rem; padding-bottom: .91rem;"
					type="button">
					<Loading style="font-size: .22rem" />
				</button>
			</div>
		</div>

	</form>
</template>
