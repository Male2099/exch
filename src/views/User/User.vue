<script>

import userApi from "../../api/service/userApi"
import axiosInstance from '../../api/utils/axiosInstance';
import axios from "axios";

export default {
  data() {
    return {
      defaultImage: "../../src/assets/defaultImage.png",
      users: [],
      query: {
        page: 1,
        pageSize: 10,
        roleId: '',
      },
      pageMetaData: {
        currentPage: 0,
        totalItems: 0,
        totalPage: 0,
        itemsPerPage: 0
      },
      isLoading: true
    };
  },
  methods: {
    async getUsersPage() {
      this.isLoading = true
      console.log(this.getUrlQueryParams);
      const res = await userApi.getAllUsers(this.getUrlQueryParams);
      this.isLoading = false
      return {
        users: res.data,
        metadata: res.metadata
      }
    },
    async getAllUsers() {
      return (await this.getUsersPage()).users;
    },
    // async getMetadata() {
    //   return (await this.getUsersPage()).metadata;
    // },
    async toPage(pageNum) {
      //click same page
      if (pageNum == this.query.page) return
      this.query.page = pageNum
      //push new query to load next page
      this.pushQuery(this.query)
      this.users = await this.getAllUsers()
    },
    pushQuery(queryParams) {
      this.$router.push({ path: this.$route.fullPath, query: queryParams });
    }

  },
  async mounted() {
    //   axios.get("http://localhost:8081/api/v1/users",{
    //     headers:{
    //       "Content-Type": "application/json",
    //   "Authorization": `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJyb290IiwiaWF0IjoxNjk1Nzk2NjkzLCJleHAiOjE2OTU4ODMwOTN9.eOH16RBqKlXbjTmxzav0FoAEqKQbe9NL_p2jzsuBCkk`,
    //     }
    //   })
    // .then(response => {
    //   // Handle successful response
    //   console.log(response.data);
    // })
    // .catch(error => {
    //   // Handle error response
    // console.log(error);
    // });
    // fetch init data
    const userPage = await this.getUsersPage();
    this.users = userPage.users
    this.pageMetaData = userPage.metadata;
    //set to current query of page
    this.query = this.getUrlQueryParams;
    // try {
    //   const res = await fetch("http://localhost:8081/api/v1/users?page=5&pageSize=10&roleId=", {
    //     method: 'GET',
    //     headers: {
    //       "Content-Type": "application/json",
    //       "Authorization": `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJyb290IiwiaWF0IjoxNjk1Nzk2NjkzLCJleHAiOjE2OTU4ODMwOTN9.eOH16RBqKlXbjTmxzav0FoAEqKQbe9NL_p2jzsuBCkk`,
    //     }
    //   });
    //   console.log(res);
    // } catch (error) {
    //   console.log(error);
    // }
    // const res = await axiosInstance.get("http://localhost:8081/api/v1/auth/login");
    // console.log(res);

  },
  computed: {
    getUrlQueryParams() {
      return {
        page: this.$route.query?.page || 1,
        pageSize: this.$route.query?.pageSize || 10,
        roleId: this.$route.query?.roleId || ''
      }
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
        <li class="breadcrumb-item"><router-link to="/home">Home</router-link></li>
        <li class="breadcrumb-item">User</li>
      </ol>
      <h1 class="page-header mb-0">User</h1>
    </div>
    <div class="ms-auto">
      <a href="/user/add" class="btn btn-success btn-rounded px-4 rounded-pill" aria-expanded="false"><i
          class="fa fa-plus fa-lg me-2 ms-n2 text-success-900"></i>Add</a>

    </div>
  </div>

  <!-- BEGIN #vue3TableLite -->
  <div class="card border-0">
    <table class="_table table table-bordered table-dark table-stroped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Img</th>
          <th>Name</th>
          <th>Username</th>
          <!-- <th>Sex</th> -->
          <th>Phone</th>
          <!-- <th>Address</th> -->
          <!-- <th>DOB</th> -->
          <th>Role</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody v-if="isLoading">
        <tr>
          <td colspan="9">
            <div class="loader"></div>
          </td>
        </tr>
      </tbody>
      <tbody v-else>

        <tr v-for="user in users" :key="user.id">
          <td style="vertical-align: middle; text-align: center;">{{ user.id }}</td>
          <td>
            <img :src="user.img || defaultImage" style="width: 45px; height: 45px; object-fit: cover;">

          </td>
          <td>{{ user.name }}</td>
          <td>{{ user.username }}</td>
          <!-- <td>{{ user.sex }}</td> -->
          <td>{{ user.phone }}</td>
          <!-- <td>{{ user.address }}</td> -->
          <td>{{ user.role.name }}</td>
          <td>{{ user.status ? "Active" : "Inactive" }}</td>
          <td>
            <a type="button" class="btn btn-success btn-rounded px-4 rounded-pill" aria-expanded="false"
              :href="`/user/${user.id}`">Update</a>
            <button class="btn btn-danger px-4 rounded-pill " data-id="' + row.id + '"
              @click="deletecategories(users.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- pagination -->
    <ul class="pagination">
      <li class="page-item">
        <button @click="toPage(this.query.page - 1)" :disabled="this.query.page <= 1" class="page-link"
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
        <button @click="toPage(this.query.page + 1)" :disabled="this.query.page >= this.pageMetaData.totalPage"
          class="page-link" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
          <span class="sr-only">Next</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
._table tbody td {
  vertical-align: middle;
}
</style>

