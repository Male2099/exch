<script>
import { useAppOptionStore } from '@/stores/app-option';
const appOption = useAppOptionStore();
import ConfirmDialogue from '../../components/app/confirm.vue'
import axios from 'axios';

export default {
	components: { ConfirmDialogue },
	data() {
                return {
	customers:[]
            }
		},    
	mounted() {
		axios.get(`http://localhost:8081/api/v1/customers/${this.$route.params.id}`)
        .then(response => {
          this.customers = response.data;
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
        <li class="breadcrumb-item"><a href="javascript:;">Customer</a></li>
        <li class="breadcrumb-item active"><i class="fa fa-arrow-back"></i>View Customer</li>
			</ol>
			<h1 class="page-header mb-0">Customer Profile</h1>
		</div>
		<div class="ms-auto">
			<a href="/customer/" class="btn btn-success btn-rounded px-4 rounded-pill"><i class="fa fa-recycle"></i>Update</a>
			<button class="btn btn-danger btn-rounded px-4 rounded-pill" @click="doDelete"><i class="fa fa-trash-o fa-lg me-2 ms-n2 text-success-900"></i>Deleted</button>
        <confirm-dialogue ref="confirmDialogue"></confirm-dialogue>
		</div>
	</div>
    <div class="card border-0 mb-4" style="background-color: rgb(77, 167, 246);">
		<div class="card-body">
		<div class="mb-3">
			<label for="Name" class="form-label">Name</label>
			<div class="card">
				<input id="name"  type="text" name="name" class="form-control" placeholder="Name" required v-model="customers.name">
			</div>
		</div>
		<div class="mb-3">
			<label for="Address" class="form-label">Address</label>
			<div class="card">
				<input id="address"  type="text" name="address" class="form-control" placeholder="Address" required v-model="customers.address">
			</div>
		</div>
		<div class="mb-3">
			<label for="phone" class="form-label">Phone</label>
			<div class="card">
				<input id="phone"  type="text" name="phone" class="form-control" placeholder="Phone" required v-model="customers.phone">
			</div>
			<div class="mb-3">
			<label for="totalSpend" class="form-label">Total Spend</label>
			<div class="card">
				<input id="totalSpend"  type="text" name="totalSpend" class="form-control" placeholder="Total Spend" required v-model="customers.totalSpend">
			</div>
			</div>
			<div class="mb-3">
			<label for="lastOrderAt" class="form-label">Last Order At</label>
			<div class="card">
				<input id="lastOrderAt"  type="text" name="lastOrderAt" class="form-control" placeholder="Last Order At" required v-model="customers.lastOrderAt">
			</div>
			</div>
		</div>
			<div class="d-grid gap-2 d-md-flex justify-content-md-end" style="margin: 10px;">
				<a href="/customer/" class="btn btn-success btn-rounded px-4 rounded-pill"><i class="fa fa-recycle"></i>Update</a>
				<a href="/customer/" class="btn btn-danger btn-rounded px-4 rounded-pill" type="button">Back</a>
			</div>
		</div>
	</div>
</template>
