<script>
import Loading from '../../components/app/LoadingOnSubmit.vue';
import imageApi from "../../api/imageApi"
import PictureInput from 'vue-picture-input'
import categoryApi from '../../api/category/category';
import swal from "sweetalert"
export default {

	data() {
                return {
					defaultimage: '../../src/assets/defaultImage.png',
					categories: {
						name:'',
						img:'',
						available:''
					},
					result: `The category is`,
					image: null,
					loading: false,
			renderPageEnable: false
                }
            },
			components: { 
		PictureInput,
		Loading },
			computed: {
		imageLoaded() {
			return !!this.$refs.pictureInput.file;
		}
	},
			methods: {
		onChange(image) {
			if (image) {
				this.image = this.$refs.pictureInput.file
			}
		},
		async updateCategory(e) {
			e.preventDefault();
			const confirm = await this.confirmDialog();
			if (!confirm) return;
			this.loading = true;
			try {
				this.categories.img = await this.uploadImage();
				this.categories = await categoryApi.updateCategoryById(this.$route.params.id, this.categories);
				this.loading = false
				await this.showSuccessDialog()
				// this.$router.push("/user")
			} catch (error) {
				this.loading = false;
				console.log(error);
			}
		},
		async uploadImage() {
			const res = await imageApi.uplaodImage(this.image);
			return res;
		},
		async confirmDialog() {
			return swal({
				title: "Update Category",
				text: "Are you sure you want to update this Category?",
				icon: "info",
				buttons: {
					cancel: {
						text: 'Cancel',
						value: null,
						visible: true,
						className: 'btn btn-default',
						closeModal: true,
					},
					confirm: {
						text: 'Update',
						value: true,
						visible: true,
						className: 'btn btn-success',
						closeModal: true
					}
				}
			})
		}, async showSuccessDialog() {
			await swal({
				title: "Success",
				text: "Category updated successfully!",
				icon: "success",
				button: {
					text: "OK",
					className: 'btn btn-success',
				}
			});
		}
	},
	async mounted() {
		this.categories = await categoryApi.getCategoryById(this.$route.params.id)
		this.renderPageEnable = true

	},
};

</script>
<template>
	<div class="d-flex align-items-center mb-3">
		<div>
			<ol class="breadcrumb">
				<li class="breadcrumb-item"><a href="/dashboard/v2">Home</a></li>
				<li class="breadcrumb-item"><a href="/category/">Category</a></li>
				<li class="breadcrumb-item active"><i class="fa fa-arrow-back"></i>Update Category</li>
			</ol>
			<h1 class="page-header mb-0" style="color: green;"><i class="fa fa-plus-circle"></i>Update Category</h1>
	</div>
		</div>
	<form v-if="renderPageEnable" @submit="updateCategory">
    <div class="card border-0 mb-4 relative">
		<div class="card-body">
		<div class="mb-3">
			<label for="Name" class="form-label">Name</label>
				<input id="name"  type="text" class="form-control" placeholder="Name" v-model="categories.name" required>
		</div>
		<div class="mb-3">
			<label for="Img" class="form-label">Image</label>
			<div class="circle text-center">
				<picture-input ref="pictureInput" width="150" height="150" margin="16" accept="image/*" size="10"
						button-class="btn" :custom-strings="{
							upload: '<h1>Bummer!</h1>',
							drag: 'input profile picture'
						}" @change="onChange" :prefill="categories.img || defaultImage" :alertOnError="false">
					</picture-input>
			</div>
		</div>
		<div class="mb-3">
					<label class="form-label">Status </label>
					<div>
						<select class="form-control text-center" v-model="categories.available"
							:class="{ 'is-invalid': categories.available === 'false' || categories.available === false }">
							<option value="true">Active</option>
							<option value="false">Inactive</option>
						</select>
					</div>
				</div>
				<div v-if="!loading" class="d-grid gap-2 d-md-flex justify-content-md-end" style="margin: auto;">
					<button class="btn btn-success me-md-2 btn-rounded px-4 rounded-pill" type="submit">Update</button>

					<a href="/category/" class="btn btn-danger btn-rounded px-4 rounded-pill">Cancel</a>
				</div>
				<div v-else class="d-grid gap-2 d-md-flex justify-content-md-end" style="margin: auto;">
					<button class="btn btn-success btn-rounded rounded-pill"
						style="padding-left: 2.5rem;padding-right: 2.5rem;padding-top: .91rem; padding-bottom: .91rem;"
						type="button">
						<Loading style="font-size: .22rem" />
					</button>
				</div>

			</div>
		</div>
	</form>
</template>
../../api/category/category