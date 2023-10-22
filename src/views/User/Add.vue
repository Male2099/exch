<script>
import swal from "sweetalert"
import { userAuthStore } from "@/stores/app-auth";
import PictureInput from 'vue-picture-input'
import imageApi from '../../services/apis/imageApi';
import userApi from '../../services/apis/user/userApi';
import roleApi from "../../services/apis/role/roleApi"


const authStore = userAuthStore();
export default {
  components: {
    PictureInput,
  },
  data() {
    return {
      defaultImage: "../../../src/assets/userImagePlaceholder.png",
      roles: [],
      user: {
        username: '111111',
        name: '111111',
        password: '111111',
        img: '',
        dob: '',
        role: '',
        roleId: '',
        sex: 'MALE',
        address: '',
        phone: "",
      },
      image: null,
      errors: {
        username: null,
      },
      loading: false,
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
    },
    onChange(image) {
      if (image) {
        console.log(1);
        this.image = this.$refs.pictureInput.file
      }
    },
    // async inToResetPasswordMode() {
    // 	const confirm = await this.confirmResetPasswordMode()
    // 	if (confirm) {
    // 		router.push('/admin/me/reset-password')
    // 	}
    // },
    async addUser(e) {
      e.preventDefault()
      const confirm = await this.confirmAddUserModal()
      if (confirm) {
        try {
          const imgUrl = await imageApi.uplaodImage(this.image)
          this.user.img = imgUrl ?? this.user.img
          this.user = await userApi.registerUser(this.user)
          await this.updateMeSuccesModal()
          this.$router.push('/admin/user')
        } catch (error) {
          this.errors.username = error?.errors?.username
          console.log("error add user");
          console.log(this.errors);
        }
      } else {
        this.user.roleId = this.user.role.id
        this.user = { ...this.user }

      }

    },
    async confirmAddUserModal() {
      return swal({
        title: "Update confirmation",
        // text: "Are you sure you want to make changes on your info",
        icon: "info",
        content: {
          element: "span",
          attributes: {
            innerHTML: `Confirm user '<span class="text-red">${this.user.name}</span>' creatation'`
          }
        },
        buttons: {
          cancel: {
            text: 'Cancel',
            value: null,
            visible: true,
            className: 'btn btn-default',
            closeModal: true,
          },
          confirm: {
            text: 'Condfirm',
            value: true,
            visible: true,
            className: 'btn btn-danger',
            closeModal: true
          }
        }
      })
    },
    async updateMeSuccesModal() {
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
    //id 2 is role_user
    this.user.roleId = this.roles[2].id
  }
  , computed: {
    isSubmittable() {
      if (this.errors.username) {
        return false
      }
      return true
    },
  }, watch: {
    'user.username'(newVal) {
      console.log(1212);
      this.errors.username = ''
    }
  }
}
</script>

<template>
  <div id="auth-profile">

    <div class="table-responsive form-inline">
      <form @submit="addUser">
        <div class="profile">
          <div class="profile-header">
            <div class="profile-header-cover"></div>
            <div class="profile-header-content">
              <div class="profile-header-img p-0 ">
                <!-- <img v-if="!inEditProfileMode" :src="user.img || defaultImage" /> -->

                <div class=" _profile-img-wrapper">
                  <div class="_profile-img-container ">
                    <picture-input ref="pictureInput" width="120" height="120" margin="0" accept="image/*" size="10"
                      button-class="btn" :custom-strings="{
                        upload: '<h1>Bummer!</h1>',
                        drag: 'input profile picture'
                      }" @change="onChange" :prefill="user.img || defaultImage" :alertOnError="false">
                    </picture-input>
                  </div>
                </div>
              </div>
              <div class="profile-header-info">
                <div style="height: 6rem;"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="card border-0 mb-4">
          <div class="card-body">
            <div class="mb-3 fs-5 fw-bold">User Info</div>


            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="name" class="form-label">Name</label>
                <input type="text" class="form-control" id="name" placeholder="Name" v-model="user.name" required>
              </div>
              <div class="col-md-6 mb-3">
                <label for="validationServerUsername" class="form-label">Username</label>
                <input type="text" placeholder="Username" v-model="user.username" class="form-control"
                  :class="{ 'is-invalid': errors.username }" required id="validationServerUsername">

                <div class="invalid-feedback">
                  {{ errors.username }}
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 mb-3">
                <label class="form-label">Phone</label>
                <input type="phone" class="form-control" placeholder="Phone" v-model="user.phone">
              </div>
              <div class="col-md-6 mb-3">

                <label class="form-label">Sex</label>
                <select class="form-control" v-model="user.sex">
                  <option value="MALE" selected>MALE</option>
                  <option value="FEMALE">FEMALE</option>
                </select>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 mb-3">
                <label class="form-label">Address</label>
                <input type="Address" class="form-control" placeholder="Address" v-model="user.address">
              </div>
              <div class="col-md-6 mb-3">
                <label for="dob" class="form-label">Date Of Birth</label>
                <input type="date" class="form-control" id="dob" placeholder="DOB" v-model="user.dob">
              </div>
            </div>

            <div class="row">
              <div class="col-md-6 mb-3">
                <label class="form-label">Role</label>
                <div>
                  <select class="form-control" v-model="user.roleId">
                    <option v-for="(role) in roles" :key="role.id" :value="role.id" v-text="role.name">
                    </option>
                  </select>
                </div>

              </div>
              <div class="col-md-6 mb-3">
                <label for="validationServerPassword" class="form-label">Password</label>
                <input type="password" placeholder="Password" v-model="user.password" required @input="valdiatePassword()"
                  :class="{ 'is-invalid': errors.password }" class="form-control" id="validationServerPassword">
                <div class="invalid-feedback">
                  {{ errors.password }}
                </div>
              </div>
            </div>

            <div>
              <div v-if="!loading" class="d-grid gap-2 d-md-flex justify-content-md-end" style="margin: auto;">
                <button :disabled="!isSubmittable" class="btn btn-success me-md-2 btn-rounded px-4 rounded-pill"
                  type="submit">Create</button>

                <router-link to="/admin/user" class="btn btn-danger btn-rounded px-4 rounded-pill">Cancel</router-link>
              </div>
              <div v-else class="d-grid gap-2 d-md-flex justify-content-md-end" style="margin: auto;">
                <button class="btn btn-success btn-rounded rounded-pill"
                  style="padding-left: 2.5rem;padding-right: 2.5rem;padding-top: .91rem; padding-bottom: .91rem;"
                  type="button">
                  <!-- <Loading style="font-size: .22rem" /> -->
                </button>
              </div>
            </div>

          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.disabled-input {
  border-left: none;
  border-top: none;
  border-right: none;
  border-radius: 0;
  background-color: inherit;
}

._red {
  background-color: red;
}

#auth-profile {
  margin-top: -1.21rem;
  height: 90vh;
  /* background-color: white; */
}

._profile-img-wrapper {
  position: relative;

}

._profile-img-container {
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 10;
  background-color: blue;
}

._disable-picture-input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* background-color: rgba(0, 0, 0, 0.5);  */
  pointer-events: none;
}
</style>