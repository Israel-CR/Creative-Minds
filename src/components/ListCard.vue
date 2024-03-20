<script setup >
import { onMounted, ref } from 'vue';
import PostService from '@/services/PostServices';
import CardPost from './CardPost.vue';

const postService = new PostService()
const posts= postService.getPosts();


onMounted(async() =>{
    await postService.fetchAll()
})

</script>

<template>
    <div>
        <h1>hola mundo</h1>
    <ul v-for="post in posts" :key="post.id">
           <CardPost :title="post.title" :body="post.body"/> 
    </ul>
    </div>
</template>

<style scoped>
</style>