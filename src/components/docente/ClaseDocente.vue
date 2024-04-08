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
    class="bg-base-100 mt-2 card card-body  font-lato"
  >
    <h1 class="text-4xl text-center  font-bold">{{infoClass?.nombre}}</h1>
    <h2 class=" font-bold text-center text-pretty text-xl">
      {{infoClass?.area}}
    </h2>

    <div class="flex justify-around">
      <div>
        <i class=" fa fa-users "></i>
        <p class="inline m-2">{{infoClass?.alumnos?.length}} alumnos</p>
      </div>
      <div>
        <i class="fa fa-check font-bold text-xl"></i>
        <p class="inline m-2">{{infoClass?.finalizado}} finalizado</p>
      </div>
      <div>
        <i className="fa fa-heart"></i>
        <p className="inline m-2">{{infoClass?.Valoracion}} valoracion</p>
      </div>
    </div>
    <div class="divider"></div>

    <div className="flex justify-end gap-3 card-actions">
        <RouterLink
          class="btn btn-error"
          to=""
        >
        Eliminar Clase
        </RouterLink>
        <RouterLink
          className=" btn btn-primary shadow-blue-300"
          :to="{name:'editarClase', params:{idClase:idClase}}"
        >
          Editar Clase
        </RouterLink>
      
    </div>
  </div>
  <div
    className="bg-base-200 mt-2 rounded-xl px-10 py-5 font-lato text-lg "
  >
    <h1 className="  text-2xl font-bold">Actividades</h1>
    <div
      v-for="actividad in infoClass?.Actividades"
      class="my-2 card bg-base-100 shadow-md"
    >
      <div class="card-body" :key="actividad">
        <div class="flex justify-between items-center">
          <h1 class="card-title font-salsa text-xl">pregunta</h1>
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
    
    <p v-if="!infoClass.Actividades">Esta clase aun no tiene actividades</p>

  </div>
 
</template>

<style scoped></style>
