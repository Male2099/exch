<script>
import { defineComponent, reactive, ref, computed } from 'vue';
import highlightjs from '@/components/plugins/Highlightjs.vue';
import vueTable from '@/components/plugins/VueTable.vue';
import navscrollto from '@/components/app/NavScrollTo.vue';
import axios from 'axios';
import { useAppVariableStore } from '@/stores/app-variable';
import { ScrollSpy } from 'bootstrap';

const appVariable = useAppVariableStore();

export default {
	components: {
		highlightjs: highlightjs,
		navScrollTo: navscrollto,
		vueTable: vueTable
	},
	data() {
    return {
      isLoading: true,
      stockings: []
    };
  },

  mounted() {
    axios.get('http://localhost:8081/api/v1/stockings')
        .then(response => {
          this.stockings = response.data;
        });
        setTimeout(() => {
      this.isLoading = false;
    }, 2000);
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
        <li class="breadcrumb-item active"><i class="fa fa-arrow-back"></i> Stock</li>
      </ol>
      <h1 class="page-header mb-0">Stock</h1>
    </div>
    <div class="ms-auto">
      <a href="/stock/add" class="btn btn-success btn-rounded px-4 rounded-pill" aria-expanded="false"><i
          class="fa fa-plus fa-lg me-2 ms-n2 text-success-900"></i>Add</a>

    </div>
  </div>

  <!-- BEGIN #vue3TableLite -->

  <div class="card border-0">
		<table class="table table-bordered table-dark table-stroped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Status</th>
          <th>Tax</th>
          <th>Delivery At</th>
          <th>Expected Delivery</th>
          <th>Created At</th>
          <th>Total Item</th>
          <th>Total Cost</th>
          <th>Supplier</th>
          <th > Action</th>
        </tr>
      </thead>
      <tbody v-if="isLoading">
        <tr>
          <td colspan="10"><div class="loader"></div></td>
        </tr>
      </tbody>
      <tbody  v-else>
        <tr v-for="stocking in stockings" :key="stocking.id">
          <td>{{ stocking.id }}</td>
          <td>{{ stocking.status }}</td>
          <td>{{ stocking.tax }}</td>
          <td>{{ stocking.deliveryAt }}</td>
          <td>{{ stocking.expectedDelivery }}</td>
          <td>{{ stocking.createdAt }}</td>
          <td>{{ stocking.totalItem }}</td>
          <td>{{ stocking.totalCost }}</td>
          <td>{{ stocking.supplier.name }}</td>
		  <td style="width: 100px;">

        <a type="button" class="btn btn-success btn-rounded px-4 rounded-pill" aria-expanded="false" :href="`/stocking_item/${stocking.id}`">View</a>
    
              </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>