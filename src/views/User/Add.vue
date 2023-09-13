<script>
import { useAppOptionStore } from '@/stores/app-option';
import PictureInput from 'vue-picture-input'
export default {
  name: 'app',
  data () {
    return {
    }
  },
  components: {
    PictureInput
  },
  methods: {
    onChange (image) {
      console.log('New picture selected!')
      if (image) {
        console.log('Picture loaded.')
        this.image = image
      } else {
        console.log('FileReader API not supported: use the <form>')
      }
    }
  }
};

</script>
<template>
  <div class="d-flex align-items-center mb-3">
		<div>
			<ol class="breadcrumb">
				<li class="breadcrumb-item"><a href="javascript:;">Home</a></li>
				<li class="breadcrumb-item"><a href="javascript:;">User</a></li>
        <li class="breadcrumb-item active"><i class="fa fa-arrow-back"></i> Add User</li>
			</ol>
			<h1 class="page-header mb-0" style="color: green;"><i class="fa fa-plus-circle"></i>Add User</h1>
		</div>
		<div class="ms-auto">
			<a href="/user/" class="btn btn-success btn-rounded px-4 rounded-pill">Back</a>
		</div>
	</div>
  <form>
    <div class="card border-0 mb-4" style="background-color: rgb(77, 167, 246);">
		<div class="card-body">
      <div class="circle text-center">
        <picture-input 
      ref="pictureInput"
      width="150" 
      height="150" 
      margin="16" 
      accept="image/*" 
      size="10" 
      button-class="btn"
      :custom-strings="{
        upload: '<h1>Bummer!</h1>',
        drag: 'input profile picture'
      }"
      @change="onChange">
    </picture-input>
  </div>
    

	<div class="mb-3">
      <label for="Name" class="form-label">Name</label>
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
      <label for="dob" class="form-label">DOB</label>
      <input type="date" class="form-control" id="dob" placeholder="DOB">
    </div>
	<div class="mb-3">
		<label for="dob" class="form-label">Sex</label>
      <input type="phone" class="form-control" id="phone" placeholder="Sex">
    </div>
	<div class="mb-3">
		<label for="role" class="form-label">Role </label>
		<div>
		<select class="btn btn-secondary dropdown-toggle w-100" id="inputGroupSelect01" >
    <option selected>Role</option>
    <option value="1">Admin</option>
    <option value="2">Cashier</option>
  </select>
</div>
    </div>
    <div class="d-grid gap-2 d-md-flex justify-content-md-end" style="margin: auto;" >
  <a href="/user/" class="btn btn-success me-md-2 btn-rounded px-4 rounded-pill" type="submit">Submit</a>
  <a href="/user/" class="btn btn-danger btn-rounded px-4 rounded-pill">Cancel</a>
</div>
</div>
    </div>
</form>

</template>