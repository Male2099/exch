<script>
import productApi from "../../api/product/productApi"
import categoryId from "../../api/category/categoryId"
import imageApi from "../../api/imageApi";
import PictureInput from 'vue-picture-input';
import Loading from '../../components/app/LoadingOnSubmit.vue';

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
        categoryId:'1',
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
            console.log('New picture selected!')
            if (image) {
                console.log('Picture loaded.')
                this.image = image
            } else {
                console.log('FileReader API not supported: use the <form>')
            }
        },
    async registerProduct(e) {
      e.preventDefault();
      this.loading = true;
      try {
        await productApi.registerProduct(this.product);
        this.loading = false
        this.$router.push("/product/")
      } catch (error) {
        this.loading = false;      }
    },
    async uploadImage() {
      const res = await imageApi.uplaodImage(this.image);
      return res;
    },

  },
  async mounted() {
    this.categories = await categoryId.getAllCategories();
    this.product.categoryId = this.categories[0]?.id;
  },
};
</script>
<template>
    <div class="d-flex align-items-center mb-3">
        <div>
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="/dashboard/v2">Home</a></li>
                <li class="breadcrumb-item"><a href="/product/">Product</a></li>
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
                <input type="text" class="form-control" id="productCode" placeholder="Product code" v-model="product.productCode">
            </div>
            <div class="mb-3">
                <label class="form-label">Price</label>
                <input type="text" class="form-control" id="price" placeholder="Price" v-model="product.price">
            </div>
            <div class="mb-3">
                <label class="form-label">Category</label>
                <div>
            <select class="form-control" v-model="product.categoryId">
              <option v-for="(category) in categories" :key="category.id" :value="category.id" v-text="category.name"></option>
            </select>
          </div>
            </div>
            <div class="mb-3">
                <label class="form-label">Quantity</label>
                <input type="text" class="form-control"  id="quantity" placeholder="Quantity" v-model="product.quantity">
            </div>
            <div class="mb-3">
                <label class="form-label">Discription</label>
                <input type="text" class="form-control" id="description" placeholder="Description" v-model="product.description">
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
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
          <button class="btn btn-success me-md-2 btn-rounded px-4 rounded-pill" type="submit">Submit</button>
            <a href="/product/" class="btn btn-danger btn-rounded px-4 rounded-pill">Cancel</a>
        </div>
    </div>
    </div>
    </div>
</form>
</template>../../api/category/categoryId../../api/product/productApi