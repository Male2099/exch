<script>
import { useAppOptionStore } from '@/stores/app-option';
const appOption = useAppOptionStore();
import ConfirmDialogue from '../../components/app/confirm.vue'
import axios from 'axios';
import roleApi from "../../api/roleApi"

export default {
	components: { ConfirmDialogue },
	data() {
		
                return {
					user: {
        username: '',
        password: '',
        name: '',
        img: '',
        dob: '',
        roleId: '',
        sex: '',
        address: '',
        phone:""
      },
      roles: [],
      image: null,
					result: ``
                }
            },
            methods: {
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
		},
	async mounted() {
		axios.get(`http://localhost:8081/api/v1/users/${this.$route.params.id}`)
        .then(response => {
          this.user = response.data;
        })
		appOption.appSidebarWide = true;
		this.roles = await roleApi.getAllRoles();
    this.user.roleId = this.roles[2]?.id;
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
			<button class="btn btn-danger btn-rounded px-4 rounded-pill" @click="doDelete"><i class="fa fa-trash-o fa-lg me-2 ms-n2 text-success-900"></i>Deleted</button>
        <confirm-dialogue ref="confirmDialogue"></confirm-dialogue>
		<a href="/user/" class="btn btn-success btn-rounded px-4 rounded-pill">Back</a>
		</div>
	</div>
	<form @submit="registerUser">
	<div class="card border-0 mb-4">
		<div class="card-body">		
			<div class="mb-3">
			<div class="text-center">
				<img :src="user.img" class="rounded-circle" alt="" width="150" height="150"/>
			</div>
		</div>
		<div class="mb-3">
			<label for="Name" class="form-label">Name</label>
			<div class="card">
				<input id="name"  type="text" name="name" class="form-control" placeholder="Name" required v-model="user.name">
			</div>
		</div>
		<div class="mb-3">
			<label for="Username" class="form-label">Username</label>
			<div class="card">
				<input id="username"  type="text" name="username" class="form-control" placeholder="Username" required v-model="user.username">
			</div>
		</div>
		<div class="mb-3">
			<label for="Address" class="form-label">Address</label>
			<div class="card">
				<input id="address"  type="text" name="address" class="form-control" placeholder="Address" required v-model="user.address">
			</div>
		</div>
		<div class="mb-3">
			<label for="phone" class="form-label">Phone</label>
			<div class="card">
				<input id="phone"  type="text" name="phone" class="form-control" placeholder="Phone" required v-model="user.phone">
			</div>
		</div>
		<div class="mb-3">
			<label for="dob" class="form-label">DOB</label>
			<div class="card">
				<input id="dob"  type="text" name="dob" class="form-control" placeholder="DOB" required v-model="user.dob">
			</div>
		</div>
		<div class="mb-3">
			<label for="sex" class="form-label">Sex</label>
			<div class="card">
				<input id="sex"  type="text" name="sex" class="form-control" placeholder="Sex" required v-model="user.sex">
			</div>
		</div>
		<div class="mb-3">
		<label for="role" class="form-label">Role </label>
		<div>
			<select class="form-control" v-model="user.roleId">
              <option v-for="(role) in roles" :key="role.id" :value="role.id" v-text="role.name"></option>
              <!-- :selected="role.name === 'ROLE_USER'" -->
            </select>
</div>
    </div>
			<div class="mb-3">
				<label for="status" class="form-label">Status</label>
				<div class="form-check form-switch mb-2">
					<input class="form-check-input" type="checkbox" id="my-checkbox" v-model="user.status" @change="handleCheckboxChange">
					<label id="my-checkbox-checked" class="form-check-label"  for="my-checkbox">{{result}}</label>
					<div>
					<h5> When the user is deactivated, the registry is created in the system, so the email is reserved, but can not login until it is activated again </h5>
				</div>
			</div>
			</div>
			<div class="d-grid gap-2 d-md-flex justify-content-md-end" style="margin: 10px;">
				<a href="/user/" class="btn btn-success btn-rounded px-4 rounded-pill"><i class="fa fa-recycle"></i>Update</a>
				<a href="/user/" class="btn btn-danger btn-rounded px-4 rounded-pill" type="button">Back</a>
			</div>
		</div>
	</div>
	</form>
</template>
