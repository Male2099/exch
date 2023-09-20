<script>
import { onMounted,defineComponent, reactive, ref, computed } from 'vue';
import highlightjs from '@/components/plugins/Highlightjs.vue';
import vueTable from '@/components/plugins/VueTable.vue';
import navscrollto from '@/components/app/NavScrollTo.vue';
import axios from 'axios';
import { useAppVariableStore } from '@/stores/app-variable';
import { ScrollSpy } from 'bootstrap';
import { data } from 'jquery';

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
      categories: []
    };
  },
  mounted() {
    axios.get('http://localhost:8081/api/v1/categories')
        .then(response => {
          this.categories = response.data;
        });
        setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }
};

</script>
<template>
	<div class="d-flex align-items-center mb-3">
		<div>
			<ol class="breadcrumb">
				<li class="breadcrumb-item"><a href="javascript:;">Home</a></li>
				<li class="breadcrumb-item active"><i class="fa fa-arrow-back"></i>Category</li>
			</ol>
			<h1 class="page-header mb-0">Category</h1>
		</div>
		<div class="ms-auto">
			<a href="/category/add" class="btn btn-success btn-rounded px-4 rounded-pill" aria-expanded="false"><i
					class="fa fa-plus fa-lg me-2 ms-n2 text-success-900"></i>Add</a>

		</div>
	</div>

	<!-- BEGIN #vue3TableLite -->

	<div class="card border-0">
		<table class="table table-bordered table-dark table-stroped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Image</th>
		  <th></th>
        </tr>
      </thead>
      <tbody v-if="isLoading">
        <tr>
          <td colspan="5">Loading...</td>
        </tr>
      </tbody>
      <tbody  v-else>
        <tr v-for="category in categories" :key="category.id">
          <td>{{ category.id }}</td>
          <td>{{ category.name }}</td>
          <td><img :src="category.img" alt="" width="50" height="50"></td>
		  <td>
        <a type="button" class="btn btn-success btn-rounded px-4 rounded-pill" aria-expanded="false" :href="`/category/${category.id}`">View</a>
                <button class="btn btn-danger px-4 rounded-pill" data-id="' + row.id + '" @click="deletecategories(customers.id)">Delete</button>
              </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>