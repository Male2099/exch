<script>
import { useAppOptionStore } from '@/stores/app-option';
const appOption = useAppOptionStore();
import ConfirmDialogue from '../../components/app/confirm.vue'
import axios from 'axios';
export default {
	components: { ConfirmDialogue },
	data() {
                return {
					suppliers: {}
                }
            },
           
	 mounted() {
	  axios.get(`http://localhost:8081/api/v1/suppliers/${this.$route.params.id}`)
        .then(response => {
          this.suppliers = response.data;
        })
		appOption.appSidebarWide = true;
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
				<li class="breadcrumb-item"><a href="javascript:;">Supplier</a></li>
        <li class="breadcrumb-item active"><i class="fa fa-arrow-back"></i> view Supplier</li>
			</ol>
			<h1 class="page-header mb-0">Supplier Profile</h1>
		</div>
		<div class="ms-auto">
			<button class="btn btn-danger btn-rounded px-4 rounded-pill" @click="doDelete"><i class="fa fa-trash-o fa-lg me-2 ms-n2 text-success-900"></i>Deleted</button>
        <confirm-dialogue ref="confirmDialogue"></confirm-dialogue>
		<a href="/supplier/" class="btn btn-success btn-rounded px-4 rounded-pill" type="button">Back</a>
		</div>
	</div>
	<form @submit.prevent="updateData">
	<div class="card border-0 mb-4">
		<div class="card-body">
					<div class="mb-3">
			<label for="Name" class="form-label">Name</label>
			<div class="card">
				<input id="name"  type="text" name="name" class="form-control" placeholder="Name" required v-model="suppliers.name">
			</div>
		</div>
		<div class="mb-3">
      <label for="Email" class="form-label">Email address</label>
      <input type="email" class="form-control" id="email" placeholder="email@example.com" required v-model="suppliers.email">
    </div>
		<div class="mb-3">
			<label for="Address" class="form-label">Address</label>
			<div class="card">
				<input id="address"  type="text" name="address" class="form-control" placeholder="Address" required v-model="suppliers.address">
			</div>
		</div>
		<div class="mb-3">
			<label for="phone" class="form-label">Phone</label>
			<div class="card">
				<input id="phone"  type="text" name="phone" class="form-control" placeholder="Phone" required v-model="suppliers.phone">
			</div>
		</div>
        <div class="mb-3">
			<label for="info" class="form-label">Info</label>
			<div class="card">
				<input id="info"  type="text" name="info" class="form-control" placeholder="Info" required v-model="suppliers.info">
			</div>
		</div>

			<div class="d-grid gap-2 d-md-flex justify-content-md-end" style="margin: 10px;">
				<button class="btn btn-success btn-rounded px-4 rounded-pill" type="submit">Update</button>
				<a href="/supplier/" class="btn btn-danger btn-rounded px-4 rounded-pill" type="button">Back</a>
			</div>
		</div>
	</div>
</form>
</template>
