<script>
import PictureInput from 'vue-picture-input';
export default {
    name: 'app',
    data() {
        return {
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
        }
    }
};
</script>
<template>
    <div class="d-flex align-items-center mb-3">
        <div>
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="javascript:;">Home</a></li>
                <li class="breadcrumb-item"><a href="javascript:;">Product</a></li>
                <li class="breadcrumb-item active"><i class="fa fa-arrow-back"></i> Add Product</li>
            </ol>
            <h1 class="page-header mb-0">Product Details</h1>
        </div>
    </div>

    <div class="card border-0 mb-4">
		<div class="card-body">
        <div class="card-header h6 mb-0 bg-none p-3">
            <i class="fa fa-dolly fa-lg fa-fw text-dark text-opacity-50 me-1"></i> Product Information
        </div>
        
        <div class="card-body">
            <div class="mb-3">
                <label class="form-label">Title</label>
                <input type="text" class="form-control" name="title" id="name" placeholder="Product name">
            </div>
            <div class="mb-3">
                <label class="form-label">Product_code</label>
                <input type="text" class="form-control" name="product_code" id="product_code" placeholder="Product code">
            </div>
            <div class="mb-3">
                <label class="form-label">Price</label>
                <input type="text" class="form-control" name="price" id="price" placeholder="Price">
            </div>
            <div class="mb-3">
                <label class="form-label">Quantity</label>
                <input type="text" class="form-control" name="quantity" id="quantity" placeholder="Quantity">
            </div>
            <div class="mb-3">
                <label class="form-label">Discription</label>
                <input type="text" class="form-control" name="discription" id="discription" placeholder="Discription">
            </div>
            <div class="mb-3">
                <label class="form-label">Category</label>
                <input type="text" class="form-control" name="category" id="category" placeholder="Category">
            </div>

            <div class="card-header h6 mb-0 bg-none p-3">
                <i class="fa-solid fa-image fa-lg fa-fw text-dark text-opacity-50 me-1"></i> Image
            </div>
            <div class="card-body">
                <picture-input ref="pictureInput" width="150" height="150" margin="16" accept="image/*" size="10"
                    button-class="btn" :custom-strings="{
                        upload: '<h1>Bummer!</h1>',
                        drag: 'input Product picture'
                    }" @change="onChange">
                </picture-input>
            </div>
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
  <a href="/product/" class="btn btn-success me-md-2 btn-rounded px-4 rounded-pill" type="submit">Submit</a>
  <a href="/product/" class="btn btn-danger btn-rounded px-4 rounded-pill">Cancel</a>
</div>
        </div>
    </div>
    </div>
</template>