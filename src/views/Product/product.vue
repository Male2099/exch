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
        name: "TEST" ,
        price: "33",
        quantity: "23",
        category: "food",
        product_code: "12aed",
      },
      {
        id: 2,
        name: "TEST" ,
        price: "23",
        quantity: "23",
        category: "food",
        product_code: "asd9697",
    }
      );

    const searchTerm = ref("");
    // Table config
    const table = reactive({
      columns: [
        {
          label: "ID",
          field: "id",
          width: "3%",
          sortable: true,
          isKey: true,
        },
        {
          label: "Pic",
          field: "quick",
          width: "4%",
          display: function (row) {
            return (
              `<div class="w-50px h-50px bg-light d-flex align-items-center justify-content-center">
											<img alt="" class="mw-100 mh-100" src="/assets/img/product/product-6.jpg" />
										</div>`
              );
          }
          },
        {
          label: "Name",
          field: "name",
          width: "15%",
          sortable: true,
        },
        {
          label: "Product_code",
          field: "product_code",
          width: "10%",
          sortable: true,
        },
        {
          label: "Price",
          field: "price",
          width: "6%",
          sortable: true,
        },
        {
          label: "Quantity",
          field: "quantity",
          width: "2%",
          sortable: true,
        },
        {
          label: "Category",
          field: "category",
          width: "10%",
          sortable: true,
        },
        {
          label: "Operation",
          field: "quick",
          width: "10%",
          display: function (row) {
            return (
              `<div>
                <a href="/product/view" type="button" data-id="' + row.id + '" class="btn btn-success btn-rounded px-4 rounded-pill">View</a>
                <button class="btn btn-danger px-4 rounded-pill" data-id="' + row.id + '" @click="deletecategories(customers.id)">Delete</button>
              </div>`
             
              );
          }
          },
      ],
      rows: computed(() => {
        return data.filter(
          (x) =>
            x.product_code.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
            x.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
            x.category.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
            x.quantity.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
            x.price.toLowerCase().includes(searchTerm.value.toLowerCase())
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
       <li class="breadcrumb-item active"><i class="fa fa-arrow-back"></i> Product</li>
			</ol>
			<h1 class="page-header mb-0">Product</h1>
		</div>
		<div class="ms-auto">
			<a href="/product/add" class="btn btn-success btn-rounded px-4 rounded-pill" aria-expanded="false"><i class="fa fa-plus fa-lg me-2 ms-n2 text-success-900"></i>Add</a>
			
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