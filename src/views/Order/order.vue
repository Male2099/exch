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
      orders: []
    };
  },
  mounted() {
    axios.get('http://localhost:8081/api/v1/orders')
        .then(response => {
          this.orders = response.data;
        })
  }
};
</script>
<template>
	<div class="d-flex align-items-center mb-3">
		<div>
			<ol class="breadcrumb">
				<li class="breadcrumb-item"><a href="javascript:;">Home</a></li>
        <li class="breadcrumb-item active"><i class="fa fa-arrow-back"></i>Order</li>
			</ol>
			<h1 class="page-header mb-0">Order</h1>
		</div>
		<div class="ms-auto">
			<a href="/order/add" class="btn btn-success btn-rounded px-4 rounded-pill" aria-expanded="false"><i class="fa fa-plus fa-lg me-2 ms-n2 text-success-900"></i>Add</a>
			
		</div>
	</div>
	<div class="card border-0">
		<table class="table table-bordered table-dark table-stroped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Date</th>
          <th>User</th>
          <th>Customer</th>
          <th>Tax</th>
          <th>Total Price</th>
          <th>Received Money</th>
          <th>Changed Money</th>
		  <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td>{{ order.id }}</td>
          <td>{{ order.user.name }}</td>
          <td>{{ order.customer.name }}</td>
          <td>{{ order.date }}</td>
          <td>{{ order.tax }}</td>
          <td>{{ order.totalPrice }}</td>
          <td>{{ order.receivedMoney }}</td>
          <td>{{ order.changedMoney }}</td>
		  <td>
        <a type="button" class="btn btn-success btn-rounded px-4 rounded-pill" aria-expanded="false" :href="`/order/${order.id}`">View</a>
                <button class="btn btn-danger px-4 rounded-pill" data-id="' + row.id + '" @click="deletecategories(orders.id)">Delete</button>
              </td>
        </tr>
      </tbody>
    </table>
  </div>
	
</template>