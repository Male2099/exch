<script>
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

export default {
	components: { Datepicker },
	watch: {
		date(newVal) {
			this.dateOption(
				this._parseDateAsNumberFormat(this.date[0]),
				this._parseDateAsNumberFormat(this.date[1]),
			)
		}
	},
	data() {
		return {
			date: [],
			filterDate: {
				startDate: null,
				endDate: null,
			}
		};
	},
	async mounted() {
		this.filterDate.startDate = this._dateFromToday(0)
		this.filterDate.endDate = this._dateFromToday(1)
	},
	methods: {
		date123(val) {
			console.log("date:", val);
		},
		_parseDateAsNumberFormat(date) {
			if (!date) return;
			return (new Date(Date.parse(date))).toISOString()

		},
		dateOption(startDate, endDate) {
			this.filterDate.endDate = endDate
			this.filterDate.startDate = startDate;

			this.$emit("filterDate", this.filterDate)
		},
		_dateFromToday(nDay) {
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
			//chanhe format to 12 Oct 2023

			return _arr[2] + " " + _arr[1] + " " + " " + _arr[3];
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
			<div class="dropdown-menu" aria-labelledby="dropdownMenuButton" style="padding: 0 !important; ">
				<div class="d-flex">
					<div>
						<button @click="dateOption(_dateFromToday(0), _dateFromToday(0))"
							class="dropdown-item">Today</button>
						<button @click="dateOption(_dateFromToday(-1), _dateFromToday(0))"
							class="dropdown-item">Yesterday</button>

						<button @click="dateOption(_dateFromToday(-7), _dateFromToday(0))" class="dropdown-item">Last 7
							Days</button>
						<button @click="dateOption(_dateFromToday(-30), _dateFromToday(0))" class="dropdown-item">Last 30
							Days</button>
						<button @click="dateOption(_dateFromToday(-currentDateOfMonth() + 1), _dateFromToday(0))"
							class="dropdown-item">This Month</button>
						<button
							@click="dateOption(_dateFromToday(-daysFromLastMonth() - (- 1)), _dateFromToday(-currentDateOfMonth()))"
							class="dropdown-item">Last Month</button>
					</div>
					<div class="dropdown-item _date-picke">
						<datepicker :inline="  true " range multiCalendars v-model="date" :enable-time-picker="false" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
._date-picker {
	display: flex;
	width: 20rem;
	height: fit-content;
	padding-right: .5rem;


}
</style>