<script>
import { useAppOptionStore } from '@/stores/app-option';
import axios from 'axios';
export default {
        data() {
            return {
                supplier : {
                    name: '',
                    phone: '',
                    email: '',
                    address: '',
                    info: ''
                }
            }
        },

        methods: {
          async addSupplier() {
            const body = JSON.stringify(this.supplier);
            console.log(body);
            try {
              const res = await fetch('http://localhost:8081/api/v1/suppliers', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: body
              });
              const data = await res.json();
              console.log(data);
              this.$router.push("/admin/supplier").then(() => {
        window.location.reload();
	});
            } catch (error) {
              console.log(error);
            }
          }
        },
            
    }

</script>
<template>
  	<div class="d-flex align-items-center mb-3">
		<div>
			<ol class="breadcrumb">
				<li class="breadcrumb-item"><a href="/admin/dashboard">Home</a></li>
				<li class="breadcrumb-item"><a href="/admin/supplier">Supplier</a></li>
        <li class="breadcrumb-item active"><i class="fa fa-arrow-back"></i> Add Supplier</li>
			</ol>
			<h1 class="page-header mb-0" style="color: green;"><i class="fa fa-plus-circle"></i>Add Supplier</h1>
		</div>
    <div class="ms-auto">
			<a href="/admin/supplier" class="btn btn-success btn-rounded px-4 rounded-pill">Back</a>
    </div>
    </div>
    <div class="card border-0 mb-4">
		<div class="card-body">
  <form @submit.prevent="addSupplier">
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
    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
    <button class="btn btn-primary me-md-2 btn-rounded px-4 rounded-pill" type="submit">Submit</button>
  <a href="/admin/supplier" class="btn btn-danger btn-rounded px-4 rounded-pill">Cancel</a>
</div>
</form>
      </div>
    </div>
</template>