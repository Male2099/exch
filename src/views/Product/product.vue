<script>
import product from "../../api/product/product"
import { ContentLoader } from 'vue-content-loader';
import Loading from '../../components/app/LoadingOnSubmit.vue';
export default {	
	components: {
    ContentLoader,
    LoadingOnFetchingData: Loading
	},
	data() {
    return {
      defaultimage: '../../src/assets/defaultImage.png',
      isLoading: true,
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
      products: [],
    };
  },
  methods: {
    async searchProduct(e) {
      e.preventDefault();
      if (!this.query.search) return;
      this.query = this.defaultQuery
      await this.pushQuery(this.query)
      await this.getProducts();
    },
    async getProducts() {
      this.isLoading = true
      const res = await product.getAllProducts(this.getUrlQueryParams);
      this.isLoading = false
      this.products = res.data
      this.pageMetaData = res.metadata
    },
    async toPage(pageNum) {
      if (pageNum == this.query.page) return
      this.query.page = pageNum
      await this.pushQuery(this.query)
      await this.getProducts()
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
    //set to current query of page
    this.query = this.getUrlQueryParams;
    // fetch init data
    await this.getProducts()

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
        console.log("search");
        //default query
        await this.pushQuery(this.query)
        await this.getProducts();
      }
    }
  }
};
</script>
<template>
	<div class="d-flex align-items-center mb-3">
		<div>
			<ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="/dashboard/v2">Home</a></li>
       <li class="breadcrumb-item active"><i class="fa fa-arrow-back"></i> Product</li>
			</ol>
			<h1 class="page-header mb-0">Product</h1>
		</div>
  </div>
	<div class=" d-flex flex-column justify-content-between h-100vh" style="max-height: 100vh;">
			<section class="d-flex justify-content-between pb-3">
<form @submit="searchProduct" name="search">
  <div class="form-group d-flex">
    <input type="text" v-model="query.search" class="form-control w-250px" placeholder="Enter keyword" />
    <button type="submit" class="btn btn-search"><i class="fa fa-search"></i></button>
    <button type="button" class="btn px-1 position-absolute" :class="{'d-none' :this.query.search==''}" style="right: 1.25rem;" @click="query.search = ''"><i
              class="bi bi-x"></i>
          </button> 
  </div>
</form>
<router-link to="/product/add" class="btn btn-success btn-rounded px-4 rounded-pill" aria-expanded="false"><i
    class="fa fa-plus fa-lg me-2 ms-n2 text-success-900"></i>Add</router-link>
</section>	
<section>
  		<table class="table table-bproducted table-dark table-stroped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Category</th>
          <th>ProductCode</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Description</th>
          <th>Img</th>
		  <th style="width: 200px;">Action</th>
        </tr>
      </thead>
      <tbody v-if="isLoading">
        <tr>
          <div class="_center-loading">
              <LoadingOnFetchingData />
            </div>
        </tr>
      </tbody>
      <tbody  v-else>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.id }}</td>
          <td>{{ product.name }}</td>
          <td>{{ product.category.name }}</td>
          <td>{{ product.productCode }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.quantity }}</td>
          <td>{{ product.description }}</td>
          <td><img :src="product.img || defaultimage" alt="" width="50" height="50"></td>
		  <td style="width: 200px;">
        <div style="width: 100%; display: flex; justify-content: center;">
        <router-link :to="'/product/' + product.id" class="btn btn-rounded rounded-pill" aria-expanded="false">
          <i class="bi bi-pencil-square fs-4 text-info"></i>
              </router-link>  
            </div>
      </td>
        </tr>
      </tbody>
    </table>
  </section>
  <section v-if="this.products.length > 0">
      <ul class="pagination _custome-page">
        <li class="page-item">
          <button @click="toPage(this.query.page - 1)" :disabled="this.query.page <= 1" class="page-link" :class="{'d-none': query.page}"
            aria-label="Previous">
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
