<template>
    <n-tabs default-value="add" justify-content="start" type="line">
        <n-tab-pane name="oasis" tab="Oasis">
            Wonderwall
        </n-tab-pane>
        <n-tab-pane name="add" tab="添加文章">

            <n-form>
                <n-form-item label="标题">
                    <n-input v-model:value="addArticle.title" placeholder="请输入标题" />
                </n-form-item>
                <n-form-item label="内容">
                    <RichTextEditor v-model="addArticle.content"></RichTextEditor>>
                </n-form-item>
            </n-form>

        </n-tab-pane>
        <n-tab-pane name="jay chou" tab="周杰伦">
            七里香
        </n-tab-pane>
    </n-tabs>
</template>

<script setup>
import { AdminStore } from '../../stores/AdminStore';
import { ref, reactive, inject } from 'vue'
import RichTextEditor from '../../components/RichTextEditor.vue'

import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

const message = inject("message")
const axios = inject("axios")

const adminStore = AdminStore()

const addArticle = reactive({
    categoryId:0,
    title:"",
    content:"",
})



</script>


<style lang="scss" scoped></style>