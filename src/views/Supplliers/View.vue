<script>
import Loading from "../../components/app/LoadingOnSubmit.vue";
import Supplier from "../../api/supplier/supplier";
import swal from "sweetalert";
export default {
  components: { Loading },
  data() {
    return {
      defaultimage: "../../src/assets/defaultImage.png",
      suppliers: {},
	  loading: false,
	  renderPageEnable: false

    };
  },
  methods: {
		async updateSupplier(e) {
			e.preventDefault();
			const confirm = await this.confirmDialog();
			if (!confirm) return;
			this.loading = true;
			try {
				this.suppliers = await Supplier.updateSuppliersById(this.$route.params.id, this.suppliers);
				this.loading = false
				await this.showSuccessDialog()
				// this.$router.push("/user")
			} catch (error) {
				this.loading = false;
				console.log(error);
			}
		},
		async confirmDialog() {
			return swal({
				title: "Update Supplier",
				text: "Are you sure you want to update this Supplier?",
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
				text: "Supplier updated successfully!",
				icon: "success",
				button: {
					text: "OK",
					className: 'btn btn-success',
				}
			});
		}
	},
	async mounted() {
		this.suppliers = await Supplier.getSupplierById(this.$route.params.id)
		this.renderPageEnable = true

	},
};
</script>
<template>
  <div class="d-flex align-items-center mb-3">
    <div>
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="/dashboard">Home</a></li>
        <li class="breadcrumb-item"><a href="/supplier">Supplier</a></li>
        <li class="breadcrumb-item active">
          <i class="fa fa-arrow-back"></i> Update Supplier
        </li>
      </ol>
	  <h1 class="page-header mb-0" style="color: green;"><i class="fa fa-plus-circle"></i>Update Supplier</h1>
    </div>
    <div class="ms-auto">
      <a href="/supplier" class="btn btn-success btn-rounded px-4 rounded-pill" type="button">Back</a
      >
    </div>
  </div>
  <form v-if="renderPageEnable" @submit="updateSupplier">
    <div class="card border-0 mb-4">
      <div class="card-body">
        <div class="mb-3">
          <label for="Name" class="form-label">Name</label>
          <div class="card">
            <input id="name"
              type="text"
              name="name"
              class="form-control"
              placeholder="Name"
              required
              v-model="suppliers.name"
            />
          </div>
        </div>
        <div class="mb-3">
          <label for="Email" class="form-label">Email address</label>
          <input
            type="email"
            class="form-control"
            id="email"
            placeholder="email@example.com"
            required
            v-model="suppliers.email"
          />
        </div>
        <div class="mb-3">
          <label for="Address" class="form-label">Address</label>
          <div class="card">
            <input
              id="address"
              type="text"
              name="address"
              class="form-control"
              placeholder="Address"
              required
              v-model="suppliers.address"
            />
          </div>
        </div>
        <div class="mb-3">
          <label for="phone" class="form-label">Phone</label>
          <div class="card">
            <input
              id="phone"
              type="text"
              name="phone"
              class="form-control"
              placeholder="Phone"
              required
              v-model="suppliers.phone"
            />
          </div>
        </div>
        <div class="mb-3">
          <label for="info" class="form-label">Info</label>
          <div class="card">
            <input
              id="info"
              type="text"
              name="info"
              class="form-control"
              placeholder="Info"
              required
              v-model="suppliers.info"
            />
          </div>
        </div>

		<div v-if="!loading" class="d-grid gap-2 d-md-flex justify-content-md-end" style="margin: auto;">
					<button class="btn btn-success me-md-2 btn-rounded px-4 rounded-pill" type="submit">Update</button>
					<a href="/supplier" class="btn btn-danger btn-rounded px-4 rounded-pill">Cancel</a>
				</div>
				<div v-else class="d-grid gap-2 d-md-flex justify-content-md-end" style="margin: auto;">
					<button class="btn btn-success btn-rounded rounded-pill"
						style="padding-left: 2.5rem;padding-right: 2.5rem;padding-top: .91rem; padding-bottom: .91rem;"
						type="button">
						<Loading style="font-size: .22rem" />
					</button>
				</div>
      </div>
    </div>
  </form>
</template>
../../api/supplier/supplier
