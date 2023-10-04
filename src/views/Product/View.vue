<script>
import Loading from '../../components/app/LoadingOnSubmit.vue';
import imageApi from "../../api/imageApi"
import PictureInput from 'vue-picture-input'
import categoryId from "../../api/category/categoryId"
import Product from '../../api/product/product';
import swal from "sweetalert"
export default {
	data() {
		return {
			defaultimage: '../../src/assets/defaultImage.png',
        products: {
			category: {}
		},
		categories: [],
		image: null,
		loading: false,
		renderPageEnable: false
    };
		},
		components: { 
		PictureInput,
		Loading },
			computed: {
		imageLoaded() {
			return !!this.$refs.pictureInput.file;
		}
	},
			methods: {
		onChange(image) {
			if (image) {
				this.image = this.$refs.pictureInput.file
			}
		},
		async updateProduct(e) {
			e.preventDefault();
			const confirm = await this.confirmDialog();
			if (!confirm) return;
			this.loading = true;
			try {
				this.products.img = await this.uploadImage();
				this.products = await Product.updateProductById(this.$route.params.id, this.products);
				this.loading = false
				await this.showSuccessDialog()
				 this.$router.push("/product")
			} catch (error) {
				this.loading = false;
				console.log(error);
			}
		},
		async uploadImage() {
			const res = await imageApi.uplaodImage(this.image);
			return res;
		},
		async confirmDialog() {
			return swal({
				title: "Update Product",
				text: "Are you sure you want to update this Product?",
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
						text: 'Update',
						value: true,
						visible: true,
						className: 'btn btn-success',
						closeModal: true
					}
				}
			})
		}, async showSuccessDialog() {
			await swal({
				title: "Success",
				text: "Product updated successfully!",
				icon: "success",
				button: {
					text: "OK",
					className: 'btn btn-success',
				}
			});
		}
	},
	async mounted() {
		this.products = await Product.getProductById(this.$route.params.id)
const categoryPage = await categoryId.getAllCategories();
this.categories = categoryPage;
this.products.categoryId = this.products.category.id
		this.renderPageEnable = true
	},
};

</script>
<template>
	<div class="d-flex align-items-center mb-3">
		<div>
			<ol class="breadcrumb">
				<li class="breadcrumb-item"><a href="/dashboard">Home</a></li>
                <li class="breadcrumb-item"><a href="/product">Product</a></li>
                <li class="breadcrumb-item active"><i class="fa fa-arrow-back"></i> Product Details</li>
			</ol>
			<h1 class="page-header mb-0">Product Info</h1>
		</div>
		<div class="ms-auto">
		<a href="/product" class="btn btn-success btn-rounded px-4 rounded-pill">Back</a>
		</div>
	</div>
	<form v-if="renderPageEnable" @submit="updateProduct">
	<div class="card border-0 mb-4" >
		<div class="card-body">
			<div class="circle text-center">
					<picture-input ref="pictureInput" width="150" height="150" margin="16" accept="image/*" size="10"
						button-class="btn" :custom-strings="{
							upload: '<h1>Bummer!</h1>',
							drag: 'input profile picture'
						}" @change="onChange" :prefill="products.img || defaultImage" :alertOnError="false">
					</picture-input>
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
              <option v-for="category in categories.data" :key="category.id" :value="category.id" v-text="category.name"></option>
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
					<label class="form-label">Status </label>
					<div>
						<select class="form-control text-center" v-model="products.available"
							:class="{ 'is-invalid': products.available === 'false' || products.available === false }">
							<option value="true">Active</option>
							<option value="false">Inactive</option>
						</select>
					</div>
				</div>
				<div v-if="!loading" class="d-grid gap-2 d-md-flex justify-content-md-end" style="margin: auto;">
					<button class="btn btn-success me-md-2 btn-rounded px-4 rounded-pill" type="submit">Update</button>

					<a href="/product" class="btn btn-danger btn-rounded px-4 rounded-pill">Cancel</a>
				</div>
				<div v-else class="d-grid gap-2 d-md-flex justify-content-md-end" style="margin: auto;">
					<button class="btn btn-success btn-rounded rounded-pill"
						style="padding-left: 2.5rem;padding-right: 2.5rem;padding-top: .91rem; padding-bottom: .91rem;"
						type="button">
						<Loading style="font-size: .22rem" />
					</button>
				</div>

			</div>
		</div>
	</form>
</template>
../../api/category/categoryId