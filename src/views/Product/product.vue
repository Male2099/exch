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
      defaultimage: '../../src/assets/defaultImage.png',

      isLoading: true,
      products: []
    };
  },
  mounted() {
    axios.get('http://localhost:8081/api/v1/products')
        .then(response => {
          this.products = response.data;
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
       <li class="breadcrumb-item active"><i class="fa fa-arrow-back"></i> Product</li>
			</ol>
			<h1 class="page-header mb-0">Product</h1>
		</div>
		<div class="ms-auto">
			<a href="/product/add" class="btn btn-success btn-rounded px-4 rounded-pill" aria-expanded="false"><i class="fa fa-plus fa-lg me-2 ms-n2 text-success-900"></i>Add</a>
			
		</div>
	</div>
	
	<div class="card bproduct-0">
		<table class="table table-bproducted table-dark table-stroped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Category</th>
          <th>ProductCode</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Description</th>
          <th>Img</th>
		  <th style="width: 100px;">Action</th>
        </tr>
      </thead>
      <tbody v-if="isLoading">
        <tr>
          <td colspan="10"><div class="loader"></div></td>
        </tr>
      </tbody>
      <tbody  v-else>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.id }}</td>
          <td>{{ product.name }}</td>
          <td>{{ product.category.name }}</td>
          <td>{{ product.productCode }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.quantity }}</td>
          <td>{{ product.description }}</td>
          <td><img :src="product.img || defaultimage" alt="" width="50" height="50"></td>
		  <td style="width: 100px;">
        <a type="button" class="btn btn-success btn-rounded px-4 rounded-pill" aria-expanded="false" :href="`/product/${product.id}`">View</a>
              </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>