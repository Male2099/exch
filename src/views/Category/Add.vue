<script>
import categoryApi from "../../api/category/categoryApi"
import imageApi from "../../api/imageApi"
import PictureInput from 'vue-picture-input'
import swal from "sweetalert"
import Loading from '../../components/app/LoadingOnSubmit.vue';
export default {
  data() {
    return {
      category: {
        name: '',
        img: '',
      },
      image: null,
      loading: false
    };
  },
  components: {
    PictureInput,
    Loading
  },
  methods: {
    onChange(image) {
      if (image) {
        this.image = this.$refs.pictureInput.file
      }
    },
    async registerCategory(e) {
      e.preventDefault();
      const confirm = await this.confirmDialog();
      if (!confirm) return;
      this.loading = true;
      try {
        this.category.img = await this.uploadImage();
        await categoryApi.registerCategory(this.category);
        this.loading = false
        await this.showSuccessDialog()
        this.$router.push("/category")
      } catch (error) {
        console.error(error);
        this.loading = false;
      }
    },
    async uploadImage() {
      const res = await imageApi.uplaodImage(this.image);
      return res;
    },
    async confirmDialog() {
      return swal({
        title: "Create Category",
        text: "Are you sure you want to create this Category?",
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
        text: "Category created successfully!",
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
                <li class="breadcrumb-item"><a href="/category">Category</a></li>
                <li class="breadcrumb-item active"><i class="fa fa-arrow-back"></i>Add Category</li>
            </ol>
            <h1 class="page-header mb-0" style="color: green;"><i class="fa fa-plus-circle"></i>Add Category</h1>
        </div>
    </div>
<form @submit="registerCategory">
    <div class="card border-0 mb-4">
        <div class="card-header h6 mb-0 bg-none p-3">
            <i class="fa fa-dolly fa-lg fa-fw text-dark text-opacity-50 me-1"></i> Category
        </div>
        <div class="card-body">
            <div class="mb-3">
                <label class="form-label">Name</label>
                <input type="text" class="form-control" placeholder="Category" v-model="category.name" required>
            </div>
            <div class="card-header h6 mb-0 bg-none p-3">
                <i class="fa-solid fa-image fa-lg fa-fw text-dark text-opacity-50 me-1"></i> Image
            </div>
            <div class="card-body">
              <picture-input ref="pictureInput" width="150" height="150" margin="16" accept="image/*" size="10"
            button-class="btn" :custom-strings="{
              upload: '<h1>Bummer!</h1>',
              drag: 'input profile picture'
            }" @change="onChange">
          </picture-input>
            </div>
            <div v-if="!loading" class="d-grid gap-2 d-md-flex justify-content-md-end" style="margin: auto;">
          <button class="btn btn-success me-md-2 btn-rounded px-4 rounded-pill"
            type="submit">Create</button>
  <a href="/category" class="btn btn-danger btn-rounded px-4 rounded-pill">Cancel</a>
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
</template>../../api/category/categoryApi