<script setup>
import NavBarUser from "@/components/navegacion/NavBarUser.vue";
import SideNavDocente from "@/components/navegacion/SideNavDocente.vue";
import authService from "@/store/AuthService";
import userService from "@/store/UserService";

import { onMounted } from "vue";
import { RouterLink } from "vue-router";

const authStore = authService();
const userStore = userService();

const navRutas=[
    {
        nombre: "Inicio",
        path:'inicioAlumno',
        icon:"fa fa-home"
    },
    {
        nombre:'Actividades',
        path:'actividades',
        icon:'fa fa-book'
    }
    ,
    {
        nombre:'Grupos',
        path:'gruposA',
        icon:'fa fa-users'
    }
    ,
    {
        nombre:'Explorar Cursos',
        path:'explorarCursos',
        icon:'fa fa-chart-bar'
    }
    ,
    {
        nombre:'Perfil',
        path:'perfilA',
        icon:'fa fa-user'
    }
]


onMounted(async () => {
  await authStore.getUser();
  await userStore.getProfile();
});
</script>

<template>
  <div
    class="bg-gradient-to-r from-[#6EDFFF] to-[#6EFFA0] min-w-screen w-full min-h-screen text-lg"
  >
    <div class="flex">
      <div class="flex-grow">
        <NavBarUser />
        <div class="px-10 py-5 flex-grow">
          <div class="bg-base-300 -translate-y-2 shadow-lg rounded-full">
            <ul
              class="navbar px-6 flex space-x-4 justify-between items-center font-play"
            >
                <RouterLink v-for="ruta in navRutas" :key="ruta.nombre" :to="{name:ruta.path}" class="btn btn-sm btn-circle btn-outline btn-primary grow"  active-class="btn-active"> <i :class="`${ruta.icon}`"></i> {{ ruta.nombre }}</RouterLink>
            
              
            </ul>
          </div>

          <router-view />
          <!-- Se utiliza router-view en lugar de Outlet en Vue -->
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
