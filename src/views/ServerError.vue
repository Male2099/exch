<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card mt-5">
                    <div class="card-body text-center">
                        <h1 class="card-title">500 Internal Server Error</h1>
                        <p class="card-text">
                            Oops! Something went wrong on the server. Please try again later.
                        </p>
                    </div>
                </div>
                <div class="justify-content-center d-flex m-4">
                    <div>
                        <router-link  to="/admin/dashboard" class="btn btn-success px-3">Go Home</router-link>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
  
<script>
import { useAppOptionStore } from '@/stores/app-option';

const appOption = useAppOptionStore();
export default {
    mounted() {
        appOption.appSidebarHide = true;
        appOption.appHeaderHide = true;
        appOption.appContentClass = 'p-0';
    },
    beforeRouteLeave(to, from, next) {
        appOption.appSidebarHide = false;
        appOption.appHeaderHide = false;
        appOption.appContentClass = '';
        next();
    },
    methods: {
        checkForm: function (e) {
            e.preventDefault();
            this.$router.push({ path: '/dashboard/v2' })
        }
    }
}
</script>
  
<style scoped>
/* Add any custom styling here */
</style>