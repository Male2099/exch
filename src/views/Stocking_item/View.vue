<script>
import { useAppOptionStore } from '@/stores/app-option';
const appOption = useAppOptionStore();
import axios from 'axios';
import ConfirmDialogue from '../../components/app/confirm.vue'
export default {
	components: { ConfirmDialogue },
	data() {
                return {
  stockingitems: {
	product:{},
	stocking:{}
  },
                }
            },
           
	mounted() {
		axios.get(`http://localhost:8081/api/v1/stocking-items/${this.$route.params.id}`)
        .then(response => {
          this.stockingitems = response.data;
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
				<li class="breadcrumb-item"><a href="/dashboard">Home</a></li>
        <li class="breadcrumb-item"><a href="/stock">Stock</a></li>
        <li class="breadcrumb-item"><a type="button" :href="`/stocking_item/${stockingitems.stocking.id}`">Stock_Item</a></li>
        <li class="breadcrumb-item active"><i class="fa fa-arrow-back"></i> View Stock_Item</li>
			</ol>
			<h1 class="page-header mb-0">Stock Product Info</h1>
		</div>
		<div class="ms-auto">
			<a type="button" class="btn btn-danger btn-rounded px-4 rounded-pill" aria-expanded="false" :href="`/stocking_item/${stockingitems.stocking.id}`">Back</a>
		</div>
	</div>
	<div class="card border-0 mb-4">
		<div class="card-body">
			<div class="mb-3">
			<div class="text-center">
				<img :src="stockingitems.product.img" class="rounded-circle" width="150" height="150" alt="" />
			</div>
		</div>
					<div class="mb-3">
			<label for="Name" class="form-label">Name</label>
			<div class="card">
				<input id="name"  type="text" name="name" class="form-control" placeholder="Name" required v-model="stockingitems.product.name">
			</div>
		</div>
		<div class="mb-3">
			<label for="productId" class="form-label">Product Code</label>
			<div class="card">
				<div class="card">
				<input id="productId"  type="text" name="productId" class="form-control" placeholder="Product Code" required v-model="stockingitems.product.id">
			</div>
			</div>
		</div>
		<div class="mb-3">
			<label for="price" class="form-label">Price</label>
			<div class="card">
				<div class="card">
				<input id="price"  type="text" name="price" class="form-control" placeholder="Price" required v-model="stockingitems.price">
			</div>
			</div>
		</div>
		<div class="mb-3">
			<label for="phone" class="form-label">Quantity</label>
			<div class="card">
				<div class="card">
				<input id="quantity"  type="text" name="quantity" class="form-control" placeholder="Quantity" required v-model="stockingitems.quantity">
			</div>
			</div>
		</div>

		<div class="mb-3">
			<label for="expDate" class="form-label">EXPDate</label>
			<div class="card">
				<div class="card">
				<input id="expDate"  type="text" name="expDate" class="form-control" placeholder="expDate" required v-model="stockingitems.expDate">
			</div>
			</div>
		</div>
		<div class="mb-3">
			<label for="mfgDate" class="form-label">MFGDate</label>
			<div class="card">
				<div class="card">
				<input id="mfgDate"  type="text" name="mfgDate" class="form-control" placeholder="mfgDate" required v-model="stockingitems.mfgDate">
			</div>
			</div>
		</div>
			
			<div class="d-grid gap-2 d-md-flex justify-content-md-end" style="margin: 10px;">
				<a :href="`/stocking_item/${stockingitems.stocking.id}`" class="btn btn-success btn-rounded px-4 rounded-pill"><i class="fa fa-recycle"></i>Update</a>
				<a type="button" class="btn btn-danger btn-rounded px-4 rounded-pill" aria-expanded="false" :href="`/stocking_item/${stockingitems.stocking.id}`">Back</a>
			</div>
		</div>
	</div>
</template>
