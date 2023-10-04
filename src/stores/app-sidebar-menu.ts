import { defineStore } from "pinia";

export const useAppSidebarMenuStore = defineStore({
  id: "appSidebarMenu",
  state: () => {
    return [
      {
    	text: 'Dashboard',
    	is_header: true
    },
    { url: '/dashboard', icon: 'fa fa-sitemap', title: 'Dashboard',},
    {
      text: 'User',
      is_header: true
    },
	{ url: '/user', icon: 'fa fa-user', title: 'User',},
  { url: '/customer', icon: 'fa fa-user', title: 'Customer',},
  { url: '/supplier', icon: 'fa fa-user', title: 'Supplier',},
  {
    text: 'Item',
    is_header: true
  },
	{ url: '/category', icon: 'fa fa-sitemap', title: 'Category',},
  { url: '/product', icon: ' fa fa-list-alt ', title: 'Product',},
  {
    text: 'Report',
    is_header: true
  },
  { url: '/order', icon: ' fa fa-file ', title: 'Order',},
  {
    text: 'Stock',
    is_header: true
  },
  { url: '/stock', icon: ' fa fa-file ', title: 'Stock',},

]
}
}
)
	