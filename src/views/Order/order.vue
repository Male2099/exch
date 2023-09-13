<script>
import { defineComponent, reactive, ref, computed } from 'vue';
import highlightjs from '@/components/plugins/Highlightjs.vue';
import vueTable from '@/components/plugins/VueTable.vue';
import navscrollto from '@/components/app/NavScrollTo.vue';
import axios from 'axios';
import { useAppVariableStore } from '@/stores/app-variable';
import { ScrollSpy } from 'bootstrap';

const appVariable = useAppVariableStore();

export default {
	data () {
		const data = reactive([]);

      data.push(
        {
        id: 1,
        user: "sothy" ,
        price: "33$",
        customer: "mark",
        tax: "5%",
        payment: "card",
      },
      {
        id: 2,
        user: "sothy" ,
        price: "45$",
        customer: "rex",
        tax: "5%",
        payment: "card",
    }
      );

    const searchTerm = ref("");
    // Table config
    const table = reactive({
      columns: [
        {
          label: "ID",
          field: "id",
          width: "5%",
          sortable: true,
          isKey: true,
        },
        {
          label: "User",
          field: "user",
          width: "10%",
          sortable: true,
        },
        {
          label: "Customer",
          field: "customer",
          width: "10%",
          sortable: true,
        },
        {
          label: "Price",
          field: "price",
          width: "5%",
          sortable: true,
        },
        {
          label: "Tax",
          field: "tax",
          width: "5%",
          sortable: true,
        },
        {
          label: "Payment",
          field: "payment",
          width: "5%",
          sortable: true,
        },
        {
          label: "Total_Price",
          field: "price",
          width: "5%",
          sortable: true,
        },
        {
          label: "Date",
          field: "price",
          width: "10%",
          sortable: true,
        },
        {
          label: "Status",
          field: "price",
          width: "5%",
          sortable: true,
        },
        
      ],
      rows: computed(() => {
        return data.filter(
          (x) =>
            x.user.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
            x.customer.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
            x.price.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
            x.tax.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
            x.id.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
            x.payment.toLowerCase().includes(searchTerm.value.toLowerCase())
        );
      }),
      totalRecordCount: computed(() => {
        return table.rows.length;
      }),
      sortable: {
        order: "id",
        sort: "asc",
      },
    });
    
		return {
			code1: '',
      searchTerm,
			table
		}
	},
	components: {
		highlightjs: highlightjs,
		navScrollTo: navscrollto,
		vueTable: vueTable
	},
	mounted() {
		axios.get('/assets/data/table/plugin-code-1.json').then((response) => {
			this.code1 = response.data;
		});
		
		new ScrollSpy(document.body, {
			target: '#sidebar-bootstrap',
			offset: 200
		})
	}
}
</script>
<template>
	<div class="d-flex align-items-center mb-3">
		<div>
			<ol class="breadcrumb">
				<li class="breadcrumb-item"><a href="javascript:;">Home</a></li>
        <li class="breadcrumb-item active"><i class="fa fa-arrow-back"></i>Order</li>
			</ol>
			<h1 class="page-header mb-0">Order</h1>
		</div>
		<div class="ms-auto">
			<a href="/order/add" class="btn btn-success btn-rounded px-4 rounded-pill" aria-expanded="false"><i class="fa fa-plus fa-lg me-2 ms-n2 text-success-900"></i>Add</a>
			
		</div>
	</div>
	
		<!-- BEGIN #vue3TableLite -->

        <div class="card border-0">
				<div class="input-group mb-3">
                    <div class="flex-fill position-relative">
						<div class="input-group">
							<div class="input-group-text position-absolute top-0 bottom-0 bg-none border-0 pe-0" style="z-index: 1;">
								<i class="fa fa-search opacity-5"></i>
							</div>
							<input type="text" class="form-control ps-35px bg-light" placeholder="Search products..." v-model="searchTerm"/>
						</div>
					</div>
				</div>
				<vue-table class="vue-table"
        :has-checkbox="true"
					:is-static-mode="true"
					:columns="table.columns"
					:rows="table.rows"
					:total="table.totalRecordCount"
          :rowClasses="table.rowClasses"
					:sortable="table.sortable" />

		<!-- END #vue3TableLite -->
	</div>
</template>