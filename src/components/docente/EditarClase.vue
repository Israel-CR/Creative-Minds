<script setup>
import classService from "@/store/ClassService";
import { computed, onMounted, ref } from "vue";
import { RouterLink, useRoute } from "vue-router";
import AddActivityForm from "./forms/AddActivityForm.vue";
const classStore = classService();
const route = useRoute();
const idClase = route.params.idClase;
const infoClass = computed(() => classStore.clase);

//  se obtiene la informacion de la clase
onMounted(async () => {
  await classStore.getAClass(idClase);
});
</script>

<template>
  <div>
    <h1 class="text-4xl font-changa font-semibold">Editar clase</h1>
  </div>
  
  <div
    className="card bg-base-200  mt-2  py-3 px-5 font-lato text-lg shadow-md relative"
  >
    <h1 className="text-3xl font-bold text-center">{{ infoClass?.nombre }}</h1>
    <h2 className=" font-bold text-center text-pretty text-xl">
      {{ infoClass?.area }}
    </h2>

    <div className="flex  justify-around">
      <div>
        <i className=" fa fa-users "></i>
        <p className="inline m-2">{{ infoClass?.alumnos?.length }} alumnos</p>
      </div>
      <div>
        <i className="fa fa-check font-bold text-xl"></i>
        <p className="inline m-2">{{ infoClass?.finalizado }} finalizado</p>
      </div>
      <div>
        <i className="fa fa-heart"></i>
        <p className="inline m-2">{{ infoClass?.Valoracion }} valoracion</p>
      </div>
    </div>
    <div class="divider divider-neutral"></div>

    <div className="flex justify-end items-center p-2">
      <div class="flex gap-2">
        <RouterLink className="btn  btn-info" to="">
          editar detalles de la clase
        </RouterLink>
        <!-- <RouterLink
          className="btn btn-secondary"
          :to="{ name: 'editarClase', params: { idClase: idClase } }"
        >
          Editar Clase
        </RouterLink> -->
      </div>
    </div>
  </div>

  <!-- formulario para agregar actividad -->
  <div className="bg-base-200 mt-2 rounded-xl px-10 py-5 font-lato shadow-md text-lg "
  >
  <div class="flex justify-between items-center">
    <h1 className="  text-2xl font-bold">Actividades</h1>
    <button class="btn btn-outline btn-primary" onclick="addActivity.showModal()">
      Agregar Actividad
    </button>
  </div>
   
    <div
      v-for="actividad in infoClass?.Actividades"
      class="my-2 card bg-base-100 shadow-md"
    >
      <div class="card-body" :key="actividad">
        <div class="flex justify-between items-center">
          <h1 class="card-title font-salsa text-xl">pregunta</h1>
          <label class="btn btn-sm  btn-circle swap swap-rotate btn-secondary self-start"> 
            <input type="checkbox">
            <i class="swap-off fas 
            fa-ellipsis-h rotate-90 text-xl"></i>
            <i class="swap-on fas fa-ellipsis-h rotate-45 text-xl"></i>
          </label>
          
        </div>
        <p>{{ actividad.pregunta }}</p>

        
        <div v-if="actividad.respuestas.length>0">
           <h1 class="card-title font-salsa text-xl">Opciones de respuesta</h1>
           <div v-for="respuesta in actividad.respuestas"  class="m-2 rounded-lg bg-info py-2 text-center">
            <span class="text-2xl font-bold">{{respuesta}}</span>
        </div>
        </div>
       
        
       
        <h1 class="card-title font-salsa text-xl">Respuesta Correcta</h1>
        <div class="rounded-lg bg-success py-2 text-center">
            <span class="font-bold text-2xl">{{ actividad.correcta }}</span>
          </div>
        
        <h1 class="card-title font-salsa text-xl">Retroalimentación</h1>
        {{ actividad.retroalimentacion }}
      </div>
    </div>
  
    <p v-if="!infoClass.Actividades">Esta clase aun no tiene actividades</p>
   
  </div>


  <!-- Formulario para agregar una nueva actividad -->
  <dialog id="addActivity" class="modal">
    <AddActivityForm />
  </dialog>
</template>

<style scoped></style>
