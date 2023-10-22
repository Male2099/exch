<script>
import { useAppOptionStore } from '@/stores/app-option';
import StockApi    from "@/services/apis/stock/stockApi"
import supplierApi from "@/services/apis/supplier/allsupplier"
import Loading from '../../components/app/LoadingOnSubmit.vue';
import swal from "sweetalert"

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
      const confirm = await this.confirmDialog();
      if (!confirm) return;
      this.loading = true;
      try {
        await StockApi.registerStock(this.stock);
        this.loading = false
        await this.showSuccessDialog()
        this.$router.push("/admin/stock")
      } catch (error) {
        this.loading = false;
      }
    },
    async confirmDialog() {
      return swal({
        title: "Create Stock",
        text: "Are you sure you want to create this Stock",
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
        text: "Stock created successfully!",
        icon: "success",
        button: {
          text: "OK",
          className: 'btn btn-success',
        }
      });
    }
  },
  async mounted() {
    const suppliersPage = await supplierApi.getAllSuppliers();
    this.suppliers = suppliersPage;
    this.stock.supplierId = this.suppliers.data[1]?.id;


  },
}
</script>
<template>
   <div>
    <div class="d-flex align-items-center mb-3">
    <div>
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="/admin/dashboard">Home</a></li>
        <li class="breadcrumb-item"><a href="/admin/stock">Stock</a></li>
        <li class="breadcrumb-item active"><i class="fa fa-arrow-back"></i> Add Stcok</li>

      </ol>
      <h1 class="page-header mb-0" style="color: green;"><i class="fa fa-plus-circle"></i>Add Stock</h1>
    </div>
    </div>
    <form @submit="registerStock">
    <div class="card border-0 mb-4" >
		<div class="card-body">
	<div class="mb-3">
      <label class="form-label">Supplier</label>
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
    <div v-if="!loading" class="d-grid gap-2 d-md-flex justify-content-md-end" style="margin: auto;">
          <button class="btn btn-success me-md-2 btn-rounded px-4 rounded-pill"
            type="submit">Create</button>
          <a href="/admin/stock" class="btn btn-danger btn-rounded px-4 rounded-pill">Cancel</a>
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
   </div>
</template>