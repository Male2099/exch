<script>
import { useAppOptionStore } from '@/stores/app-option';
import AllproductApi from "@/services/apis/api/product/AllproductApi"
import StockitemApi  from "@/services/apis/api/stockitemApi"
import Loading from '../../components/app/LoadingOnSubmit.vue';

export default {
    name: 'app',
    data() {
        return {
            stockingitem: {
        price: '',
        quantity: '',
        expDate: '',
        mfgDate: '',
        stockingId:`${this.$route.params.id}`,
        productId:'1',
      },
      products: [],
      image: null,
      loading: false
    }
  },
  components: {
    Loading
  },
    methods: {
    async  registerStockingProduct(e) {
      e.preventDefault();
      this.loading = true;
      try {
        await StockitemApi.registerStockingProduct(this.stockingitem);
        this.loading = false
        this.$router.push(`/admin/stocking_item/${this.$route.params.id}`);
                  } catch (error) {
        this.loading = false;      }
    },
  },
  async mounted() {
    this.products = await AllproductApi.getAllProducts();
    this. stockingitem.AllproductApi = this.products[0]?.id;
  },
};
</script>
<template>
    <div class="d-flex align-items-center mb-3">
    <div>
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="/dashboard/v2">Home</a></li>
        <li class="breadcrumb-item"><a href="/stock/">Stock</a></li>
        <li class="breadcrumb-item"><a href="javascript:;">Stock_Item</a></li>
        <li class="breadcrumb-item active"><i class="fa fa-arrow-back"></i> Add Stock_Item</li>

      </ol>
      <h1 class="page-header mb-0">Add Stock Item</h1>
    </div>
    </div>
    <form @submit="registerStockingProduct">
    <div class="card border-0 mb-4" >
		<div class="card-body">
    <div class="mb-3">
                <label class="form-label">Product</label>
                <div>
            <select class="form-control" v-model="stockingitem.productId">
              <option v-for="(product) in products.data" :key="product.id" :value="product.id" v-text="product.name"></option>
            </select>
          </div>
    </div>
    <div class="mb-3">
      <label for="stockingId" class="form-label">Stocking Id</label>
      <input type="text" class="form-control" placeholder="Stocking Id" v-model="stockingitem.stockingId" readonly>
    </div>
    <div class="mb-3">
      <label for="price" class="form-label">Price</label>
      <input type="text" class="form-control" id="price" placeholder="Price" v-model="stockingitem.price">
    </div>
    <div class="mb-3">
      <label for="quantity" class="form-label">Quantity</label>
      <input type="text" class="form-control" id="quantity" placeholder="Quantity" v-model="stockingitem.quantity">
    </div>
    <div class="mb-3">
      <label for="mfgDate" class="form-label">MFGDate</label>
      <input type="date" class="form-control" id="mfgDate" placeholder="MFGDate" v-model="stockingitem.mfgDate">
    </div>
    <div class="mb-3">
      <label for="expDate" class="form-label">EXPDate</label>
      <input type="date" class="form-control" id="expDate" placeholder="EXpDate" v-model="stockingitem.expDate">
    </div>
    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
      <button class="btn btn-success me-md-2 btn-rounded px-4 rounded-pill" type="submit">Submit</button>  <a type="button" class="btn btn-danger btn-rounded px-4 rounded-pill" aria-expanded="false" :href="`/stocking_item/${this.$route.params.id}`">Back</a>
</div>
    </div>
    </div>
  </form>
</template>../../api/product/AllproductApi