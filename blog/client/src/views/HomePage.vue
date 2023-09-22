<template>
    <div class="container">
        <div class="nav">
            <div @click="homePage">首页</div>
            <n-popselect @update:value="searchByCategory" v-model:value="selectedCategory" :options="categoryOptions" trigger="click">
                <div>分类:><span>{{ categoryName }}</span></div>
            </n-popselect>
            <div @click="dashboard">后台</div>
        </div>
        <n-divider />

        <n-space>
            <n-input v-model:value="pageInfo.keyword" :style="{width:'500px'}" placeholder="请输入关键字"  />
            <n-button type="primary" ghost @click="loadBlogs(0)" @keydown.enter="loadBlogs(0)">搜索</n-button>
        </n-space>


        <div v-for="(blog, index) in blogListInfo" style="margin-bottom: 15px;cursor:pointer">
            <n-card :title="blog.title" @click="toDetail(blog)">
                {{ blog.content }}
                <template #footer>
                    <n-space style="align-items: center;">
                        <div>发布时间:{{ blog.create_time }}</div>
                    </n-space>
                </template>
            </n-card>
        </div>

        <n-pagination @update:page="loadBlogs" v-model:page="pageInfo.page" :page-count="pageInfo.pageCount" />

        <n-divider />
        <div class="footer">
            <div>假装有版权声明</div>
        </div>

    </div>
</template>

<script setup>
import { ref, reactive, inject, onMounted, computed } from 'vue'

import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

const message = inject("message")
const axios = inject("axios")
const dialog = inject("dialog")

const selectedCategory = ref(null)
const categoryOptions = ref([])
const blogListInfo = ref([])


const pageInfo = reactive({
    page: 1,
    pageSize: 3,
    pageCount: 0,
    count: 0,
    keyword: "",
    categoryId:0
})


onMounted(() => {
    loadCategorys()
    loadBlogs()
})

const loadBlogs = async ( page = 0) => {
    if(page!=0){
        pageInfo.page = page;
    }
    let res = await axios.get(`/blog/search?keyword=${pageInfo.keyword}&page=${pageInfo.page}&pageSize=${pageInfo.pageSize}&categoryId=${pageInfo.categoryId}`)
    let temp_rows = res.data.data.rows;
    for (let row of temp_rows) {
        row.content += "..."
        let d = new Date(row.create_time)
        row.create_time = `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`
    }
    blogListInfo.value = temp_rows;
    pageInfo.count = res.data.data.count
    pageInfo.pageCount = parseInt(pageInfo.count / pageInfo.pageSize) + (pageInfo.count % pageInfo.pageSize > 0 ? 1 : 0)
    console.log(res);
}

const categoryName = computed(() => {
    let selectedOption = categoryOptions.value.find((option) => { return option.value == selectedCategory.value })
    return selectedOption ? selectedOption.label : ""
})

const loadCategorys = async () => {
    let res = await axios.get("/category/list")
    categoryOptions.value = res.data.rows.map((item) => {
        return {
            label: item.name,
            value: item.id,
        }
    })
}

const searchByCategory = (categoryId)=>{
    pageInfo.categoryId =categoryId;
    loadBlogs()

}

const toDetail = (blog) =>{
    router.push({path:"/detail",query:{id:blog.id}})
}

const homePage = () => {
    router.push("/")
}

const dashboard = () => {
    router.push("/login")
}

</script>

<style lang="scss" scoped>
.container {
    width: 1200px;
    margin: 0 auto;
}

.nav {
    display: flex;
    font-size: 20px;
    padding-top: 20px;
    color: #64676a;

    div {
        background-color: rgba(0, 0, 0, 5%);
        cursor: pointer;
        margin-right: 15px;

        &:hover {
            color: #f60;
        }

        span {
            color: rgb(42, 127, 255);
            font-size: 12px;
        }
    }
}

.footer {
    text-align: center;
    line-height: 25px;
    color: #64676a;
}
</style>