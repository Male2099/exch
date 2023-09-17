<script>
import { useAppOptionStore } from '@/stores/app-option';
const appOption = useAppOptionStore();
import ConfirmDialogue from '../../components/app/confirm.vue'
import axios from 'axios';
export default {
	components: { ConfirmDialogue },
	data() {
                return {
					categories: [],
					result: `The product is`
                }
            },
			mounted() {
	  axios.get(`http://localhost:8081/api/v1/categories/${this.$route.params.id}`)
        .then(response => {
          this.categories = response.data;
        })
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
                alert('You have successfully delete this page.')
            } else {
                alert('You chose not to delete this page. Doing nothing now.')
            }
        },
		updateCategory(){
            fetch(`http://localhost:8081/api/v1/categories/${this.$route.params.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.categories)
            })
            .then(data => {
                console.log(data);
                this.$router.push('/category/');
            })
        }
            }
}
</script>
<template>
	<div class="d-flex align-items-center mb-3">
		<div>
			<ol class="breadcrumb">
				<li class="breadcrumb-item"><a href="javascript:;">Home</a></li>
				<li class="breadcrumb-item"><a href="javascript:;">Category</a></li>
				<li class="breadcrumb-item active"><i class="fa fa-arrow-back"></i>View Category</li>
			</ol>
			<h1 class="page-header mb-0">Category </h1>
		</div>
		<div class="ms-auto">
			<a href="/category/" class="btn btn-success btn-rounded px-4 rounded-pill"><i class="fa fa-recycle"></i>Update</a>
			<button class="btn btn-danger btn-rounded px-4 rounded-pill" @click="doDelete"><i class="fa fa-trash-o fa-lg me-2 ms-n2 text-success-900"></i>Deleted</button>
        <confirm-dialogue ref="confirmDialogue"></confirm-dialogue>
		</div>
	</div>
	<form form @submit.prevent="updateCategory">
    <div class="card border-0 mb-4" style="background-color: rgb(77, 167, 246);">
		<div class="card-body">
		<div class="mb-3">
			<div class="text-center">
				<img :src="categories.img" class="" alt="" width="50" height="50"/>
			</div>
		</div>
		<div class="mb-3">
			<label for="Name" class="form-label">Name</label>
			<div class="card">
				<input id="name"  type="text" name="name" class="form-control" placeholder="Name" required v-model="categories.name">
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
				<input class="btn btn-success btn-rounded px-4 rounded-pill" type="submit" value="Update">
				<a href="/category/" class="btn btn-danger btn-rounded px-4 rounded-pill" type="button">Back</a>
			</div>
		</div>
	</div>
</form>

</template>
