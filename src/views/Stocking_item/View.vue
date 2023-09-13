<script>
import { useAppOptionStore } from '@/stores/app-option';
const appOption = useAppOptionStore();
import ConfirmDialogue from '../../components/app/confirm.vue'
export default {
	components: { ConfirmDialogue },
	data() {
		
                return {
  product: {
	id: 0,
  quantity: 0,
  price: 0,
  expDate: "string",
  mfgDate: "string",
  stockingId: 0,
  productId: 0
  },
                }
            },
            methods: {
                handleCheckboxChange() {
                    this.result = `The product is ${this.product.isAvailable ? 'activated' : 'disactivated'}`
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
        <li class="breadcrumb-item"><a href="javascript:;">Stock</a></li>
        <li class="breadcrumb-item"><a href="javascript:;">Stock_Item</a></li>
        <li class="breadcrumb-item active"><i class="fa fa-arrow-back"></i> View Stock_Item</li>
			</ol>
			<h1 class="page-header mb-0">Stock Product Info</h1>
		</div>
		<div class="ms-auto">
			<a href="/stocking_item/" class="btn btn-success btn-rounded px-4 rounded-pill"><i class="fa fa-recycle"></i>Update</a>
			<button class="btn btn-danger btn-rounded px-4 rounded-pill" @click="doDelete"><i class="fa fa-trash-o fa-lg me-2 ms-n2 text-success-900"></i>Deleted</button>
        <confirm-dialogue ref="confirmDialogue"></confirm-dialogue>
		</div>
	</div>
	<div class="card border-0 mb-4" style="background-color: rgb(77, 167, 246);">
		<div class="card-body">
					<div class="mb-3">
			<label for="Name" class="form-label">Name</label>
			<div class="card">
				<input id="name"  type="text" name="name" class="form-control" placeholder="Name" required v-model="product.name">
			</div>
		</div>
		<div class="mb-3">
			<label for="productId" class="form-label">Product Code</label>
			<div class="card">
				<div class="card">
				<input id="productId"  type="text" name="productId" class="form-control" placeholder="Product Code" required v-model="product.productId">
			</div>
			</div>
		</div>
		<div class="mb-3">
			<label for="price" class="form-label">Price</label>
			<div class="card">
				<div class="card">
				<input id="price"  type="text" name="price" class="form-control" placeholder="Price" required v-model="product.price">
			</div>
			</div>
		</div>
		<div class="mb-3">
			<label for="phone" class="form-label">Quantity</label>
			<div class="card">
				<div class="card">
				<input id="quantity"  type="text" name="quantity" class="form-control" placeholder="Quantity" required v-model="product.quantity">
			</div>
			</div>
		</div>

		<div class="mb-3">
			<label for="expDate" class="form-label">EXPDate</label>
			<div class="card">
				<div class="card">
				<input id="expDate"  type="text" name="expDate" class="form-control" placeholder="expDate" required v-model="product.expDate">
			</div>
			</div>
		</div>
		<div class="mb-3">
			<label for="mfgDate" class="form-label">MFGDate</label>
			<div class="card">
				<div class="card">
				<input id="mfgDate"  type="text" name="mfgDate" class="form-control" placeholder="mfgDate" required v-model="product.mfgDate">
			</div>
			</div>
		</div>
			
			<div class="d-grid gap-2 d-md-flex justify-content-md-end" style="margin: 10px;">
				<a href="/stocking_item/" class="btn btn-success btn-rounded px-4 rounded-pill"><i class="fa fa-recycle"></i>Update</a>
				<a href="/stocking_item/" class="btn btn-danger btn-rounded px-4 rounded-pill" type="button">Back</a>
			</div>
		</div>
	</div>
</template>
