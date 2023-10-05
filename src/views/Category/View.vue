<script>
import { useAppOptionStore } from '@/stores/app-option';
const appOption = useAppOptionStore();
import categoryApi from '@/services/apis/category/category';
import Category    from '@/services/apis/category/category';
import ConfirmDialogue from '../../components/app/confirm.vue';
import axios from 'axios';
export default {
	components: { ConfirmDialogue },
	data() {
                return {
					defaultimage: '../../src/assets/defaultImage.png',
					categories: {
						name:'',
						img:'',
						available:''
					},
					result: `The category is`
                }
            },
			async mounted() {
				this.categories = await categoryApi.getCategoryById(this.$route.params.id)
		appOption.appSidebarWide = true;
	},
	beforeRouteLeave(to, from, next) {
		appOption.appSidebarWide = false;
		next();
	},
            methods: {
                handleCheckboxChange() {
                    this.result = `The category is ${this.categories.available ? 'activated' : 'disactivated'}`
                },
				async doDelete() {
            const ok = await this.$refs.confirmDialogue.show({
                title: 'Delete Confirmation',
                message: 'Are you sure you want to delete? It cannot be undone.',
                okButton: 'Delete Forever',
            })
            // If you throw an error, the method will terminate here unless you surround it wil try/catch
            if (ok) {
				axios
        .delete(`http://localhost:8081/api/v1/categories/${this.$route.params.id}`) // Replace with your API endpoint
        .then(response => {
			this.customers = response.data;
        })
		this.$router.push("/admin/category").then(() => {
        window.location.reload();
	});
            } else {
                alert('You chose not to delete this page. Doing nothing now.')
            }
        },
		async updateCategory(e) {
			e.preventDefault();
			this.loading = true;
			try {
				await Category.updateCategoryById(this.$route.params.id, this.categories);
				this.loading = false;
				this.$router.push("/admin/category")
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
				<li class="breadcrumb-item"><a href="/admin/dashboard">Home</a></li>
				<li class="breadcrumb-item"><a href="/amdin/category">Category</a></li>
				<li class="breadcrumb-item active"><i class="fa fa-arrow-back"></i>View Category</li>
			</ol>
			<h1 class="page-header mb-0">Category </h1>
		</div>
		<div class="ms-auto">
			<button class="btn btn-danger btn-rounded px-4 rounded-pill" @click="doDelete"><i class="fa fa-trash-o fa-lg me-2 ms-n2 text-success-900"></i>Deleted</button>
        <confirm-dialogue ref="confirmDialogue"></confirm-dialogue>
		<a href="/admin/category" class="btn btn-success btn-rounded px-4 rounded-pill">Back</a>

		</div>
	</div>
	<form @submit="updateCategory">
    <div class="card border-0 mb-4">
		<div class="card-body">
		<div class="mb-3">
			<label for="Name" class="form-label">Name</label>
			<div class="card">
				<input id="name"  type="text" name="name" class="form-control" placeholder="Name" required v-model="categories.name">
			</div>
		</div>
		<div class="mb-3">
			<label for="Img" class="form-label">Image</label>
			<div class="text-center">
				
				<img :src="categories.img || defaultimage" class="" alt="" width="150" height="150"/>
			</div>
		</div>
			<div class="mb-3">
				<label for="status" class="form-label">Status</label>
				<div class="form-check form-switch mb-2">
					<input class="form-check-input" type="checkbox" id="my-checkbox" v-model="categories.available" @change="handleCheckboxChange">
					<label id="my-checkbox-checked" class="form-check-label"  for="my-checkbox">{{result}}</label>
					<div>
					<i> When the category is deactivated, the category is created in the system, but it is not Available until it is activated again</i>
				</div>
			</div>
			</div>
			<div class="d-grid gap-2 d-md-flex justify-content-md-end" style="margin: 10px;">
				<button class="btn btn-success me-md-2 btn-rounded px-4 rounded-pill" type="submit"><i class="fa fa-recycle"></i>&ensp; Update</button>
				<a href="/admin/category" class="btn btn-danger btn-rounded px-4 rounded-pill" type="button">Back</a>
			</div>
		</div>
	</div>
</form>

</template>
../../api/category/category../../api/category/category