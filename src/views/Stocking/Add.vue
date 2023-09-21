<script>
import { useAppOptionStore } from '@/stores/app-option';
</script>
<template>
    <div class="d-flex align-items-center mb-3">
    <div>
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="javascript:;">Home</a></li>
        <li class="breadcrumb-item"><a href="javascript:;">Stock</a></li>
        <li class="breadcrumb-item active"><i class="fa fa-arrow-back"></i> Add Stcok</li>

      </ol>
      <h1 class="page-header mb-0">Add Stock</h1>
    </div>
    </div>
    <div class="card border-0 mb-4" >
		<div class="card-body">
  <form>
	<div class="mb-3">
      <label for="supplierId" class="form-label">SupplierId</label>
      <input type="text" class="form-control" id="supplierId" placeholder="SupplierId">
    </div>
    <div class="mb-3">
      <label for="tax" class="form-label">Tax</label>
      <input type="text" class="form-control" id="tax" placeholder="Tax">
    </div>
    <div class="mb-3">
      <label for="createAt" class="form-label">Create At</label>
      <input type="text" class="form-control" id="createAt" placeholder="Address">
    </div>
    <div class="mb-3">
      <label for="deliveryAt" class="form-label">Delivery At</label>
      <input type="text" class="form-control" id="deliveryAt" placeholder="delivery At">
    </div>
	<div class="mb-3">
      <label for="expectedDelivery" class="form-label">Expected Delivery</label>
      <input type="text" class="form-control" id="expectedDelivery" placeholder="expectedDelivery">
    </div>
    <div class="mb-3">
      <label for="status" class="form-label">Status</label>
      <input type="text" class="form-control" id="status" placeholder="Tax">
    </div>
    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
  <a href="/stock/" class="btn btn-primary me-md-2 btn-rounded px-4 rounded-pill" type="submit">Save</a>
  <a href="/stock/" class="btn btn-danger btn-rounded px-4 rounded-pill">Cancel</a>
</div>
</form>
    </div>
    </div>
</template>