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
      orders: []
    };
  },
  mounted() {
    axios.get('http://localhost:8081/api/v1/orders')
        .then(response => {
          this.orders = response.data;
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
        <li class="breadcrumb-item active"><i class="fa fa-arrow-back"></i>Order</li>
			</ol>
			<h1 class="page-header mb-0">Order</h1>
		</div>
		<div class="ms-auto">			
		</div>
	</div>
	<div class="card border-0">
		<table class="table table-bordered table-dark table-stroped">
      <thead>
        <tr>
          <th>ID</th>
          <th>User</th>
          <th>Customer</th>
          <th>Status</th>
          <th>Date</th>
          <th>Tax</th>
          <th>Total Price</th>
          <th>Received Money</th>
          <th>Changed Money</th>
		  <th style="width: 100px;">Action</th>
        </tr>
      </thead>
      <tbody v-if="isLoading">
        <tr>
          <td colspan="10"><div class="loader"></div></td>
        </tr>
      </tbody>
      <tbody  v-else>
        <tr v-for="order in orders" :key="order.id">
          <td>{{ order.id }}</td>
          <td>{{ order.user.name }}</td>
          <td>{{ order.customer.name }}</td>
          <td>{{ order.status }}</td>
          <td>{{ order.date }}</td>
          <td>{{ order.tax }}</td>
          <td>{{ order.totalPrice }}</td>
          <td>{{ order.receivedMoney }}</td>
          <td>{{ order.changedMoney }}</td>
		  <td style="width: 100px;">
        <a type="button" class="btn btn-success btn-rounded px-4 rounded-pill" aria-expanded="false" :href="`/order/${order.id}`">View</a>
              </td>
        </tr>
      </tbody>
    </table>
  </div>
	
</template>