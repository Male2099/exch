

<script setup lang="ts">
import AppHeader from '@/components/app/Header.vue';
import AppSidebar from '@/components/app/Sidebar.vue';
import AppTopMenu from '@/components/app/TopMenu.vue';
import { useAppOptionStore } from '@/stores/app-option';
import { ProgressFinisher, useProgress } from '@marcoschulte/vue3-progress';
import { RouterView } from 'vue-router';
import router from '../router/index';

const appOption = useAppOptionStore();
// const internalInstance = getCurrentInstance();

const progresses = [] as ProgressFinisher[];

router.beforeEach(async (to, from) => {
    progresses.push(useProgress().start());
    appOption.appSidebarMobileToggled = false;
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
})
router.afterEach(async (to, from) => {
    progresses.pop()?.finish();
})
</script>

<template>
    <div id="admin-view">
		<app-header v-if="!appOption.appHeaderHide" />
		<app-sidebar v-if="!appOption.appSidebarHide" />
		<app-top-menu v-if="appOption.appTopMenu" />
        <div class="app-content" v-bind:class="appOption.appContentClass">
            <router-view></router-view>
        </div>
    </div>
</template>