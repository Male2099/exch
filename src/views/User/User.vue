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
      users: []
    };
  },
  mounted() {
  this.fetchdata();
        setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  },
  methods:{
    fetchdata(){
      axios.get('http://localhost:8081/api/v1/users')
        .then(response => {
          this.users = response.data;
        });
    }
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
        <li class="breadcrumb-item active"><i class="fa fa-arrow-back"></i>User</li>
			</ol>
			<h1 class="page-header mb-0">User</h1>
		</div>
		<div class="ms-auto">
			<a href="/user/add" class="btn btn-success btn-rounded px-4 rounded-pill" aria-expanded="false"><i class="fa fa-plus fa-lg me-2 ms-n2 text-success-900"></i>Add</a>
			
		</div>
	</div>
	
		<!-- BEGIN #vue3TableLite -->
    <div class="card border-0">
		<table class="table table-bordered table-dark table-stroped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Img</th>
          <th>Name</th>
          <th>Sex</th>
          <th>DOB</th>
          <th>Role</th>
		  <th style="width: 100px;">Action</th>
        </tr>
      </thead>
      <tbody v-if="isLoading">
        <tr>
          <td colspan="9">
          <div class="loader"></div>
        </td>
        </tr>
      </tbody>
      <tbody  v-else>
        
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td><img :src="user.img || defaultimage"  width="50" height="50"></td>
          <td>{{ user.name }}</td>
          <td>{{ user.sex }}</td>
          <td>{{ user.dob }}</td>
          <td>{{ user.role.name }}</td>
		  <td style="width: 100px;">
        <a type="button" class="btn btn-success btn-rounded px-4 rounded-pill" aria-expanded="false" :href="`/user/${user.id}`">View</a>
              </td>
        </tr>
      </tbody>
    </table>
  </div>
        
</template>