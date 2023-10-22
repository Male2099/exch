<script setup>
import SidebarNav from '@/components/app/SidebarNav.vue';
import { useAppOptionStore } from '@/stores/app-option';
import { useAppSidebarMenuStore } from '@/stores/app-sidebar-menu';

const appSidebarMenu = useAppSidebarMenuStore();
const appOption = useAppOptionStore();

</script>
<template>
	<div id="sidebar" class="app-sidebar" :data-bs-theme="'dark'">
		<perfect-scrollbar class="app-sidebar-content" :class="{ 'h-100': appOption.appSidebarFixed }">
			<div class="menu">
				<template v-for="menu in appSidebarMenu" :key="menu.id">
					<div class="menu-header" v-if="menu.is_header">{{ menu.text }}</div>
					<div class="menu-divider" v-else-if="menu.is_divider"></div>
					<template v-else>
						<sidebar-nav v-if="menu.title" :menu="menu"></sidebar-nav>
					</template>
				</template>
			</div>
		</perfect-scrollbar>
	</div>
</template>

<style></style>