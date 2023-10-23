<script>
import { useAppOptionStore } from '@/stores/app-option';
const appOption = useAppOptionStore();
import ConfirmDialogue from '../../components/app/confirm.vue'
import Supplier from '@/services/apis/supplier/supplier';
import swal from "sweetalert";
export default {
	components: { ConfirmDialogue },
	data() {
		return {
			defaultimage: "../../src/assets/defaultImage.png",
			suppliers: {},
			loading: false,
			renderPageEnable: false
		}
	},
	methods: {
		async updateSupplier(e) {
			e.preventDefault();
			const confirm = await this.confirmDialog();
			if (!confirm) return;
			this.loading = true;
			try {
				this.suppliers = await Supplier.updateSuppliersById(this.$route.params.id, this.suppliers);
				this.loading = false
				await this.showSuccessDialog()
				this.$router.push("/admin/supplier")
			} catch (error) {
				this.loading = false;
				console.log(error);
			}
		},
		async confirmDialog() {
			return swal({
				title: "Update Supplier",
				text: "Are you sure you want to update this Supplier?",
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
				text: "Supplier updated successfully!",
				icon: "success",
				button: {
					text: "OK",
					className: 'btn btn-success',
				}
			});
		}
	},
	async mounted() {
		this.suppliers = await Supplier.getSupplierById(this.$route.params.id)
		this.renderPageEnable = true
	},
}
</script>
<template>
	<div>
		<div class="d-flex justify-content-between">
			<h1 class="page-header mb-0">Supplier Profile</h1>
			<ol class="breadcrumb">
				<li class="breadcrumb-item"><a href="/admin/dashboard">Home</a></li>
				<li class="breadcrumb-item"><a href="/admin/supplier">Supplier</a></li>
				<li class="breadcrumb-item active"><i class="fa fa-arrow-back"></i> view Supplier</li>
			</ol>
		</div>
		<div class="d-flex justify-content-end mb-2">
			<a href="/admin/supplier" class="btn btn-success btn-rounded px-4 rounded-pill" type="button">Back</a>

		</div>
		<form @submit="updateSupplier">
			<div class="card border-0 mb-4">
				<div class="card-body">
					<div class="mb-3">
						<label for="Name" class="form-label">Name</label>
						<div class="card">
							<input id="name" type="text" name="name" class="form-control" placeholder="Name" required
								v-model="suppliers.name">
						</div>
					</div>
					<div class="mb-3">
						<label for="Email" class="form-label">Email address</label>
						<input type="email" class="form-control" id="email" placeholder="email@example.com" required
							v-model="suppliers.email">
					</div>
					<div class="mb-3">
						<label for="Address" class="form-label">Address</label>
						<div class="card">
							<input id="address" type="text" name="address" class="form-control" placeholder="Address"
								required v-model="suppliers.address">
						</div>
					</div>
					<div class="mb-3">
						<label for="phone" class="form-label">Phone</label>
						<div class="card">
							<input id="phone" type="text" name="phone" class="form-control" placeholder="Phone" required
								v-model="suppliers.phone">
						</div>
					</div>
					<div class="mb-3">
						<label for="info" class="form-label">Info</label>
						<div class="card">
							<input id="info" type="text" name="info" class="form-control" placeholder="Info" required
								v-model="suppliers.info">
						</div>
					</div>

					<div class="d-grid gap-2 d-md-flex justify-content-md-end" style="margin: 10px;">
						<button class="btn btn-success me-md-2 btn-rounded px-4 rounded-pill" type="submit"><i
								class="fa fa-recycle"></i>&ensp; Update</button> <a href="/admin/supplier"
							class="btn btn-danger btn-rounded px-4 rounded-pill" type="button">Back</a>
					</div>
				</div>
			</div>
		</form>
	</div>
</template>