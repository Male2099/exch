<script>
import { useAppOptionStore } from '@/stores/app-option';
const appOption = useAppOptionStore();
import ConfirmDialogue from '../../components/app/confirm.vue';
import categoryId from "@/services/apis/category/categoryId"
import ProductApi from '@/services/apis/product/product';
import Product    from '@/services/apis/product/product';
import axios from 'axios';
export default {
	components: { ConfirmDialogue },
	data() {
		return {
			defaultimage: '../../src/assets/defaultImage.png',

        products: {
			category: {}
		},
		result: `The Product is`,
		categories: [],
    };
		},    
	async mounted() {
		this.products = await ProductApi.getProductById(this.$route.params.id)
		this.categories = await categoryId.getAllCategories();
		this.products.categoryId = this.products.category.id;


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
			this.products = response.data;
        })
		this.$router.push("/product/").then(() => {
        window.location.reload();
	});
            } else {
                alert('You chose not to delete this page. Doing nothing now.')
            }
        },
		async updateProduct(e) {
			e.preventDefault();
			this.loading = true;
			try {
				await Product.updateProductById(this.$route.params.id, this.products);
				this.loading = false;
				this.$router.push("/admin/product")
			} catch (err) {
				this.loading = false;
			}
		}
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
		<a href="/admin/product" class="btn btn-success btn-rounded px-4 rounded-pill">Back</a>

		</div>
	</div>
	<form @submit="updateProduct">
	<div class="card border-0 mb-4" >
		<div class="card-body">
					<div class="mb-3">
			<div class="text-center">
				<img :src="products.img || defaultimage" class="rounded-circle" width="150" height="150" alt="" />
			</div>
		</div>
		<div class="mb-3">
			<label for="Name" class="form-label">Name</label>
			<div class="card">
				<input id="name"  type="text" name="name" class="form-control" placeholder="Name" required v-model="products.name">
			</div>
		</div>
		<div class="mb-3">
                <label class="form-label">Category</label>
                <div>
            <select class="form-control" v-model="products.categoryId">
              <option v-for="(category) in categories" :key="category.id" :value="category.id" v-text="category.name"></option>
            </select>
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
				<button class="btn btn-success me-md-2 btn-rounded px-4 rounded-pill" type="submit"><i class="fa fa-recycle"></i>&ensp; Update</button>
				<a href="/admin/product" class="btn btn-danger btn-rounded px-4 rounded-pill" type="button">Back</a>
			</div>
		</div>
	</div>
</form>
</template>
../../api/category/categoryId../../api/product/product../../api/product/product