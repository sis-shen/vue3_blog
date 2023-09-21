<template>
    <div>
        
    </div>
</template>

<script setup>
import { AdminStore } from '../../stores/UserStore';
import { ref, reactive, inject } from 'vue'

import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

const message = inject("message")
const axios = inject("axios")

const adminStore = AdminStore()

</script>

<style lang="scss" scoped></style>