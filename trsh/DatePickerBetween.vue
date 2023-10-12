<script>
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

export default {
	// components: { Datepicker },
	data() {
		return {
			filterDate: {
				startDate: null,
				endDate: null,
			},
			Sdate: ''
		};
	},
	async mounted() {
		this.filterDate.startDate = this._refDateToday(0)
		this.filterDate.endDate = this._refDateToday(1)
		console.log(this.filterDate);
	},
	methods: {
		//imp later
		dateOption(startDate, endDate) {
			this.Sdate=startDate+' - '+endDate
			console.log("date option");
			console.log(startDate);
			console.log(endDate);
			this.filterDate.endDate = endDate
			this.filterDate.startDate = startDate;
			this.$emit("filterDate", this.filterDate)
			console.log("date", this.filterDate);
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
				<span>{{ filterDate.startDate + " ~ " + filterDate.endDate }}</span>
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


				</div>
			</div>
		</div>
	</div>
	<div class="text-gray-600 fw-bold mt-2 mt-sm-0">compared to <span id="daterange-prev-date">{{ Sdate }}</span>
	</div>
</template>

<style></style>