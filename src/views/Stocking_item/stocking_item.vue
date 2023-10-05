<script>
import axiosInstance from "../../api/utils/axiosInstance";
import StockingAll from '../../api/stock/stockitem';
import supplierApi from "../../api/supplier/allsupplier"
import ConfirmDialogue from '../../components/app/confirm.vue';
import { ContentLoader } from 'vue-content-loader';
import Loading from '../../components/app/LoadingOnSubmit.vue';
import swal from "sweetalert"

export default {
  components: {
    ConfirmDialogue,
    ContentLoader,
    LoadingOnFetchingData: Loading
  },
  data() {
    return {
      isLoading: true,
      stock: {
        supplier: {},
        stockingitems: []
      },
      Stock: {
  },
      suppliers: [],
      showTable: false
    };
  },

  async mounted() {
    this.stock = await StockingAll.getStockById(this.$route.params.id);
    this.Stock.tax = this.stock.tax;
    this.Stock.status = this.stock.status;
    this.suppliers = await supplierApi.getAllSuppliers();

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
        const res = await axiosInstance.delete(`/stockings/${this.$route.params.id}`); 
  return res.data,
		this.$router.push("/stock").then(() => {
        window.location.reload();
	});
            } else {
				this.$router.push(`/stocking_item/${this.$route.params.id}`);
            }
    },
    async updateStocking(e) {
			e.preventDefault();
			const confirm = await this.confirmDialog();
			if (!confirm) return;
			this.loading = true;
			try {
				this.stock = await StockingAll.updateStockById(this.$route.params.id, this.Stock);
				this.loading = false
				await this.showSuccessDialog()
			} catch (error) {
				this.loading = false;
				console.log(error);
			}
		},
		async confirmDialog() {
			return swal({
				title: "Update Stock",
				text: "Are you sure you want to update this Stock?",
				icon: "info",
				buttons: {
					cancel: {
						text: 'Cancel',
						value: null,
						visible: true,
						className: 'btn btn-default',
						closeModal: true,
					},
					confirm: {
						text: 'Update',
						value: true,
						visible: true,
						className: 'btn btn-success',
						closeModal: true
					}
				}
			})
		}, async showSuccessDialog() {
			await swal({
				title: "Success",
				text: "Stock updated successfully!",
				icon: "success",
				button: {
					text: "OK",
					className: 'btn btn-success',
				}
			});
		}
	},
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
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
<template>
  <div class="d-flex align-items-center mb-3">
    <div>
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="/dashboard">Home</a></li>
        <li class="breadcrumb-item"><a href="/stock">Stock</a></li>
        <li class="breadcrumb-item active"><i class="fa fa-arrow-back"></i> Stock_Item</li>
      </ol>
      <h1 class="page-header mb-0">Stocking Item</h1>
    </div>
    <div class="ms-auto">
      <button class="btn btn-danger btn-rounded px-4 rounded-pill" @click="doDelete"><i class="fa fa-trash-o fa-lg me-2 ms-n2 text-success-900"></i>Deleted</button>
        <confirm-dialogue ref="confirmDialogue"></confirm-dialogue>
      <a href="/stock" class="btn btn-success btn-rounded px-4 rounded-pill" aria-expanded="false">Back</a>
    </div>
  </div>
  <div class="card border-0">
    <form  @submit="updateStocking">
      <div class="card-body">
        <div v-if="!loading" class="d-grid gap-2 d-md-flex justify-content-md-end" style="margin: auto;">
					<button v-if="stock.status == 'NEW'" class="btn btn-success me-md-2 btn-rounded px-4 rounded-pill" type="submit">Update</button>
				</div>
				<div v-else class="d-grid gap-2 d-md-flex justify-content-md-end" style="margin: auto;">
					<button class="btn btn-success btn-rounded rounded-pill"
						style="padding-left: 2.5rem;padding-right: 2.5rem;padding-top: .91rem; padding-bottom: .91rem;"
						type="button">
						<Loading style="font-size: .22rem" />
					</button>
				</div>
        <div class="mb-3">
          <label class="form-label">SupplierId</label>
          <div class="form-control">
            {{stock.supplier.name}}
        </div>
        </div>
        <div class="mb-3">
          <label for="Status" class="form-label">Status</label>
          <select class="form-control" required v-model="Stock.status">
            <option value="NEW">NEW</option>
            <option value="COMPLETED">COMPLETED</option>
            <option value="CANCELLED">CANCELLED</option>
          </select>
        </div>
        <div class="mb-3">
          <label for="tax" class="form-label">Tax</label>
          <div class="card">
            <input type="text" class="form-control" placeholder="Tax" required v-model="Stock.tax">
          </div>
        </div>
        <div class="mb-3">
          <label for="deliveryAt" class="form-label">Delivery At</label>
          <div class="card">
            <input type="text" class="form-control" placeholder="Delivery At" v-model="stock.deliveryAt" readonly>
          </div>
        </div>
        <div class="mb-3">
          <label for="createdAt" class="form-label">Created At</label>
          <div class="card">
            <input type="text" class="form-control" placeholder="Created At" v-model="stock.createdAt" readonly>
          </div>
        </div>
        <div class="mb-3">
          <label for="totalItems" class="form-label">Total Items</label>
          <div class="card">
            <input id="totalItems" type="text" name="totalItems" class="form-control" placeholder="total Orders"
              v-model="stock.totalItem" readonly>
          </div>
        </div>
      </div>
    </form>
    <div>
      <div class="d-grid gap-2 d-md-flex justify-content-md-end" style="margin: 10px;">
        <button @click="toggleTable" class="btn btn-success btn-rounded px-4 rounded-pill">
        {{ showTable ? 'Hide Order' : 'Show Order' }}
      </button>
      <a type="button" v-if="stock.status == 'NEW'" class="btn btn-success btn-rounded px-4 rounded-pill" aria-expanded="false"
        :href="`/stocking_item/add/${stock.id}`"><i class="fa fa-plus fa-lg me-2 ms-n2 text-success-900"></i>Add</a>
      </div>
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
            <th style="width: 100px;" v-if="stock.status == 'NEW'">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="stocking in stock.stockingItems" :key="stocking.id">
            <td>{{ stocking.id }}</td>
            <td>{{ stocking.product.name }}</td>
            <td><img :src="stocking.product.img" alt="" width="50" height="50"></td>
            <td>{{ stocking.quantity }}</td>
            <td>{{ stocking.price }}</td>
            <td>{{ stocking.expDate }}</td>
            <td>{{ stocking.mfgDate }}</td>
            <td>{{ stocking.cost }}</td>
            <td style="width: 100px;" v-if="stock.status == 'NEW'">
              <a type="button" v-if="stock.status !== 'COMPLETED'" class="btn btn-success btn-rounded px-4 rounded-pill" aria-expanded="false"
                :href="`/stocking_item/view/${stocking.id}`">View</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</template>../../api/supplier/supplierApi