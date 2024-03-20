<script setup>
import classService from "@/store/ClassService";
import { computed, onMounted } from "vue";
import { RouterLink, useRoute } from "vue-router";
const classStore = classService();
const route = useRoute();
const idClase = route.params.idClase;
const infoClass= computed(()=>classStore.clase)
onMounted(async () => {
  await classStore.getAClass(idClase);
});
</script>

<template>
  <div
    className="bg-indigo-100 mt-2 rounded-xl py-3 px-5 font-lato border border-black relative"
  >
    <h1 className="text-3xl font-bold text-center">{{infoClass?.nombre}}</h1>
    <h2 className=" font-bold text-center text-pretty text-xl">
      {{infoClass?.area}}
    </h2>

    <div className="flex justify-around border-b border-black">
      <div>
        <i className=" fa fa-users "></i>
        <p className="inline m-2">{{infoClass?.alumnos?.length}} alumnos</p>
      </div>
      <div>
        <i className="fa fa-check font-bold text-xl"></i>
        <p className="inline m-2">{{infoClass?.finalizado}} finalizado</p>
      </div>
      <div>
        <i className="fa fa-heart"></i>
        <p className="inline m-2">{{infoClass?.Valoracion}} valoracion</p>
      </div>
    </div>

    <div className="flex justify-end items-center p-2">
      <div>
        <RouterLink
          className="bg-blue-300 py-2 px-5 rounded-full border font-bold hover:bg-blue-500 shadow-blue-300 shadow-inner"
          to=""
        >
        </RouterLink>
        <RouterLink
          className="bg-blue-300 py-2 px-5 rounded-full border font-bold hover:bg-blue-500 shadow-blue-300 shadow-inner"
          :to="{name:'editarClase', params:{idClase:idClase}}"
        >
          Editar Clase
        </RouterLink>
      </div>
    </div>
  </div>
  <div
    className="bg-sky-200 mt-2 rounded-xl px-10 py-5 font-lato border border-black text-lg "
  >
    <h1 className="  text-2xl font-bold">Actividades</h1>
    <div
      v-for="actividad in infoClass?.Actividades"
      class="my-2 card bg-base-100 shadow-md"
    >
      <div class="card-body" :key="actividad">
        <div class="flex justify-between items-center">
          <h1 class="card-title font-salsa text-xl">pregunta</h1>
          <button class="btn btn-info self-start">opciones <i class="fas fa-ellipsis-h rotate-90"></i></button>
        </div>
        <p>{{ actividad.pregunta }}</p>

        
        <div v-if="actividad.respuestas.length>0">
           <h1 class="card-title font-salsa text-xl">Opciones de respuesta</h1>
           <div v-for="respuesta in actividad.respuestas"  class="m-2 card w-auto">
          <div class="alert alert-info">
            <span>{{respuesta}}</span>
          </div>
        </div>
        </div>
       
        
       
        <h1 class="card-title font-salsa text-xl">Respuesta Correcta</h1>
        <div class="alert alert-success">
            <span>{{ actividad.correcta }}</span>
          </div>
        
        <h1 class="card-title font-salsa text-xl">Retroalimentacion</h1>
        {{ actividad.retroalimentacion }}
      </div>
    </div>
    {{ infoClass.Actividades }}
    <p>Esta clase aun no tiene actividades</p>
    <button class="btn btn-success" onclick="addActivity.showModal()">
      Agregar Actividad
    </button>
  </div>
 
</template>

<style scoped></style>
