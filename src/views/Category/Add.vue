<script>
import categoryApi from "../../api/categoryApi"
import imageApi from "../../api/imageApi"
import PictureInput from 'vue-picture-input'
import Loading from '../../components/app/LoadingOnSubmit.vue';
export default {
  data() {
    return {
      category: {
        name: '',
        img: null
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
        console.log('Picture loaded.')
        this.image = this.$refs.pictureInput.file
      } else {
        console.log('FileReader API not supported: use the <form>')
      }
    },
    async registerCategory(e) {
      e.preventDefault();
      this.loading = true;
      try {
        await categoryApi.registerCategory(this.category);
        this.loading = false
        this.$router.push("/category")
      } catch (error) {
        this.loading = false;
      }
    },
    async uploadImage() {
      const res = await imageApi.uplaodImage(this.image);
      return res;
    },
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
                <label class="form-label">Title</label>
                <input type="text" class="form-control" id="name" placeholder="Category" v-model="category.name" required>
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
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
  <button class="btn btn-primary me-md-2 btn-rounded px-4 rounded-pill" type="submit">Submit</button>
  <a href="/category/" class="btn btn-danger btn-rounded px-4 rounded-pill">Cancel</a>
</div>
        </div>
    </div>
</form>
</template>