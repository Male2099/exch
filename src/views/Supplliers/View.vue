<script>
import { useAppOptionStore } from '@/stores/app-option';
const appOption = useAppOptionStore();
import ConfirmDialogue from '../../components/app/confirm.vue'
export default {
	components: { ConfirmDialogue },
	data() {
		
                return {
	supplier:{
  id: 0,
  name: "string",
  phone: "string",
  email: "string",
  address: "string",
  info: "string"
	}
                }
            },
           
	mounted() {
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
	<div class="card border-0 mb-4" style="background-color: rgb(77, 167, 246);">
		<div class="card-body">
					<div class="mb-3">
			<label for="Name" class="form-label">Name</label>
			<div class="card">
				<input id="name"  type="text" name="name" class="form-control" placeholder="Name" required v-model="supplier.name">
			</div>
		</div>
		<div class="mb-3">
      <label for="Email" class="form-label">Email address</label>
      <input type="email" class="form-control" id="email" placeholder="email@example.com" required v-model="supplier.email">
    </div>
		<div class="mb-3">
			<label for="Address" class="form-label">Address</label>
			<div class="card">
				<input id="address"  type="text" name="address" class="form-control" placeholder="Address" required v-model="supplier.address">
			</div>
		</div>
		<div class="mb-3">
			<label for="phone" class="form-label">Phone</label>
			<div class="card">
				<input id="phone"  type="text" name="phone" class="form-control" placeholder="Phone" required v-model="supplier.phone">
			</div>
		</div>
        <div class="mb-3">
			<label for="info" class="form-label">Info</label>
			<div class="card">
				<input id="info"  type="text" name="info" class="form-control" placeholder="Info" required v-model="supplier.info">
			</div>
		</div>

			<div class="d-grid gap-2 d-md-flex justify-content-md-end" style="margin: 10px;">
				<a href="/supplier/" class="btn btn-success btn-rounded px-4 rounded-pill"><i class="fa fa-recycle"></i>Update</a>
				<a href="/supplier/" class="btn btn-danger btn-rounded px-4 rounded-pill" type="button">Back</a>
			</div>
		</div>
	</div>
</template>
