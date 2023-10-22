<script>
import { useAppVariableStore } from '@/stores/app-variable';
import { animateNumber } from '@/components/app/AnimateNumber.vue';
import { Popover } from 'bootstrap';
import apexchart from '@/components/plugins/Apexcharts.vue';
import jsVectorMap from 'jsvectormap';
import 'jsvectormap/dist/maps/world.js';
import 'jsvectormap/dist/css/jsvectormap.min.css';

import DatePickerBetweenVue from './DatePickerBetween.vue';
import dashboardService from '../../services/apis/dasboard/dasboardService'

const appVariable = useAppVariableStore();

export default {
	components: {
		apexchart: apexchart,
		DatePickerBetweenVue
	},

	data() {
		return {
			defaultimage: '../../src/assets/defaultImage.png',
			renderComponent: true,
			saleReport: [],
			queryDate: {
				startDate: null,
				endDate: null,
			},
			saleInfo: {
				totalPrice: 0,
				totalSold: 0,
				totalOrders: 0
			},
			saleData: [{
				date: "2023-09-14",
				totalOrders: 1,
				quantitySold: 10,
				totalPrice: 100.00
			},],
			productData: []
		}
	},
	async created() {
		this.queryDate = {
			startDate: "2010-10-10",
			endDate: '2024-10-10'
		}
		await this.getSaleReport();
		await this.getProductSelling()
		console.log(this.productData);
	},
	async mounted() {
		animateNumber();
		// await this.getSaleReport();
		// popover
		var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
		var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
			return new Popover(popoverTriggerEl)
		});


	},
	watch: {
		queryDate: {
			deep: true,
			async handler(newVal) {
				await this.getSaleReport();

			},
		}
	},
	methods: {
		filterDate(date) {
			this.queryDate = date;
			console.log("triggered");
		},
		async getSaleReport() {
			// console.log("pass", this.queryDate);
			const sale = await dashboardService.saleReport(this.queryDate);
			if (sale) {
				console.log(sale);
				this.saleData = sale.data;
				this.saleInfo.totalPrice = sale.totalPrice
				this.saleInfo.totalSold = sale.totalSold
				this.saleInfo.totalOrders = sale.totalOrders
			}
			this.saleReport = this.getSaleData();
		},
		async getProductSelling() {
			const topProduct = await dashboardService.productSaleReport(this.queryDate);
			this.productData = topProduct.data.reverse()
		},
		getSaleData() {
			return {
				chart: {
					series: [

						{
							name: 'Order',
							data: (() => {
								let orderData = [];
								for (let order of this.saleData) {
									orderData.push([this.handleDateStringToDate(order.date), order.totalOrders]);
								}
								return orderData;
							})()
						},
						{
							name: 'Product sold',
							data: (() => {
								let orderData = [];
								for (let order of this.saleData) {
									orderData.push([this.handleDateStringToDate(order.date), order.quantitySold]);
								}
								return orderData;
							})()
						},
					],
					options: {
						colors: [appVariable.color.teal, appVariable.color.blue],
						fill: {
							opacity: .75,
							type: 'solid'
						},
						legend: {
							position: 'top',
							horizontalAlign: 'right',
							offsetY: 15,
							offsetX: 500,
							labels: {
								colors: appVariable.color.white
							}
						},
						xaxis: {
							type: 'datetime',
							tickAmount: 6,
							labels: {
								style: {
									colors: appVariable.color.white
								}
							}
						},
						yaxis: {
							labels: {
								style: {
									colors: appVariable.color.white
								}
							}
						},
						tooltip: {
							y: {
								formatter: function (val) { return val }
							}
						},
						chart: {
							height: '100%', type: 'area', toolbar: { show: false }, stacked: true
						},
						plotOptions: {
							bar: { horizontal: false, columnWidth: '55%', endingShape: 'rounded' }
						},
						dataLabels: {
							enabled: true,
							// enabled: false
						},
						grid: {
							show: true, borderColor: 'rgba(' + appVariable.color.whiteRgb + ', .15)',
							xaxis: {
								lines: {
									show: true
								}
							},
							yaxis: {
								lines: {
									show: true
								}
							},
							padding: {
								top: -40,
								right: 3,
								bottom: 0,
								left: 10
							},
						},
						stroke: {
							show: false,
							curve: 'straight'
						}
					}
				}
			};
		},
		handleGetDate(minusDate) {
			var d = new Date();
			d = d.setDate(d.getDate() - minusDate);
			// console.log("date");
			return d;
		},
		handleDateStringToDate(dateString) {
			return new Date(Date.parse(dateString));
		}
	}
}
</script>
<template>
	<!-- BEGIN breadcrumb -->
	<!-- <ol class="breadcrumb float-xl-end">
		<li class="breadcrumb-item"><a href="javascript:;">Home</a></li>
		<li class="breadcrumb-item"><a href="javascript:;">Dashboard</a></li>
		<li class="breadcrumb-item active">Dashboard v3</li>
	</ol> -->

	<div class="row">
		<h1 class="page-header mb-3">Dashboard</h1>
		<DatePickerBetweenVue @filterDate="filterDate" />
		<!-- BEGIN col-8 -->
		<div class="col-xl-8 col-lg-6">
			<!-- BEGIN card -->
			<div class="card border-0 mb-3 bg-gray-800 text-white">
				<div class="card-body">
					<div class="mb-3 text-gray-500 "><b>SALE ANALYTICS</b> <span class="ms-2"><i class="fa fa-info-circle"
								data-bs-toggle="popover" data-bs-trigger="hover"
								data-bs-title="Top products with units sold" data-bs-placement="top"
								data-bs-content="Products with the most individual units sold. Includes orders from all sales channels."
								data-original-title="" title=""></i></span></div>
					<div class="row">

						<div class="col-xl-3 col-4">
							<h3 class="mb-1"><span data-animation="number">{{ saleInfo.totalPrice }}</span>$</h3>
							<div>Sales revenue</div>
							<!-- <div class="text-gray-500 small text-truncate"><i class="fa fa-caret-up"></i> <span
									data-animation="number" data-value="25.5">0.00</span>% from previous 7 days
							</div> -->
						</div>

						<div class="col-xl-3 col-4">
							<h3 class="mb-1"><span data-animation="number">{{ saleInfo.totalOrders }}</span></h3>
							<div>Total orders</div>
							<!-- <div class="text-gray-500 small text-truncate"><i class="fa fa-caret-up"></i> <span
									data-animation="number" data-value="5.33">0.00</span>% from previous 7 days
							</div> -->
						</div>

						<div class="col-xl-3 col-4">
							<h3 class="mb-1"><span data-animation="number">{{ saleInfo.totalSold }}</span>
							</h3>
							<div>Product sold</div>
							<!-- <div class="text-gray-500 small text-truncate"><i class="fa fa-caret-up"></i> <span
									data-animation="number" data-value="0.323">0.00</span>% from previous 7 days
							</div> -->
						</div>
					</div>
				</div>
				<div class="card-body pe-3 ps-0 py-0">
					<apexchart type="bar" width="100%" height="252" :options="saleReport.chart?.options"
						:series="saleReport.chart?.series"></apexchart>
				</div>
			</div>
			<!-- END card -->
		</div>
		<!-- END col-8 -->
		<!-- BEGIN col-4 -->
		<div class="col-xl-4 col-lg-6">
			<div class="card border-0 mb-3 bg-gray-800 text-white">
				<div class="card-body">
					<div class="mb-3 text-gray-500">
						<b>TOP PRODUCTS SOLD</b>
						<span class="ms-2 "><i class="fa fa-info-circle" data-bs-toggle="popover" data-bs-trigger="hover"
								data-bs-title="Top products with units sold" data-bs-placement="top"
								data-bs-content="Products with the most individual units sold. Includes orders from all sales channels."></i></span>
					</div>
					<!-- END title -->
					<!-- BEGIN product -->
					<ul class="p-0 h-300px overflow-auto _pr-1rem">
						<li v-for="(prod, index) in productData" :key="index" class="d-flex align-items-center mb-15px">
							<div style="width: 2.4rem; margin-right: 7px;">
								<img :src="prod.img" onerror="this.src='../../src/assets/defaultImage.png'"
									style="width: 2.4rem;border-radius: 4px;">
							</div>


							<div class="text-truncate">
								<div>{{ prod.name }}</div>
								<div class="text-gray-500">{{ prod?.price || 'xx' }}$</div>
							</div>
							<div class="ms-auto text-center">
								<div class="fs-13px"><span data-animation="number">{{ prod.quantitySold }}</span></div>
								<div class="text-gray-500 fs-10px">sold</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
	<!-- END row -->
	<!-- BEGIN row -->
</template>

<style scoped>
/* Custom scrollbar styles */
::-webkit-scrollbar {
	width: 4px;
}

::-webkit-scrollbar-track {
	background-color: #f1f1f1;
}

::-webkit-scrollbar-thumb {
	background-color: #23aec7;
}

::-webkit-scrollbar-thumb:hover {
	background-color: #555;
	/* color of the scrollbar thumb on hover */
}

._pr-1rem {
	padding-right: 1rem !important;
}
</style>