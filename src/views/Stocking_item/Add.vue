<script>
import { useAppOptionStore } from '@/stores/app-option';
</script>
<template>
    <div class="d-flex align-items-center mb-3">
    <div>
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="javascript:;">Home</a></li>
        <li class="breadcrumb-item"><a href="javascript:;">Stock</a></li>
        <li class="breadcrumb-item"><a href="javascript:;">Stock_Item</a></li>
        <li class="breadcrumb-item active"><i class="fa fa-arrow-back"></i> Add Stock_Item</li>

      </ol>
      <h1 class="page-header mb-0">Add Stock Item</h1>
    </div>
    </div>
    <div class="card border-0 mb-4" style="background-color: rgb(77, 167, 246);">
		<div class="card-body">
  <form>
	<div class="mb-3">
      <label for="productId" class="form-label">Product Id</label>
      <input type="text" class="form-control" id="productId" placeholder="Product Id">
    </div>
    <div class="mb-3">
      <label for="stockingId" class="form-label">Stocking Id</label>
      <input type="text" class="form-control" id="stockingId" placeholder="Stocking Id">
    </div>
    <div class="mb-3">
      <label for="price" class="form-label">Price</label>
      <input type="text" class="form-control" id="price" placeholder="Price">
    </div>
    <div class="mb-3">
      <label for="quantity" class="form-label">Quantity</label>
      <input type="text" class="form-control" id="quantity" placeholder="Quantity">
    </div>
	<div class="mb-3">
      <label for="expDate" class="form-label">EXPDate</label>
      <input type="text" class="form-control" id="expDate" placeholder="EXpDate">
    </div>
    <div class="mb-3">
      <label for="mfgDate" class="form-label">MFGDate</label>
      <input type="text" class="form-control" id="mfgDate" placeholder="MFGDate">
    </div>
    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
  <a href="/stocking_item/" class="btn btn-primary me-md-2 btn-rounded px-4 rounded-pill" type="submit">Save</a>
  <a href="/stocking_item/" class="btn btn-danger btn-rounded px-4 rounded-pill">Cancel</a>
</div>
</form>
    </div>
    </div>
</template>