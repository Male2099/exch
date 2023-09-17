<script>
import PictureInput from 'vue-picture-input';
import axios from 'axios';
export default {
  data() {
    return {
      form: {
        name: '',
        image: null
      },
      imageUrl: ''
    };
  },
  methods: {
    handleFileChange(event) {
      const file = event.target.files[0];
      this.form.image = file;
      this.imageUrl = URL.createObjectURL(file);
    },
    addCategory(event) {
      event.preventDefault();
      const formData = new FormData();
      formData.append('name', this.form.name);
      formData.append('image', this.form.image);
      
      // Make an API call to post the form data
      fetch('your-api-endpoint', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.form.name = '';
        this.form.image = null;
        this.imageUrl = '';
        this.$refs.fileInput.value = '';
        this.$router.push("/category/");
      })
      .catch(error => {
        console.error(error);
      });
    }
  }
};
</script>
<template>
    <div class="d-flex align-items-center mb-3">
        <div>
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="javascript:;">Home</a></li>
                <li class="breadcrumb-item"><a href="javascript:;">Category</a></li>
                <li class="breadcrumb-item active"><i class="fa fa-arrow-back"></i>Add Category</li>
            </ol>
            <h1 class="page-header mb-0">Category</h1>
        </div>
    </div>
<form @submit="addCategory">

    <div class="card border-0 mb-4" style="background-color: rgb(77, 167, 246);">
        <div class="card-header h6 mb-0 bg-none p-3">
            <i class="fa fa-dolly fa-lg fa-fw text-dark text-opacity-50 me-1"></i> Category
        </div>
        <div class="card-body">
            <div class="mb-3">
                <label class="form-label">Title</label>
                <input type="text" class="form-control" name="title" id="name" placeholder="Category">
            </div>
            <div class="card-header h6 mb-0 bg-none p-3">
                <i class="fa-solid fa-image fa-lg fa-fw text-dark text-opacity-50 me-1"></i> Image
            </div>
            <div class="card-body">
                <input type="file" id="image" ref="fileInput" @change="handleFileChange">
        <img :src="imageUrl" alt="Selected Image" v-if="imageUrl" width="150" height="150">
            </div>
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
  <button class="btn btn-primary me-md-2 btn-rounded px-4 rounded-pill" type="submit">Submit</button>
  <a href="/category/" class="btn btn-danger btn-rounded px-4 rounded-pill">Cancel</a>
</div>
        </div>
    </div>
</form>
</template>