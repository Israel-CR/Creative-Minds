<script setup>
import NavBarAlumno from "@/components/navegacion/NavBarAlumno.vue";
import NavBarUser from "@/components/navegacion/NavBarUser.vue";
import SideNavDocente from "@/components/navegacion/SideNavDocente.vue";
import router from "@/router";
import authService from "@/store/AuthService";
import userService from "@/store/UserService";

import { onMounted} from "vue";
import { RouterLink } from "vue-router";

const authStore = authService();
const userStore = userService();

const navRutas = [
  {
    nombre: "Inicio",
    path: "inicioAlumno",
    icon: "fa fa-home",
  },
  {
    nombre: "Actividades",
    path: "actividades",
    icon: "fa fa-book",
  },
  {
    nombre: "Grupos",
    path: "gruposA",
    icon: "fa fa-users",
  },
  // {
  //   nombre: "Explorar Cursos",
  //   path: "explorarCursos",
  //   icon: "fa fa-chart-bar",
  // },
  {
    nombre: "Perfil",
    path: "perfilA",
    icon: "fa fa-user",
  },
];



onMounted(async () => {
  authStore.getUser();
  userStore.getProfile();

});

const logout=()=>{
    authStore.logout();
    window.location.href = '/';
}
</script>

<template>
  <div
    class="bg-gradient-to-l from-[#6EDFFF] to-[#6EFFA0] min-w-screen w-full min-h-screen text-lg"
  >
    <div class="flex">
      <div class="flex-grow">
        <NavBarAlumno />
        <div class="px-10 py-5 flex-grow">
          <div
            class="bg-gradient-to-r from-info to-accent -translate-y-2 shadow-lg rounded-full"
          >
            <ul
              class="navbar px-6 flex space-x-4 justify-between items-center font-play"
            >
              <RouterLink
                v-for="ruta in navRutas"
                :key="ruta.nombre"
                :to="{ name: ruta.path }"
                class="btn btn-circle btn-outline btn-ghost grow"
                active-class="btn-active"
              >
                <i :class="`${ruta.icon}`"></i> {{ ruta.nombre }}</RouterLink
              >
              <button
                class="btn btn-outline btn-error m-2 flex rounded-full justify-between"
                @click="logout"
              >
                <p className=" hidden md:inline-block">Cerrar sesion</p>
                <i class="fas fa-sign-out-alt"></i>
              </button>
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
