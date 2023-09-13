<script>
import PictureInput from 'vue-picture-input';
import axios from 'axios';
export default {
    name: 'app',
    data() {
        return {
            category: {
    name: "",
    img: "",
    isAvailable: true
  },
        }
    },
    components: {
        PictureInput
    },
    methods: {
        onChange(image) {
            console.log('New picture selected!')
            if (image) {
                console.log('Picture loaded.')
                this.image = image
            } else {
                console.log('FileReader API not supported: use the <form>')
            }
        },
        addCategory(){
                fetch('http://localhost:8080/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.category)
                })
                .then(data => {
                    console.log(data)
                    this.$router.push("/category/");
                })

            }
    },
};
</script>
<template>
    <div class="d-flex align-items-center mb-3">
        <div>
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="javascript:;">Home</a></li>
                <li class="breadcrumb-item"><a href="javascript:;">Category</a></li>
                <li class="breadcrumb-item active"><i class="fa fa-arrow-back"></i>Add Category</li>
            </ol>
            <h1 class="page-header mb-0">Category</h1>
        </div>
    </div>
<form @submit.prevent="addCategory">

    <div class="card border-0 mb-4" style="background-color: rgb(77, 167, 246);">
        <div class="card-header h6 mb-0 bg-none p-3">
            <i class="fa fa-dolly fa-lg fa-fw text-dark text-opacity-50 me-1"></i> Category
        </div>
        <div class="card-body">
            <div class="mb-3">
                <label class="form-label">Title</label>
                <input type="text" class="form-control" name="title" id="name" placeholder="Category">
            </div>
            <div class="card-header h6 mb-0 bg-none p-3">
                <i class="fa-solid fa-image fa-lg fa-fw text-dark text-opacity-50 me-1"></i> Image
            </div>
            <div class="card-body">
                <picture-input ref="pictureInput" width="150" height="150" margin="16" accept="image/*" size="10"
                    button-class="btn" :custom-strings="{
                        upload: '<h1>Bummer!</h1>',
                        drag: 'input profile picture'
                    }" @change="onChange">
                </picture-input>
            </div>
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
  <input class="btn btn-primary me-md-2 btn-rounded px-4 rounded-pill" type="submit" value="Submit">
  <a href="/category/" class="btn btn-danger btn-rounded px-4 rounded-pill">Cancel</a>
</div>
        </div>
    </div>
</form>
</template>