import { defineStore } from "pinia";

export const useAppOptionStore = defineStore({
  id: "appOption",
  state: () => {
    return {
    	appThemeClass: '',
    	appDarkMode: '',
			
			appHeaderHide: false,
			appHeaderFixed: true,
			appHeaderInverse: false,
			appHeaderSearchToggled: false,
			appHeaderLanguageBar: false,
			appHeaderMegaMenu: false,
			
			appSidebarHide: false,
			appSidebarWide: false,
			appSidebarFixed: true,
			appSidebarCollapsed: false,
			appSidebarMobileToggled: false,
			appSidebarMobileClosed: false,
			appSidebarMinified: false,
			appSidebarHover: false,
			appSidebarEndToggled: false,
			appSidebarEndMobileToggled: false,
			
			appTopMenu: false,
			
			appContentFullHeight: false,
			appContentClass: '',
			
			appFooter: false,
			appFooterFixed: false,
			
			appThemePanelToggled: false
		}
  }
});
