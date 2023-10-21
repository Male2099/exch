<template>
	<Datepicker v-model="date"></Datepicker>
  </template>
  <script>
	import Datepicker from 'vue3-date-time-picker';
	import 'vue3-date-time-picker/dist/main.css'
	export default {
	  components: { Datepicker },
	  data() {
		return {
		  date: null,
		};
	  }
	}
  </script>