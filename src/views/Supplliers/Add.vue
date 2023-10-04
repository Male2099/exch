<script>
import suppliersApi from "../../api/supplier/supplierApi"
import swal from "sweetalert"
import Loading from '../../components/app/LoadingOnSubmit.vue';
export default {
        data() {
            return {
                supplier : {
                    name: '',
                    phone: '',
                    email: '',
                    address: '',
                    info: ''
                },
                loading: false
            }
        },
        components: {
    Loading
  },
  methods: {
    async registerSupplier(e) {
      e.preventDefault();
      const confirm = await this.confirmDialog();
      if (!confirm) return;
      this.loading = true;
      try {
        await suppliersApi.registerSupplier(this.supplier);
        this.loading = false
        await this.showSuccessDialog()
        this.$router.push("/supplier/")
      } catch (error) {
        console.error(error);
        this.loading = false;
      }
    },
    async confirmDialog() {
      return swal({
        title: "Create Supplier",
        text: "Are you sure you want to create this Supplier?",
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
            text: 'Create',
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
        text: "Supplier created successfully!",
        icon: "success",
        button: {
          text: "OK",
          className: 'btn btn-success',
        }
      });
    }
  },
};
</script>
<template>
  	<div class="d-flex align-items-center mb-3">
		<div>
			<ol class="breadcrumb">
				<li class="breadcrumb-item"><a href="/dashboard/v2">Home</a></li>
				<li class="breadcrumb-item"><a href="/supplier/">Supplier</a></li>
        <li class="breadcrumb-item active"><i class="fa fa-arrow-back"></i> Add Supplier</li>
			</ol>
			<h1 class="page-header mb-0" style="color: green;"><i class="fa fa-plus-circle"></i>Add Supplier</h1>
		</div>
    <div class="ms-auto">
			<a href="/supplier/" class="btn btn-success btn-rounded px-4 rounded-pill">Back</a>
    </div>
    </div>
    <form @submit="registerSupplier">
    <div class="card border-0 mb-4">
		<div class="card-body">
	<div class="mb-3">
      <label for="Name" class="form-label">Name</label>
      <input type="text" class="form-control" id="name" placeholder="Name" required v-model="supplier.name">
    </div>
    <div class="mb-3">
      <label for="phone" class="form-label">Phone</label>
      <input type="text" class="form-control" id="phone" placeholder="Phone" required v-model="supplier.phone">
    </div>
    <div class="mb-3">
      <label for="Email" class="form-label">Email</label>
      <input type="email" class="form-control" id="email" placeholder="email@example.com" required v-model="supplier.email">
    </div>
	<div class="mb-3">
      <label for="Address" class="form-label">Address</label>
      <input type="text" class="form-control" id="address" placeholder="Address" v-model="supplier.address">
    </div>
    <div class="mb-3">
      <label for="info" class="form-label">Info</label>
      <input type="text" class="form-control" id="info" placeholder="Info" v-model="supplier.info">
    </div>
<div v-if="!loading" class="d-grid gap-2 d-md-flex justify-content-md-end" style="margin: auto;">
          <button class="btn btn-success me-md-2 btn-rounded px-4 rounded-pill"
            type="submit">Create</button>
  <a href="/supplier/" class="btn btn-danger btn-rounded px-4 rounded-pill">Cancel</a>
</div>
<div v-else class="d-grid gap-2 d-md-flex justify-content-md-end" style="margin: auto;">
          <button class="btn btn-success btn-rounded rounded-pill"
            style="padding-left: 2.5rem;padding-right: 2.5rem;padding-top: .91rem; padding-bottom: .91rem;" type="button">
            <Loading style="font-size: .22rem" />
          </button>
        </div>
      </div>
    </div>
  </form>
</template>