<script>
import stock from "@/services/apis/stock/stockitem"
import { ContentLoader } from 'vue-content-loader';
import Loading from '../../components/app/LoadingOnSubmit.vue';
import swal from "sweetalert"

export default {
  components: {
    ContentLoader,
    LoadingOnFetchingData: Loading
  },
  data() {
    return {
      isLoading: true,
      stockings: [],
      query: {
        page: 1,
        pageSize: 10,
        search: ''
      },
      pageMetaData: {
        currentPage: 0,
        totalItems: 0,
        totalPage: 0,
        itemsPerPage: 0
      },
    };
  },
  methods: {
    async searchStock(e) {
      e.preventDefault();
      if (!this.query.search) return;
      //set to defualt query
      this.query = this.defaultQuery

      await this.pushQuery(this.query)
      await this.getStocks();
    },
    async getStocks() {
      this.isLoading = true
      const res = await stock.getAllStocks(this.getUrlQueryParams);
      this.isLoading = false
      this.stockings = res.data
      this.pageMetaData = res.metadata
    },
    async toPage(pageNum) {
      //click same page
      if (pageNum == this.query.page) return
      this.query.page = pageNum
      //push new query to load next page
      await this.pushQuery(this.query)
      await this.getStocks()
    },
    //add query to url
    async pushQuery(queryParams) {
      let updatedQueryParams = {}
      for (const key in queryParams) {
        if (queryParams[key] !== undefined && queryParams[key] !== null && queryParams[key] !== '') {
          updatedQueryParams[key] = queryParams[key];
        }
      }
      await this.$router.push({ path: this.$route.fullPath, query: updatedQueryParams });
    },
    async deleteStock(stocking) {
      try {
        const confirm = await this.confirmDeleteDialog(stocking);
        if (!confirm) return;
        this.isLoading = true
        await stock.deleteStockById(stocking.id);
        location.reload();
      } catch (error) {
        this.isLoading = false
      }
    },
    async confirmDeleteDialog(stocking) {
      return swal({
        title: "Delete Confirmation",
        content: {
          element: "span",
          attributes: {
            innerHTML: `Deleting The Stock with the ID of <span class="text-red">${stocking.id}</span>  will permanently remove all associated data`
          }
        },
        icon: "warning",
        buttons: {
          cancel: {
            text: 'Cancel',
            value: null,
            visible: true,
            className: 'btn btn-default',
            closeModal: true,
          },
          confirm: {
            text: 'Delete',
            value: true,
            visible: true,
            className: 'btn btn-danger',
            closeModal: true
          }
        },
      });
    },
    dateParser(dateString) {
      //change 2023-11-13T00:22:51.907342 
      // to
      // 2023-11-13 00:22:51
      if (!dateString) return;
      dateString = dateString.split('.')[0]
      return dateString.replace('T', ' ')


    },
  },
  async mounted() {
    //set to current query of page
    this.query = this.getUrlQueryParams;
    // fetch init data
    await this.getStocks()

  },
  computed: {
    //get the query from url
    getUrlQueryParams() {
      return {
        page: this.$route.query?.page || 1,
        pageSize: this.$route.query?.pageSize || 10,
        search: this.$route.query.search || ''
      }
    },
    isSearched() {
      //if url query contain search
      return !!this.$route.query?.search;
    },
    defaultQuery() {
      return {
        page: 1,
        pageSize: 10,
        search: this.query.search || ''
      }
    }
  }, watch: {
    //for return def data
    async 'query.search'(newVal, oldVal) {
      //if current data is from search
      if (!newVal && this.isSearched) {
        //default query
        await this.pushQuery(this.query)
        await this.getStocks();
      }
    }
  }
};
</script>
<template>
  <div>

    <div class="d-flex justify-content-between">
      <h1 class="page-header mb-0">Stock</h1>
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="/admin/dashboard">Home</a></li>
        <li class="breadcrumb-item active"><i class="fa fa-arrow-back"></i> Stock</li>
      </ol>
    </div>
    <div class=" d-flex flex-column justify-content-between h-100vh" style="max-height: 100vh;">
      <section class="d-flex justify-content-between ">

        <form @submit="searchStock" name="search">
          <div class="form-group d-flex position-relative">
            <input type="text" v-model="query.search" class="form-control w-250px my-10px" placeholder="Enter keyword" />
            <button type="submit" class="btn px-1 position-absolute" style="right: 3px;top:11px"><i
                class="fa fa-search"></i>
            </button>
            <button type="button" class="btn px-1 position-absolute" :class="{ 'd-none': this.query.search == '' }"
              style="right: 22px;top:11px" @click="query.search = ''"><i class="bi bi-x"></i>
            </button>
          </div>
        </form>
        <router-link to="/admin/stock/add" class="btn btn-success h-100  my-10px btn-rounded px-4 rounded-pill"
          aria-expanded="false"><i class="fa fa-plus fa-lg me-2 ms-n2 text-success-900"></i>Add</router-link>
      </section>
      <section>
        <table class="_table table table-bordered table-dark table-stroped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Supplier</th>
              <!-- <th>Tax</th> -->
              <!-- <th>Delivery At</th> -->
              <th>Created At</th>
              <th>Total Item</th>
              <th>Total Cost</th>
              <th>Status</th>
              <th style="width: 200px;"> Action</th>
            </tr>
          </thead>
          <tbody v-if="isLoading">
            <tr>
              <div class="_center-loading">
                <LoadingOnFetchingData />
              </div>
            </tr>
          </tbody>
          <tbody v-else>
            <tr v-for="stocking in stockings" :key="stocking.id">
              <td>{{ stocking.id }}</td>
              <td>{{ stocking.supplier.name }}</td>
              <!-- <td>{{ stocking.tax }}</td> -->
              <!-- <td>{{ stocking.deliveryAt }}</td> -->
              <td>{{ dateParser(stocking.createdAt) }}</td>
              <td>{{ stocking.totalItem }}</td>
              <td>{{ stocking.totalCost }}</td>
              <td>{{ stocking.status }}</td>
              <td style="width: 200px;">
                <div style="width: 100%; display: flex; justify-content: center;">
                  <router-link :to="'/admin/stocking_item/' + stocking.id" class="btn btn-rounded rounded-pill"
                    aria-expanded="false">
                    <i class="bi bi-pencil-square fs-4 text-info"></i>
                  </router-link>
                  <button class="btn rounded-pill text-danger" @click="deleteStock(stocking)">
                    <i class="bi bi-trash-fill w-100px fs-4"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
      <section v-if="this.pageMetaData.totalPage > 1">
        <ul class="pagination _custome-page">
          <li class="page-item">
            <button @click="toPage(this.query.page - 1)" :disabled="this.query.page <= 1" class="page-link"
              :class="{ 'invisible': query.page <= 1 }" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
              <span class="sr-only">Previous</span>
            </button>
          </li>
          <li v-for="pageNum in pageMetaData.totalPage" :key="pageNum" class="page-item">
            <button class="page-link acitve" @click="toPage(pageNum)"
              :class="{ 'bg-dark text-white': pageNum == this.query.page }">
              {{ pageNum }}
            </button>
          </li>

          <li class="page-item">
            <button @click="toPage(+this.query.page + 1)" :disabled="this.query.page >= this.pageMetaData.totalPage"
              class="page-link" :class="{ 'invisible': this.query.page >= this.pageMetaData.totalPage }"
              aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
              <span class="sr-only">Next</span>
            </button>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>
<style scoped>
._table tbody td {
  vertical-align: middle;
}

._table {
  position: relative;
}

._custome-page {
  display: flex;
  justify-content: end;
  padding: .5rem;
  position: sticky;
  bottom: 0;
  background-color: white;
  width: 100%;
  height: fit-content;

}

._center-loading {
  position: absolute;
  width: 100%;
  height: 70vh;
  z-index: 5;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
