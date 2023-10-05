<script>
import authApi from "../../api/service/authApi"
import roleApi from "../../api/service/roleApi"
import imageApi from "../../api/imageApi"
import PictureInput from 'vue-picture-input'
import swal from "sweetalert"

import Loading from '../../components/app/LoadingOnSubmit.vue';
export default {
  name: 'app',
  data() {
    return {
      user: {
        username: 'testSweetAlert',
        password: 'testSweetAlert',
        name: 'testSweetAlert',
        img: '',
        dob: '',
        roleId: '3',
        sex: 'MALE',
        address: '',
        phone: ""
      },
      roles: [],
      image: null,
      errors: {
        username: null,
        password: null
      },
      loading: false
    }
  },
  components: {
    PictureInput,
    Loading
  },
  computed: {
    isSubmittable() {
      if (this.user.username === '' || this.user.password === '')
        return false
      if (this.errors.username || this.errors.password) {
        return false
      }
      return true
    }
  },
  methods: {
    valdiatePassword() {
      if (this.user.password.length < 6 || this.user.password.length > 20) {
        this.errors.password = "The password must be between 6 and 20 characters long"
      }
      else {
        this.errors.password = null
      }
    }, validateUser() {
      if (this.errors.username) this.errors.username = null;
    },
    onChange(image) {
      if (image) {
        this.image = this.$refs.pictureInput.file
      }
    },


    async registerUser(e) {
      e.preventDefault();
      const confirm = await this.confirmDialog();
      if (!confirm) return;
      this.loading = true;
      try {
        this.user.img = await this.uploadImage();
        await authApi.registerUser(this.user);
        this.loading = false
        await this.showSuccessDialog()
       this.$router.push("/user")
      } catch (error) {
        console.error(error);
        this.loading = false;
        this.errors.username = error.errors.username
      }
    },
    async uploadImage() {
      const res = await imageApi.uplaodImage(this.image);
      return res;
    },
    async confirmDialog() {
      return swal({
        title: "Create User",
        text: "Are you sure you want to create this user?",
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
            text: 'Create',
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
        text: "User created successfully!",
        icon: "success",
        button: {
          text: "OK",
          className: 'btn btn-success',
        }
      });
    }
  },
  async mounted() {
    this.roles = await roleApi.getAllRoles();
    this.user.roleId = this.roles[2]?.id;
  },
};

</script>
<template>
  <div class="d-flex align-items-center mb-3">
    <h1 class="page-header mb-0" style="color: green;"><i class="fa fa-plus-circle"></i>Add User</h1>
    <div class="ms-auto">
      <a href="/user" class="btn btn-success btn-rounded px-4 rounded-pill">Back</a>
    </div>
  </div>

  <form @submit="registerUser">
    <div class="card border-0 mb-4">
      <div class="card-body">
        <div class="circle text-center">
          <picture-input ref="pictureInput" width="150" height="150" margin="16" accept="image/*" size="10"
            button-class="btn" :custom-strings="{
              upload: '<h1>Bummer!</h1>',
              drag: 'input profile picture'
            }" @change="onChange">
          </picture-input>
        </div>

        <div class="mb-3">
          <label for="name" class="form-label">Name</label>
          <input type="text" class="form-control" id="name" placeholder="Name" v-model="user.name" required>

        </div>
        <div class="mb-3">
          <label for="validationServerUsername" class="form-label">Username</label>
          <input type="text" placeholder="username" v-model="user.username" required @input="validateUser()"
            :class="{ 'is-invalid': errors.username }" class="form-control" id="validationServerUsername">
          <div class="invalid-feedback">
            {{ errors.username }}
          </div>
        </div>
        <div class="mb-3">
          <label for="validationServerPassword" class="form-label">passsword</label>
          <input type="password" placeholder="Password" v-model="user.password" required @input="valdiatePassword()"
            :class="{ 'is-invalid': errors.password }" class="form-control" id="validationServerPassword">
          <div class="invalid-feedback">
            {{ errors.password }}
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label">Address</label>
          <input type="Address" class="form-control" placeholder="Address" v-model="user.address">
        </div>
        <div class="mb-3">
          <label class="form-label">Phone</label>
          <input type="phone" class="form-control" placeholder="Phone" v-model="user.phone">
        </div>
        <div class="mb-3">
          <label for="dob" class="form-label">DOB</label>
          <input type="date" class="form-control" id="dob" placeholder="DOB" v-model="user.dob">
        </div>
        <div class="mb-3">

          <label class="form-label">Sex</label>
          <select class="form-control" v-model="user.sex">
            <option value="MALE" selected>MALE</option>
            <option value="FEMALE">FEMALE</option>
          </select>
        </div>
        <div class="mb-3">
          <label class="form-label">Role </label>
          <div>
            <select class="form-control" v-model="user.roleId">
              <option v-for="(role) in roles" :key="role.id" :value="role.id" v-text="role.name"></option>
            </select>
          </div>
        </div>
        <div v-if="!loading" class="d-grid gap-2 d-md-flex justify-content-md-end" style="margin: auto;">
          <button :disabled="!isSubmittable" class="btn btn-success me-md-2 btn-rounded px-4 rounded-pill"
            type="submit">Create</button>

          <a href="/user/" class="btn btn-danger btn-rounded px-4 rounded-pill">Cancel</a>
        </div>
        <div v-else class="d-grid gap-2 d-md-flex justify-content-md-end" style="margin: auto;">
          <button class="btn btn-success btn-rounded rounded-pill"
            style="padding-left: 2.5rem;padding-right: 2.5rem;padding-top: .91rem; padding-bottom: .91rem;" type="button">
            <Loading style="font-size: .22rem" />
          </button>
        </div>

      </div>
    </div>
  </form>
</template>../../api/service/roleApi