<script>
import { useAppOptionStore } from '@/stores/app-option';
</script>
<template>
  	<div class="d-flex align-items-center mb-3">
		<div>
			<ol class="breadcrumb">
				<li class="breadcrumb-item"><a href="javascript:;">Home</a></li>
				<li class="breadcrumb-item"><a href="javascript:;">Supplier</a></li>
        <li class="breadcrumb-item active"><i class="fa fa-arrow-back"></i> Add Supplier</li>
			</ol>
			<h1 class="page-header mb-0" style="color: green;"><i class="fa fa-plus-circle"></i>Add Supplier</h1>
		</div>
    <div class="ms-auto">
			<a href="/supplier/" class="btn btn-success btn-rounded px-4 rounded-pill">Back</a>
    </div>
    </div>
    <div class="card border-0 mb-4" style="background-color: rgb(77, 167, 246);">
		<div class="card-body">
  <form>
	<div class="mb-3">
      <label for="Name" class="form-label">Name</label>
      <input type="email" class="form-control" id="name" placeholder="Name">
    </div>
    <div class="mb-3">
      <label for="Email" class="form-label">Email address</label>
      <input type="email" class="form-control" id="FormEmail" placeholder="email@example.com">
    </div>
	<div class="mb-3">
      <label for="Address" class="form-label">Address</label>
      <input type="Address" class="form-control" id="Address" placeholder="Address">
    </div>
	<div class="mb-3">
      <label for="phone" class="form-label">Phone</label>
      <input type="phone" class="form-control" id="phone" placeholder="Phone">
    </div>
    <div class="mb-3">
      <label for="info" class="form-label">Info</label>
      <input type="info" class="form-control" id="Info" placeholder="info">
    </div>
    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
      <a href="/supplier/" class="btn btn-success btn-rounded px-4 rounded-pill">Submit</a>
  <a href="/supplier/" class="btn btn-danger btn-rounded px-4 rounded-pill">Cancel</a>
</div>
</form>
      </div>
    </div>
</template>