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
      suppliers: {}
    };
  },
  mounted() {
    axios.get('http://localhost:8081/api/v1/suppliers')
        .then(response => {
          this.suppliers = response.data;
        });
        setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }
};

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
        <li class="breadcrumb-item active"><i class="fa fa-arrow-back"></i> Supplier</li>
			</ol>
			<h1 class="page-header mb-0">Suppliers</h1>
		</div>
		<div class="ms-auto">
      <a href="/supplier/add" class="btn btn-success btn-rounded px-4 rounded-pill" aria-expanded="false"><i class="fa fa-plus fa-lg me-2 ms-n2 text-success-900"></i>Add</a>
		</div>
	</div>
		<!-- BEGIN #vue3TableLite -->
    <div class="card border-0">
		<table class="table table-bordered table-dark table-stroped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>phone</th>
          <th>address</th>
          <th>info</th>
          <th style="width: 100px;"> Action</th>
        </tr>
      </thead>
      <tbody v-if="isLoading">
        <tr>
          <td colspan="7"><div class="loader"></div></td>
        </tr>
      </tbody>
      <tbody  v-else>
        <tr v-for="supplier in suppliers" :key="supplier.id">
          <td>{{ supplier.id }}</td>
          <td>{{ supplier.name }}</td>
          <td>{{ supplier.email }}</td>
          <td>{{ supplier.phone }}</td>
          <td>{{ supplier.address }}</td>
          <td>{{ supplier.info }}</td>
		  <td style="width: 100px;">
        <div style="display:flex;">
        <a type="button" class="btn btn-success btn-rounded px-4 rounded-pill" aria-expanded="false" :href="`/supplier/${supplier.id}`">View</a>
              </div>
              </td>
        </tr>
      </tbody>
    </table>
  </div>
        
</template>