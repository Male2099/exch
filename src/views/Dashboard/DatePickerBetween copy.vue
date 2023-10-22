<script>
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { rawListeners } from 'process';

export default {
	components: { Datepicker },
	data() {
		return {
			filterDate: {
				startDate: null,
				endDate: null,
			}
		};
	},
	async mounted() {
		this.filterDate.startDate = this._refDateToday(0)
		this.filterDate.endDate = this._refDateToday(1)
	},
	methods: {
		//imp later
		dateOption(startDate, endDate) {
			this.filterDate.endDate = endDate
			this.filterDate.startDate = startDate;
			this.$emit("filterDate", this.filterDate)
		},
		_refDateToday(nDay) {
			const today = new Date();
			const date_nDays = new Date(today);

			date_nDays.setDate(today.getDate() + nDay);

			return date_nDays.toISOString().split('T')[0];
		}, currentDateOfMonth() {
			const today = new Date();
			return today.getDate();
		},
		daysFromLastMonth() {
			const today = new Date();
			const currentDaysOfMonth = today.getDate();
			//to get last month days
			today.setDate(0)
			return today.getDate() + currentDaysOfMonth - 1 + 1;
		}, handleDateFormat(dateString) {
			const _date = (new Date(Date.parse(dateString))).toDateString();
			const _arr = _date.split(' ');
			//ex: Fri Oct 12 2023
			//cut 12 out

			return _arr[0] + " " + _arr[1] + " " + " " + _arr[3];
		}
	}
}

</script>
<template>
	<div class="d-sm-flex align-items-center mb-3">
		<div class="dropdown">
			<button class="btn btn-dark dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown"
				aria-haspopup="true" aria-expanded="false">
				<i class="fa fa-calendar fa-fw text-white text-opacity-50 ms-n1 me-1"></i>
				<span>{{ handleDateFormat(filterDate.startDate) + " ~ " + handleDateFormat(filterDate.endDate) }}</span>
				<b class="caret ms-3 opacity-50"></b>
			</button>
			<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
				<div class="d-flex">
					<div>
						<button @click="dateOption(_refDateToday(0), _refDateToday(1))" class="dropdown-item">Today</button>
						<button @click="dateOption(_refDateToday(-1), _refDateToday(0))"
							class="dropdown-item">Yesterday</button>

						<button @click="dateOption(_refDateToday(-7), _refDateToday(1))" class="dropdown-item">Last 7
							Days</button>
						<button @click="dateOption(_refDateToday(-30), _refDateToday(1))" class="dropdown-item">Last 30
							Days</button>
						<button @click="dateOption(_refDateToday(-currentDateOfMonth() + 1), _refDateToday(1))"
							class="dropdown-item">This Month</button>
						<button
							@click="dateOption(_refDateToday(-daysFromLastMonth() - (- 1)), _refDateToday(-currentDateOfMonth() - (- 1)))"
							class="dropdown-item">Last Month</button>
					</div>

					<!-- <div> calendar addd later
						calendar addd laterqqqqqqqqqqqqqqqqqqqqqqqqqqqqq
						calendar addd later
						calendar addd later
						calendar addd later
						calendar addd later
						calendar addd later
					</div> -->
				</div>
			</div>
		</div>
	</div>
	<!-- <div class="text-gray-600 fw-bold mt-2 mt-sm-0">compared to <span id="daterange-prev-date">24 Mar-30 Apr 2023</span>
	</div> -->
</template>