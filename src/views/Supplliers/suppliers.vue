<script>
import { defineComponent, reactive, ref, computed } from 'vue';
import highlightjs from '@/components/plugins/Highlightjs.vue';
import vueTable from '@/components/plugins/VueTable.vue';
import navscrollto from '@/components/app/NavScrollTo.vue';
import axios from 'axios';
import { useAppVariableStore } from '@/stores/app-variable';
import { ScrollSpy } from 'bootstrap';
import supplierApi from "../../api/supplierApi"
const appVariable = useAppVariableStore();

export default {
	data () {
		const data = reactive([]);

      data.push(
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
          width: "10%",
          sortable: true,
        },
        {
          label: "Email",
          field: "email",
          width: "15%",
          sortable: true,
        },
        {
          label: "Phone",
          field: "phone",
          width: "15%",
          sortable: true,
        },
        {
          label: "Address",
          field: "address",
          width: "15%",
        },
        {
          label: "Operation",
          field: "quick",
          width: "10%",
          display: function (row) {
            return (
              `<div>
                <a href="/supplier/view" type="button" data-id="' + row.id + '" class="btn btn-success btn-rounded px-4 rounded-pill">View</a>
                <button class="btn btn-danger px-4 rounded-pill" data-id="' + row.id + '" @click="deletecategories(suppliers.id)">Delete</button>
              </div>`
              );
          }
          },
      ],
      rows: computed(() => {
        return data.filter(
          (x) =>
            x.email.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
            x.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
            x.address.toLowerCase().includes(searchTerm.value.toLowerCase()) ||

            x.phone.toLowerCase().includes(searchTerm.value.toLowerCase()) 

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
			table,
      suppliers:[]
		}
	},methods:{

  },
	components: {
		highlightjs: highlightjs,
		navScrollTo: navscrollto,
		vueTable: vueTable
	},
  async	mounted() {
    this.suppliers=await supplierApi.getAllSuppliers();
    console.log(this.suppliers);
		
		new ScrollSpy(document.body, {
			target: '#sidebar-bootstrap',
			offset: 200
		});
	}
}
</script>
<template>
	<div class="d-flex align-items-center mb-3">
		<div>
			<ol class="breadcrumb">
				<li class="breadcrumb-item"><a href="javascript:;">Home</a></li>
        <li class="breadcrumb-item active"><i class="fa fa-arrow-back"></i> Supplier</li>
			</ol>
			<h1 class="page-header mb-0">Suppliers</h1>
		</div>
		<div class="ms-auto">
			<a href="/supplier/add" class="btn btn-success btn-rounded px-4 rounded-pill" aria-expanded="false"><i class="fa fa-plus fa-lg me-2 ms-n2 text-success-900"></i>Add</a>
			
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