<script setup>

import NavBarUser from "@/components/navegacion/NavBarUser.vue"
import SideNavDocente from "@/components/navegacion/SideNavDocente.vue";
import authService from "@/store/AuthService";
import classService from "@/store/ClassService";
import groupService from "@/store/GroupService";
import userService from "@/store/UserService";

const authStore = authService();
const userStore = userService();
const groupStore = groupService();
const classStore = classService()

import { onMounted } from "vue";

onMounted(async()=>{
  
     await authStore.getUser();
    await userStore.getProfile();
    await groupStore.getGroups()
    await classStore.getClasses()
  })

</script>

<template>
    <div class="bg-gradient-to-r from-[#6EDFFF] to-[#6EFFA0] min-w-screen w-full min-h-screen">
    <div class="flex">
        <SideNavDocente/>
      
      
      <div class="flex-grow">
        
        <NavBarUser/>
        <div class="px-10 py-5 flex-grow">
          
          
          <router-view /> <!-- Se utiliza router-view en lugar de Outlet en Vue -->
        
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>