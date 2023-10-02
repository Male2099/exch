<script>
import { useAppOptionStore } from '@/stores/app-option';
const appOption = useAppOptionStore();
import ConfirmDialogue from '../../components/app/confirm.vue'
import SupplierApi from '../../api/supplier/supplier';
import Supplier from '../../api/supplier/supplier';
import axios from 'axios';
export default {
	components: { ConfirmDialogue },
	data() {
                return {
					suppliers: {}
                }
            },
           
	 async mounted() {
		this.suppliers = await SupplierApi.getSupplierById(this.$route.params.id)

		appOption.appSidebarWide = true;
	},
	beforeRouteLeave(to, from, next) {
		appOption.appSidebarWide = false;
		next();
	},
	methods: {
    toggleTable() {
      this.showTable = !this.showTable;
    },
	async doDelete() {
            const ok = await this.$refs.confirmDialogue.show({
                title: 'Delete Confirmation',
                message: 'Are you sure you want to delete? It cannot be undone.',
                okButton: 'Delete Forever',
            })
            if (ok) {
				axios
        .delete(`http://localhost:8081/api/v1/suppliers/${this.$route.params.id}`) // Replace with your API endpoint
        .then(response => {
			this.suppliers = response.data;
        })
		this.$router.push("/supplier/").then(() => {
        window.location.reload();
	});
            } else {
                alert('You chose not to delete this page. Doing nothing now.')
            }
        },
		async updateSupplier(e) {
			e.preventDefault();
			this.loading = true;
			try {
				await Supplier.updateSupplierById(this.$route.params.id, this.suppliers);
				this.loading = false;
				this.$router.push("/supplier/")
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
				<li class="breadcrumb-item"><a href="/supplier/">Supplier</a></li>
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
	<form @submit="updateSupplier">
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
				<button class="btn btn-success me-md-2 btn-rounded px-4 rounded-pill" type="submit"><i class="fa fa-recycle"></i>&ensp; Update</button>				<a href="/supplier/" class="btn btn-danger btn-rounded px-4 rounded-pill" type="button">Back</a>
			</div>
		</div>
	</div>
</form>
</template>
../../api/supplier/supplier../../api/supplier/supplier