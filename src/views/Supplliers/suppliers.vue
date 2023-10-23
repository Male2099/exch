<script>
import supplier from "@/services/apis/supplier/supplier"
import axiosInstance from '@/services/utils/axiosInstance';
import { ContentLoader } from 'vue-content-loader';
import Loading from '../../components/app/LoadingOnSubmit.vue';
export default {
  components: {
    ContentLoader,
    LoadingOnFetchingData: Loading
  },
  data() {
    return {
      isLoading: true,
      suppliers: [],
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
    async searchSupplier(e) {
      e.preventDefault();
      if (!this.query.search) return;
      this.query = this.defaultQuery
      await this.pushQuery(this.query)
      await this.getSuppliers();
    },
    async getSuppliers() {
      this.isLoading = true
      const res = await supplier.getAllSuppliers(this.getUrlQueryParams);
      this.isLoading = false
      this.suppliers = res.data
      this.pageMetaData = res.metadata
    },
    async toPage(pageNum) {
      //click same page
      if (pageNum == this.query.page) return
      this.query.page = pageNum
      //push new query to load next page
      await this.pushQuery(this.query)
      await this.getSuppliers()
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
    }
  },
  async mounted() {
    this.query = this.getUrlQueryParams;
    await this.getSuppliers()
  },
  computed: {
    getUrlQueryParams() {
      return {
        page: this.$route.query?.page || 1,
        pageSize: this.$route.query?.pageSize || 10,
        search: this.$route.query.search || ''
      }
    },
    isSearched() {
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
    async 'query.search'(newVal, oldVal) {
      if (!newVal && this.isSearched) {
        console.log("search");
        await this.pushQuery(this.query)
        await this.getSuppliers();
      }
    }
  }
};
</script>
<template>
  <div>
    <div class="d-flex justify-content-between">
      <h1 class="page-header mb-0">Suppliers</h1>
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="/admin/dashboard">Home</a></li>
        <li class="breadcrumb-item active"><i class="fa fa-arrow-back"></i> Supplier</li>
      </ol>
    </div>
    <div class=" d-flex flex-column justify-content-between h-100vh" style="max-height: 100vh;">
      <section class="d-flex justify-content-between">
        <form @submit="searchSupplier" name="search">
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
        <router-link to="supplier/add" class="btn btn-success h-100  my-10px btn-rounded px-4 rounded-pill"
          aria-expanded="false"><i class="fa fa-plus fa-lg me-2 ms-n2 text-success-900"></i>Add</router-link>
      </section>
      <!-- BEGIN #vue3TableLite -->
      <section>
        <table class="_table table table-bordered table-dark table-stroped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Supplier</th>
              <th>Email</th>
              <th>phone</th>
              <th>address</th>
              <!-- <th>info</th> -->
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
            <tr v-for="supplier in suppliers" :key="supplier.id">
              <td style="vertical-align: middle; text-align: center;">{{ supplier.id }}</td>
              <td>{{ supplier.name }}</td>
              <td>{{ supplier.email }}</td>
              <td>{{ supplier.phone }}</td>
              <td>{{ supplier.address }}</td>
              <!-- <td>{{ supplier.info }}</td> -->
              <td style="width: 200px;">
                <div style="width: 100%; display: flex; justify-content: center;">
                  <router-link :to="'/admin/supplier/' + supplier.id" class="btn btn-rounded rounded-pill"
                    aria-expanded="false">
                    <i class="bi bi-pencil-square fs-4 text-info"></i>
                  </router-link>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
      <section v-if="this.suppliers.length > 0">
        <ul class="pagination _custome-page">
          <li class="page-item">
            <button @click="toPage(this.query.page - 1)" :disabled="this.query.page <= 1" class="page-link"
              :class="{ 'd-none': query.page }" aria-label="Previous">
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
              class="page-link" aria-label="Next">
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
