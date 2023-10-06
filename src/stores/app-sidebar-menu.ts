import { defineStore } from "pinia";

export const useAppSidebarMenuStore = defineStore({
  id: "appSidebarMenu",
  state: () => {
    return [
      {
    	text: 'Dashboard',
    	is_header: true
    },
    { url: '/admin/dashboard', icon: 'fa fa-sitemap', title: 'Dashboard',},
    {
      text: 'User',
      is_header: true
    },
	{ url: '/admin/user', icon: 'fa fa-user', title: 'User',},
  { url: '/admin/customer', icon: 'fa fa-user', title: 'Customer',},
  { url: '/admin/supplier', icon: 'fa fa-user', title: 'Supplier',},
  {
    text: 'Item',
    is_header: true
  },
	{ url: '/admin/category', icon: 'fa fa-sitemap', title: 'Category',},
  { url: '/admin/product', icon: ' fa fa-list-alt ', title: 'Product',},
  {
    text: 'Report',
    is_header: true
  },
  { url: '/admin/order', icon: ' fa fa-file ', title: 'Order',},
  {
    text: 'Stock',
    is_header: true
  },
  { url: '/admin/stock', icon: ' fa fa-file ', title: 'Stock',},

]
}
}
)
	