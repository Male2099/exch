<script>
import { useAppOptionStore } from '@/stores/app-option';
const appOption = useAppOptionStore();
import ConfirmDialogue from '../../components/app/confirm.vue'
import axios from 'axios';
export default {
	components: { ConfirmDialogue },
	data() {
		return {
        products: {
			category: {}
		},
		result: `The Product is`,
    };
		},    
	mounted() {
		axios.get(`http://localhost:8081/api/v1/products/${this.$route.params.id}`)
        .then(response => {
          this.products = response.data;
        })
		appOption.appSidebarWide = true;
	},
	beforeRouteLeave(to, from, next) {
		appOption.appSidebarWide = false;
		next();
	},
	methods: {
                handleCheckboxChange() {
                    this.result = `The Product is ${this.products.available ? 'activated' : 'disactivated'}`
                },
				async doDelete() {
            const ok = await this.$refs.confirmDialogue.show({
                title: 'Delete Confirmation',
                message: 'Are you sure you want to delete? It cannot be undone.',
                okButton: 'Delete Forever',
            })
            if (ok) {
				axios
        .delete(`http://localhost:8081/api/v1/products/${this.$route.params.id}`) 
        .then(response => {
			this.customers = response.data;
        })
		this.$router.push("/customer/").then(() => {
        window.location.reload();
	});
            } else {
                alert('You chose not to delete this page. Doing nothing now.')
            }
        },
			}
}
</script>
<template>
	<div class="d-flex align-items-center mb-3">
		<div>
			<ol class="breadcrumb">
				<li class="breadcrumb-item"><a href="/dashboard/v2">Home</a></li>
                <li class="breadcrumb-item"><a href="/product/">Product</a></li>
                <li class="breadcrumb-item active"><i class="fa fa-arrow-back"></i> Product Details</li>
			</ol>
			<h1 class="page-header mb-0">Product Info</h1>
		</div>
		<div class="ms-auto">
			<button class="btn btn-danger btn-rounded px-4 rounded-pill" @click="doDelete"><i class="fa fa-trash-o fa-lg me-2 ms-n2 text-success-900"></i>Deleted</button>
        <confirm-dialogue ref="confirmDialogue"></confirm-dialogue>
		<a href="/product/" class="btn btn-success btn-rounded px-4 rounded-pill">Back</a>

		</div>
	</div>
	<div class="card border-0 mb-4" >
		<div class="card-body">
					<div class="mb-3">
			<div class="text-center">
				<img :src="products.img" class="rounded-circle" width="150" height="150" alt="" />
			</div>
		</div>
		<div class="mb-3">
			<label for="Name" class="form-label">Name</label>
			<div class="card">
				<input id="name"  type="text" name="name" class="form-control" placeholder="Name" required v-model="products.name">
			</div>
		</div>
		<div class="mb-3">
			<label for="category" class="form-label">Category</label>
			<div class="card">
				<div class="card">
				<input id="category.name"  type="text" name="Category" class="form-control" placeholder="Category" required v-model="products.category.name">
			</div>
			</div>
		</div>
		<div class="mb-3">
			<label for="productCode" class="form-label">Product Code</label>
			<div class="card">
				<div class="card">
				<input id="productCode"  type="text" name="productCode" class="form-control" placeholder="Product Code" required v-model="products.productCode">
			</div>
			</div>
		</div>
		<div class="mb-3">
			<label for="price" class="form-label">Price</label>
			<div class="card">
				<div class="card">
				<input id="price"  type="text" name="price" class="form-control" placeholder="Price" required v-model="products.price">
			</div>
			</div>
		</div>
		<div class="mb-3">
			<label for="quantity" class="form-label">Quantity</label>
			<div class="card">
				<div class="card">
				<input id="quantity"  type="text" name="quantity" class="form-control" placeholder="Quantity" required v-model="products.quantity">
			</div>
			</div>
		</div>

		<div class="mb-3">
			<label for="description" class="form-label">Description</label>
			<div class="card">
				<div class="card">
				<input id="description"  type="text" name="description" class="form-control" placeholder="Description" required v-model="products.description">
			</div>
			</div>
		</div>
			<div class="mb-3">
				<label for="status" class="form-label">Status</label>
				<div class="form-check form-switch mb-2">
					<input class="form-check-input" type="checkbox" id="my-checkbox" v-model="products.available" @change="handleCheckboxChange">
					<label id="my-checkbox-checked" class="form-check-label"  for="my-checkbox">{{result}}</label>
					<div>
					<i> When the product is deactivated, the product is created in the system, so the product is reserved, but it is not Available until it is activated again </i>
				</div>
			</div>
			</div>
			<div class="d-grid gap-2 d-md-flex justify-content-md-end" style="margin: 10px;">
				<a href="/product/" class="btn btn-success btn-rounded px-4 rounded-pill"><i class="fa fa-recycle"></i>Update</a>
				<a href="/product/" class="btn btn-danger btn-rounded px-4 rounded-pill" type="button">Back</a>
			</div>
		</div>
	</div>
</template>
