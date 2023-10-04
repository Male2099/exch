<script>
import { useAppOptionStore } from '@/stores/app-option';
const appOption = useAppOptionStore();
import ConfirmDialogue from '../../components/app/confirm.vue'
import order from "../../api/order/order"
export default {
	components: { ConfirmDialogue },
	data() {
                return {
	defaultimage: '../../src/assets/defaultImage.png',
	orders:{
        user:{},
        customer:{},
        orderItems:[
        ],
    },
	showTable: false
            }
		},    
		async mounted() {
				this.orders = await order.getOrderById(this.$route.params.id)
		appOption.appSidebarWide = true;
	},
	beforeRouteLeave(to, from, next) {
		appOption.appSidebarWide = false;
		next();
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
        .delete(`http://localhost:8081/api/v1/orders/${this.$route.params.id}`) // Replace with your API endpoint
        .then(response => {
			this.orders = response.data;
        })
		this.$router.push("/order/").then(() => {
        window.location.reload();
	});
            } else {
                alert('You chose not to delete this page. Doing nothing now.')
            }
        },
  }
}
</script>
<template>
	<div class="d-flex align-items-center mb-3">
		<div>
			<ol class="breadcrumb">
				<li class="breadcrumb-item"><a href="/dashboard">Home</a></li>
        <li class="breadcrumb-item"><a href="/order">Order</a></li>
        <li class="breadcrumb-item active"><i class="fa fa-arrow-back"></i>View Order</li>
			</ol>
			<h1 class="page-header mb-0">Order Info</h1>
		</div>
		<div class="ms-auto">
			<button class="btn btn-danger btn-rounded px-4 rounded-pill" @click="doDelete"><i class="fa fa-trash-o fa-lg me-2 ms-n2 text-success-900"></i>Deleted</button>
        <confirm-dialogue ref="confirmDialogue"></confirm-dialogue>
		<a href="/order" class="btn btn-success btn-rounded px-4 rounded-pill">Back</a>
		</div>
	</div>
    <div class="card border-0 mb-4">
		<div class="card-body">
		<div class="mb-3">
			<label for="Name" class="form-label">User</label>
			<div class="card">
				<input id="name"  type="text" name="name" class="form-control" placeholder="Name" required v-model="orders.user.username">
			</div>
		</div>
		<div class="mb-3">
			<label for="customer" class="form-label">Customer</label>
			<div class="card">
				<input id="customer"  type="text" name="customer" class="form-control" placeholder="Customer" required v-model="orders.customer.name">
			</div>
		</div>
		<div class="mb-3">
			<label for="date" class="form-label">Date</label>
			<div class="card">
				<input id="date"  type="text" name="date" class="form-control" placeholder="Date" required v-model="orders.date">
			</div>
			<div class="mb-3">
			<label for="totalPrice" class="form-label">Total Price</label>
			<div class="card">
				<input id="totalPrice"  type="text" name="totalPrice" class="form-control" placeholder="Total Price" required v-model="orders.totalPrice">
			</div>
			</div>
			<div class="mb-3">
			<label for="receivedMoney" class="form-label">Received Money</label>
			<div class="card">
				<input id="receivedMoney"  type="text" name="receivedMoney" class="form-control" placeholder="Received Money" required v-model="orders.receivedMoney">
			</div>
			</div>
            <div class="mb-3">
			<label for="changedMoney" class="form-label">Changed Money</label>
			<div class="card">
				<input id="changedMoney"  type="text" name="changedMoney" class="form-control" placeholder="Changed Money" required v-model="orders.changedMoney">
			</div>
			</div>
			<div class="mb-3">
			<label for="totalItems" class="form-label">Total Items</label>
			<div class="card">
				<input id="totalItems"  type="text" name="totalItems" class="form-control" placeholder="total Orders" required v-model="orders.totalItems">
			</div>
			</div>
		</div>
		<div>
    <button @click="toggleTable" class="btn btn-success btn-rounded px-4 rounded-pill">
      {{ showTable ? 'Hide Order' : 'Show Order' }}
    </button>

    <table v-if="showTable" class="table table-bordered table-dark table-stroped">
      <thead>
        <tr>
			<th>ID</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Cost</th>
          <th>Product name</th>
          <th>Img</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders.orderItems" :key="order.id">
          <td>{{ order.id }}</td>
		  <td>{{ order.quantity }}</td>
          <td>{{ order.price }}</td>
          <td>{{ order.cost }}</td>
          <td>{{ order.product.name }}</td>
          <td><img :src="order.product.img || defaultimage" alt="" width="50" height="50"></td>
        </tr>
        <!-- Additional table rows -->
      </tbody>
    </table>
  </div>
		</div>
	</div>
</template>
