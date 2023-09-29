
<script>

export default {
    name: "pagination",
    data() {

    },
    methods: {

    }
}
</script>

<template>
    <div>
        <ul class="pagination">
            <li class="page-item">
                <button @click="toPage(this.query.page - 1)" :disabled="this.query.page <= 1" class="page-link"
                    aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                    <span class="sr-only">Previous</span>
                </button>
            </li>
            <li v-for="pageNum in pageMetaData.totalPage" :key="pageNum" class="page-item">
                <button class="page-link acitve" @click="toPage(pageNum)"
                    :class="{ 'bg-dark text-white': pageNum == this.query.page }">
                    {{ pageNum }}
                </button>
            </li>

            <li class="page-item">
                <button @click="toPage(this.query.page + 1)" :disabled="this.query.page >= this.pageMetaData.totalPage"
                    class="page-link" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                    <span class="sr-only">Next</span>
                </button>
            </li>
        </ul>
    </div>
</template>