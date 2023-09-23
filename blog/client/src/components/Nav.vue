<template>
    <div class="nav">
        <div @click="homePage">首页</div>

        <div @click="dashboard">后台</div>
    </div>
    <n-divider />
</template>

<script setup>
import { ref, reactive, inject, onMounted, computed } from 'vue'

import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

const message = inject("message")
const axios = inject("axios")



const homePage = () => {
    router.push("/")
}

const dashboard = () => {
    router.push("/login")
}


</script>

<style lang="scss" scoped>
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
</style>