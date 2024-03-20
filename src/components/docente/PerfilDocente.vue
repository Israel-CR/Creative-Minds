<script setup>
import authService from "@/store/AuthService";
import userService from "@/store/UserService";
import { computed, onMounted } from "vue";
import { RouterLink } from "vue-router";

const userStore = userService();

onMounted(async () => {
  await userStore.getProfile();
});
</script>

<template>
  <div class="w-full ">
    <h1 class="text-4xl font-play font-semibold">Mi Perfil</h1>

    <div class="card bg-sky-200 shadow-md my-4 flex md:flex-row flex-col items-center  font-lato "
    >
      <figure class=" avatar p-2">
        <div class="w-40 rounded-full ring ring-info ring-offset-base-100 ring-offset-2">
          <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
  
        </div>
        
  </figure>
      <div class="card-body flex-grow">
        <h1 class="text-5xl  capitalize  font-bold">{{userStore.perfil?.nombre}}</h1>
        <p class="text-2xl">
          <i class="fa fa-chalkboard-teacher"></i> {{userStore.perfil?.rol}}
        </p>
        <div class="flex flex-col md:flex-row justify-between mt-2 ">
        <p class="text-xl">
          <i class="fa fa-envelope"></i> {{userStore.perfil?.correo}}
        </p>
        <p class="text-xl"><i className="fa fa-users"></i>0 Grupos</p>
        <p class="text-xl">
          <i class="fa fa-chalkboard"></i>0 Clases creadas
        </p>
        <p class="text-xl"><i className="fa fa-star"></i> 0 valoracion</p>
      </div>
    </div>
  </div>

  <div
    class="card shadow-md bg-sky-200 "
  >
    <div class=" flex justify-between pb-3 p-3">
      <h1 class="card-title text-3xl font-bold">Mis Datos</h1>

      <RouterLink
        class=" btn btn-outline btn-primary rounded-full"
      to="/docente"
        >
        Editar datos
        <a class="fa fa-edit"></a>
      </RouterLink>
    </div>

    <div class="card-body grid grid-cols-2  text-lg flex-col md:flex-row gap-3">
      <div class="w-1/2">
        <p><b>Nombre:</b>{{userStore.perfil?.nombre}}</p>
      </div>
      <div class="w-1/2">
        <p><b>Usuario:</b> {{userStore.perfil.usuario}}</p>
      </div>
      <div class=" w-1/2">
        <p><b>Correo Electronico:</b> {{userStore.perfil.correo}}</p>
      </div>
      <div class="w-1/2">
        <p><b>Rol del Usuario:</b>{{userStore.perfil.rol}}</p>
      </div>
      <div class="w-1/2">
        <p><b>Fecha de Nacimento:</b>{{new Date(userStore.perfil.fechaNacimiento) }}</p>
      </div>
      <div class="w-1/2">
        <p><b>Genero:</b> {{userStore.perfil.genero}}</p>
      </div>
    </div>
  </div>
  </div>
</template>

<style scoped></style>
