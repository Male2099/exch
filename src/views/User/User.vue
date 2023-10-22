<script>

import userApi from "../../services/apis/user/userApi"

import Loading from '../../components/app/LoadingOnSubmit.vue';
import swal from "sweetalert"

export default {
  components: {
    LoadingOnFetchingData: Loading
  },
  data() {
    return {
      defaultImage: "../../src/assets/defaultImage.png",
      users: [],
      query: {
        page: 1,
        pageSize: 10,
        roleId: '',
        search: ''
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
    async searchUser(e) {
      e.preventDefault();
      if (!this.query.search) return;
      //set to defualt query
      this.query = this.defaultQuery

      await this.pushQuery(this.query)
      await this.getAllUsers();
      //set to make watch able to know if the current data is default or from search
      // this.query.search = ''
    },
    async getAllUsers() {
      this.isLoading = true
      const res = await userApi.getAllUsers(this.getUrlQueryParams);
      this.isLoading = false
      this.users = res.data
      this.pageMetaData = res.metadata
    },
    async toPage(pageNum) {
      //click same page
      if (pageNum == this.query.page) return
      this.query.page = pageNum
      //push new query to load next page
      await this.pushQuery(this.query)
      await this.getAllUsers()
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
    async deleteUser(user) {
      try {
        const confirm = await this.confirmDeleteDialog(user);
        if (!confirm) return;
        this.isLoading = true
        await userApi.deleteUserById(user.id);
        await this.getAllUsers();
      } catch (error) {
        this.isLoading = false
        console.log(error);
      }
    },
    async confirmDeleteDialog(user) {
      return swal({
        title: "Delete Confirmation",
        content: {
          element: "span",
          attributes: {
            innerHTML: `Deleting <span class="text-red">${user.name}</span>  will permanently remove all associated data`
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
    }
  },
  async mounted() {
    //set to current query of page
    this.query = this.getUrlQueryParams;
    // fetch init data
    await this.getAllUsers()

  },
  computed: {
    //get the query from url
    getUrlQueryParams() {
      return {
        page: this.$route.query?.page || 1,
        pageSize: this.$route.query?.pageSize || 10,
        roleId: this.$route.query?.roleId || '',
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
        roleId: this.query.roleId || '',
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
        await this.getAllUsers();
      }
    }
  }
};

</script>
<style scoped>
/* .loader {
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
} */
</style>
<template>
  <div>
    <h1 class="page-header mb-0">User</h1>
    <div class=" d-flex flex-column justify-content-between h-100vh" style="max-height: 100vh;">
      <section class="d-flex justify-content-between">
        <form @submit="searchUser" name="search">
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
        <router-link to="user/add" class="btn btn-success h-100  my-10px btn-rounded px-4 rounded-pill"
          aria-expanded="false"><i class="fa fa-plus fa-lg me-2 ms-n2 text-success-900"></i>Add
        </router-link>
      </section>
      <section>
        <table class="_table table table-bordered table-dark table-stroped">
          <thead>
            <tr>
              <th>ID</th>
              <th>User <span class="fw-normal">({{ pageMetaData.totalItems }})</span> </th>
              <th>Phone</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
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
            <tr v-for="user in users" :key="user.id" class="relative">
              <td style="vertical-align: middle; text-align: center;width: 5%;">{{ user.id }}</td>
              <td style="width: 30%;">
                <div class="d-flex gap-2 h-100">
                  <img :src="user.img || defaultImage" onerror="this.src='../../src/assets/defaultImage.png'"
                    style="width: 35px; height: 35px; object-fit: cover;">
                  <div>
                    <span style="font-weight: bold">{{ user.name }}</span>
                    <br>
                    <span style="font-size: 0.9em; color: #a5a5a5">@{{ user.username }}</span>
                  </div>
                </div>

              </td>
              <td>{{ user.phone }}</td>
              <td>{{ user.role.name }}</td>
              <td>{{ user.status ? "Active" : "Inactive" }}</td>
              <td style="width: 10%;">
                <div style="width: 100%; display: flex; justify-content: center;">
                  <router-link :to="'user/' + user.id" class="btn btn-rounded rounded-pill" aria-expanded="false">
                    <i class="bi bi-pencil-square fs-4 text-info"></i>
                  </router-link>
                  <button class="btn rounded-pill text-danger" data-id="' + row.id + '" @click="deleteUser(user)">
                    <i class="bi bi-trash-fill w-100px fs-4"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
      <!-- pagination -->
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

