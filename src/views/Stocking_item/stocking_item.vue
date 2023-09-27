<script>
import { defineComponent, reactive, ref, computed } from 'vue';
import highlightjs from '@/components/plugins/Highlightjs.vue';
import vueTable from '@/components/plugins/VueTable.vue';
import navscrollto from '@/components/app/NavScrollTo.vue';
import axios from 'axios';
import StockingsAll from '../../api/stockitem';
import Stockings from '../../api/stockitem';
import supplierApi from "../../api/supplierApi"
import ConfirmDialogue from '../../components/app/confirm.vue';

import { useAppVariableStore } from '@/stores/app-variable';
import { ScrollSpy } from 'bootstrap';
const appVariable = useAppVariableStore();
export default {
	components: {
		ConfirmDialogue
	},
	data() {
    return {
      isLoading: true,
		stock:{
      supplier:{},
		stockingitems: []
		},
    suppliers: [],
    showTable: false
    };
  },

  async mounted() {
    this.stock = await StockingsAll.getStockingsById(this.$route.params.id);
    this.suppliers = await supplierApi.getAllSuppliers();
    this.stock.supplierId = this.stock.supplier.id;
    console.log(this.stock);
  },
  methods: {
    toggleTable() {
      this.showTable = !this.showTable;
    },
	async doDelete() {
            const ok = await this.$refs.confirmDialogue.show({
                title: 'Delete Confirmation',
                message: 'Are you sure you want to delete? It cannot be undone.',
                okButton: 'Delete Forever',
            })
            if (ok) {
				axios
        .delete(`http://localhost:8081/api/v1/stockings/${this.$route.params.id}`) 
        .then(response => {
			this.stock = response.data;
        })
		this.$router.push("/stock/").then(() => {
        window.location.reload();
	});
            } else {
                alert('You chose not to delete this page. Doing nothing now.')
            }
        },
        async updateStocking(e) {
			e.preventDefault();
			this.loading = true;
			try {
				await Stockings.updateStockingsById(this.$route.params.id, this.stock);
				this.loading = false;
				this.$router.push("/stock/")
			} catch (err) {
				this.loading = false;
			}
		}
  }
}

</script>
<style scoped>
.loader {
  margin: auto;
  border: 20px solid #EAF0F6;
  border-radius: 50%;
  border-top: 20px solid #FF7A59;
  width: 200px;
  height: 200px;
  animation: spinner 4s linear infinite;
}

@keyframes spinner {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
<template>
	<div class="d-flex align-items-center mb-3">
		<div>
			<ol class="breadcrumb">
				<li class="breadcrumb-item"><a href="/dashboard/v2">Home</a></li>
				<li class="breadcrumb-item"><a href="/stock/">Stock</a></li>
				<li class="breadcrumb-item active"><i class="fa fa-arrow-back"></i> Stock_Item</li>
			</ol>
			<h1 class="page-header mb-0">Stocking Item</h1>
		</div>
		<div class="ms-auto">
    <a type="button" class="btn btn-success btn-rounded px-4 rounded-pill" aria-expanded="false" :href="`/stocking_item/add/${stock.id}`"><i
					class="fa fa-plus fa-lg me-2 ms-n2 text-success-900"></i>Add</a>
	<a href="/stock/" class="btn btn-success btn-rounded px-4 rounded-pill" aria-expanded="false">Back</a>
		</div>
	</div>
  <div class="card border-0">
  <form @submit="updateStocking">
    <div class="card-body">
		<div class="mb-3">
      <label class="form-label">SupplierId</label>
      <div>
            <select class="form-control" v-model="stock.supplierId">
              <option v-for="(supplier) in suppliers" :key="supplier.id" :value="supplier.id" v-text="supplier.name"></option>
            </select>
          </div>
    </div>
		<div class="mb-3">
			<label for="Status" class="form-label">Status</label>
			<select class="form-control" required v-model="stock.status">
						<option value="NEW">NEW</option>
						<option value="SHIPPING">SHIPPING</option>
						<option value="COMPLETED">COMPLETED</option>
						<option value="CANCEL">CANCEL</option>
					</select>
		</div>
		<div class="mb-3">
			<label for="tax" class="form-label">Tax</label>
			<div class="card">
				<input  type="text" class="form-control" placeholder="Tax" required v-model="stock.tax">
			</div>
			<div class="mb-3">
			<label for="deliveryAt" class="form-label">Delivery At</label>
			<div class="card">
				<input  type="date" class="form-control" placeholder="Delivery At"  v-model="stock.deliveryAt">
			</div>
			</div>
			<div class="mb-3">
			<label for="expectedDelivery" class="form-label">Expected Delivery</label>
			<div class="card">
				<input  type="date"  class="form-control" placeholder="Expected Delivery"  v-model="stock.expectedDelivery">
			</div>
			</div>
            <div class="mb-3">
			<label for="createdAt" class="form-label">Created At</label>
			<div class="card">
				<input  type="text" class="form-control" placeholder="Created At" v-model="stock.createdAt" readonly>
			</div>
			</div>
			<div class="mb-3">
			<label for="totalItems" class="form-label">Total Items</label>
			<div class="card">
				<input id="totalItems"  type="text" name="totalItems" class="form-control" placeholder="total Orders" v-model="stock.totalItem" readonly>
			</div>
			</div>
      <div class="d-grid gap-2 d-md-flex justify-content-md-end" style="margin: 10px;">
			<button class="btn btn-success me-md-2 btn-rounded px-4 rounded-pill" type="submit"><i class="fa fa-recycle"></i>&ensp; Update</button>
			<button class="btn btn-danger btn-rounded px-4 rounded-pill" @click="doDelete"><i class="fa fa-trash-o fa-lg me-2 ms-n2 text-success-900"></i>Deleted</button>
        <confirm-dialogue ref="confirmDialogue"></confirm-dialogue>
		</div>
		</div>
  </div>
  </form>
    <div>
    <button @click="toggleTable" class="btn btn-success btn-rounded px-4 rounded-pill">
      {{ showTable ? 'Hide Order' : 'Show Order' }}
    </button>
		<table v-if="showTable" class="table table-bordered table-dark table-stroped">
      <thead>
        <tr>
          <th>ID</th>
		  <th>Name</th>
		  <th>Img</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>ExpDate</th>
          <th>MfgDate</th>
          <th>Cost</th>
          <th style="width: 100px;"> Action</th>
        </tr>
      </thead>
      <tbody >
        <tr v-for="stocking in stock.stockingItems" :key="stocking.id">
          <td>{{ stocking.id }}</td>
		  <td>{{ stocking.product.name }}</td>
		  <td><img :src="stocking.product.img" alt="" width="50" height="50"></td>
          <td>{{ stocking.quantity }}</td>
          <td>{{ stocking.price }}</td>
          <td>{{ stocking.expDate }}</td>
          <td>{{ stocking.mfgDate }}</td>
          <td>{{ stocking.cost }}</td>
		  <td style="width: 100px;">
        <a type="button" class="btn btn-success btn-rounded px-4 rounded-pill" aria-expanded="false" :href="`/stocking_item/view/${stocking.id}`">View</a>
              </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</template>