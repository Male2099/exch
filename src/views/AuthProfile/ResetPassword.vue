
<script>
import swal from "sweetalert"
import router from "@/router"
import { userAuthStore } from "@/stores/app-auth";
import authApi from '../../services/apis/user/authApi';

const authStore = userAuthStore();

export default {
    data() {
        return {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
            error: '',
        }
    },
    methods: {
        async resetPassword(e) {
            e.preventDefault();
            const confrim = await this.confirmResetPasswordModal()
            try {
                if (confrim) {
                    await authApi.resetPassword(this.currentPassword, this.newPassword)
                    await this.showSuccessDialog()
                    router.push('/admin/me/profile')
                }
            } catch (error) {
                this.error = error?.message || "something went wrong"
                console.log(error);
            }
        },
        async confirmResetPasswordModal() {
            return swal({
                title: "Reset password",
                text: "Are you sure you want to reset your password",
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
                        text: 'Confirm',
                        value: true,
                        visible: true,
                        className: 'btn btn-danger',
                        closeModal: true
                    }
                }
            })
        }, async showSuccessDialog() {
            await swal({
                title: "Success",
                text: "Password updated!",
                icon: "success",
                button: {
                    text: "OK",
                    className: 'btn btn-success',
                }
            });
        }
    }, mounted() {
        this.user = authStore.user;
    },
    watch: {
        currentPassword(newVal) {
            this.error = ''
        }
    }
    , computed: {
        isSubmittable() {
            if (this.error || !this.confirmPasswordMatch || this.newPasswordError)
                return false
            if (this.newPassword == '' || this.confirmPassword == '' || this.currentPassword == '') {
                return false
            }
            return true
        },
        confirmPasswordMatch() {
            return (this.newPassword == this.confirmPassword) || this.confirmPassword == ''
        },
        newPasswordError() {
            if ((this.newPassword.length < 6 || this.newPassword.length > 20) && this.newPassword != '') {
                return "The password must be between 6 and 20 characters long"
            }
            return null;
        }
    }
}
</script>

<template>
    <div id="password-modify">
        <h3>Reset Passsword</h3>
        <!-- yep this is from passowrd -->
        <form @submit="resetPassword">
            <div class="_form-reset">
                <label for="old-password">Current Password</label>
                <input type="password" class="form-control" id="old-password" v-model="currentPassword"
                    placeholder="Enter password" required :class="{ 'is-invalid': error }">
                <div class="invalid-feedback">
                    {{ error }}
                </div>
                <label for="new-password">New Password</label>
                <input type="password" class="form-control" id="new-password" v-model="newPassword"
                    placeholder="Enter password" required :class="{ 'is-invalid': newPasswordError }">
                <div class="invalid-feedback">
                    {{ newPasswordError }}
                </div>

                <label for="confirm-password">Confirm New Password</label>
                <input type="password" class="form-control" id="confirm-password" v-model="confirmPassword"
                    placeholder="Enter password" required :class="{ 'is-invalid': !confirmPasswordMatch }">
                <div class="invalid-feedback">

                </div>
                <div>
                    <div class="my-3">
                        <button type="submit" :disabled="!isSubmittable || !newPassword"
                            class="btn btn-black w-100 bg-success text-white">Done</button>
                    </div>

                    <div class="my-3">
                        <router-link to="/admin/me/profile" type="button"
                            class="btn btn-black w-100 bg-white text-black">Cancel</router-link>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>


<style scoped>
._form-reset {
    width: 100%;
    max-width: 100vw;

    display: flex;
    flex-direction: column;
    /* align-items: center; */

    /* background-color: red; */
}

._form-reset label {
    font-size: 1rem;
    margin-top: 1rem;
    margin-bottom: .1rem;
    font-weight: bold;
}

._error-password {
    visibility: visible;
    font-size: .7rem;

}

._red {
    background-color: red;
}
</style>