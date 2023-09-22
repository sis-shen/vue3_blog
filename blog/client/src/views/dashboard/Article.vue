<template>
    <n-tabs v-model:value="tabValue" justify-content="start" type="line">
        <n-tab-pane name="list" tab="文章列表">
            <div v-for="(blog, index) in blogListInfo" style="margin-bottom: 15px;">
                <n-card :title="blog.title">
                    {{ blog.content }}
                    <template #footer>
                        <n-space style="align-items: center;">
                            <div>发布时间:{{ blog.create_time }}</div>
                            <n-button @click="toUpdate(blog)">修改</n-button>
                            <n-button>删除</n-button>
                        </n-space>
                    </template>
                </n-card>
            </div>

            <n-space>
                <div v-for="pageNum in pageInfo.pageCount" @click="toPage(pageNum)">
                    <n-button :style="'background-color:' + (pageNum == pageInfo.page ? 'rgba(0,0,0,10%)' : '')">
                        {{ pageNum }}
                    </n-button>
                </div>
            </n-space>

        </n-tab-pane>
        <n-tab-pane name="add" tab="添加文章">

            <n-form>
                <n-form-item label="标题">
                    <n-input v-model:value="addArticle.title" placeholder="请输入标题" />
                </n-form-item>
                <n-form-item label="分类">
                    <n-select v-model:value="addArticle.categoryId" :options="categoryOptions" />
                </n-form-item>
                <n-form-item label="内容">
                    <RichTextEditor v-model="addArticle.content"></RichTextEditor>
                </n-form-item>
                <n-form-item label="">
                    <n-button @click="add">提交</n-button>
                </n-form-item>
            </n-form>

        </n-tab-pane>
        <n-tab-pane name="updateTab" tab="修改文章">
            <n-form>
                <n-form-item label="标题">
                    <n-input v-model:value="updateArticle.title" placeholder="请输入标题" />
                </n-form-item>
                <n-form-item label="分类">
                    <n-select v-model:value="updateArticle.categoryId" :options="categoryOptions" />
                </n-form-item>
                <n-form-item label="内容">
                    <RichTextEditor v-model="updateArticle.content"></RichTextEditor>
                </n-form-item>
                <n-form-item label="">
                    <n-button @click="update">提交</n-button>
                </n-form-item>
            </n-form>
        </n-tab-pane>
    </n-tabs>
</template>

<script setup>
import { AdminStore } from '../../stores/AdminStore';
import { ref, reactive, inject, onMounted } from 'vue'
import RichTextEditor from '../../components/RichTextEditor.vue'

import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

const message = inject("message")
const axios = inject("axios")

const adminStore = AdminStore()

const addArticle = reactive({
    categoryId: null,
    title: "",
    content: "",
})

const updateArticle = reactive({
    id: 0,
    categoryId: null,
    title: "",
    content: "",
})

const categoryOptions = ref([])
const blogListInfo = ref([])
const tabValue =ref("list")

const pageInfo = reactive({
    page: 1,
    pageSize: 3,
    pageCount: 0,
    count: 0
})

//从服务端去读取
onMounted(() => {
    loadBlogs()
    loadCategorys()
})

const loadBlogs = async () => {
    let res = await axios.get(`/blog/search?page=${pageInfo.page}&pageSize=${pageInfo.pageSize}`)
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

const loadCategorys = async () => {
    let res = await axios.get("/category/list")
    categoryOptions.value = res.data.rows.map((item) => {
        return {
            label: item.name,
            value: item.id,
        }
    })
}

const add = async () => {
    let res = await axios.post("/blog/_token/add", addArticle)
    if (res.data.code == 200) {
        message.info(res.data.msg)
        addArticle.title = "",
            addArticle.content = "",
            addArticle.categoryId = null
    } else {
        message.error(res.data.msg)
    }
}

const toPage = async (pageNum) => {
    pageInfo.page = pageNum
    loadBlogs()
}

const toUpdate = async (blog) =>{
    tabValue.value = "updateTab"
    let res = await axios.get("/blog/detail?id="+ blog.id )
    updateArticle.id = blog.id
    updateArticle.title = res.data.rows[0].title
    updateArticle.content = res.data.rows[0].content
    updateArticle.categoryId = res.data.rows[0].category_id

}

const update = async () => {
    let res = await axios.put("/blog/_token/update", updateArticle)
    if (res.data.code == 200) {
        message.info(res.data.msg)
        loadBlogs(),
        tabValue.value = "list"
    } else {
        message.error(res.data.msg)
    }
}



</script>


<style lang="scss" scoped></style>