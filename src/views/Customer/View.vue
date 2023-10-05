<script>
import { useAppOptionStore } from '@/stores/app-option';
const appOption = useAppOptionStore();
import customer from "@/services/apis/customer/customer"
import ConfirmDialogue from '../../components/app/confirm.vue'

export default {
	components: { ConfirmDialogue },
	data() {
                return {
	customers:{},
	showTable: false
            }
		},    
		async mounted() {
				this.customers = await customer.getCustomerById(this.$route.params.id)
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
        .delete(`http://localhost:8081/api/v1/customers/${this.$route.params.id}`) // Replace with your API endpoint
        .then(response => {
			this.customers = response.data;
        })
		this.$router.push("/admin/customer").then(() => {
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
				<li class="breadcrumb-item"><a href="/admin/dashboard">Home</a></li>
        <li class="breadcrumb-item"><a href="/admin/customer">Customer</a></li>
        <li class="breadcrumb-item active"><i class="fa fa-arrow-back"></i>View Customer</li>
			</ol>
			<h1 class="page-header mb-0">Customer Profile</h1>
		</div>
		<div class="ms-auto">
			<button class="btn btn-danger btn-rounded px-4 rounded-pill" @click="doDelete"><i class="fa fa-trash-o fa-lg me-2 ms-n2 text-success-900"></i>Deleted</button>
        <confirm-dialogue ref="confirmDialogue"></confirm-dialogue>
		<a href="/admin/customer" class="btn btn-success btn-rounded px-4 rounded-pill">Back</a>
		</div>
	</div>
    <div class="card border-0 mb-4">
		<div class="card-body">
		<div class="mb-3">
			<label for="Name" class="form-label">Name</label>
			<div class="card">
				<input id="name"  type="text" name="name" class="form-control" placeholder="Name" required v-model="customers.name">
			</div>
		</div>
		<div class="mb-3">
			<label for="Address" class="form-label">Address</label>
			<div class="card">
				<input id="address"  type="text" name="address" class="form-control" placeholder="Address" required v-model="customers.address">
			</div>
		</div>
		<div class="mb-3">
			<label for="phone" class="form-label">Phone</label>
			<div class="card">
				<input id="phone"  type="text" name="phone" class="form-control" placeholder="Phone" required v-model="customers.phone">
			</div>
			<div class="mb-3">
			<label for="totalSpend" class="form-label">Total Spend</label>
			<div class="card">
				<input id="totalSpend"  type="text" name="totalSpend" class="form-control" placeholder="Total Spend" required v-model="customers.totalSpend">
			</div>
			</div>
			<div class="mb-3">
			<label for="lastOrderAt" class="form-label">Last Order At</label>
			<div class="card">
				<input id="lastOrderAt"  type="text" name="lastOrderAt" class="form-control" placeholder="Last Order At" required v-model="customers.lastOrderAt">
			</div>
			</div>
			<div class="mb-3">
			<label for="totalOrders" class="form-label">Total Order</label>
			<div class="card">
				<input id="totalOrders"  type="text" name="totalOrders" class="form-control" placeholder="total Orders" required v-model="customers.totalOrders">
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

          <th>Date</th>
          <th>Tax</th>
          <th>Total Price</th>
          <th>Received Money</th>
          <th>Changed Money</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in customers.orders" :key="order.id">
          <td>{{ order.id }}</td>
		  <td>{{ order.date }}</td>
          <td>{{ order.tax }}</td>
          <td>{{ order.totalPrice }}</td>
          <td>{{ order.receivedMoney }}</td>
          <td>{{ order.changedMoney }}</td>
        </tr>
        <!-- Additional table rows -->
      </tbody>
    </table>
  </div>
		</div>
	</div>
</template>
