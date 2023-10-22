<script>
import StockItemId from "@/services/apis/stock/stockitem"
import swal from "sweetalert"
export default {
	data() {
		return {
			defaultimage: '../../src/assets/defaultImage.png',
			stockingitems: {
				product: {},
				stocking: {}
			},
		}
	},
	methods: {
		async updateStockItem(e) {
			e.preventDefault();
			const confirm = await this.confirmDialog();
			if (!confirm) return;
			this.loading = true;
			try {
				this.stockingitems = await StockItemId.updateStockingItemById(this.$route.params.id, this.stockingitems);
				this.loading = false
				await this.showSuccessDialog()
				this.$router.push(`/admin/stocking_item/${this.stockingitems.stocking.id}`);
			} catch (error) {
				this.loading = false;
				console.log(error);
			}
		},
		async confirmDialog() {
			return swal({
				title: "Update Stock Item",
				text: "Are you sure you want to update this Stock PRODUCT?",
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
				text: "Stock PRODUCT updated successfully!",
				icon: "success",
				button: {
					text: "OK",
					className: 'btn btn-success',
				}
			});
		}
	},
	async mounted() {
		this.stockingitems = await StockItemId.getStockingItemById(this.$route.params.id)
	},
}
</script>
<template>
	<div>
		<div class="d-flex align-items-center mb-3">
			<div>
				<ol class="breadcrumb">
					<li class="breadcrumb-item"><a href="/admin/dashboard">Home</a></li>
					<li class="breadcrumb-item"><a href="/admin/stock">Stock</a></li>
					<li class="breadcrumb-item"><a type="button"
							:href="`/stocking_item/${stockingitems.stocking.id}`">Stock_Item</a></li>
					<li class="breadcrumb-item active"><i class="fa fa-arrow-back"></i> View Stock_Item</li>
				</ol>
				<h1 class="page-header mb-0">Stock Product Info</h1>
			</div>
			<div class="ms-auto">
				<a type="button" class="btn btn-danger btn-rounded px-4 rounded-pill" aria-expanded="false"
					:href="`/admin/stocking_item/${stockingitems.stocking.id}`">Back</a>
			</div>
		</div>
		<form @submit="updateStockItem">
			<div class="card border-0 mb-4">
				<div class="card-body">
					<div class="mb-3">
						<div class="text-center">
							<img :src="stockingitems.product.img || defaultimage"
								onerror="this.src='../../src/assets/defaultImage.png'"> class="rounded-circle" width="150"
							height="150" alt="" />
						</div>
					</div>
					<div class="mb-3">
						<label for="Name" class="form-label">Name</label>
						<div class="card">
							<input id="name" type="text" name="name" class="form-control" placeholder="Name" readonly
								v-model="stockingitems.product.name">
						</div>
					</div>
					<div class="mb-3">
						<label for="productId" class="form-label">Product Code</label>
						<div class="card">
							<div class="card">
								<input id="productId" type="text" name="productId" class="form-control"
									placeholder="Product Code" readonly v-model="stockingitems.product.id">
							</div>
						</div>
					</div>
					<div class="mb-3">
						<label for="price" class="form-label">Price</label>
						<div class="card">
							<div class="card">
								<input id="price" type="text" name="price" class="form-control" placeholder="Price" required
									v-model="stockingitems.price">
							</div>
						</div>
					</div>
					<div class="mb-3">
						<label for="phone" class="form-label">Quantity</label>
						<div class="card">
							<div class="card">
								<input id="quantity" type="text" name="quantity" class="form-control" placeholder="Quantity"
									required v-model="stockingitems.quantity">
							</div>
						</div>
					</div>

					<div class="mb-3">
						<label for="expDate" class="form-label">EXPDate</label>
						<div class="card">
							<div class="card">
								<input id="expDate" type="text" name="expDate" class="form-control" placeholder="expDate"
									required v-model="stockingitems.expDate">
							</div>
						</div>
					</div>
					<div class="mb-3">
						<label for="mfgDate" class="form-label">MFGDate</label>
						<div class="card">
							<div class="card">
								<input id="mfgDate" type="text" name="mfgDate" class="form-control" placeholder="mfgDate"
									required v-model="stockingitems.mfgDate">
							</div>
						</div>
					</div>
					<div v-if="!loading" class="d-grid gap-2 d-md-flex justify-content-md-end" style="margin: auto;">
						<button class="btn btn-success me-md-2 btn-rounded px-4 rounded-pill" type="submit">Update</button>

						<a type="button" class="btn btn-danger btn-rounded px-4 rounded-pill" aria-expanded="false"
							:href="`/admin/stocking_item/${stockingitems.stocking.id}`">Back</a>
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
</div></template>
