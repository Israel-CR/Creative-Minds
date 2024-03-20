<script setup>
import classService from "@/store/ClassService";
import { onMounted } from "vue";
import { RouterLink } from "vue-router";

const classStore = classService();

onMounted(async () => {
  await classStore.getClasses();
});
</script>

<template>
  <div className=" h-full min-h-screen min-w-screen">
    <div class="flex justify-between py-3">
      <h1 className="text-4xl font-changa font-semibold">Mis Clases</h1>
      <RouterLink
        v-if="classStore.clases.length > 0"
        class="btn bg-blue-400"
        to="/docente/clases/crear"
      >
        Crear Clase
      </RouterLink>
    </div>

    <div
      v-if="classStore.clases.length === 0"
      class="p-5 rounded border border-black text-center"
    >
      <h1 className="text-2xl font-semibold ">Crea tu primera clase</h1>
      <p class="my-3">aqui se mostraran tus clases</p>
      <RouterLink
        class="bg-indigo-400 py-2 px-5 mt-5 rounded-full border font-bold hover:bg-green-600 shadow-blue-300 shadow-inner"
        to="/docente/clases/crear"
      >
        Crear Clase
      </RouterLink>
    </div>

    <div
      v-else
      v-for="clase in classStore.clases"
      key="clase._id"
      className="card bg-base-300 shadow-lg  border flex md:flex-row flex-col items-center  gap-2 my-2 p-2"
    >
      <figure class="avatar w-40 ">
        <div class="mask mask-squircle">
          <img
            src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
          />
        </div>
      </figure>
      <div className="card-body flex-grow p-1">
        <h1 className="card-title text-3xl font-bold text-clip ">{{ clase.nombre }}</h1>
        <h1 className="text-xl">{{ clase.area }}</h1>
        <div class="divider m-0"></div>
        <div className="flex flex-col md:flex-row justify-between p-1 ">
          <p>{{ clase.alumnos.length }} alumnos</p>
          <p>{{ clase.finalizado }} finalizado</p>
          <p>{{ clase?.Valoracion }} Valoracion</p>
          <p>{{ clase?.Actividades.length }} Actividades</p>
        </div>
        <div class="divider m-0"></div>
        <div className="flex justify-between">
          <p>{{ clase?.profesor.nombre }}</p>
          <aside className="badge badge-info">
            <p>{{ clase.Estado }}</p>
          </aside>
        </div>
        <div class="card-actions flex justify-end">
          <RouterLink :to="{name:'clase', params:{idClase:clase._id}}" class="btn bg-blue-300 btn-outline ">
            ver clase 
          </RouterLink>

          <button class="btn btn-success btn-outline ">
            opciones
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
