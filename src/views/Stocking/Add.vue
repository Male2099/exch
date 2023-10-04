<script>
import { useAppOptionStore } from '@/stores/app-option';
import StockApi from "../../api/stock/stockApi"
import supplierApi from "../../api/supplier/allsupplier"
import Loading from '../../components/app/LoadingOnSubmit.vue';

export default {
    name: 'app',
    data() {
        return {
        stock: {
        tax:'',
        expectedDelivery:'',
        supplierId:'0',
      },
      suppliers: [],
      loading: false
    }
  },
  components: {
    Loading
  },
  methods: {
    async registerStock(e) {
      e.preventDefault();
      this.loading = true;
      try {
        await StockApi.registerStock(this.stock);
        this.loading = false
        this.$router.push("/stock")
      } catch (error) {
        this.loading = false;
      }
    },
  },
  async mounted() {
    this.suppliers = await supplierApi.getAllSuppliers();
    this.stock.supplierId = this.suppliers[0]?.id;

  },
}
</script>
<template>
    <div class="d-flex align-items-center mb-3">
    <div>
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="/dashboard">Home</a></li>
        <li class="breadcrumb-item"><a href="/stock">Stock</a></li>
        <li class="breadcrumb-item active"><i class="fa fa-arrow-back"></i> Add Stcok</li>

      </ol>
      <h1 class="page-header mb-0">Add Stock</h1>
    </div>
    </div>
    <form @submit="registerStock">
    <div class="card border-0 mb-4" >
		<div class="card-body">
	<div class="mb-3">
      <label class="form-label">SupplierId</label>
      <div>
            <select class="form-control" v-model="stock.supplierId">
              <option v-for="(supplier) in suppliers.data" :key="supplier.id" :value="supplier.id" v-text="supplier.name"></option>
            </select>
          </div>
    </div>
    <div class="mb-3">
      <label for="tax" class="form-label">Tax</label>
      <input type="text" class="form-control" id="expectedDelivery" placeholder="expectedDelivery" v-model="stock.tax">
    </div>
	<div class="mb-3">
      <label for="expectedDelivery" class="form-label">Expected Delivery</label>
      <input type="date" class="form-control" id="expectedDelivery" placeholder="expectedDelivery" v-model="stock.expectedDelivery">
    </div>
    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
      <button class="btn btn-success me-md-2 btn-rounded px-4 rounded-pill" type="submit">Submit</button>
  <a href="/stock" class="btn btn-danger btn-rounded px-4 rounded-pill">Cancel</a>
</div>
    </div>
    </div>
  </form>
</template>../../api/supplier/supplierApi