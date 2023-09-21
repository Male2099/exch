<script>
import { useAppOptionStore } from '@/stores/app-option';
</script>
<template>
  <div class="d-flex align-items-center mb-3">
        <div>
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="javascript:;">Home</a></li>
                <li class="breadcrumb-item"><a href="javascript:;">Order</a></li>
                <li class="breadcrumb-item active"><i class="fa fa-arrow-back"></i>Add Order</li>
            </ol>
            <h1 class="page-header mb-0">Order</h1>
        </div>
    </div>
  <div class="card border-0 mb-4">
		<div class="card-body">
  <form>
	<div class="mb-3">
      <label for="Name" class="form-label">User</label>
      <input type="email" class="form-control" id="name" placeholder="Name">
    </div>
    <div class="mb-3">
      <label for="Email" class="form-label">Email address</label>
      <input type="email" class="form-control" id="FormEmail" placeholder="email@example.com">
    </div>
    <div class="mb-3">
      <label for="Password" class="form-label">Password</label>
      <input type="password" class="form-control" id="Password" placeholder="Password">
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
  <a href="/order/" class="btn btn-primary me-md-2 btn-rounded px-4 rounded-pill" type="submit">Save</a>
  <a href="/order/" class="btn btn-danger btn-rounded px-4 rounded-pill">Cancel</a>
</div>
</form>
    </div>
  </div>
</template>