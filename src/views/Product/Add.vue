<script>
import productApi from "@/services/apis/product/productApi"
import categoryId from "@/services/apis/category/categoryId"
import imageApi from "../../api/imageApi"
import PictureInput from 'vue-picture-input';
import Loading from '../../components/app/LoadingOnSubmit.vue';
import swal from "sweetalert"

export default {
  name: 'app',
  data() {
    return {
      product: {
        name: '',
        productCode: '',
        price: '',
        quantity: '',
        description: '',
        img: '',
        categoryId: '1',
      },
      categories: [],
      image: null,
      loading: false
    }
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
    async registerProduct(e) {
      e.preventDefault();
      const confirm = await this.confirmDialog();
      if (!confirm) return;
      this.loading = true;
      try {
        this.product.img = await this.uploadImage();
        await productApi.registerProduct(this.product);
        this.loading = false
        await this.showSuccessDialog()
        this.$router.push("/admin/product")
      } catch (error) {
        this.loading = false;
      }
    },
    async uploadImage() {
      const res = await imageApi.uplaodImage(this.image);
      return res;
    },
    async confirmDialog() {
      return swal({
        title: "Create Product",
        text: "Are you sure you want to create this Product?",
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
        text: "Product created successfully!",
        icon: "success",
        button: {
          text: "OK",
          className: 'btn btn-success',
        }
      });
    }
  },
  async mounted() {
    this.categories = await categoryId.getAllCategories();
    this.product.categoryId = this.categories.data[0]?.id;
  },
};
</script>
<template>
  <div>
    <div class="d-flex align-items-center mb-3">
      <div>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="/admin/dashboard">Home</a></li>
          <li class="breadcrumb-item"><a href="/admin/product">Product</a></li>
          <li class="breadcrumb-item active"><i class="fa fa-arrow-back"></i> Add Product</li>
        </ol>
        <h1 class="page-header mb-0" style="color: green;"><i class="fa fa-plus-circle"></i>Add Product</h1>
      </div>
    </div>
    <form @submit="registerProduct">
      <div class="card border-0 mb-4">
        <div class="card-body">
          <div class="card-header h6 mb-0 bg-none p-3">
            <i class="fa fa-dolly fa-lg fa-fw text-dark text-opacity-50 me-1"></i> Product Information
          </div>

          <div class="card-body">
            <div class="mb-3">
              <label class="form-label">Title</label>
              <input type="text" class="form-control" id="name" placeholder="Product name" v-model="product.name">
            </div>
            <div class="mb-3">
              <label class="form-label">Product_code</label>
              <input type="text" class="form-control" id="productCode" placeholder="Product code"
                v-model="product.productCode">
            </div>
            <div class="mb-3">
              <label class="form-label">Price</label>
              <input type="text" class="form-control" id="price" placeholder="Price" v-model="product.price">
            </div>
            <div class="mb-3">
              <label class="form-label">Category</label>
              <div>
                <select class="form-control" v-model="product.categoryId">
                  <option v-for="(category) in categories.data" :key="category.id" :value="category.id"
                    v-text="category.name"></option>
                </select>
              </div>
            </div>
            <div class="mb-3">
              <label class="form-label">Quantity</label>
              <input type="text" class="form-control" id="quantity" placeholder="Quantity" v-model="product.quantity">
            </div>
            <div class="mb-3">
              <label class="form-label">Discription</label>
              <input type="text" class="form-control" id="description" placeholder="Description"
                v-model="product.description">
            </div>
            <div class="card-header h6 mb-0 bg-none p-3">
              <i class="fa-solid fa-image fa-lg fa-fw text-dark text-opacity-50 me-1"></i> Image
            </div>
            <div class="card-body">
              <picture-input ref="pictureInput" width="150" height="150" margin="16" accept="image/*" size="10"
                button-class="btn" :custom-strings="{
                  upload: '<h1>Bummer!</h1>',
                  drag: 'input Product picture'
                }" @change="onChange">
              </picture-input>
            </div>
            <div v-if="!loading" class="d-grid gap-2 d-md-flex justify-content-md-end" style="margin: auto;">
              <button class="btn btn-success me-md-2 btn-rounded px-4 rounded-pill" type="submit">Create</button>

              <a href="/admin/product" class="btn btn-danger btn-rounded px-4 rounded-pill">Cancel</a>
            </div>
            <div v-else class="d-grid gap-2 d-md-flex justify-content-md-end" style="margin: auto;">
              <button class="btn btn-success btn-rounded rounded-pill"
                style="padding-left: 2.5rem;padding-right: 2.5rem;padding-top: .91rem; padding-bottom: .91rem;"
                type="button">
                <Loading style="font-size: .22rem" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
</div></template>