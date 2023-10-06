<!-- <script setup lang="ts">
import AppFooter from '@/components/app/Footer.vue';
import AppHeader from '@/components/app/Header.vue';
import AppSidebar from '@/components/app/Sidebar.vue';
import AppSidebarRight from '@/components/app/SidebarRight.vue';
import AppThemePanel from '@/components/app/ThemePanel.vue';
import AppTopMenu from '@/components/app/TopMenu.vue';
import { useAppOptionStore } from '@/stores/app-option';
import { ProgressFinisher, useProgress } from '@marcoschulte/vue3-progress';
import { getCurrentInstance } from 'vue';
import { RouterView } from 'vue-router';
import router from './router';

const appOption = useAppOptionStore();
const internalInstance = getCurrentInstance();

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
</script> -->

<template>
	<div class="app">
			<router-view></router-view>
		<!-- <app-footer v-if="appOption.appFooter" /> -->
	</div>
</template>


