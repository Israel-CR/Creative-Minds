<script setup>
import { defineProps } from 'vue';

const  props = defineProps({title:String, body:String})

</script>

<template>
    <div class="bg-gray-200 p-3 border border-gray-900 m-3">
        <h1 class="text-2xl">{{ props.title }}</h1>
        <p class="text-sm">{{ props.body }}</p>
        <RouterLink :to="{name:'post', params:{id:props.title}  }">Home</RouterLink>
    </div>
</template>

<style scoped>

</style>